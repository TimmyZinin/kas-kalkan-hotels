import {
  USER, TODAY, WIDGETS, ALERTS, VILLAS, BOOKINGS, CONFLICT,
  PRICING_WEEKS, TAX_THRESHOLDS, BOT_CONVOS, REVIEWS, ONBOARDING, NAV
} from './mock.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const app = $('#app');

const icon = (id, cls = '') => `<svg class="${cls}"><use href="icons.svg#i-${id}"/></svg>`;

// Router
const ROUTES = {
  '/home': renderHome,
  '/bookings': renderBookings,
  '/pricing': renderPricing,
  '/tax': renderTax,
  '/bot': renderBot,
  '/reviews': renderReviews,
  '/villa': renderVilla,
  '/more': renderMore,
};

function navigate(hash) {
  const route = hash.replace('#', '') || '/home';
  const fn = ROUTES[route] || renderHome;
  const doIt = () => {
    app.innerHTML = '';
    fn(app);
    renderBottomNav(route);
    app.querySelector('.screen')?.scrollTo(0, 0);
  };
  if (document.startViewTransition) {
    document.startViewTransition(doIt);
  } else {
    doIt();
  }
}

window.addEventListener('hashchange', () => navigate(location.hash));

// === SHARED UI ===
function topBar({ back, title, bell = true }) {
  return `
    <div class="top-bar">
      ${back ? `<button class="back" onclick="history.back()">${icon('chevron')}</button>` : '<div style="width:40px"></div>'}
      <div class="title">${title || ''}</div>
      ${bell ? `<button class="bell" onclick="location.hash='#/reviews'">${icon('bell')}<span class="dot"></span></button>` : '<div style="width:40px"></div>'}
    </div>
  `;
}

function statusBar() {
  return `
    <div class="status-bar">
      <span>${TODAY.time}</span>
      <div class="right">
        <span style="font-size:10px">5G</span>
        <span class="battery"></span>
      </div>
    </div>
  `;
}

function renderBottomNav(activeRoute) {
  let nav = $('.bottom-nav');
  if (!nav) {
    nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    $('.phone').appendChild(nav);
  }
  nav.innerHTML = NAV.map(n => `
    <a href="${n.route}" class="${activeRoute === n.route.slice(1) ? 'active' : ''}">
      ${icon(`${n.icon}`)}
      <span class="lbl">${n.label}</span>
    </a>
  `).join('');
}

function sparkline(data, color = 'var(--coral)', w = 90, h = 40) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="widget-spark"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function gaugeRing(percent, size = 44, stroke = 4, fillColor = 'var(--amber)') {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return `
    <svg class="gauge-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="gauge-track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="gauge-fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"
        stroke="${fillColor}" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
    </svg>
  `;
}

function bigGauge(percent, size = 100, stroke = 8, kind = '') {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return `
    <div class="tax-gauge ${kind}">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/>
        <circle class="fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"
          stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
      </svg>
      <div class="pct">%${percent}</div>
    </div>
  `;
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${icon('check')}${msg}`;
  $('.phone').appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 500);
  }, 2400);
}

function sheet({ title, sub, body }) {
  const back = document.createElement('div');
  back.className = 'sheet-backdrop';
  const sh = document.createElement('div');
  sh.className = 'sheet';
  sh.innerHTML = `
    <div class="sheet-handle"></div>
    <h3>${title}</h3>
    ${sub ? `<p class="sub">${sub}</p>` : ''}
    ${body}
  `;
  $('.phone').appendChild(back);
  $('.phone').appendChild(sh);
  requestAnimationFrame(() => { back.classList.add('open'); sh.classList.add('open'); });
  const close = () => {
    back.classList.remove('open');
    sh.classList.remove('open');
    setTimeout(() => { back.remove(); sh.remove(); }, 400);
  };
  back.addEventListener('click', close);
  return { close, el: sh };
}

// === SCREEN: HOME ===
function renderHome(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: '', bell: true })}
    <main class="screen">
      <section class="home-hero">
        <div class="greet-label">${TODAY.dateTR}</div>
        <h1 class="greet-line">${TODAY.greeting}, <em>${USER.short}</em>.</h1>
        <p class="greet-sub">${TODAY.summary}</p>
      </section>

      <section class="widget-grid">
        ${WIDGETS.map((w, i) => `
          <a href="${w.route}" class="widget ${i === 0 ? 'coral' : ''}">
            <div class="widget-head">
              ${icon(w.icon)}
              <span class="lbl">${w.label}</span>
            </div>
            <div>
              <div class="widget-val">${w.value}</div>
              <span class="widget-meta ${w.metaStyle}">${w.meta}</span>
            </div>
            ${w.sparkline ? sparkline(w.sparkline, i === 0 ? 'var(--bg)' : 'var(--coral)') : ''}
            ${w.gauge ? `<div class="widget-gauge">${gaugeRing(w.gauge)}</div>` : ''}
          </a>
        `).join('')}
      </section>

      <div class="section-label">
        <span class="ttl">Bugünün bildirimleri</span>
        <a href="#/reviews">Hepsi →</a>
      </div>

      <section class="alert-feed">
        ${ALERTS.map(a => `
          <div class="alert-item ${a.kind}" onclick="${a.route ? `location.hash='${a.route}'` : ''}">
            <div class="alert-icon">${icon(a.icon)}</div>
            <div class="alert-body">
              <div class="alert-ttl"><span>${a.title}</span><span class="time">${a.time}</span></div>
              <div class="alert-txt">${a.body}</div>
              ${a.cta ? `<span class="alert-cta">${a.cta} →</span>` : ''}
            </div>
          </div>
        `).join('')}
      </section>

      <div class="section-label">
        <span class="ttl">Hızlı</span>
      </div>
      <div class="quick-actions">
        <a href="#/villa" class="qa primary">${icon('home')} Bayram Villa</a>
        <a href="#/villa" class="qa">Olive Suite</a>
        <a href="#/tax" class="qa">${icon('tax')} Vergi panosu</a>
        <a href="#/bot" class="qa">${icon('bot')} Bot ayarları</a>
      </div>
    </main>
  `;
}

// === SCREEN: BOOKINGS ===
function renderBookings(el) {
  const platforms = ['Tümü', 'Booking', 'Airbnb', 'Direct'];
  const counts = { 'Tümü': BOOKINGS.length, 'Booking': 3, 'Airbnb': 2, 'Direct': 2 };
  const dates = [
    { d: 22, w: 'Sal', active: true },
    { d: 23, w: 'Çar', has: true },
    { d: 24, w: 'Per', has: true },
    { d: 25, w: 'Cum', has: true },
    { d: 26, w: 'Cts' },
    { d: 27, w: 'Paz' },
    { d: 28, w: 'Pzt', has: true },
    { d: 29, w: 'Sal', has: true },
    { d: 30, w: 'Çar', has: true },
    { d: 1, w: 'Per' },
    { d: 2, w: 'Cum', has: true },
  ];

  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: 'Rezervasyon', bell: true })}
    <main class="screen">
      <div class="tab-bar">
        ${platforms.map((p, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-tab="${p}">${p}<span class="cnt">${counts[p]}</span></button>`).join('')}
      </div>

      <div class="sync-row">
        <span class="sync-dot"></span>
        <span>Son senkron · 34 sn önce · 4 platform</span>
      </div>

      <div class="date-strip">
        ${dates.map(d => `
          <div class="date-chip ${d.active ? 'active' : ''} ${d.has ? 'has' : ''}">
            <div class="d">${d.d}</div>
            <div class="w">${d.w}</div>
          </div>
        `).join('')}
      </div>

      <div class="conflict-banner" id="conflictBanner">
        <div class="ico">${icon('alert')}</div>
        <div class="txt">
          <div class="ttl">${CONFLICT.title}</div>
          <div class="sub">${CONFLICT.villa} · ${CONFLICT.dates}</div>
        </div>
        <button class="btn" onclick="openConflict()">Çöz →</button>
      </div>

      <div class="bk-list">
        ${BOOKINGS.map(b => `
          <div class="bk-card ${b.status === 'conflict' ? 'conflict' : ''}">
            <div>
              <div class="bk-head">
                <span class="flag">${b.flag}</span>
                <span class="name">${b.guest}</span>
                <span class="plat ${b.platform.toLowerCase()}">${b.platform}</span>
              </div>
              <div class="bk-body">
                <div class="dt">${b.dates}</div>
                <div class="villa">${b.villa}</div>
              </div>
            </div>
            <div class="bk-total">${b.total}<span class="nights">${b.nights} gece</span></div>
          </div>
        `).join('')}
      </div>
    </main>
  `;

  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
  }));

  $$('.date-chip').forEach(c => c.addEventListener('click', () => {
    $$('.date-chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
  }));
}

window.openConflict = () => {
  sheet({
    title: CONFLICT.title,
    sub: `${CONFLICT.villa} · ${CONFLICT.dates}. Üç seçenek var — her biri farklı maliyette.`,
    body: `
      <div class="opt-list">
        ${CONFLICT.options.map(o => `
          <div class="opt ${o.preferred ? 'preferred' : ''}" onclick="resolveConflict()">
            <div class="opt-lbl">${o.label}</div>
            <div class="opt-sub">${o.sub}</div>
          </div>
        `).join('')}
      </div>
    `
  });
};

window.resolveConflict = () => {
  $$('.sheet-backdrop, .sheet').forEach(e => e.remove());
  $('#conflictBanner')?.remove();
  toast('Çözüldü · Bayram Villa\'ya taşındı');
};

// === SCREEN: PRICING ===
function renderPricing(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: 'Haftalık fiyat', bell: true })}
    <main class="screen">
      <section class="pricing-head">
        <h2>Her Pazar,<br>dört <em>hafta</em> öneri.</h2>
        <p>Bayram Villa · doluluk + rakipler + etkinlikler</p>
      </section>

      <div class="week-list">
        ${PRICING_WEEKS.map((w, i) => `
          <div class="week-card ${w.applied ? 'applied' : ''}" data-week="${w.id}">
            <div class="week-head">
              <div>
                <div class="lbl">${w.label}</div>
                <div class="dates">${w.dates}</div>
              </div>
              <span class="price-delta ${w.delta > 0 ? 'up' : 'down'}">${w.delta > 0 ? '+' : ''}${w.delta}%</span>
            </div>

            <div class="occ-bar">
              <div class="fill ${w.occupancy < 50 ? 'low' : w.occupancy < 70 ? 'mid' : 'high'}" style="width:${w.occupancy}%"></div>
            </div>
            <div class="occ-lbl">Doluluk · %${w.occupancy}</div>

            <div class="price-row">
              <div class="price-now">€${w.current}</div>
              <div class="price-arr ${w.delta > 0 ? '' : 'down'}">${icon(w.delta > 0 ? 'arrow-up' : 'arrow-down')}</div>
              <div class="price-new">€${w.suggested}</div>
            </div>

            <div class="reason-line">${w.reason}</div>

            <div class="week-actions">
              <button class="btn secondary" onclick="openReason('${w.id}')">Neden?</button>
              <button class="btn primary" onclick="applyPrice(this, '${w.id}')">Uygula →</button>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
  `;
}

window.applyPrice = (btn, wid) => {
  const card = btn.closest('.week-card');
  card.classList.add('applied');
  card.querySelector('.week-actions').innerHTML = `
    <span class="applied-badge">${icon('check')}Uygulandı · 7 platform</span>
  `;
  toast('Fiyat güncellendi · 7 platformda canlı');
};

window.openReason = (wid) => {
  const w = PRICING_WEEKS.find(x => x.id === wid);
  const max = Math.max(...w.competitors, w.suggested);
  const bars = [...w.competitors, w.suggested].map((v, i) => {
    const h = (v / max) * 100;
    const cls = i === w.competitors.length ? 'sug' : '';
    return `<div class="bar ${cls}" style="height:${h}%"><span>€${v}</span></div>`;
  }).join('');
  sheet({
    title: `${w.label} · €${w.suggested}`,
    sub: w.reason,
    body: `
      <div class="competitors">
        <div class="lbl">Yakın villalar + senin öneri (sağda)</div>
        <div class="bars">${bars}</div>
      </div>
      <button class="btn primary full" onclick="$$('.sheet-backdrop, .sheet').forEach(e=>e.remove())">Anladım</button>
    `
  });
};
window.$$ = $$;

// === SCREEN: TAX ===
function renderTax(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: 'Vergi eşiği', bell: true })}
    <main class="screen">
      <section class="pricing-head">
        <h2><em>Üç</em> eşik,<br>bir panoda.</h2>
        <p>Her hafta bir özet · aşmadan önce haber</p>
      </section>

      <div class="tax-list">
        ${TAX_THRESHOLDS.map(t => {
          const kind = t.percent > 85 ? 'danger' : t.percent > 70 ? 'warn' : '';
          return `
            <div class="tax-card">
              <div class="tax-info">
                <div class="lbl">${t.sub}</div>
                <div class="name">${t.label}</div>
                <div class="sub">${t.current.toLocaleString('tr-TR')} ${t.unit} / ${t.limit.toLocaleString('tr-TR')} ${t.unit}</div>
                <div class="weeks">${t.weeksLeft > 4 ? '~' : ''}${t.weeksLeft} hafta · ${t.trend}</div>
              </div>
              ${bigGauge(t.percent, 100, 8, kind)}
              <div class="tax-note">${t.note}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="tax-send">
        <button class="btn coral full" onclick="sendAcc()">${icon('check')} Muhasebeciye gönder</button>
      </div>
    </main>
  `;
}

window.sendAcc = () => {
  toast(`Gönderildi · ${USER.accountantEmail}`);
};

// === SCREEN: BOT ===
function renderBot(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: 'Misafir bot', bell: true })}
    <main class="screen">
      <section class="bot-head">
        <h2>Misafirin sorusunu<br><em>saniyede</em> yanıtla.</h2>
        <p>3 dilli · TR / EN / RU · senin bilgi tabanınla</p>
      </section>

      <div class="bot-toggle">
        <div class="avatar">${icon('bot')}</div>
        <div>
          <div class="name">Kaş Bot</div>
          <div class="meta">Bugün 14 yanıt · 2 eskale</div>
        </div>
        <div class="switch on" onclick="this.classList.toggle('on')"></div>
      </div>

      <div class="conv-tabs">
        ${BOT_CONVOS.map((c, i) => `
          <button class="conv-tab ${i === 0 ? 'active' : ''}" data-c="${c.id}">
            <span class="flag">${c.flag}</span>${c.guest} · ${c.villa.split(' ')[0]}
          </button>
        `).join('')}
      </div>

      <div class="conv" id="conv">
        ${renderConv(BOT_CONVOS[0])}
      </div>
    </main>
  `;

  $$('.conv-tab').forEach(t => t.addEventListener('click', () => {
    $$('.conv-tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const c = BOT_CONVOS.find(c => c.id === t.dataset.c);
    $('#conv').innerHTML = renderConv(c);
  }));
}

function renderConv(c) {
  return c.turns.map((t, i) => `
    <div class="msg ${t.from}" style="animation-delay:${i * 0.12}s">${t.text}</div>
  `).join('') + `<div class="conv-status ${c.status === 'escalated' ? 'escalated' : ''}">${c.status === 'handled' ? '✓ bot yanıtladı · ses yok' : '⚠ resepsiyona iletildi · Murat\'a push'}</div>`;
}

// === SCREEN: REVIEWS ===
function renderReviews(el) {
  const chips = ['Hepsi', '★1–2', 'Booking', 'Google', 'TripAdvisor', 'Airbnb'];
  const low = REVIEWS.find(r => r.flag === 'new');

  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: 'Yorumlar', bell: true })}
    <main class="screen">
      <div class="chip-row">
        ${chips.map((c, i) => `<button class="chip ${i === 0 ? 'active' : ''}">${c}</button>`).join('')}
      </div>

      ${low ? `
        <div class="new-review-banner">
          <div class="stars">1★</div>
          <div class="txt">
            <div class="ttl">Yeni düşük yorum · ${low.when}</div>
            <div class="sub">${low.guest} · ${low.platform} · ${low.villa}</div>
          </div>
        </div>
      ` : ''}

      <div class="rev-list">
        ${REVIEWS.map(r => `
          <div class="rev-card ${r.stars <= 2 ? 'low' : ''}">
            <div class="rev-head">
              <span class="rev-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
              <span class="rev-plat">${r.platform}</span>
              <span class="rev-when">${r.when}</span>
            </div>
            <div class="rev-guest">${r.guest}</div>
            <div class="rev-villa">${r.villa}</div>
            <div class="rev-text">"${r.text}"</div>
            <div class="rev-draft">
              <div class="lbl">${icon('sparkle')} AI Taslak · Murat'ın tonunda</div>
              <div class="txt">${r.draft}</div>
            </div>
            <div class="rev-actions">
              <button class="btn secondary">Düzenle</button>
              <button class="btn primary" onclick="approveReply(this)">Onayla →</button>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
  `;

  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
  }));
}

window.approveReply = (btn) => {
  const card = btn.closest('.rev-card');
  card.querySelector('.rev-actions').innerHTML = `<span class="applied-badge">${icon('check')}Yanıt gönderildi</span>`;
  toast('Yanıt yayında · 30 sn içinde görünür');
};

// === SCREEN: VILLA ===
function renderVilla(el) {
  const v = VILLAS[0];
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: true, title: v.name, bell: true })}
    <main class="screen">
      <div style="height: 260px; background-image: url('${v.image}'); background-size: cover; background-position: center; margin: 0 16px; border-radius: var(--radius); position: relative; overflow: hidden;">
        <div style="position: absolute; bottom: 14px; left: 18px; color: var(--bg); text-shadow: 0 2px 8px oklch(10% 0 0 / 0.6);">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.85;">${v.location}</div>
          <div style="font-family: 'Fraunces', serif; font-size: 28px; font-weight: 500; margin-top: 4px;">${v.name}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border-radius: var(--radius); margin: 16px; overflow: hidden;">
        <div style="background: var(--bg-2); padding: 18px 14px; text-align: center;">
          <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500;">${v.rating}<span style="color: var(--coral); font-size: 16px;"> ★</span></div>
          <div style="font-size: 11px; color: var(--ink-fade); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;">${v.reviews} yorum</div>
        </div>
        <div style="background: var(--bg-2); padding: 18px 14px; text-align: center;">
          <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500;">${v.occupancy}%</div>
          <div style="font-size: 11px; color: var(--ink-fade); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;">Doluluk</div>
        </div>
        <div style="background: var(--bg-2); padding: 18px 14px; text-align: center;">
          <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500;">${v.monthBookings}</div>
          <div style="font-size: 11px; color: var(--ink-fade); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;">Bu ay</div>
        </div>
      </div>

      <div class="section-label"><span class="ttl">Özellikler</span></div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px;">
        ${v.amenities.map(a => `<span style="padding: 6px 12px; background: var(--bg-2); border-radius: 999px; font-size: 12px;">${a}</span>`).join('')}
      </div>

      <div class="section-label"><span class="ttl">Platformlar</span></div>
      <div style="display: flex; gap: 8px; padding: 0 16px;">
        ${v.platforms.map(p => `<span class="plat ${p.toLowerCase()}" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 10px; border-radius: 6px; background: ${p === 'Booking' ? 'oklch(48% 0.18 260)' : p === 'Airbnb' ? 'oklch(62% 0.22 15)' : 'var(--ink)'}; color: var(--bg); text-transform: uppercase; letter-spacing: 0.06em;">${p}</span>`).join('')}
      </div>

      <div class="section-label"><span class="ttl">Yaklaşan misafirler</span></div>
      <div class="bk-list">
        ${BOOKINGS.filter(b => b.villa === v.name).slice(0, 3).map(b => `
          <div class="bk-card">
            <div>
              <div class="bk-head">
                <span class="flag">${b.flag}</span>
                <span class="name">${b.guest}</span>
                <span class="plat ${b.platform.toLowerCase()}">${b.platform}</span>
              </div>
              <div class="bk-body"><div class="dt">${b.dates}</div></div>
            </div>
            <div class="bk-total">${b.total}<span class="nights">${b.nights} gece</span></div>
          </div>
        `).join('')}
      </div>
    </main>
  `;
}

// === SCREEN: MORE ===
function renderMore(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: 'Daha', bell: true })}
    <main class="screen">
      <div class="more-head">
        <div class="avatar-big">${USER.initials}</div>
        <div class="info">
          <div class="name">${USER.name}</div>
          <div class="sub">${USER.location} · ${USER.villas} villa</div>
        </div>
      </div>

      <div class="plan-card">
        <div class="lbl">Aktif paket</div>
        <div class="name">${USER.plan}</div>
        <div class="price">${USER.planPrice}</div>
        <div class="tools">
          <span class="tool">Rezervasyon Kumandanlığı</span>
          <span class="tool">Haftalık Fiyat</span>
          <span class="tool">Vergi Eşiği</span>
          <span class="tool">Misafir Bot</span>
        </div>
      </div>

      <div class="menu-list">
        <a class="menu-row" href="#/villa">
          ${icon('home')}
          <span class="lbl">Villalarım</span>
          <span class="val">${USER.villas}</span>
          <span class="chev">${icon('chevron')}</span>
        </a>
        <a class="menu-row" href="#/reviews">
          ${icon('star')}
          <span class="lbl">Yorumlar</span>
          <span class="val">${REVIEWS.length}</span>
          <span class="chev">${icon('chevron')}</span>
        </a>
        <a class="menu-row" href="#/tax">
          ${icon('tax')}
          <span class="lbl">Vergi panosu</span>
          <span class="val">3 eşik</span>
          <span class="chev">${icon('chevron')}</span>
        </a>
        <div class="menu-row">
          ${icon('bell')}
          <span class="lbl">Bildirimler</span>
          <span class="val">Açık</span>
          <span class="chev">${icon('chevron')}</span>
        </div>
        <div class="menu-row">
          ${icon('settings')}
          <span class="lbl">Dil · Muhasebeci</span>
          <span class="val">TR</span>
          <span class="chev">${icon('chevron')}</span>
        </div>
        <div class="menu-row">
          ${icon('logout')}
          <span class="lbl">Çıkış</span>
          <span class="chev">${icon('chevron')}</span>
        </div>
      </div>

      <div class="foot-note">
        Kaş Hotel Companion · v0.3-preview<br>
        Made in <span class="heart">Kaş</span> · prototip
      </div>
    </main>
  `;
}

// === ONBOARDING (shown once on first entry) ===
function maybeOnboard() {
  if (localStorage.getItem('kh-onboard-done') === '1') return;
  const ob = document.createElement('div');
  ob.className = 'onboard';
  ob.innerHTML = `
    <div class="onboard-slides" id="slides">
      ${ONBOARDING.map((s, i) => `
        <div class="onboard-slide">
          <div class="img" style="background-image:url('${s.image}')"></div>
          <div>
            <div class="idx">0${i + 1} / 03</div>
            <h3><em>${s.title.split('.')[0]}.</em>${s.title.split('.')[1] || ''}</h3>
            <p>${s.body}</p>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="onboard-foot">
      <button class="onboard-skip" id="skip">Atla</button>
      <div class="onboard-dots" id="dots">
        ${ONBOARDING.map((_, i) => `<div class="onboard-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
      </div>
      <button class="onboard-go" id="go">Başla →</button>
    </div>
  `;
  $('.phone').appendChild(ob);

  const slides = $('#slides');
  slides.addEventListener('scroll', () => {
    const idx = Math.round(slides.scrollLeft / slides.clientWidth);
    $$('.onboard-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  });

  const finish = () => {
    localStorage.setItem('kh-onboard-done', '1');
    ob.style.transition = 'opacity .4s';
    ob.style.opacity = '0';
    setTimeout(() => ob.remove(), 400);
  };
  $('#skip').addEventListener('click', finish);
  $('#go').addEventListener('click', finish);
}

// Dev reset: ?reset=1
if (new URLSearchParams(location.search).has('reset')) {
  localStorage.removeItem('kh-onboard-done');
}

// Init
navigate(location.hash || '#/home');
setTimeout(maybeOnboard, 1300);
