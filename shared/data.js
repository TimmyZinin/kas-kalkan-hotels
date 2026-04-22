// Numeric / structural mock data. Text content goes through i18n keys.
import { STRINGS } from './strings.js';

export const USER = {
  name: 'Murat Yılmaz',
  short: 'Murat',
  initials: 'MY',
  email: 'murat@bayram-villa.com',
  accountantEmail: 'ahmet.muhasebe@gmail.com',
  villas: 2,
  planPrice: '$327',
};

export const TIME = { time: '08:14', date: '2026-04-22' };

export const WIDGETS = [
  { id: 'bookings', labelKey: 'widget.bookings.label', valueKey: 'widget.bookings.value', metaKey: 'widget.bookings.meta', metaStyle: 'alert', icon: 'bookings', route: '#/bookings', sparkline: [4, 5, 3, 6, 5, 7, 8, 6], accent: true },
  { id: 'pricing', labelKey: 'widget.pricing.label', valueKey: 'widget.pricing.value', metaKey: 'widget.pricing.meta', metaStyle: 'ok', icon: 'pricing', route: '#/pricing', sparkline: [120, 140, 135, 160, 155, 170, 180, 165] },
  { id: 'tax', labelKey: 'widget.tax.label', valueKey: 'widget.tax.value', metaKey: 'widget.tax.meta', metaStyle: 'warn', icon: 'tax', route: '#/tax', gauge: 82 },
  { id: 'bot', labelKey: 'widget.bot.label', valueKey: 'widget.bot.value', metaKey: 'widget.bot.meta', metaStyle: 'ok', icon: 'bot', route: '#/bot', sparkline: [2, 4, 3, 5, 7, 6, 9, 14] },
];

export const ALERTS = [
  { id: 1, kind: 'critical', icon: 'star', titleKey: 'alert.review.title', bodyKey: 'alert.review.body', time: { min: 12 }, ctaKey: 'alert.review.cta', route: '#/reviews' },
  { id: 2, kind: 'warn', icon: 'alert', titleKey: 'alert.conflict.title', bodyKey: 'alert.conflict.body', time: { min: 34 }, ctaKey: 'alert.conflict.cta', route: '#/bookings' },
  { id: 3, kind: 'info', icon: 'trending', titleKey: 'alert.rank.title', bodyKey: 'alert.rank.body', time: { hr: 1 }, ctaKey: 'alert.rank.cta', route: '#/pricing' },
  { id: 4, kind: 'ok', icon: 'check', titleKey: 'alert.price.title', bodyKey: 'alert.price.body', time: { hr: 3 }, ctaKey: null, route: null },
];

export const VILLAS = [
  {
    id: 'bayram', name: 'Bayram Villa',
    location: { tr: 'Kalkan · Kışla Mah.', en: 'Kalkan · Kışla district', ru: 'Калкан · район Кышла' },
    image: '../images/hero.jpg',
    rating: 4.8, reviews: 127, rooms: 3, occupancy: 68, monthBookings: 11,
    platforms: ['Booking', 'Airbnb', 'Direct'],
    amenities: ['pool', 'seaview', 'wifi', 'ac', 'terrace', 'kitchen', 'parking', 'pet'],
  },
  {
    id: 'olive', name: 'Olive Suite',
    location: { tr: 'Kaş · Küçükçakıl', en: 'Kaş · Küçükçakıl', ru: 'Каш · Кючюкчакыл' },
    image: '../images/hero.jpg',
    rating: 4.9, reviews: 84, rooms: 2, occupancy: 74, monthBookings: 9,
    platforms: ['Booking', 'Airbnb'],
    amenities: ['seaview', 'wifi', 'ac', 'jacuzzi', 'terrace'],
  },
];

// Dates as ISO; format at render time with user locale
export const BOOKINGS = [
  { id: 'b1', guest: 'Richard Thompson', villa: 'Bayram Villa', platform: 'Booking', checkIn: '2026-04-24', checkOut: '2026-04-28', total: 680, flag: '🇬🇧', status: 'ok' },
  { id: 'b2', guest: 'Anna Schmidt', villa: 'Bayram Villa', platform: 'Airbnb', checkIn: '2026-04-28', checkOut: '2026-04-30', total: 340, flag: '🇩🇪', status: 'conflict' },
  { id: 'b3', guest: 'David Price', villa: 'Olive Suite', platform: 'Booking', checkIn: '2026-04-28', checkOut: '2026-04-30', total: 520, flag: '🇬🇧', status: 'conflict' },
  { id: 'b4', guest: 'Marco Ricci', villa: 'Olive Suite', platform: 'Direct', checkIn: '2026-05-02', checkOut: '2026-05-09', total: 1820, flag: '🇮🇹', status: 'ok' },
  { id: 'b5', guest: 'Emma Lewis', villa: 'Bayram Villa', platform: 'Booking', checkIn: '2026-05-05', checkOut: '2026-05-12', total: 1190, flag: '🇬🇧', status: 'ok' },
  { id: 'b6', guest: 'Yuki Tanaka', villa: 'Olive Suite', platform: 'Airbnb', checkIn: '2026-05-14', checkOut: '2026-05-21', total: 1890, flag: '🇯🇵', status: 'ok' },
  { id: 'b7', guest: 'Sophie Martin', villa: 'Bayram Villa', platform: 'Direct', checkIn: '2026-05-22', checkOut: '2026-05-29', total: 1260, flag: '🇫🇷', status: 'ok' },
];

export const CONFLICT = {
  titleKey: 'bookings.conflict.title',
  subKey: 'bookings.conflict.sub',
  villa: 'Olive Suite',
  dateRange: { tr: '28–30 Nisan', en: '28–30 April', ru: '28–30 апреля' },
  options: [
    { id: 'o1', labelKey: 'bookings.conflict.cancelAirbnb', subKey: 'bookings.conflict.cancelAirbnbSub', preferred: false },
    { id: 'o2', labelKey: 'bookings.conflict.cancelBooking', subKey: 'bookings.conflict.cancelBookingSub', preferred: false },
    { id: 'o3', labelKey: 'bookings.conflict.move', subKey: 'bookings.conflict.moveSub', preferred: true },
  ],
};

export const PRICING_WEEKS = [
  { id: 'w1', labelKey: 'pricing.thisWeek', start: '2026-04-21', end: '2026-04-27', occupancy: 45, current: 170, suggested: 155, delta: -9, reasonKey: 'pricing.reason.w1', competitors: [148, 155, 162, 165, 170] },
  { id: 'w2', labelKey: 'pricing.nextWeek', start: '2026-04-28', end: '2026-05-04', occupancy: 72, current: 170, suggested: 195, delta: 15, reasonKey: 'pricing.reason.w2', competitors: [185, 190, 195, 198, 210] },
  { id: 'w3', labelKey: 'pricing.in2', start: '2026-05-05', end: '2026-05-11', occupancy: 38, current: 170, suggested: 160, delta: -6, reasonKey: 'pricing.reason.w3', competitors: [155, 158, 162, 165, 168] },
  { id: 'w4', labelKey: 'pricing.in3', start: '2026-05-12', end: '2026-05-18', occupancy: 84, current: 170, suggested: 215, delta: 26, reasonKey: 'pricing.reason.w4', competitors: [205, 215, 220, 225, 230] },
];

export const TAX_THRESHOLDS = [
  { id: 'kdv', labelKey: 'tax.vat.label', subKey: 'tax.vat.sub', current: 575000, limit: 700000, unit: '₺', percent: 82, weeksLeft: 6, trendKey: 'tax.trend.up', noteKey: 'tax.vat.note' },
  { id: 'gelir', labelKey: 'tax.income.label', subKey: 'tax.income.sub', current: 820000, limit: 990000, unit: '₺', percent: 83, weeksLeft: 8, trendKey: 'tax.trend.up', noteKey: 'tax.income.note' },
  { id: 'konaklama', labelKey: 'tax.occupancy.label', subKey: 'tax.occupancy.sub', current: 11200, limit: 14000, unit: '₺', percent: 80, weeksLeft: 1, trendKey: 'tax.trend.reset', noteKey: 'tax.occupancy.note' },
];

export const BOT_CONVOS = [
  {
    id: 'c1', guest: 'Richard', flag: '🇬🇧', villa: 'Bayram Villa', status: 'handled',
    turns: [
      { from: 'guest', text: { tr: 'Good morning — what time is breakfast?', en: 'Good morning — what time is breakfast?', ru: 'Good morning — what time is breakfast?' } },
      { from: 'bot', text: { tr: 'Günaydın Richard bey! 07:30\'da teraste, 10:30\'a kadar. İngiliz kahvaltısı da var.', en: 'Good morning, Richard! Breakfast is 07:30–10:30 on the terrace. English option available.', ru: 'Доброе утро, Ричард! Завтрак 07:30–10:30 на террасе. Есть английский вариант.' } },
      { from: 'guest', text: { tr: 'Perfect. And beach distance?', en: 'Perfect. And beach distance?', ru: 'Perfect. And beach distance?' } },
      { from: 'bot', text: { tr: 'Kaputaş Plajı 4 dk arabayla, Kalkan limanı 3 dk yürüyüş. Taksi ister misin?', en: 'Kaputaş Beach — 4 min by car, Kalkan harbour 3 min walk. Want a taxi?', ru: 'Пляж Капуташ — 4 мин на машине, порт Калкан 3 мин пешком. Вызвать такси?' } },
    ],
  },
  {
    id: 'c2', guest: 'Anna', flag: '🇩🇪', villa: 'Olive Suite', status: 'handled',
    turns: [
      { from: 'guest', text: { tr: 'Wann ist der Pool sauber?', en: 'Wann ist der Pool sauber?', ru: 'Wann ist der Pool sauber?' } },
      { from: 'bot', text: { tr: 'Havuz her sabah 07:00–08:00 arası temizleniyor. Şu an kullanıma hazır, Anna hanım.', en: 'Pool is cleaned 07:00–08:00 daily. Ready to use right now, Anna.', ru: 'Бассейн чистится 07:00–08:00 каждый день. Сейчас готов, Анна.' } },
      { from: 'guest', text: { tr: 'Gibt es ein gutes Fischrestaurant?', en: 'Is there a good fish restaurant?', ru: 'Есть хороший рыбный ресторан?' } },
      { from: 'bot', text: { tr: 'İki öneri: Mehmet\'in Yeri (300m, balık) veya Limanağzı (tekne, 15 dk). Rezervasyon yapayım mı?', en: 'Two picks: Mehmet\'s Place (300m, fish) or Limanağzı (by boat, 15 min). Want me to book?', ru: 'Два варианта: Mehmet\'s Place (300м, рыба) или Limanağzı (на лодке, 15 мин). Забронировать?' } },
    ],
  },
  {
    id: 'c3', guest: 'Marco', flag: '🇮🇹', villa: 'Olive Suite', status: 'escalated',
    turns: [
      { from: 'guest', text: { tr: 'Ciao, il Wi-Fi non funziona', en: 'Ciao, Wi-Fi is not working', ru: 'Чао, Wi-Fi не работает' } },
      { from: 'bot', text: { tr: 'Ay, üzgünüm Marco. Şifre: olive2026. Router terasın girişinde, kırmızı ışık yanıyor mu?', en: 'Sorry, Marco. Password: olive2026. Router is at terrace entrance — is the red light on?', ru: 'Извини, Марко. Пароль: olive2026. Роутер у входа на террасу — красный огонёк горит?' } },
      { from: 'guest', text: { tr: 'No, niente luce', en: 'No, no light', ru: 'Нет, огонька нет' } },
      { from: 'bot', text: { tr: 'Anladım — Murat bey\'e ilettim, 10 dk içinde orada olacak.', en: 'Got it — I\'ve pinged Murat, he\'ll be there in 10 min.', ru: 'Понял — написал Мурату, будет через 10 мин.' } },
    ],
  },
];

export const REVIEWS = [
  {
    id: 'r1', stars: 1, platform: 'Google', guest: 'Y. Özdemir', when: { min: 12 }, villa: 'Bayram Villa', flag: 'new',
    text: { tr: 'Havuz temiz değildi, çöp kutusu doluydu. Personel uyarıdan sonra geldi.', en: 'Pool wasn\'t clean, bins were full. Staff came only after I complained.', ru: 'Бассейн грязный, урны переполнены. Персонал пришёл только после жалобы.' },
    draft: { tr: 'Y. bey, yorumunuz için teşekkür ederiz — özellikle çöp ve havuz konusunda. Temizlik programımızı gözden geçiriyoruz. Bugün size özel bir brunch önermek istiyoruz — kabul eder misiniz? Saygılarımla, Murat.', en: 'Mr. Y, thank you for the feedback — especially on bins and pool. We\'re reviewing our cleaning schedule. We\'d like to offer you a private brunch today — would you accept? Best, Murat.', ru: 'Господин Y, спасибо за обратную связь — особенно по мусору и бассейну. Пересматриваем график уборки. Хотим угостить вас бранчем сегодня — согласны? С уважением, Мурат.' },
  },
  {
    id: 'r2', stars: 5, platform: 'Booking', guest: 'Richard T.', when: { hr: 2 }, villa: 'Bayram Villa', flag: null,
    text: { tr: 'Perfect sea view, amazing host. Will return next summer!', en: 'Perfect sea view, amazing host. Will return next summer!', ru: 'Perfect sea view, amazing host. Will return next summer!' },
    draft: { tr: 'Richard bey, çok teşekkür ederiz! Gelecek yaz için sizi yeniden beklemek bizi mutlu eder — erken rezervasyona %10 indirim yapalım mı?', en: 'Richard, thank you! Happy to host you again next summer — shall we set up a 10% early-booking discount?', ru: 'Ричард, спасибо огромное! Будем рады встретить вас снова — сделаем скидку 10% на раннюю бронь?' },
  },
  {
    id: 'r3', stars: 4, platform: 'TripAdvisor', guest: 'Helena K.', when: { day: 1 }, villa: 'Olive Suite', flag: null,
    text: { tr: 'Lovely location, Wi-Fi was slow one evening.', en: 'Lovely location, Wi-Fi was slow one evening.', ru: 'Lovely location, Wi-Fi was slow one evening.' },
    draft: { tr: 'Helena hanım, teşekkürler! Wi-Fi sorunu için router yenilendi. Bir dahaki ziyaretinizde farkı göreceksiniz.', en: 'Helena, thank you! Router has been upgraded since. You\'ll notice the difference next time.', ru: 'Елена, спасибо! Роутер с тех пор обновили — в следующий раз заметите разницу.' },
  },
  {
    id: 'r4', stars: 5, platform: 'Airbnb', guest: 'Anna S.', when: { day: 2 }, villa: 'Olive Suite', flag: null,
    text: { tr: 'Absolut traumhaft. Jeder Morgen ein Geschenk.', en: 'Absolutely dreamlike. Every morning a gift.', ru: 'Абсолютно волшебно. Каждое утро как подарок.' },
    draft: { tr: 'Anna hanım, teşekkürler — \'Geschenk\' kelimesi bizi çok mutlu etti. Eylül\'de yine bekleriz!', en: 'Anna, thank you — the word "Geschenk" made our day. See you in September!', ru: 'Анна, спасибо — слово «Geschenk» нас тронуло. Ждём в сентябре!' },
  },
  {
    id: 'r5', stars: 2, platform: 'Booking', guest: 'M. Johnson', when: { day: 3 }, villa: 'Bayram Villa', flag: null,
    text: { tr: 'Description said 5 minutes to beach, it was 20.', en: 'Description said 5 minutes to beach, it was 20.', ru: 'В описании 5 минут до пляжа, а по факту 20.' },
    draft: { tr: 'M. bey, haklısınız — açıklamamızı düzelttik. Bir dahaki konaklamada transferi bizden, size özel.', en: 'Mr Johnson, you\'re right — listing has been corrected. Next stay — transfer is on us, personally.', ru: 'Господин Джонсон, вы правы — описание исправлено. В следующий раз трансфер за наш счёт.' },
  },
  {
    id: 'r6', stars: 5, platform: 'Google', guest: 'Fatma Y.', when: { day: 4 }, villa: 'Olive Suite', flag: null,
    text: { tr: 'Bayıldık. Kahvaltı bir harika. Personel çok ilgili.', en: 'We loved it. Breakfast is amazing. Staff very attentive.', ru: 'Нам очень понравилось. Завтрак потрясающий. Персонал очень внимательный.' },
    draft: { tr: 'Fatma hanım, teşekkürler! Kahvaltı ekibimize iletiyoruz, motive olacaklar. Yakında sizi tekrar görmek isteriz.', en: 'Fatma, thank you! I\'ll pass it to the breakfast team — they\'ll be happy. Hope to see you again soon.', ru: 'Фатма, спасибо! Передам команде завтрака — порадуются. Ждём вас снова.' },
  },
];

export const ONBOARDING = [
  { id: 1, image: '../images/insight.jpg', titleKey: 'onboard.1.title', bodyKey: 'onboard.1.body' },
  { id: 2, image: '../images/pain.jpg', titleKey: 'onboard.2.title', bodyKey: 'onboard.2.body' },
  { id: 3, image: '../images/shift.jpg', titleKey: 'onboard.3.title', bodyKey: 'onboard.3.body' },
];

export const NAV_MOBILE = [
  { id: 'home', route: '#/home', labelKey: 'nav.home', icon: 'home' },
  { id: 'bookings', route: '#/bookings', labelKey: 'nav.bookings', icon: 'bookings' },
  { id: 'pricing', route: '#/pricing', labelKey: 'nav.pricing', icon: 'pricing' },
  { id: 'bot', route: '#/bot', labelKey: 'nav.bot', icon: 'bot' },
  { id: 'more', route: '#/more', labelKey: 'nav.more', icon: 'more' },
];

export const NAV_WEB = [
  { id: 'overview', route: '#/overview', labelKey: 'web.nav.overview', icon: 'home' },
  { id: 'bookings', route: '#/bookings', labelKey: 'web.nav.bookings', icon: 'bookings' },
  { id: 'pricing', route: '#/pricing', labelKey: 'web.nav.pricing', icon: 'pricing' },
  { id: 'tax', route: '#/tax', labelKey: 'web.nav.tax', icon: 'tax' },
  { id: 'bot', route: '#/bot', labelKey: 'web.nav.bot', icon: 'bot' },
  { id: 'reviews', route: '#/reviews', labelKey: 'web.nav.reviews', icon: 'star' },
  { id: 'villas', route: '#/villas', labelKey: 'web.nav.villas', icon: 'home' },
  { id: 'integrations', route: '#/integrations', labelKey: 'integ.nav', icon: 'sparkle', highlight: true },
  { id: 'settings', route: '#/settings', labelKey: 'web.nav.settings', icon: 'settings' },
];

// Integration systems — what's wired to what
export const INTEGRATIONS = [
  { id: 'booking', systemKey: 'integ.sys.booking', noteKey: 'integ.sys.booking.note', status: 'connected', color: 'oklch(48% 0.18 260)', x: 20, y: 25 },
  { id: 'airbnb', systemKey: 'integ.sys.airbnb', noteKey: 'integ.sys.airbnb.note', status: 'connected', color: 'oklch(62% 0.22 15)', x: 80, y: 25 },
  { id: 'whatsapp', systemKey: 'integ.sys.whatsapp', noteKey: 'integ.sys.whatsapp.note', status: 'connected', color: 'oklch(62% 0.18 150)', x: 85, y: 55 },
  { id: 'gmail', systemKey: 'integ.sys.gmail', noteKey: 'integ.sys.gmail.note', status: 'connected', color: 'oklch(60% 0.20 25)', x: 65, y: 82 },
  { id: 'efatura', systemKey: 'integ.sys.efatura', noteKey: 'integ.sys.efatura.note', status: 'connected', color: 'oklch(55% 0.12 280)', x: 35, y: 82 },
  { id: 'excel', systemKey: 'integ.sys.excel', noteKey: 'integ.sys.excel.note', status: 'paused', color: 'oklch(55% 0.12 150)', x: 15, y: 55 },
];

export const INTEG_LOG = [
  { date: '2026-04-14', key: 'integ.log.1' },
  { date: '2026-04-17', key: 'integ.log.2' },
  { date: '2026-04-20', key: 'integ.log.3' },
  { date: '2026-04-22', key: 'integ.log.4' },
];

export const INTEG_STATS = {
  hoursUsed: 5.5,
  hoursTotal: 8,
  interventions: 4,
  platformsConnected: 5,
};

// KPIs for web dashboard
export const KPIS = [
  { id: 'revenue', labelKey: 'web.kpi.revenue', value: '€ 12 840', delta: +18.2, sparkline: [8200, 9100, 9800, 10400, 10200, 11600, 12100, 12840] },
  { id: 'occupancy', labelKey: 'web.kpi.occupancy', value: '71%', delta: +4.1, sparkline: [62, 63, 66, 68, 67, 70, 69, 71] },
  { id: 'revpar', labelKey: 'web.kpi.revpar', value: '€ 122', delta: +11.7, sparkline: [94, 98, 104, 108, 112, 115, 118, 122] },
  { id: 'satisfaction', labelKey: 'web.kpi.satisfaction', value: '4.86', delta: +0.12, sparkline: [4.5, 4.6, 4.65, 4.7, 4.72, 4.78, 4.82, 4.86] },
];

// Date formatting helper (locale-aware)
export function fmtDateRange(startISO, endISO, locale = 'tr') {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const sameMonth = start.getMonth() === end.getMonth();
  const monthOpts = { month: 'short' };
  const localeMap = { tr: 'tr-TR', en: 'en-GB', ru: 'ru-RU' };
  const loc = localeMap[locale] || 'tr-TR';
  if (sameMonth) {
    const month = start.toLocaleDateString(loc, monthOpts);
    return `${start.getDate()}–${end.getDate()} ${month}`;
  }
  return `${start.getDate()} ${start.toLocaleDateString(loc, monthOpts)} – ${end.getDate()} ${end.toLocaleDateString(loc, monthOpts)}`;
}

export function fmtDate(iso, locale = 'tr') {
  const d = new Date(iso);
  const localeMap = { tr: 'tr-TR', en: 'en-GB', ru: 'ru-RU' };
  return d.toLocaleDateString(localeMap[locale] || 'tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function fmtTimeAgo(time, locale = 'tr') {
  if (!time) return '';
  if (time.min != null) return t('common.min_ago', { n: time.min }, locale);
  if (time.hr != null) return t('common.hr_ago', { n: time.hr }, locale);
  if (time.day != null) {
    if (time.day === 1) return t('common.yesterday', {}, locale);
    return t('common.day_ago', { n: time.day }, locale);
  }
  return '';
}

function t(key, vars = {}, locale = 'tr') {
  const e = STRINGS[key];
  if (!e) return key;
  let v = e[locale] || e.tr || key;
  return v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

export function fmtNights(checkIn, checkOut, locale = 'tr') {
  const n = Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
  return t('bookings.nights', { n }, locale);
}
