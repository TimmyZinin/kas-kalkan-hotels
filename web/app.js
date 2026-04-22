import { t, pick, getLocale, setLocale } from '../shared/i18n.js';
import {
  USER, WIDGETS, ALERTS, VILLAS, BOOKINGS, CONFLICT,
  PRICING_WEEKS, TAX_THRESHOLDS, BOT_CONVOS, REVIEWS, KPIS, NAV_WEB,
  fmtDateRange, fmtDate, fmtTimeAgo, fmtNights
} from '../shared/data.js';
import { renderLangSwitcher, wireLangSwitchers } from '../shared/lang-switcher.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const icon = (id, cls = '') => `<svg class="${cls}"><use href="../app/icons.svg#i-${id}"/></svg>`;

const ROUTES = {
  '/overview': renderOverview,
  '/bookings': renderBookings,
  '/pricing': renderPricing,
  '/tax': renderTax,
  '/bot': renderBot,
  '/reviews': renderReviews,
  '/villas': renderVillas,
  '/settings': renderSettings,
};

function navigate(hash) {
  const route = hash.replace('#', '') || '/overview';
  const fn = ROUTES[route] || renderOverview;
  const doIt = () => {
    $('#main').innerHTML = '';
    fn($('#main'));
    wireLangSwitchers($('#topbar'));
    renderSidebar(route);
    updateCrumb(route);
    $('#main').scrollTo?.(0, 0);
  };
  if (document.startViewTransition) document.startViewTransition(doIt);
  else doIt();
}

window.addEventListener('hashchange', () => navigate(location.hash));
document.addEventListener('locale-changed', () => navigate(location.hash));

// === SIDEBAR ===
function renderSidebar(activeRoute) {
  const sb = $('#sidebar');
  const counts = { '/reviews': REVIEWS.filter(r => r.flag === 'new').length, '/bookings': BOOKINGS.filter(b => b.status === 'conflict').length };
  sb.innerHTML = `
    <div class="brand">
      <div class="logo">KH</div>
      <div>
        <div class="name">${t('app.name')}</div>
        <span class="ver">${t('app.version')}</span>
      </div>
    </div>
    <div class="side-label">Menu</div>
    <nav class="side-nav">
      ${NAV_WEB.map(n => `
        <a href="${n.route}" class="${activeRoute === n.route.slice(1) ? 'active' : ''}">
          ${icon(n.icon)}
          <span>${t(n.labelKey)}</span>
          ${counts[n.route] ? `<span class="badge">${counts[n.route]}</span>` : ''}
        </a>
      `).join('')}
    </nav>
    <div class="side-foot">
      <div class="side-user">
        <div class="avatar">${USER.initials}</div>
        <div class="meta">
          <div class="n">${USER.name}</div>
          <div class="e">${USER.email}</div>
        </div>
      </div>
    </div>
  `;
}

function updateCrumb(route) {
  const nav = NAV_WEB.find(n => n.route.slice(1) === route);
  const el = $('.crumb');
  if (el && nav) el.innerHTML = `<em>${t(nav.labelKey)}</em>`;
}

// === OVERVIEW ===
function renderOverview(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${getGreet()}, <em>${USER.short}</em>.</h1>
          <div class="sub">${fmtDate(new Date().toISOString(), getLocale())} · ${t('home.summary')}</div>
        </div>
      </div>

      <section class="kpi-grid stagger">
        ${KPIS.map((k, i) => `
          <div class="kpi ${i === 0 ? 'accent' : ''}">
            <div class="lbl">${t(k.labelKey)}</div>
            <div class="val">${k.value}</div>
            <span class="delta ${k.delta >= 0 ? 'up' : 'down'}">${k.delta >= 0 ? '↗' : '↘'} ${k.delta >= 0 ? '+' : ''}${k.delta}${typeof k.delta === 'number' && Math.abs(k.delta) >= 1 ? '%' : ''}</span>
            <span class="delta-label">${t('web.trend.vs')}</span>
            ${sparkSVG(k.sparkline, i === 0 ? 'var(--coral)' : 'var(--ink-soft)', 90, 36)}
          </div>
        `).join('')}
      </section>

      <div class="grid-custom">
        <section class="card card-lg">
          <div class="card-head">
            <div>
              <div class="card-title">${t('web.overview.calendar')}</div>
              <div class="card-sub">Bayram Villa · Olive Suite</div>
            </div>
            <div class="btn secondary" onclick="location.hash='#/bookings'">${t('web.bookings.list')} →</div>
          </div>
          ${renderHeatmap()}
        </section>

        <section class="card card-lg">
          <div class="card-head">
            <div class="card-title">${t('web.overview.actions')}</div>
            <span class="card-sub">${ALERTS.filter(a => a.kind !== 'ok').length}</span>
          </div>
          <div class="alert-list">
            ${ALERTS.filter(a => a.kind !== 'ok').map(a => `
              <div class="alert-row ${a.kind}" onclick="${a.route ? `location.hash='${a.route}'` : ''}">
                <div class="ico">${icon(a.icon)}</div>
                <div class="body">
                  <div class="t1"><span>${t(a.titleKey)}</span><span class="t">${fmtTimeAgo(a.time, getLocale())}</span></div>
                  <div class="t2">${t(a.bodyKey)}</div>
                </div>
                ${a.ctaKey ? `<div class="cta">${t(a.ctaKey)}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </section>
      </div>

      <div style="margin-top: 24px;">
        <section class="card card-lg">
          <div class="card-head">
            <div class="card-title">${t('web.overview.agenda')}</div>
            <span class="card-sub">${BOOKINGS.length}</span>
          </div>
          <div class="agenda">
            ${BOOKINGS.slice(0, 5).map(b => `
              <div class="agenda-row">
                <div class="agenda-dot">${b.flag}</div>
                <div class="agenda-body">
                  <div class="agenda-name">${b.guest} <span class="plat ${b.platform.toLowerCase()}" style="font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 2px 6px; border-radius: 4px; background: ${b.platform === 'Booking' ? 'oklch(48% 0.18 260)' : b.platform === 'Airbnb' ? 'oklch(62% 0.22 15)' : 'var(--ink)'}; color: var(--bg); text-transform: uppercase; letter-spacing: 0.06em;">${b.platform}</span></div>
                  <div class="agenda-meta">${fmtDateRange(b.checkIn, b.checkOut, getLocale())} · ${b.villa} · ${fmtNights(b.checkIn, b.checkOut, getLocale())}</div>
                </div>
                <div class="agenda-price">€${b.total.toLocaleString('en-US')}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}

function getGreet() {
  const h = new Date().getHours();
  if (h < 12) return t('home.greet.morning');
  if (h < 18) return t('home.greet.day');
  return t('home.greet.evening');
}

// Sparkline SVG
function sparkSVG(data, color = 'var(--coral)', w = 90, h = 36) {
  const max = Math.max(...data), min = Math.min(...data);
  const r = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / r) * h}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="spark"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

// Calendar heatmap (April 2026)
function renderHeatmap() {
  const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'];
  const daysEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysRU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dowLabels = { tr: days, en: daysEN, ru: daysRU }[getLocale()] || days;

  // April 2026: starts Wed (1 Apr = Wednesday). First Monday offset = 2
  const firstDayOfMonth = 2; // Wednesday in 0-based Mon..Sun (0=Mon)
  const totalDays = 30;
  // Build 6 rows × 7 cols
  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push({ empty: true });
  for (let d = 1; d <= totalDays; d++) {
    // Mock occupancy level by date
    const level = d < 10 ? (d % 3 === 0 ? 2 : 1)
                : d < 22 ? (d % 4 === 0 ? 3 : 2)
                : d < 28 ? 4
                : (d === 28 || d === 29) ? 5 // conflict dates
                : 3;
    const isToday = d === 22;
    const isConflict = d === 28 || d === 29;
    cells.push({ d, level, today: isToday, conflict: isConflict });
  }

  return `
    <div class="cal-heatmap">
      ${dowLabels.map(d => `<div class="dow">${d}</div>`).join('')}
      ${cells.map(c =>
        c.empty
          ? `<div class="cal-cell empty"></div>`
          : `<div class="cal-cell l-${c.level} ${c.today ? 'today' : ''} ${c.conflict ? 'conflict' : ''}">${c.d}</div>`
      ).join('')}
    </div>
    <div class="cal-legend">
      <span>${getLocale() === 'ru' ? 'Меньше' : getLocale() === 'en' ? 'Less' : 'Az'}</span>
      <div class="scale">
        <span style="background: var(--bg-2);"></span>
        <span style="background: oklch(94% 0.04 30);"></span>
        <span style="background: oklch(87% 0.08 30);"></span>
        <span style="background: var(--coral-soft);"></span>
        <span style="background: var(--coral);"></span>
        <span style="background: oklch(56% 0.18 30);"></span>
      </div>
      <span>${getLocale() === 'ru' ? 'Больше' : getLocale() === 'en' ? 'More' : 'Çok'}</span>
      <span style="margin-left: auto; color: var(--danger);">● ${getLocale() === 'ru' ? 'Конфликт' : getLocale() === 'en' ? 'Conflict' : 'Çakışma'}</span>
    </div>
  `;
}

// === BOOKINGS ===
function renderBookings(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('bookings.title')} <em>·</em> ${BOOKINGS.length}</h1>
          <div class="sub">${t('bookings.sync.line', { time: t('misc.lastSync') })}</div>
        </div>
        <div class="right">
          <button class="btn secondary">${t('web.bookings.calendar')}</button>
          <button class="btn primary active">${t('web.bookings.list')}</button>
        </div>
      </div>

      <section class="card card-lg">
        <table class="bk-table">
          <thead>
            <tr>
              <th></th>
              <th>${getLocale() === 'ru' ? 'Гость' : getLocale() === 'en' ? 'Guest' : 'Misafir'}</th>
              <th>${getLocale() === 'ru' ? 'Вилла' : getLocale() === 'en' ? 'Villa' : 'Villa'}</th>
              <th>${getLocale() === 'ru' ? 'Платформа' : getLocale() === 'en' ? 'Platform' : 'Platform'}</th>
              <th>${getLocale() === 'ru' ? 'Даты' : getLocale() === 'en' ? 'Dates' : 'Tarih'}</th>
              <th>${getLocale() === 'ru' ? 'Ночей' : getLocale() === 'en' ? 'Nights' : 'Gece'}</th>
              <th style="text-align: right;">${getLocale() === 'ru' ? 'Сумма' : getLocale() === 'en' ? 'Total' : 'Toplam'}</th>
            </tr>
          </thead>
          <tbody>
            ${BOOKINGS.map(b => `
              <tr class="${b.status === 'conflict' ? 'conflict' : ''}">
                <td><span class="flag">${b.flag}</span></td>
                <td><b>${b.guest}</b></td>
                <td>${b.villa}</td>
                <td><span class="plat ${b.platform.toLowerCase()}">${b.platform}</span></td>
                <td>${fmtDateRange(b.checkIn, b.checkOut, getLocale())}</td>
                <td>${fmtNights(b.checkIn, b.checkOut, getLocale())}</td>
                <td class="total" style="text-align: right;">€${b.total.toLocaleString('en-US')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    </div>
  `;
}

// === PRICING ===
function renderPricing(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('pricing.title')}</h1>
          <div class="sub">${t('pricing.sub')}</div>
        </div>
      </div>

      <section class="card card-lg">
        <table class="price-table">
          <thead>
            <tr>
              <th>${t('web.pricing.table.week')}</th>
              <th>${t('web.pricing.table.occ')}</th>
              <th>${t('web.pricing.table.current')}</th>
              <th>${t('web.pricing.table.suggested')}</th>
              <th>${t('web.pricing.table.delta')}</th>
              <th>${t('web.pricing.table.reason')}</th>
              <th style="text-align: right;">${t('web.pricing.table.action')}</th>
            </tr>
          </thead>
          <tbody>
            ${PRICING_WEEKS.map(w => `
              <tr data-week="${w.id}">
                <td>
                  <div class="wk-lbl">${t(w.labelKey)}</div>
                  <div class="wk-dt">${fmtDateRange(w.start, w.end, getLocale())}</div>
                </td>
                <td>
                  <div class="occ-bar"><div class="fill ${w.occupancy < 50 ? '' : w.occupancy < 70 ? 'mid' : 'high'}" style="width:${w.occupancy}%"></div></div>
                  <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink-fade); margin-top: 4px;">${w.occupancy}%</div>
                </td>
                <td><span class="price">€${w.current}</span></td>
                <td><span class="price sug">€${w.suggested}</span></td>
                <td><span class="delta-pill ${w.delta > 0 ? 'up' : 'down'}">${w.delta > 0 ? '+' : ''}${w.delta}%</span></td>
                <td><div class="reason">${t(w.reasonKey)}</div></td>
                <td style="text-align: right;"><button class="btn-apply" onclick="applyWeb(this, '${w.id}')">${t('common.apply')}</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    </div>
  `;
}

window.applyWeb = (btn, wid) => {
  btn.classList.add('applied');
  btn.textContent = '✓ ' + t('common.apply');
  toast(t('pricing.toast.applied'));
};

// === TAX ===
function renderTax(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('tax.title')}</h1>
          <div class="sub">${t('tax.sub')}</div>
        </div>
        <div class="right">
          <button class="btn coral" onclick="toast(t_send())">${icon('check')} ${t('tax.send')}</button>
        </div>
      </div>

      <div class="gauge-row">
        ${TAX_THRESHOLDS.map(x => {
          const kind = x.percent > 85 ? 'danger' : x.percent > 70 ? 'warn' : '';
          return `
            <div class="gauge-card">
              <div>
                <div class="g-lbl">${t(x.subKey)}</div>
                <div class="g-name">${t(x.labelKey)}</div>
                <div class="g-val">${x.current.toLocaleString('tr-TR')} ${x.unit} / ${x.limit.toLocaleString('tr-TR')} ${x.unit}</div>
              </div>
              ${bigGauge(x.percent, 180, 12, kind)}
              <div class="g-weeks">${t('tax.weeksLeft', { n: x.weeksLeft, trend: t(x.trendKey) })}</div>
              <div class="g-note">${t(x.noteKey)}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
window.t_send = () => t('tax.toast.sent', { email: USER.accountantEmail });

function bigGauge(percent, size, stroke, kind) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return `
    <div class="gauge-big ${kind}">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/>
        <circle class="fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
      </svg>
      <div class="pct">${percent}%</div>
    </div>
  `;
}

// === BOT ===
function renderBot(el, activeId = 'c1') {
  const active = BOT_CONVOS.find(c => c.id === activeId) || BOT_CONVOS[0];
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('bot.title')}</h1>
          <div class="sub">${t('bot.meta')}</div>
        </div>
      </div>

      <div class="bot-split">
        <aside class="bot-list">
          ${BOT_CONVOS.map(c => `
            <div class="bot-list-item ${c.id === active.id ? 'active' : ''}" data-c="${c.id}">
              <div class="av">${c.flag}</div>
              <div>
                <div class="b1">${c.guest}</div>
                <div class="b2">${c.villa}</div>
              </div>
              <span class="badge-status ${c.status === 'escalated' ? 'esc' : ''}">${c.status === 'handled' ? (getLocale() === 'ru' ? 'OK' : getLocale() === 'en' ? 'OK' : 'OK') : '!'}</span>
            </div>
          `).join('')}
        </aside>

        <section class="bot-conv">
          <div class="bot-conv-head">
            <div class="av">${active.flag}</div>
            <div>
              <div class="n">${active.guest}</div>
              <div class="m">${active.villa}</div>
            </div>
            <div style="margin-left: auto;" class="badge-status ${active.status === 'escalated' ? 'esc' : ''}">${active.status === 'handled' ? t('bot.status.handled') : t('bot.status.escalated')}</div>
          </div>
          <div class="bot-conv-turns">
            ${active.turns.map((tr, i) => `
              <div class="msg-row ${tr.from}" style="animation: fadeIn .4s both; animation-delay: ${i * 80}ms">
                <div class="msg-bub">${pick(tr.text)}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;

  $$('.bot-list-item').forEach(it => {
    it.addEventListener('click', () => renderBot(el, it.dataset.c));
  });
}

// === REVIEWS ===
function renderReviews(el, activeId = null) {
  const active = activeId ? REVIEWS.find(r => r.id === activeId) : REVIEWS.find(r => r.flag === 'new') || REVIEWS[0];
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('reviews.title')}</h1>
          <div class="sub">${REVIEWS.length} · ${REVIEWS.filter(r => r.stars >= 4).length} ★ 4+</div>
        </div>
      </div>

      <div class="rev-layout">
        <div class="rev-feed stagger">
          ${REVIEWS.map(r => `
            <div class="rev-block ${r.stars <= 2 ? 'low' : ''} ${r.id === active.id ? 'active' : ''}" data-r="${r.id}">
              <div class="rev-block-head">
                <span class="rev-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
                <span class="rev-plat">${r.platform}</span>
                <span class="rev-when">${fmtTimeAgo(r.when, getLocale())}</span>
              </div>
              <div class="rev-guest">${r.guest} <span style="color: var(--ink-fade); font-weight: 400;">· ${r.villa}</span></div>
              <div class="rev-text">"${pick(r.text)}"</div>
            </div>
          `).join('')}
        </div>

        <aside class="rev-composer">
          <div class="lbl">${icon('sparkle')} ${t('reviews.draftLabel')}</div>
          <textarea id="replyBox">${pick(active.draft)}</textarea>
          <div class="actions">
            <button class="btn secondary">${t('common.edit')}</button>
            <button class="btn primary" onclick="toast(t_sendReply())">${t('common.approve')} →</button>
          </div>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--line-soft); font-size: 12px; color: var(--ink-fade); line-height: 1.5;">
            ${active.stars <= 2
              ? `⚠ ${getLocale() === 'ru' ? 'Низкий рейтинг — AI предлагает личное сообщение до публичного ответа' : getLocale() === 'en' ? 'Low rating — AI suggests a private message before public reply' : 'Düşük yıldız — AI önce özel mesaj öneriyor'}`
              : `✓ ${getLocale() === 'ru' ? 'Позитивный отзыв — можно ответить публично' : getLocale() === 'en' ? 'Positive review — safe to reply publicly' : 'Olumlu yorum — herkese açık yanıt verilebilir'}`}
          </div>
        </aside>
      </div>
    </div>
  `;

  $$('.rev-block').forEach(b => {
    b.addEventListener('click', () => renderReviews(el, b.dataset.r));
  });
}
window.t_sendReply = () => t('reviews.toast.replied');

// === VILLAS ===
function renderVillas(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('web.nav.villas')}</h1>
          <div class="sub">${VILLAS.length} · ${BOOKINGS.length} ${getLocale() === 'ru' ? 'активных' : getLocale() === 'en' ? 'active bookings' : 'aktif rezervasyon'}</div>
        </div>
        <div class="right">
          <button class="btn primary">+ ${t('web.header.new')}</button>
        </div>
      </div>

      <div class="villa-grid stagger">
        ${VILLAS.map(v => `
          <div class="villa-card">
            <div class="img" style="background-image: url('${v.image}')">
              <div class="rate-chip"><span class="star">★</span> ${v.rating}</div>
            </div>
            <div class="body">
              <div class="name">${v.name}</div>
              <div class="loc">${pick(v.location)}</div>
              <div class="stats">
                <div class="stat">
                  <div class="v">${v.reviews}</div>
                  <div class="l">${t('villa.reviewsCount', { n: '' }).trim()}</div>
                </div>
                <div class="stat">
                  <div class="v">${v.occupancy}%</div>
                  <div class="l">${t('villa.occupancy')}</div>
                </div>
                <div class="stat">
                  <div class="v">${v.monthBookings}</div>
                  <div class="l">${t('villa.monthBookings')}</div>
                </div>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 16px;">
                ${v.amenities.slice(0, 5).map(a => `<span style="padding: 4px 10px; background: var(--bg-2); border-radius: 999px; font-size: 11px; color: var(--ink-soft);">${t('amenity.' + a)}</span>`).join('')}
                ${v.amenities.length > 5 ? `<span style="padding: 4px 10px; font-size: 11px; color: var(--ink-fade);">+${v.amenities.length - 5}</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// === SETTINGS ===
function renderSettings(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="page-head">
        <div>
          <h1>${t('nav.settings')}</h1>
          <div class="sub">${USER.name} · ${USER.email}</div>
        </div>
      </div>

      <div class="plan-hero">
        <div class="lbl">${t('settings.plan.active')}</div>
        <div class="nm">${t('settings.plan.name')}</div>
        <div class="pr">${USER.planPrice} / ${t('common.month')}</div>
        <div class="tools">
          <span class="tool">${t('widget.bookings.label')}</span>
          <span class="tool">${t('widget.pricing.label')}</span>
          <span class="tool">${t('widget.tax.label')}</span>
          <span class="tool">${t('widget.bot.label')}</span>
          <span class="tool">${t('reviews.title')}</span>
        </div>
      </div>

      <div class="set-sec">
        <h3>${t('settings.connected')}</h3>
        ${['Booking.com', 'Airbnb', 'VRBO', 'Direct website'].map((p, i) => `
          <div class="set-row">
            <div class="label">
              <div class="n">${p}</div>
              <div class="s">${['12 rooms · sync every 60s', '2 villas · sync 5 min', 'Not connected', '1 site · sync 5 min'][i]}</div>
            </div>
            <span class="set-pill">${icon('check')}<span>${t('misc.connected')}</span></span>
          </div>
        `).join('')}
      </div>

      <div class="set-sec">
        <h3>${t('common.save')}</h3>
        <div class="set-row">
          <div class="label">
            <div class="n">${t('settings.language')}</div>
            <div class="s">${getLocale().toUpperCase()}</div>
          </div>
          <div class="value">${renderLangSwitcher('web')}</div>
        </div>
        <div class="set-row">
          <div class="label">
            <div class="n">${t('settings.notifications')}</div>
            <div class="s">Email · Telegram · Push</div>
          </div>
          <span class="set-pill">${t('settings.notifications.on')}</span>
        </div>
        <div class="set-row">
          <div class="label">
            <div class="n">${t('settings.accountant')}</div>
            <div class="s">${USER.accountantEmail}</div>
          </div>
          <span class="value">${USER.accountantEmail}</span>
        </div>
      </div>
    </div>
  `;
  wireLangSwitchers(el);
}

// === TOAST ===
export function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${icon('check')}${msg}`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 2400);
}
window.toast = toast;

// === TOP BAR ===
function renderTopBar() {
  $('#topbar').innerHTML = `
    <div class="crumb"><em>${t('web.nav.overview')}</em></div>
    <div class="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input placeholder="${t('web.header.search')}" />
    </div>
    <button class="btn-new">${icon('sparkle')} ${t('web.header.new')}</button>
    ${renderLangSwitcher('web')}
    <button class="ico-btn" aria-label="alerts">${icon('bell')}<span class="dot"></span></button>
  `;
  wireLangSwitchers($('#topbar'));
}

// === INIT ===
renderTopBar();
navigate(location.hash || '#/overview');

// Re-render top bar on language change
document.addEventListener('locale-changed', renderTopBar);
