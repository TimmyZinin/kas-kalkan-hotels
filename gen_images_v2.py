#!/usr/bin/env python3
"""Regenerate images for v2 — small tangible tools narrative."""
import os, base64, re, requests, sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

env_path = Path("/Users/timofeyzinin/.secrets/superjob.env")
for line in env_path.read_text().splitlines():
    if line.startswith("OPENROUTER_API_KEY="):
        os.environ["OPENROUTER_API_KEY"] = line.split("=", 1)[1].strip().strip('"').strip("'")
        break

API_KEY = os.environ["OPENROUTER_API_KEY"]
URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-2.5-flash-image"

NEG = ("Avoid: generic stock photo, smiling people, handshakes, laptops on desks, team meetings, "
    "cozy lifestyle interior, rustic wood textures, farmhouse aesthetic, sneakers, character mascots, "
    "cartoon characters, neon signs, badges, tattoo flash, shallow DoF bokeh portrait, sunset beach, "
    "flower arrangements, flat corporate illustration, oversaturated food, pastel soft colors, screens, monitors, phones")

IMAGES = {
    "pain": (
        "Editorial still life of small precision hand tools arranged on raw concrete surface: "
        "brass calipers, small wrench, magnifying loupe, tiny brass keys, measuring dividers, "
        "asymmetric tight composition with strong diagonal, hard directional studio light creating crisp shadows, "
        "monochrome concrete gray palette with brushed brass accents and single warm amber glow, "
        "contemplative quiet mood suggesting 'small tangible fixes', macro editorial photography. " + NEG
    ),
    "insight": (
        "Bold typographic poster composition: single massive coral numeral fragment intersecting with "
        "concrete gray geometric shapes and warm amber light slashes, asymmetric diagonal arrangement, "
        "grain texture overlay, editorial magazine spread style, flat areas of color with textural depth, "
        "playful structural energy, graphic design aesthetic. " + NEG
    ),
    "shift": (
        "Architectural photograph of narrow Mediterranean coastal village alleyway: whitewashed stone walls, "
        "single coral bougainvillea branch casting geometric shadow on wall, worn stone steps, extreme perspective "
        "looking down the alley, hard afternoon sun creating dramatic hard shadows, concrete and lime palette, "
        "empty of people, quiet contemplative mood, editorial architectural photography. " + NEG
    ),
}

def gen(np):
    name, prompt = np
    out = Path(f"/Users/timofeyzinin/kas-kalkan-hotels/images/{name}.png")
    try:
        r = requests.post(URL,
            headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
            json={"model": MODEL, "messages": [{"role": "user", "content": f"Generate a high-quality image: {prompt}"}]},
            timeout=90)
        r.raise_for_status()
        data = r.json()
        msg = data.get("choices", [{}])[0].get("message", {})
        images = msg.get("images", [])
        b64 = None
        if images:
            u = images[0].get("image_url", {}).get("url", "")
            if "base64," in u:
                b64 = u.split("base64,")[1]
        if not b64:
            m = re.search(r'base64,([A-Za-z0-9+/=]{1000,})', str(data))
            b64 = m.group(1) if m else None
        if b64:
            out.write_bytes(base64.b64decode(b64))
            print(f"OK {name}: {out}")
            return
        print(f"FAIL {name}: no image", file=sys.stderr)
    except Exception as e:
        print(f"ERR {name}: {e}", file=sys.stderr)

with ThreadPoolExecutor(max_workers=3) as ex:
    list(ex.map(gen, IMAGES.items()))
