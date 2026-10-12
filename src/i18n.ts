import type { Lang } from "./data/wedding";

export const COPY: Record<Lang, Record<string, string>> = {
  uz: {
    dearGuest: "Hurmatli mehmonimiz!",
    giftScreenSubtitle: "Sizni hayotimizdagi eng quvonchli kuniga taklif etamiz",
    openGift: "SOVG'ANI OCHISH UCHUN BOSING",
    tapHint: "Sovg'a yoki tugmani bosing",
    weddingTitle: "Nikoh to'yi",
    invitationFor: "Taklifnoma",
    twoHearts: "Ikki qalb — bir taqdir",
    welcome:
      "Qadrli mehmonimiz! Ikki oila — Jamshidbek va Kamola oilalarining quvonchli kuniga sizni samimiy taklif etamiz. Bu baxtli kunni biz bilan baham ko'rishishingiz biz uchun katta sharaf.",
    dateLabel: "To'y sanasi",
    addToCalendar: "Taqvimga qo'shish",
    tapDayHint: "Kunni tanlang",
    scheduleTitle: "Kun tartibi",
    venueTitle: "Qayerda?",
    venueLabel: "To'yxona",
    addressLabel: "Manzil",
    openGoogleMaps: "Google Maps",
    openYandexGo: "Yandex Go",
    giftTitle: "Sovg'a uchun",
    giftText:
      "Sizning tashrifingiz — eng katta sovg'a. Agar sovg'a qilishni istasangiz, quyidagi karta raqamidan foydalanishingiz mumkin.",
    cardNumber: "Karta raqami",
    cardholder: "Karta egasi",
    copyCard: "Raqamdan nusxa olish",
    copied: "Nusxa olindi!",
    rsvpTitle: "Kelasizmi?",
    nameLabel: "Ismingiz",
    namePlaceholder: "To'liq ismingiz",
    attending: "Albatta, kelaman",
    notAttending: "Afsuski, kela olmayman",
    guestsLabel: "Necha kishi?",
    wishesLabel: "Tilaklaringiz",
    wishesPlaceholder: "Yosh kelin-kuyovga tilaklaringizni yozib qoldiring...",
    submitRsvp: "Javobni yuborish",
    sendingRsvp: "Yuborilmoqda...",
    sendError: "Javobni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    confirmationTitle: "Rahmat!",
    confirmationAttending:
      "Javobingiz qabul qilindi. Sizni to'yimizda ko'rishdan juda xursand bo'lamiz!",
    confirmationNotAttending:
      "Javobingiz uchun rahmat. Sizni sog'inamiz va yaxshi tilaklaringiz uchun minnatdormiz.",
    close: "Yopish",
    requiredName: "Iltimos, ismingizni kiriting.",
    footer: "Sizni kutamiz!",
    musicOn: "Musiqani yoqish",
    musicOff: "Musiqani o'chirish",
    countdownDays: "kun",
    countdownHours: "soat",
    countdownMinutes: "daqiqa",
    countdownSeconds: "soniya",
    untilWedding: "To'yga qadar",
  },
  en: {
    dearGuest: "Dear Guest!",
    giftScreenSubtitle: "We invite you to the happiest day of our lives",
    openGift: "TAP TO OPEN THE GIFT",
    tapHint: "Tap the gift or the button",
    weddingTitle: "Wedding Celebration",
    invitationFor: "Invitation",
    twoHearts: "Two hearts — one destiny",
    welcome:
      "Dear guest! Two families — the families of Jamshidbek and Kamola — warmly invite you to share in our joy. It would be a great honour to celebrate this happy day with you.",
    dateLabel: "Wedding date",
    addToCalendar: "Add to Calendar",
    tapDayHint: "Tap a day",
    scheduleTitle: "Schedule",
    venueTitle: "Venue",
    venueLabel: "Hall",
    addressLabel: "Address",
    openGoogleMaps: "Google Maps",
    openYandexGo: "Yandex Go",
    giftTitle: "Gifts",
    giftText:
      "Your presence is the greatest gift. If you wish to give something, you may use the card number below.",
    cardNumber: "Card number",
    cardholder: "Cardholder",
    copyCard: "Copy Card Number",
    copied: "Copied!",
    rsvpTitle: "Will you attend?",
    nameLabel: "Your Name",
    namePlaceholder: "Your full name",
    attending: "Attending",
    notAttending: "Unable to attend",
    guestsLabel: "Number of guests",
    wishesLabel: "Wishes / Message",
    wishesPlaceholder: "Leave your wishes for the newlyweds...",
    submitRsvp: "Submit RSVP",
    sendingRsvp: "Sending...",
    sendError: "Could not send your RSVP. Please try again.",
    confirmationTitle: "Thank you!",
    confirmationAttending:
      "Your response has been received. We will be delighted to see you at our wedding!",
    confirmationNotAttending:
      "Thank you for your response. We will miss you and appreciate your kind wishes.",
    close: "Close",
    requiredName: "Please enter your name.",
    footer: "We look forward to seeing you!",
    musicOn: "Play music",
    musicOff: "Pause music",
    countdownDays: "days",
    countdownHours: "hours",
    countdownMinutes: "minutes",
    countdownSeconds: "seconds",
    untilWedding: "Until the wedding",
  },
};

export function t(lang: Lang, key: string): string {
  return COPY[lang][key] ?? key;
}

export const EXTRAS: Record<
  Lang,
  {
    secretTitle: string;
    secretHint: string;
    secretDay: string;
    secretMonth: string;
    secretButton: string;
    secretError: string;
    loveNoteBody: string;
    loveNoteSignature: string;
    hallTitle: string;
    hallSubtitle: string;
    hallHint: string;
    womenSideTitle: string;
    menSideTitle: string;
    womenWishes: string[];
    menWishes: string[];
    createdBy: string;
    finalWish: string;
  }
> = {
  uz: {
    secretTitle: "Senga, qalbimdan",
    secretHint: "Bu sirni ochish uchun tug'ilgan kuningni yoz",
    secretDay: "Kun",
    secretMonth: "Oy",
    secretButton: "Sirni ochish",
    secretError: "Bu sir faqat senga tegishli. Yana bir bor urinib ko'r.",
    loveNoteBody:
      "Aziz Kamola,\n\nSen bilan o'tgan har bir kun qalbimda alohida nur qoldirdi. Ba'zi odamlar hayotga shunchaki kirib keladi, ba'zilari esa butun dunyoni o'zgartirib yuboradi. Sen ikkinchisisan.\n\nSeni o'ylaganimda kelajak go'zal ko'rinadi. 27-aprel 2027 — o'sha go'zal kelajakning boshlanishi.",
    loveNoteSignature: "Qalbim bilan,\nJamshidbek",
    hallTitle: "To'yxonadagi o'rin",
    hallSubtitle:
      "Qadimdan to'ylarimizda ayollar va erkaklar alohida o'tirishgan. O'z tomoningizni tanlang — bu tilaklar siz uchun.",
    hallHint: "Tilaklarni ko'rish uchun bosing",
    womenSideTitle: "Chap tomon — Ayollar",
    menSideTitle: "O'ng tomon — Erkaklar",
    womenWishes: [
      "Har bir kuningiz quvonchga, uyingizga baxt va mehr to'lib tursin.",
      "Doimo sog'lom, chiroyli va baxtli bo'ling.",
      "Yangi oilangizda mehr, hurmat va iliqlik hech qachon kam bo'lmasin.",
    ],
    menWishes: [
      "Har bir ishingiz baraka topsin, uyingizga fayz olib kelsin.",
      "Doimo kuchli, adolatli va baxtli bo'lib qoling.",
      "Yangi oilangizda tinchlik, rizq va baxt hech qachon tugamasin.",
    ],
    createdBy: "Created by Jamshidbek",
    finalWish: "Sizni kutamiz!",
  },
  en: {
    secretTitle: "From my heart, to you",
    secretHint: "Enter your birthday to unlock this secret",
    secretDay: "Day",
    secretMonth: "Month",
    secretButton: "Unlock the secret",
    secretError: "This secret belongs only to you. Please try again.",
    loveNoteBody:
      "My dearest Kamola,\n\nEvery day with you has left a quiet light in my heart. Some people simply enter your life; others change the whole world around you. You are the second kind.\n\nWhen I think of you, the future looks beautiful. 27 April 2027 is where that beautiful future begins.",
    loveNoteSignature: "With all my heart,\nJamshidbek",
    hallTitle: "The wedding hall",
    hallSubtitle:
      "Traditionally, women and men celebrate on separate sides. Choose your side — these wishes are for you.",
    hallHint: "Tap to see the wishes",
    womenSideTitle: "Left side — Women",
    menSideTitle: "Right side — Men",
    womenWishes: [
      "May every day bring you joy, and may your home always be full of kindness.",
      "May you always be healthy, radiant and happy.",
      "May respect, warmth and affection never leave your new family.",
    ],
    menWishes: [
      "May your work be blessed and bring light to your home.",
      "May you always stay strong, fair and happy.",
      "May peace, prosperity and joy never leave your new family.",
    ],
    createdBy: "Created by Jamshidbek",
    finalWish: "We look forward to seeing you!",
  },
};

