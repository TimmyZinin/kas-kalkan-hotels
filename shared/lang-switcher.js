// Tiny language switcher — renders a button that opens a dropdown.
import { LANGS, LANG_LABELS, getLocale, setLocale } from './i18n.js';

export function renderLangSwitcher(variant = 'mobile') {
  const cur = getLocale();
  const isMobile = variant === 'mobile';
  return `
    <div class="lang-switch ${isMobile ? 'lang-mobile' : 'lang-web'}" data-ls>
      <button class="lang-btn" data-ls-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="lang-globe" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
          </svg>
        </span>
        <span class="lang-code">${LANG_LABELS[cur].short}</span>
      </button>
      <div class="lang-menu" role="listbox" data-ls-menu hidden>
        ${LANGS.map(code => `
          <button role="option" class="lang-opt ${code === cur ? 'active' : ''}" data-ls-opt="${code}">
            <span class="code">${LANG_LABELS[code].short}</span>
            <span class="full">${LANG_LABELS[code].full}</span>
            ${code === cur ? '<span class="tick">✓</span>' : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

export function wireLangSwitchers(root = document) {
  root.querySelectorAll('[data-ls]').forEach(sw => {
    const trigger = sw.querySelector('[data-ls-trigger]');
    const menu = sw.querySelector('[data-ls-menu]');
    if (!trigger || !menu) return;
    const close = () => { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
    const open = () => { menu.hidden = false; trigger.setAttribute('aria-expanded', 'true'); };
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.hidden ? open() : close();
    });
    sw.querySelectorAll('[data-ls-opt]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setLocale(btn.dataset.lsOpt);
        close();
      });
    });
    document.addEventListener('click', (e) => {
      if (!sw.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  });
}
