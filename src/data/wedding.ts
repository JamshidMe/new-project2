export type Lang = "uz" | "en";

export const WEDDING = {
  couple: {
    groom: "Jamshidbek",
    bride: "Kamola",
    // Secret letter unlocks only with this birthday: 1 March
    brideBirthday: { day: 1, month: 3 },
  },
  // Change this single value to update the calendar, countdown and .ics event.
  dateISO: "2027-04-27T12:00:00",
  date: {
    uz: "27-aprel, 2027",
    en: "April 27, 2027",
  },
  weekday: {
    uz: "Seshanba",
    en: "Tuesday",
  },
  time: {
    uz: "12:00",
    en: "12:00 PM",
  },
  venue: {
    name: "Istiqlol to'yxonasi",
    address: "Kosonsoy tumani",
    lat: 41.2516,
    lng: 71.5483,
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Istiqlol%20to%27yxonasi%20Kosonsoy",
    yandexGo:
      "https://yandex.com/maps/?text=Istiqlol%20to%27yxonasi%20Kosonsoy%2C%20Namangan",
    embed:
      "https://www.openstreetmap.org/export/embed.html?bbox=71.508%2C41.218%2C71.592%2C41.286&layer=mapnik&marker=41.2516%2C71.5483",
  },
  gift: {
    cardNumber: "8600 0000 0000 0000",
    cardRaw: "8600000000000000",
    holder: "Jamshidbek M.",
    bank: "UZCARD / HUMO",
  },
  music: {
    // Exact track from the shared link: https://youtu.be/oBzE7gDRbdo
    youtubeId: "oBzE7gDRbdo",
    // Optional offline fallback (used only if youtubeId is empty)
    src: "/music/azizam.mp3",
    startAt: 43, // 0:43
    title: "Izzat Shukurov — Azizam",
  },
  rsvp: {
    // All RSVP wishes are emailed to this Gmail address (not Telegram).
    email: "jamshidbekmarufjonov6@gmail.com",
  },
  video: {
    // Put a short traditional wedding clip here: public/videos/tradition.mp4
    src: "/videos/tradition.mp4",
    poster: "/videos/poster.jpg",
    // Optional YouTube fallback if you prefer to embed instead of a local file
    youtubeId: "",
  },
  backgroundVideo: {
    // Full-screen animated background video. Put the file at public/videos/background.mp4
    src: "/videos/background.mp4",
    poster: "/videos/background-poster.jpg",
    // Or set a YouTube video ID to use as the moving background
    youtubeId: "",
  },
  timeline: [
    {
      time: "06:00",
      title: {
        uz: "Nahor oshi",
        en: "Morning Pilaf",
      },
      note: {
        uz: "Yangi kun, yangi baxt — an'anaviy osh bilan boshlanadi.",
        en: "A new day and a new happiness — beginning with traditional pilaf.",
      },
    },
    {
      time: "12:00",
      title: {
        uz: "Nikoh marosimi / To'y tantanasi",
        en: "Wedding Ceremony / Reception",
      },
      note: {
        uz: "Ikki qalbning birlashuvi va tantanali ziyofat.",
        en: "The union of two hearts and the celebration feast.",
      },
    },
  ],
};

export function formatDateForIcs(dateISO: string): { start: string; end: string } {
  const date = new Date(dateISO);
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return {
    start: `${y}${m}${d}T060000`,
    end: `${y}${m}${d}T180000`,
  };
}
