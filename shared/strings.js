// Flat i18n dictionary — key → { tr, en, ru }
export const STRINGS = {
  // --- APP META ---
  'app.name': { tr: 'Kaş Hotel Companion', en: 'Kaş Hotel Companion', ru: 'Kaş Hotel Companion' },
  'app.tagline': { tr: 'Sabah 08:00 · bugün ne var?', en: 'Morning 8:00 · what\'s on today?', ru: 'Утро 08:00 · что сегодня?' },
  'app.version': { tr: 'v0.4 · prototip', en: 'v0.4 · prototype', ru: 'v0.4 · прототип' },
  'app.made': { tr: "Kaş'ta yapıldı", en: 'Made in Kaş', ru: 'Сделано в Каше' },

  // --- NAV ---
  'nav.home': { tr: 'Ana sayfa', en: 'Home', ru: 'Главная' },
  'nav.bookings': { tr: 'Rezervasyon', en: 'Bookings', ru: 'Бронирования' },
  'nav.pricing': { tr: 'Fiyat', en: 'Pricing', ru: 'Цены' },
  'nav.bot': { tr: 'Misafir', en: 'Guest bot', ru: 'Бот' },
  'nav.more': { tr: 'Daha', en: 'More', ru: 'Ещё' },
  'nav.tax': { tr: 'Vergi', en: 'Tax', ru: 'Налоги' },
  'nav.reviews': { tr: 'Yorumlar', en: 'Reviews', ru: 'Отзывы' },
  'nav.villa': { tr: 'Villalar', en: 'Properties', ru: 'Объекты' },
  'nav.settings': { tr: 'Ayarlar', en: 'Settings', ru: 'Настройки' },
  'nav.overview': { tr: 'Genel bakış', en: 'Overview', ru: 'Обзор' },

  // --- COMMON ---
  'common.today': { tr: 'Bugün', en: 'Today', ru: 'Сегодня' },
  'common.week': { tr: 'Hafta', en: 'Week', ru: 'Неделя' },
  'common.month': { tr: 'Ay', en: 'Month', ru: 'Месяц' },
  'common.all': { tr: 'Hepsi', en: 'All', ru: 'Все' },
  'common.apply': { tr: 'Uygula', en: 'Apply', ru: 'Применить' },
  'common.cancel': { tr: 'İptal', en: 'Cancel', ru: 'Отмена' },
  'common.save': { tr: 'Kaydet', en: 'Save', ru: 'Сохранить' },
  'common.approve': { tr: 'Onayla', en: 'Approve', ru: 'Одобрить' },
  'common.edit': { tr: 'Düzenle', en: 'Edit', ru: 'Изменить' },
  'common.details': { tr: 'Neden?', en: 'Why?', ru: 'Почему?' },
  'common.send': { tr: 'Gönder', en: 'Send', ru: 'Отправить' },
  'common.resolve': { tr: 'Çöz', en: 'Resolve', ru: 'Решить' },
  'common.start': { tr: 'Başla', en: 'Start', ru: 'Начать' },
  'common.skip': { tr: 'Atla', en: 'Skip', ru: 'Пропустить' },
  'common.gotIt': { tr: 'Anladım', en: 'Got it', ru: 'Понял' },
  'common.seeAll': { tr: 'Hepsi', en: 'See all', ru: 'Все' },
  'common.recommended': { tr: 'Önerilen', en: 'Recommended', ru: 'Рекомендуется' },
  'common.now': { tr: 'şimdi', en: 'now', ru: 'сейчас' },
  'common.min_ago': { tr: '{n} dk önce', en: '{n} min ago', ru: '{n} мин назад' },
  'common.hr_ago': { tr: '{n} sa önce', en: '{n} h ago', ru: '{n} ч назад' },
  'common.day_ago': { tr: '{n} gün önce', en: '{n}d ago', ru: '{n} д назад' },
  'common.yesterday': { tr: 'dün', en: 'yesterday', ru: 'вчера' },
  'common.signOut': { tr: 'Çıkış', en: 'Sign out', ru: 'Выйти' },
  'common.search': { tr: 'Ara', en: 'Search', ru: 'Поиск' },

  // --- HOME ---
  'home.greet.morning': { tr: 'Günaydın', en: 'Good morning', ru: 'Доброе утро' },
  'home.greet.day': { tr: 'İyi günler', en: 'Good day', ru: 'Добрый день' },
  'home.greet.evening': { tr: 'İyi akşamlar', en: 'Good evening', ru: 'Добрый вечер' },
  'home.summary': {
    tr: '3 aktif rezervasyon, 1 çakışma, 4 karar bekliyor.',
    en: '3 active bookings, 1 conflict, 4 decisions pending.',
    ru: '3 брони активны, 1 конфликт, 4 решения ждут.',
  },
  'home.date': {
    tr: '22 Nisan Salı',
    en: 'Tuesday, 22 April',
    ru: 'Вторник, 22 апреля',
  },
  'home.alerts': { tr: 'Bugünün bildirimleri', en: 'Today\'s alerts', ru: 'Уведомления сегодня' },
  'home.quick': { tr: 'Hızlı', en: 'Quick access', ru: 'Быстрый доступ' },

  // --- WIDGETS ---
  'widget.bookings.label': { tr: 'Rezervasyonlar', en: 'Bookings', ru: 'Брони' },
  'widget.bookings.value': { tr: '3 aktif', en: '3 active', ru: '3 активны' },
  'widget.bookings.meta': { tr: '1 çakışma', en: '1 conflict', ru: '1 конфликт' },
  'widget.pricing.label': { tr: 'Haftalık fiyat', en: 'Weekly pricing', ru: 'Недельная цена' },
  'widget.pricing.value': { tr: '4 boş hafta', en: '4 empty weeks', ru: '4 пустых недели' },
  'widget.pricing.meta': { tr: '+%8 öneri', en: '+8% suggestion', ru: '+8% предложение' },
  'widget.tax.label': { tr: 'Vergi eşiği', en: 'Tax threshold', ru: 'Налоговый порог' },
  'widget.tax.value': { tr: 'KDV %82', en: 'VAT 82%', ru: 'НДС 82%' },
  'widget.tax.meta': { tr: '~6 hafta', en: '~6 weeks', ru: '~6 недель' },
  'widget.bot.label': { tr: 'Misafir bot', en: 'Guest bot', ru: 'Гостевой бот' },
  'widget.bot.value': { tr: '14 mesaj', en: '14 messages', ru: '14 сообщений' },
  'widget.bot.meta': { tr: 'bugün otomatik', en: 'handled today', ru: 'авто сегодня' },

  // --- ALERTS ---
  'alert.review.title': { tr: 'Yeni 1★ yorum', en: 'New 1★ review', ru: 'Новый отзыв 1★' },
  'alert.review.body': {
    tr: 'Bayram Villa · Google · «Havuz temiz değildi»',
    en: 'Bayram Villa · Google · "Pool wasn\'t clean"',
    ru: 'Bayram Villa · Google · «Бассейн был грязный»',
  },
  'alert.review.cta': { tr: 'Özel yanıt yaz', en: 'Write private reply', ru: 'Написать лично' },
  'alert.conflict.title': { tr: 'Platform çakışması', en: 'Platform conflict', ru: 'Конфликт платформ' },
  'alert.conflict.body': {
    tr: 'Olive Suite · 28–30 Nisan Booking + Airbnb çift rezervasyon',
    en: 'Olive Suite · 28–30 Apr Booking + Airbnb double booking',
    ru: 'Olive Suite · 28–30 апр Booking + Airbnb двойная бронь',
  },
  'alert.conflict.cta': { tr: 'Çöz', en: 'Resolve', ru: 'Решить' },
  'alert.rank.title': { tr: 'Sıralama düştü', en: 'Ranking dropped', ru: 'Ранкинг упал' },
  'alert.rank.body': {
    tr: 'Bayram Villa · Booking Kalkan: 8 → 14 · komşu €12 indirdi',
    en: 'Bayram Villa · Booking Kalkan: 8 → 14 · neighbor cut €12',
    ru: 'Bayram Villa · Booking Kalkan: 8 → 14 · сосед снизил €12',
  },
  'alert.rank.cta': { tr: 'Fiyat öner', en: 'Suggest price', ru: 'Предложить цену' },
  'alert.price.title': { tr: 'Fiyat güncellendi', en: 'Price updated', ru: 'Цена обновлена' },
  'alert.price.body': {
    tr: 'Olive Suite · 7 platformda yeni fiyat yayıldı',
    en: 'Olive Suite · new price pushed to 7 platforms',
    ru: 'Olive Suite · новая цена на 7 платформах',
  },

  // --- BOOKINGS ---
  'bookings.title': { tr: 'Rezervasyon', en: 'Bookings', ru: 'Бронирования' },
  'bookings.tabs.all': { tr: 'Tümü', en: 'All', ru: 'Все' },
  'bookings.sync.line': {
    tr: 'Son senkron · {time} · 4 platform',
    en: 'Last sync · {time} · 4 platforms',
    ru: 'Синхрон · {time} · 4 платформы',
  },
  'bookings.nights': { tr: '{n} gece', en: '{n} nights', ru: '{n} ночей' },
  'bookings.conflict.title': { tr: 'Aynı tarih, iki platform', en: 'Same dates, two platforms', ru: 'Одна дата, две платформы' },
  'bookings.conflict.sub': {
    tr: '{villa} · {dates}. Üç seçenek var — her biri farklı maliyette.',
    en: '{villa} · {dates}. Three options — each at a different cost.',
    ru: '{villa} · {dates}. Три варианта — у каждого своя цена.',
  },
  'bookings.conflict.cancelAirbnb': { tr: 'Airbnb\'yi iptal et', en: 'Cancel Airbnb', ru: 'Отменить Airbnb' },
  'bookings.conflict.cancelAirbnbSub': {
    tr: 'Anna Schmidt · €340 · Booking cezası yok',
    en: 'Anna Schmidt · €340 · no Booking penalty',
    ru: 'Anna Schmidt · €340 · штрафа Booking нет',
  },
  'bookings.conflict.cancelBooking': { tr: 'Booking\'i iptal et', en: 'Cancel Booking', ru: 'Отменить Booking' },
  'bookings.conflict.cancelBookingSub': {
    tr: 'David Price · €520 · Airbnb superhost riski',
    en: 'David Price · €520 · Airbnb superhost risk',
    ru: 'David Price · €520 · риск superhost на Airbnb',
  },
  'bookings.conflict.move': { tr: 'Bayram Villa\'ya taşı', en: 'Move to Bayram Villa', ru: 'Перенести в Bayram Villa' },
  'bookings.conflict.moveSub': {
    tr: '28–30 Nis boş · 3 km fark · misafire bilgi',
    en: '28–30 Apr open · 3 km away · notify guest',
    ru: '28–30 апр свободно · 3 км · уведомить гостя',
  },
  'bookings.toast.resolved': {
    tr: 'Çözüldü · Bayram Villa\'ya taşındı',
    en: 'Resolved · moved to Bayram Villa',
    ru: 'Решено · перенесено в Bayram Villa',
  },

  // --- PRICING ---
  'pricing.title': { tr: 'Haftalık fiyat', en: 'Weekly pricing', ru: 'Недельная цена' },
  'pricing.headline': {
    tr: 'Her Pazar,<br>dört <em>hafta</em> öneri.',
    en: 'Every Sunday,<br>four <em>weeks</em> proposed.',
    ru: 'Каждое воскресенье —<br>4 <em>недели</em> вперёд.',
  },
  'pricing.sub': {
    tr: 'Bayram Villa · doluluk + rakipler + etkinlikler',
    en: 'Bayram Villa · occupancy + competitors + events',
    ru: 'Bayram Villa · заполняемость + конкуренты + события',
  },
  'pricing.occupancy': { tr: 'Doluluk · %{n}', en: 'Occupancy · {n}%', ru: 'Заполнено · {n}%' },
  'pricing.thisWeek': { tr: 'BU HAFTA', en: 'THIS WEEK', ru: 'ЭТА НЕДЕЛЯ' },
  'pricing.nextWeek': { tr: 'ÖNÜMÜZDEKİ HAFTA', en: 'NEXT WEEK', ru: 'СЛЕДУЮЩАЯ НЕДЕЛЯ' },
  'pricing.in2': { tr: '2 HAFTA SONRA', en: 'IN 2 WEEKS', ru: 'ЧЕРЕЗ 2 НЕДЕЛИ' },
  'pricing.in3': { tr: '3 HAFTA SONRA', en: 'IN 3 WEEKS', ru: 'ЧЕРЕЗ 3 НЕДЕЛИ' },
  'pricing.reason.w1': {
    tr: 'Düşük doluluk · komşular €148–165 aralığında · sezon başı',
    en: 'Low occupancy · neighbors at €148–165 · season start',
    ru: 'Низкая загрузка · соседи €148–165 · начало сезона',
  },
  'pricing.reason.w2': {
    tr: 'Yüksek doluluk · 1 Mayıs tatili · komşular zaten €190+',
    en: 'High occupancy · May 1 holiday · neighbors already €190+',
    ru: 'Высокая загрузка · праздник 1 мая · соседи уже от €190',
  },
  'pricing.reason.w3': {
    tr: 'Ortalama talep · yakın rezervasyon az · fiyat esnek',
    en: 'Average demand · few recent bookings · flexible price',
    ru: 'Средний спрос · мало свежих броней · гибкая цена',
  },
  'pricing.reason.w4': {
    tr: 'Çok yüksek talep · Kalkan yat fuarı · rakipler €220\'ye gidiyor',
    en: 'Very high demand · Kalkan yacht fair · peers going to €220',
    ru: 'Очень высокий спрос · яхтенная выставка · конкуренты идут к €220',
  },
  'pricing.applied': { tr: 'Uygulandı · 7 platform', en: 'Applied · 7 platforms', ru: 'Применено · 7 платформ' },
  'pricing.toast.applied': {
    tr: 'Fiyat güncellendi · 7 platformda canlı',
    en: 'Price updated · live on 7 platforms',
    ru: 'Цена обновлена · на 7 платформах',
  },
  'pricing.competitors': {
    tr: 'Yakın villalar + senin öneri (sağda)',
    en: 'Nearby villas + your new price (right)',
    ru: 'Соседние виллы + ваша цена (справа)',
  },

  // --- TAX ---
  'tax.title': { tr: 'Vergi eşiği', en: 'Tax thresholds', ru: 'Налоговые пороги' },
  'tax.headline': {
    tr: '<em>Üç</em> eşik,<br>bir panoda.',
    en: '<em>Three</em> thresholds,<br>one dashboard.',
    ru: '<em>Три</em> порога,<br>одна панель.',
  },
  'tax.sub': {
    tr: 'Her hafta bir özet · aşmadan önce haber',
    en: 'Weekly digest · alert before you exceed',
    ru: 'Каждую неделю сводка · сигнал до превышения',
  },
  'tax.vat.label': { tr: 'KDV eşiği', en: 'VAT threshold', ru: 'Порог НДС' },
  'tax.vat.sub': { tr: 'Değer eklenen vergisi', en: 'Value-added tax', ru: 'Налог на добавленную стоимость' },
  'tax.vat.note': {
    tr: 'Bu tempoda 6 hafta sonra KDV mükellefi olursun. Şimdi bir fatura tersine çevirmek mümkün.',
    en: 'At this pace you\'ll cross the VAT threshold in 6 weeks. Reversing one invoice now is still possible.',
    ru: 'При таком темпе через 6 недель становишься плательщиком НДС. Сейчас ещё можно отменить один счёт.',
  },
  'tax.income.label': { tr: 'Gelir vergisi dilimi', en: 'Income tax bracket', ru: 'Подоходный — граница' },
  'tax.income.sub': { tr: '%27\'den %35\'e geçiş', en: 'From 27% to 35%', ru: 'С 27% на 35%' },
  'tax.income.note': {
    tr: '8 hafta içinde %8 daha yüksek dilime geçersin. Kişisel/şirket ayrımı düzeltilebilir.',
    en: 'In 8 weeks you jump 8% higher. Personal/company split can still be adjusted.',
    ru: 'Через 8 недель — ставка выше на 8%. Ещё можно разделить личное/фирменное.',
  },
  'tax.occupancy.label': { tr: 'Konaklama vergisi', en: 'Accommodation tax', ru: 'Налог на проживание' },
  'tax.occupancy.sub': { tr: 'Aylık beyan · ayın 26\'sı', en: 'Monthly · due 26th', ru: 'Ежемесячно · до 26-го' },
  'tax.occupancy.note': {
    tr: 'Bu ay beyana 4 gün kaldı. Şablon hazır, tek tuş muhasebeciye gider.',
    en: 'Filing due in 4 days. Template ready, one tap to accountant.',
    ru: 'До подачи 4 дня. Шаблон готов — одной кнопкой бухгалтеру.',
  },
  'tax.weeksLeft': { tr: '~{n} hafta · {trend}', en: '~{n} weeks · {trend}', ru: '~{n} недель · {trend}' },
  'tax.trend.up': { tr: 'yükselişte', en: 'rising', ru: 'растёт' },
  'tax.trend.reset': { tr: 'aylık reset', en: 'monthly reset', ru: 'сброс ежемесячно' },
  'tax.send': { tr: 'Muhasebeciye gönder', en: 'Send to accountant', ru: 'Отправить бухгалтеру' },
  'tax.toast.sent': { tr: 'Gönderildi · {email}', en: 'Sent · {email}', ru: 'Отправлено · {email}' },

  // --- BOT ---
  'bot.title': { tr: 'Misafir bot', en: 'Guest bot', ru: 'Гостевой бот' },
  'bot.headline': {
    tr: 'Misafirin sorusunu<br><em>saniyede</em> yanıtla.',
    en: 'Answer guests\'<br><em>instantly</em>.',
    ru: 'Отвечай гостю<br><em>за секунду</em>.',
  },
  'bot.sub': {
    tr: '3 dilli · TR / EN / RU · senin bilgi tabanınla',
    en: '3 languages · TR / EN / RU · on your own knowledge base',
    ru: '3 языка · TR / EN / RU · на вашей базе знаний',
  },
  'bot.name': { tr: 'Kaş Bot', en: 'Kaş Bot', ru: 'Kaş Bot' },
  'bot.meta': { tr: 'Bugün 14 yanıt · 2 eskale', en: 'Today 14 replies · 2 escalated', ru: 'Сегодня 14 ответов · 2 эскалации' },
  'bot.status.handled': { tr: '✓ bot yanıtladı · ses yok', en: '✓ bot handled · no ping', ru: '✓ ответил бот · без пинга' },
  'bot.status.escalated': {
    tr: '⚠ resepsiyona iletildi · Murat\'a push',
    en: '⚠ escalated to front desk · push to Murat',
    ru: '⚠ эскалировано на ресепшн · push Мурату',
  },

  // --- REVIEWS ---
  'reviews.title': { tr: 'Yorumlar', en: 'Reviews', ru: 'Отзывы' },
  'reviews.chips.low': { tr: '★1–2', en: '★1–2', ru: '★1–2' },
  'reviews.new.title': { tr: 'Yeni düşük yorum · {when}', en: 'New low-star review · {when}', ru: 'Новый низкий отзыв · {when}' },
  'reviews.draftLabel': {
    tr: 'AI Taslak · Murat\'ın tonunda',
    en: 'AI draft · in Murat\'s tone',
    ru: 'AI-черновик · в тоне Мурата',
  },
  'reviews.toast.replied': {
    tr: 'Yanıt yayında · 30 sn içinde görünür',
    en: 'Reply published · visible in 30 sec',
    ru: 'Ответ отправлен · появится через 30 сек',
  },
  'reviews.toast.sent': { tr: 'Yanıt gönderildi', en: 'Reply sent', ru: 'Ответ отправлен' },

  // --- VILLA ---
  'villa.reviewsCount': { tr: '{n} yorum', en: '{n} reviews', ru: '{n} отзывов' },
  'villa.occupancy': { tr: 'Doluluk', en: 'Occupancy', ru: 'Заполнено' },
  'villa.monthBookings': { tr: 'Bu ay', en: 'This month', ru: 'За месяц' },
  'villa.amenities': { tr: 'Özellikler', en: 'Amenities', ru: 'Удобства' },
  'villa.platforms': { tr: 'Platformlar', en: 'Platforms', ru: 'Платформы' },
  'villa.upcoming': { tr: 'Yaklaşan misafirler', en: 'Upcoming guests', ru: 'Ближайшие гости' },

  // --- SETTINGS ---
  'settings.plan.active': { tr: 'Aktif paket', en: 'Active plan', ru: 'Активный план' },
  'settings.plan.name': { tr: 'Olgun paket', en: 'Mature plan', ru: 'Полный план' },
  'settings.villas': { tr: 'Villalarım', en: 'My properties', ru: 'Мои объекты' },
  'settings.notifications': { tr: 'Bildirimler', en: 'Notifications', ru: 'Уведомления' },
  'settings.notifications.on': { tr: 'Açık', en: 'On', ru: 'Вкл' },
  'settings.language': { tr: 'Dil', en: 'Language', ru: 'Язык' },
  'settings.accountant': { tr: 'Muhasebeci', en: 'Accountant', ru: 'Бухгалтер' },
  'settings.connected': { tr: 'Bağlı platformlar', en: 'Connected platforms', ru: 'Платформы' },

  // --- AMENITIES (property features) ---
  'amenity.pool': { tr: 'Havuz', en: 'Pool', ru: 'Бассейн' },
  'amenity.seaview': { tr: 'Deniz manzarası', en: 'Sea view', ru: 'Вид на море' },
  'amenity.wifi': { tr: 'Wi-Fi', en: 'Wi-Fi', ru: 'Wi-Fi' },
  'amenity.ac': { tr: 'Klima', en: 'AC', ru: 'Кондиционер' },
  'amenity.terrace': { tr: 'Teras', en: 'Terrace', ru: 'Терраса' },
  'amenity.kitchen': { tr: 'Mutfak', en: 'Kitchen', ru: 'Кухня' },
  'amenity.parking': { tr: 'Ücretsiz park', en: 'Free parking', ru: 'Парковка' },
  'amenity.pet': { tr: 'Pet dostu', en: 'Pet friendly', ru: 'С животными' },
  'amenity.jacuzzi': { tr: 'Jakuzi', en: 'Jacuzzi', ru: 'Джакузи' },

  // --- ONBOARDING ---
  'onboard.1.title': {
    tr: 'Çok platform,<br><em>tek panel.</em>',
    en: 'Many platforms,<br><em>one panel.</em>',
    ru: 'Много площадок —<br><em>одна панель.</em>',
  },
  'onboard.1.body': {
    tr: 'Booking, Airbnb, direkt rezervasyon — hepsi bir ekranda. Çifte rezervasyon sıfır.',
    en: 'Booking, Airbnb, direct bookings — all in one screen. Zero double-bookings.',
    ru: 'Booking, Airbnb, прямые брони — всё на одном экране. Ноль двойных бронирований.',
  },
  'onboard.2.title': {
    tr: 'Haftalık fiyat<br><em>akıllı olur.</em>',
    en: 'Weekly price<br><em>gets smart.</em>',
    ru: 'Недельная цена<br><em>становится умной.</em>',
  },
  'onboard.2.body': {
    tr: 'Her Pazar önümüzdeki 4 hafta için fiyat önerisi gelir. Tek tuşla uygula.',
    en: 'Every Sunday, a price suggestion for the next 4 weeks. One-tap apply.',
    ru: 'Каждое воскресенье предложение цены на 4 недели вперёд. В один тап.',
  },
  'onboard.3.title': {
    tr: 'Vergi eşikleri<br><em>sürpriz değil.</em>',
    en: 'Tax limits<br><em>never a surprise.</em>',
    ru: 'Налоговые пороги —<br><em>без сюрпризов.</em>',
  },
  'onboard.3.body': {
    tr: 'KDV, gelir, konaklama — hepsi izleniyor. Geçmeden önce haber verir.',
    en: 'VAT, income, accommodation — all monitored. Alerts before you cross.',
    ru: 'НДС, подоходный, проживание — всё под контролем. Оповестит заранее.',
  },

  // --- WEB DASHBOARD ---
  'web.nav.overview': { tr: 'Genel bakış', en: 'Overview', ru: 'Обзор' },
  'web.nav.bookings': { tr: 'Rezervasyonlar', en: 'Bookings', ru: 'Бронирования' },
  'web.nav.pricing': { tr: 'Fiyat motoru', en: 'Price engine', ru: 'Прайс-движок' },
  'web.nav.tax': { tr: 'Vergi paneli', en: 'Tax panel', ru: 'Налоговая панель' },
  'web.nav.bot': { tr: 'Misafir botu', en: 'Guest bot', ru: 'Гостевой бот' },
  'web.nav.reviews': { tr: 'Yorumlar', en: 'Reviews', ru: 'Отзывы' },
  'web.nav.villas': { tr: 'Villalar', en: 'Properties', ru: 'Объекты' },
  'web.nav.settings': { tr: 'Ayarlar', en: 'Settings', ru: 'Настройки' },
  'web.header.search': {
    tr: 'Rezervasyon, misafir veya villa ara...',
    en: 'Search bookings, guests or villas...',
    ru: 'Найти броню, гостя или виллу...',
  },
  'web.header.new': { tr: 'Yeni', en: 'New', ru: 'Создать' },
  'web.kpi.revenue': { tr: 'Bu ay gelir', en: 'Revenue this month', ru: 'Выручка за месяц' },
  'web.kpi.occupancy': { tr: 'Ortalama doluluk', en: 'Average occupancy', ru: 'Средняя заполняемость' },
  'web.kpi.revpar': { tr: 'RevPAR', en: 'RevPAR', ru: 'RevPAR' },
  'web.kpi.satisfaction': { tr: 'Memnuniyet', en: 'Satisfaction', ru: 'Удовлетворённость' },
  'web.trend.vs': { tr: 'geçen aya göre', en: 'vs last month', ru: 'к прошлому месяцу' },
  'web.overview.calendar': { tr: 'Nisan takvimi', en: 'April calendar', ru: 'Календарь — апрель' },
  'web.overview.actions': { tr: 'Karar bekleyenler', en: 'Awaiting decision', ru: 'Требуют решения' },
  'web.overview.agenda': { tr: 'Yaklaşan misafirler', en: 'Upcoming guests', ru: 'Ближайшие гости' },
  'web.pricing.table.week': { tr: 'Hafta', en: 'Week', ru: 'Неделя' },
  'web.pricing.table.occ': { tr: 'Doluluk', en: 'Occupancy', ru: 'Заполнено' },
  'web.pricing.table.current': { tr: 'Şu an', en: 'Current', ru: 'Текущая' },
  'web.pricing.table.suggested': { tr: 'Öneri', en: 'Suggested', ru: 'Предложено' },
  'web.pricing.table.delta': { tr: 'Fark', en: 'Δ', ru: 'Δ' },
  'web.pricing.table.reason': { tr: 'Sebep', en: 'Reason', ru: 'Причина' },
  'web.pricing.table.action': { tr: 'Eylem', en: 'Action', ru: 'Действие' },
  'web.bookings.calendar': { tr: 'Takvim', en: 'Calendar', ru: 'Календарь' },
  'web.bookings.list': { tr: 'Liste', en: 'List', ru: 'Список' },
  'web.footer.mock': {
    tr: 'Mock veri · prototip',
    en: 'Mock data · prototype',
    ru: 'Мок-данные · прототип',
  },
  'web.footer.tim': {
    tr: 'Tim Zinin için · iç sürüm',
    en: 'For Tim Zinin · internal',
    ru: 'Для Тима Зинина · внутренняя версия',
  },

  // --- EMPTY / ERRORS ---
  'empty.noAlerts': { tr: 'Bugün kritik uyarı yok', en: 'No critical alerts today', ru: 'Сегодня без тревог' },
  'empty.noReviews': { tr: 'Henüz yorum yok', en: 'No reviews yet', ru: 'Отзывов пока нет' },

  // --- MISC ---
  'misc.connected': { tr: 'Bağlı', en: 'Connected', ru: 'Подключено' },
  'misc.platforms.all': { tr: '4 platform', en: '4 platforms', ru: '4 платформы' },
  'misc.lastSync': { tr: '34 sn', en: '34 s', ru: '34 с' },
  'misc.3diller': { tr: '3 dilli (TR/EN/RU)', en: '3 languages (TR/EN/RU)', ru: '3 языка (TR/EN/RU)' },
};
