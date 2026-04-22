import { t, pick, getLocale, setLocale, LANG_LABELS, LANGS } from '../shared/i18n.js';
import {
  USER, WIDGETS, ALERTS, VILLAS, BOOKINGS, CONFLICT,
  PRICING_WEEKS, TAX_THRESHOLDS, BOT_CONVOS, REVIEWS, ONBOARDING, NAV_MOBILE,
  INTEG_STATS, INTEG_LOG,
  fmtDateRange, fmtTimeAgo, fmtNights
} from '../shared/data.js';
import { renderLangSwitcher, wireLangSwitchers } from '../shared/lang-switcher.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const app = $('#app');
const icon = (id, cls = '') => `<svg class="${cls}"><use href="icons.svg#i-${id}"/></svg>`;

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
    wireLangSwitchers(app);
    app.querySelector('.screen')?.scrollTo(0, 0);
  };
  if (document.startViewTransition) document.startViewTransition(doIt);
  else doIt();
}

window.addEventListener('hashchange', () => navigate(location.hash));
document.addEventListener('locale-changed', () => navigate(location.hash));

// === TOP BAR ===
function topBar({ back, title, lang = true, bell = true }) {
  return `
    <div class="top-bar">
      ${back ? `<button class="back" onclick="history.back()">${icon('chevron')}</button>` : '<div style="width:40px"></div>'}
      <div class="title">${title || ''}</div>
      <div style="display: flex; align-items: center; gap: 4px;">
        ${lang ? renderLangSwitcher('mobile') : ''}
        ${bell ? `<button class="bell" onclick="location.hash='#/reviews'">${icon('bell')}<span class="dot"></span></button>` : ''}
      </div>
    </div>
  `;
}

function statusBar() {
  return `
    <div class="status-bar">
      <span>08:14</span>
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
  nav.innerHTML = NAV_MOBILE.map(n => `
    <a href="${n.route}" class="${activeRoute === n.route.slice(1) ? 'active' : ''}">
      ${icon(n.icon)}
      <span class="lbl">${t(n.labelKey)}</span>
    </a>
  `).join('');
}

function sparkline(data, color = 'var(--coral)', w = 90, h = 40) {
  const max = Math.max(...data), min = Math.min(...data);
  const r = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / r) * h}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="widget-spark"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function gaugeRing(percent, size = 44, stroke = 4, fillColor = 'var(--amber)') {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return `
    <svg class="gauge-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="gauge-track" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}"/>
      <circle class="gauge-fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}" stroke="${fillColor}" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
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
        <circle class="fill" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
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
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 2400);
}

function sheet({ title, sub, body }) {
  const back = document.createElement('div'); back.className = 'sheet-backdrop';
  const sh = document.createElement('div'); sh.className = 'sheet';
  sh.innerHTML = `<div class="sheet-handle"></div><h3>${title}</h3>${sub ? `<p class="sub">${sub}</p>` : ''}${body}`;
  $('.phone').appendChild(back);
  $('.phone').appendChild(sh);
  requestAnimationFrame(() => { back.classList.add('open'); sh.classList.add('open'); });
  const close = () => {
    back.classList.remove('open');
    sh.classList.remove('open');
    setTimeout(() => { back.remove(); sh.remove(); }, 400);
  };
  back.addEventListener('click', close);
  return { close };
}

function getGreet() {
  const h = new Date().getHours();
  if (h < 12) return t('home.greet.morning');
  if (h < 18) return t('home.greet.day');
  return t('home.greet.evening');
}

// === SCREEN: HOME ===
function renderHome(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: false, title: '', lang: true, bell: true })}
    <main class="screen">
      <section class="home-hero">
        <div class="greet-label">${t('home.date')}</div>
        <h1 class="greet-line">${getGreet()}, <em>${USER.short}</em>.</h1>
        <p class="greet-sub">${t('home.summary')}</p>
      </section>

      <section class="widget-grid">
        ${WIDGETS.map((w, i) => `
          <a href="${w.route}" class="widget ${w.accent ? 'coral' : ''}">
            <div class="widget-head">
              ${icon(w.icon)}
              <span class="lbl">${t(w.labelKey)}</span>
            </div>
            <div>
              <div class="widget-val">${t(w.valueKey)}</div>
              <span class="widget-meta ${w.metaStyle}">${t(w.metaKey)}</span>
            </div>
            ${w.sparkline ? sparkline(w.sparkline, w.accent ? 'var(--bg)' : 'var(--coral)') : ''}
            ${w.gauge ? `<div class="widget-gauge">${gaugeRing(w.gauge)}</div>` : ''}
          </a>
        `).join('')}
      </section>

      <div class="section-label">
        <span class="ttl">${t('home.alerts')}</span>
        <a href="#/reviews">${t('common.seeAll')} →</a>
      </div>

      <section class="alert-feed">
        ${ALERTS.map(a => `
          <div class="alert-item ${a.kind}" onclick="${a.route ? `location.hash='${a.route}'` : ''}">
            <div class="alert-icon">${icon(a.icon)}</div>
            <div class="alert-body">
              <div class="alert-ttl"><span>${t(a.titleKey)}</span><span class="time">${fmtTimeAgo(a.time, getLocale())}</span></div>
              <div class="alert-txt">${t(a.bodyKey)}</div>
              ${a.ctaKey ? `<span class="alert-cta">${t(a.ctaKey)} →</span>` : ''}
            </div>
          </div>
        `).join('')}
      </section>

      <div class="section-label"><span class="ttl">${t('home.quick')}</span></div>
      <div class="quick-actions">
        <a href="#/villa" class="qa primary">${icon('home')} Bayram Villa</a>
        <a href="#/villa" class="qa">Olive Suite</a>
        <a href="#/tax" class="qa">${icon('tax')} ${t('nav.tax')}</a>
        <a href="#/bot" class="qa">${icon('bot')} ${t('bot.name')}</a>
      </div>
    </main>
  `;
}

// === BOOKINGS ===
function renderBookings(el) {
  const platforms = [
    { id: 'all', label: t('bookings.tabs.all'), n: BOOKINGS.length },
    { id: 'booking', label: 'Booking', n: BOOKINGS.filter(b => b.platform === 'Booking').length },
    { id: 'airbnb', label: 'Airbnb', n: BOOKINGS.filter(b => b.platform === 'Airbnb').length },
    { id: 'direct', label: 'Direct', n: BOOKINGS.filter(b => b.platform === 'Direct').length },
  ];
  const dates = [
    { d: 22, w: 'Sal', active: true }, { d: 23, w: 'Çar', has: true },
    { d: 24, w: 'Per', has: true }, { d: 25, w: 'Cum', has: true },
    { d: 26, w: 'Cts' }, { d: 27, w: 'Paz' }, { d: 28, w: 'Pzt', has: true },
    { d: 29, w: 'Sal', has: true }, { d: 30, w: 'Çar', has: true },
    { d: 1, w: 'Per' }, { d: 2, w: 'Cum', has: true },
  ];

  el.innerHTML = `
    ${statusBar()}
    ${topBar({ title: t('bookings.title') })}
    <main class="screen">
      <div class="tab-bar">
        ${platforms.map((p, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-tab="${p.id}">${p.label}<span class="cnt">${p.n}</span></button>`).join('')}
      </div>
      <div class="sync-row">
        <span class="sync-dot"></span>
        <span>${t('bookings.sync.line', { time: t('misc.lastSync') })}</span>
      </div>
      <div class="date-strip">
        ${dates.map(d => `<div class="date-chip ${d.active ? 'active' : ''} ${d.has ? 'has' : ''}"><div class="d">${d.d}</div><div class="w">${d.w}</div></div>`).join('')}
      </div>

      <div class="conflict-banner" id="conflictBanner">
        <div class="ico">${icon('alert')}</div>
        <div class="txt">
          <div class="ttl">${t('bookings.conflict.title')}</div>
          <div class="sub">${CONFLICT.villa} · ${pick(CONFLICT.dateRange)}</div>
        </div>
        <button class="btn" onclick="openConflict()">${t('common.resolve')} →</button>
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
                <div class="dt">${fmtDateRange(b.checkIn, b.checkOut, getLocale())}</div>
                <div class="villa">${b.villa}</div>
              </div>
            </div>
            <div class="bk-total">€${b.total}<span class="nights">${fmtNights(b.checkIn, b.checkOut, getLocale())}</span></div>
          </div>
        `).join('')}
      </div>
    </main>
  `;

  $$('.tab').forEach(x => x.addEventListener('click', () => { $$('.tab').forEach(t => t.classList.remove('active')); x.classList.add('active'); }));
  $$('.date-chip').forEach(c => c.addEventListener('click', () => { $$('.date-chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));
}

window.openConflict = () => {
  sheet({
    title: t('bookings.conflict.title'),
    sub: t('bookings.conflict.sub', { villa: CONFLICT.villa, dates: pick(CONFLICT.dateRange) }),
    body: `
      <div class="opt-list">
        ${CONFLICT.options.map(o => `
          <div class="opt ${o.preferred ? 'preferred' : ''}" onclick="resolveConflict()" data-prefer="${o.preferred}">
            <div class="opt-lbl">${t(o.labelKey)}</div>
            <div class="opt-sub">${t(o.subKey)}</div>
          </div>
        `).join('')}
      </div>
    `
  });
};

window.resolveConflict = () => {
  $$('.sheet-backdrop, .sheet').forEach(e => e.remove());
  $('#conflictBanner')?.remove();
  toast(t('bookings.toast.resolved'));
};

// === PRICING ===
function renderPricing(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ title: t('pricing.title') })}
    <main class="screen">
      <section class="pricing-head">
        <h2>${t('pricing.headline')}</h2>
        <p>${t('pricing.sub')}</p>
      </section>

      <div class="week-list">
        ${PRICING_WEEKS.map(w => `
          <div class="week-card" data-week="${w.id}">
            <div class="week-head">
              <div>
                <div class="lbl">${t(w.labelKey)}</div>
                <div class="dates">${fmtDateRange(w.start, w.end, getLocale())}</div>
              </div>
              <span class="price-delta ${w.delta > 0 ? 'up' : 'down'}">${w.delta > 0 ? '+' : ''}${w.delta}%</span>
            </div>
            <div class="occ-bar"><div class="fill ${w.occupancy < 50 ? 'low' : w.occupancy < 70 ? 'mid' : 'high'}" style="width:${w.occupancy}%"></div></div>
            <div class="occ-lbl">${t('pricing.occupancy', { n: w.occupancy })}</div>
            <div class="price-row">
              <div class="price-now">€${w.current}</div>
              <div class="price-arr ${w.delta > 0 ? '' : 'down'}">${icon(w.delta > 0 ? 'arrow-up' : 'arrow-down')}</div>
              <div class="price-new">€${w.suggested}</div>
            </div>
            <div class="reason-line">${t(w.reasonKey)}</div>
            <div class="week-actions">
              <button class="btn secondary" onclick="openReason('${w.id}')">${t('common.details')}</button>
              <button class="btn primary" onclick="applyPrice(this)">${t('common.apply')} →</button>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
  `;
}

window.applyPrice = (btn) => {
  const card = btn.closest('.week-card');
  card.classList.add('applied');
  card.querySelector('.week-actions').innerHTML = `<span class="applied-badge">${icon('check')}${t('pricing.applied')}</span>`;
  toast(t('pricing.toast.applied'));
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
    title: `${t(w.labelKey)} · €${w.suggested}`,
    sub: t(w.reasonKey),
    body: `
      <div class="competitors">
        <div class="lbl">${t('pricing.competitors')}</div>
        <div class="bars">${bars}</div>
      </div>
      <button class="btn primary full" onclick="closeSheet()">${t('common.gotIt')}</button>
    `
  });
};
window.closeSheet = () => $$('.sheet-backdrop, .sheet').forEach(e => e.remove());

// === TAX ===
function renderTax(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ title: t('tax.title') })}
    <main class="screen">
      <section class="pricing-head">
        <h2>${t('tax.headline')}</h2>
        <p>${t('tax.sub')}</p>
      </section>

      <div class="tax-list">
        ${TAX_THRESHOLDS.map(x => {
          const kind = x.percent > 85 ? 'danger' : x.percent > 70 ? 'warn' : '';
          return `
            <div class="tax-card">
              <div class="tax-info">
                <div class="lbl">${t(x.subKey)}</div>
                <div class="name">${t(x.labelKey)}</div>
                <div class="sub">${x.current.toLocaleString('tr-TR')} ${x.unit} / ${x.limit.toLocaleString('tr-TR')} ${x.unit}</div>
                <div class="weeks">${t('tax.weeksLeft', { n: x.weeksLeft, trend: t(x.trendKey) })}</div>
              </div>
              ${bigGauge(x.percent, 100, 8, kind)}
              <div class="tax-note">${t(x.noteKey)}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="tax-send">
        <button class="btn coral full" onclick="sendAcc()">${icon('check')} ${t('tax.send')}</button>
      </div>
    </main>
  `;
}

window.sendAcc = () => toast(t('tax.toast.sent', { email: USER.accountantEmail }));

// === BOT ===
function renderBot(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ title: t('bot.title') })}
    <main class="screen">
      <section class="bot-head">
        <h2>${t('bot.headline')}</h2>
        <p>${t('bot.sub')}</p>
      </section>

      <div class="bot-toggle">
        <div class="avatar">${icon('bot')}</div>
        <div>
          <div class="name">${t('bot.name')}</div>
          <div class="meta">${t('bot.meta')}</div>
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
      <div class="conv" id="conv">${renderConv(BOT_CONVOS[0])}</div>
    </main>
  `;

  $$('.conv-tab').forEach(tb => tb.addEventListener('click', () => {
    $$('.conv-tab').forEach(x => x.classList.remove('active'));
    tb.classList.add('active');
    const c = BOT_CONVOS.find(c => c.id === tb.dataset.c);
    $('#conv').innerHTML = renderConv(c);
  }));
}

function renderConv(c) {
  return c.turns.map((tr, i) => `<div class="msg ${tr.from}" style="animation-delay:${i * 0.12}s">${pick(tr.text)}</div>`).join('')
    + `<div class="conv-status ${c.status === 'escalated' ? 'escalated' : ''}">${c.status === 'handled' ? t('bot.status.handled') : t('bot.status.escalated')}</div>`;
}

// === REVIEWS ===
function renderReviews(el) {
  const chips = [t('common.all'), t('reviews.chips.low'), 'Booking', 'Google', 'TripAdvisor', 'Airbnb'];
  const low = REVIEWS.find(r => r.flag === 'new');
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ title: t('reviews.title') })}
    <main class="screen">
      <div class="chip-row">
        ${chips.map((c, i) => `<button class="chip ${i === 0 ? 'active' : ''}">${c}</button>`).join('')}
      </div>
      ${low ? `
        <div class="new-review-banner">
          <div class="stars">1★</div>
          <div class="txt">
            <div class="ttl">${t('reviews.new.title', { when: fmtTimeAgo(low.when, getLocale()) })}</div>
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
              <span class="rev-when">${fmtTimeAgo(r.when, getLocale())}</span>
            </div>
            <div class="rev-guest">${r.guest}</div>
            <div class="rev-villa">${r.villa}</div>
            <div class="rev-text">"${pick(r.text)}"</div>
            <div class="rev-draft">
              <div class="lbl">${icon('sparkle')} ${t('reviews.draftLabel')}</div>
              <div class="txt">${pick(r.draft)}</div>
            </div>
            <div class="rev-actions">
              <button class="btn secondary">${t('common.edit')}</button>
              <button class="btn primary" onclick="approveReply(this)">${t('common.approve')} →</button>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
  `;
  $$('.chip').forEach(c => c.addEventListener('click', () => { $$('.chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));
}

window.approveReply = (btn) => {
  const card = btn.closest('.rev-card');
  card.querySelector('.rev-actions').innerHTML = `<span class="applied-badge">${icon('check')}${t('reviews.toast.sent')}</span>`;
  toast(t('reviews.toast.replied'));
};

// === VILLA ===
function renderVilla(el) {
  const v = VILLAS[0];
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ back: true, title: v.name })}
    <main class="screen">
      <div style="height: 260px; background-image: url('${v.image}'); background-size: cover; background-position: center; margin: 0 16px; border-radius: var(--radius); position: relative; overflow: hidden;">
        <div style="position: absolute; bottom: 14px; left: 18px; color: var(--bg); text-shadow: 0 2px 8px oklch(10% 0 0 / 0.6);">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.85;">${pick(v.location)}</div>
          <div style="font-family: 'Fraunces', serif; font-size: 28px; font-weight: 500; margin-top: 4px;">${v.name}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border-radius: var(--radius); margin: 16px; overflow: hidden;">
        <div style="background: var(--bg-2); padding: 18px 14px; text-align: center;">
          <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500;">${v.rating}<span style="color: var(--coral); font-size: 16px;"> ★</span></div>
          <div style="font-size: 11px; color: var(--ink-fade); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;">${t('villa.reviewsCount', { n: v.reviews })}</div>
        </div>
        <div style="background: var(--bg-2); padding: 18px 14px; text-align: center;">
          <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500;">${v.occupancy}%</div>
          <div style="font-size: 11px; color: var(--ink-fade); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;">${t('villa.occupancy')}</div>
        </div>
        <div style="background: var(--bg-2); padding: 18px 14px; text-align: center;">
          <div style="font-family: 'Fraunces', serif; font-size: 22px; font-weight: 500;">${v.monthBookings}</div>
          <div style="font-size: 11px; color: var(--ink-fade); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px;">${t('villa.monthBookings')}</div>
        </div>
      </div>

      <div class="section-label"><span class="ttl">${t('villa.amenities')}</span></div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px;">
        ${v.amenities.map(a => `<span style="padding: 6px 12px; background: var(--bg-2); border-radius: 999px; font-size: 12px;">${t('amenity.' + a)}</span>`).join('')}
      </div>

      <div class="section-label"><span class="ttl">${t('villa.platforms')}</span></div>
      <div style="display: flex; gap: 8px; padding: 0 16px;">
        ${v.platforms.map(p => `<span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 6px 10px; border-radius: 6px; background: ${p === 'Booking' ? 'oklch(48% 0.18 260)' : p === 'Airbnb' ? 'oklch(62% 0.22 15)' : 'var(--ink)'}; color: var(--bg); text-transform: uppercase; letter-spacing: 0.06em;">${p}</span>`).join('')}
      </div>

      <div class="section-label"><span class="ttl">${t('villa.upcoming')}</span></div>
      <div class="bk-list">
        ${BOOKINGS.filter(b => b.villa === v.name).slice(0, 3).map(b => `
          <div class="bk-card">
            <div>
              <div class="bk-head">
                <span class="flag">${b.flag}</span>
                <span class="name">${b.guest}</span>
                <span class="plat ${b.platform.toLowerCase()}">${b.platform}</span>
              </div>
              <div class="bk-body"><div class="dt">${fmtDateRange(b.checkIn, b.checkOut, getLocale())}</div></div>
            </div>
            <div class="bk-total">€${b.total}<span class="nights">${fmtNights(b.checkIn, b.checkOut, getLocale())}</span></div>
          </div>
        `).join('')}
      </div>
    </main>
  `;
}

// === MORE / SETTINGS ===
function renderMore(el) {
  el.innerHTML = `
    ${statusBar()}
    ${topBar({ title: t('nav.settings') })}
    <main class="screen">
      <div class="more-head">
        <div class="avatar-big">${USER.initials}</div>
        <div class="info">
          <div class="name">${USER.name}</div>
          <div class="sub">${pick(VILLAS[0].location)} · ${USER.villas} villa</div>
        </div>
      </div>

      <div class="integ-card" onclick="toast(t_bookVisitM())">
        <div class="integ-card-top">
          <div class="integ-card-avatar">TZ</div>
          <div>
            <div class="integ-card-tag">${t('integ.who.title')}</div>
            <div class="integ-card-n">${t('integ.who.name')}</div>
          </div>
        </div>
        <div class="integ-card-line">${t('integ.who.role')}</div>
        <div class="integ-card-stats">
          <div><span class="v">${INTEG_STATS.platformsConnected}</span><span class="l">${t('integ.nav')}</span></div>
          <div><span class="v">${INTEG_STATS.hoursUsed}h</span><span class="l">${t('integ.who.hoursUsed').toLowerCase()}</span></div>
          <div><span class="v" style="font-size: 14px;">${t('integ.who.nextDate').split(' ')[0]} ${t('integ.who.nextDate').split(' ')[1] || ''}</span><span class="l">${t('integ.who.nextVisit').toLowerCase()}</span></div>
        </div>
        <div class="integ-card-quote">${t('integ.thesis').split('.')[0]}.</div>
      </div>

      <div class="plan-card">
        <div class="lbl">${t('settings.plan.active')}</div>
        <div class="name">${t('settings.plan.name')}</div>
        <div class="price">${USER.planPrice}/${t('common.month').toLowerCase()}</div>
        <div class="tools">
          <span class="tool">${t('widget.bookings.label')}</span>
          <span class="tool">${t('widget.pricing.label')}</span>
          <span class="tool">${t('widget.tax.label')}</span>
          <span class="tool">${t('widget.bot.label')}</span>
        </div>
      </div>

      <div class="menu-list">
        <a class="menu-row" href="#/villa">${icon('home')}<span class="lbl">${t('settings.villas')}</span><span class="val">${USER.villas}</span><span class="chev">${icon('chevron')}</span></a>
        <a class="menu-row" href="#/reviews">${icon('star')}<span class="lbl">${t('reviews.title')}</span><span class="val">${REVIEWS.length}</span><span class="chev">${icon('chevron')}</span></a>
        <a class="menu-row" href="#/tax">${icon('tax')}<span class="lbl">${t('nav.tax')}</span><span class="val">3</span><span class="chev">${icon('chevron')}</span></a>
        <div class="menu-row">${icon('bell')}<span class="lbl">${t('settings.notifications')}</span><span class="val">${t('settings.notifications.on')}</span><span class="chev">${icon('chevron')}</span></div>
        <div class="menu-row" style="gap: 14px;">
          ${icon('settings')}
          <span class="lbl">${t('settings.language')}</span>
          <div style="margin-left: auto;">${renderLangSwitcher('mobile')}</div>
        </div>
        <div class="menu-row">${icon('logout')}<span class="lbl">${t('common.signOut')}</span><span class="chev">${icon('chevron')}</span></div>
      </div>

      <div class="foot-note">
        ${t('app.name')} · ${t('app.version')}<br>
        ${t('app.made').replace('Kaş', '<span class="heart">Kaş</span>')}
      </div>
    </main>
  `;
}

// === ONBOARDING ===
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
            <h3>${t(s.titleKey)}</h3>
            <p>${t(s.bodyKey)}</p>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="onboard-foot">
      <button class="onboard-skip" id="skip">${t('common.skip')}</button>
      <div class="onboard-dots" id="dots">
        ${ONBOARDING.map((_, i) => `<div class="onboard-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
      </div>
      <button class="onboard-go" id="go">${t('common.start')} →</button>
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

window.t_bookVisitM = () => getLocale() === 'ru' ? 'Отправлено · Тим подтвердит в течение часа' : getLocale() === 'en' ? 'Sent · Tim will confirm within an hour' : 'Gönderildi · Tim 1 saat içinde onaylayacak';

if (new URLSearchParams(location.search).has('reset')) {
  localStorage.removeItem('kh-onboard-done');
}

// Init
navigate(location.hash || '#/home');
setTimeout(maybeOnboard, 1300);
