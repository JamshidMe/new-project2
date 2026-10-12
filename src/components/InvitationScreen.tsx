import { motion } from "framer-motion";
import { Clock, Heart, Sparkles } from "lucide-react";
import { CalendarRing } from "./CalendarRing";
import { Countdown } from "./Countdown";
import { GiftCard } from "./GiftCard";
import { LoveNote } from "./LoveNote";
import { MapPreview } from "./MapPreview";
import { RsvpForm } from "./RsvpForm";
import { WeddingHall } from "./WeddingHall";
import { WEDDING, formatDateForIcs, type Lang } from "../data/wedding";
import { EXTRAS, t } from "../i18n";

type Props = { lang: Lang };

export function InvitationScreen({ lang }: Props) {
  function addToCalendar() {
    const { start, end } = formatDateForIcs(WEDDING.dateISO);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Jamshidbek & Kamola//Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding-invitation`,
      `DTSTAMP:${start}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${WEDDING.couple.groom} & ${WEDDING.couple.bride} — ${t(lang, "weddingTitle")}`,
      `LOCATION:${WEDDING.venue.name}, ${WEDDING.venue.address}`,
      `DESCRIPTION:${t(lang, "twoHearts")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jamshidbek-kamola-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative flex flex-1 flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-10 pt-10 text-center">
        <span className="floral-corner floral-corner--tl" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-gold-300/20 to-transparent" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-label relative"
        >
          {t(lang, "invitationFor")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="gold-shimmer relative mt-3 font-display text-4xl font-semibold"
        >
          {t(lang, "weddingTitle")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 140, damping: 18 }}
          className="relative mt-5"
        >
          <p className="font-display text-[2.7rem] font-semibold leading-tight text-ink">
            {WEDDING.couple.groom}
            <span className="mx-2 text-gold-500">&amp;</span>
            {WEDDING.couple.bride}
          </p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 gold-line" />
            <Heart size={14} className="text-maroon-500" />
            <span className="h-px w-12 gold-line" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mt-7 rounded-[26px] border border-gold-300/50 bg-cream-50/80 p-6 shadow-card backdrop-blur-sm"
        >
          <p className="font-display text-2xl font-semibold italic text-maroon-600">
            {t(lang, "twoHearts")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/68">{t(lang, "welcome")}</p>
        </motion.div>
      </section>

      {/* SECRET LOVE LETTER */}
      <LoveNote lang={lang} />

      {/* WEDDING HALL — WOMEN LEFT / MEN RIGHT */}
      <WeddingHall lang={lang} />

      {/* COUNTDOWN */}
      <Countdown lang={lang} />

      {/* DATE + CALENDAR */}
      <section className="px-6 py-10">
        <div className="mb-6 text-center">
          <p className="section-label">{t(lang, "dateLabel")}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">
            {WEDDING.date[lang]}
          </h2>
          <p className="mt-1 text-sm text-ink/55">
            {WEDDING.weekday[lang]} · {WEDDING.time[lang]}
          </p>
        </div>
        <CalendarRing lang={lang} dateISO={WEDDING.dateISO} onAddToCalendar={addToCalendar} />
      </section>

      {/* SCHEDULE */}
      <section className="px-6 py-10">
        <div className="mb-6 text-center">
          <p className="section-label">{t(lang, "scheduleTitle")}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">
            {t(lang, "scheduleTitle")}
          </h2>
        </div>

        <div className="relative ml-3 border-l border-dashed border-gold-400/70 pl-6">
          {WEDDING.timeline.map((item, index) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08 }}
              className="relative pb-8 last:pb-0"
            >
              <span className="absolute -left-[31px] flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/70 bg-cream-50 text-maroon-700 shadow-sm">
                <Clock size={15} />
              </span>
              <div className="rounded-3xl border border-gold-300/50 bg-cream-50 p-5 shadow-card">
                <p className="font-display text-2xl font-semibold text-maroon-700">{item.time}</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">{item.title[lang]}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.note[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VENUE */}
      <section className="px-6 py-10">
        <div className="mb-6 text-center">
          <p className="section-label">{t(lang, "venueTitle")}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">
            {t(lang, "venueTitle")}
          </h2>
        </div>
        <MapPreview lang={lang} />
      </section>

      {/* GIFTS */}
      <section className="px-6 py-10">
        <div className="mb-6 text-center">
          <p className="section-label">{t(lang, "giftTitle")}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">
            {t(lang, "giftTitle")}
          </h2>
        </div>
        <GiftCard lang={lang} />
      </section>

      {/* RSVP */}
      <section className="px-6 py-10">
        <div className="mb-6 text-center">
          <p className="section-label">{t(lang, "rsvpTitle")}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">
            {t(lang, "rsvpTitle")}
          </h2>
        </div>
        <RsvpForm lang={lang} />
      </section>

      {/* FOOTER */}
      <footer className="relative mt-4 overflow-hidden bg-maroon-700 px-6 py-12 text-center text-cream-50">
        <div className="pointer-events-none absolute inset-0 ikat opacity-25" aria-hidden="true" />
        <div className="relative">
          <Sparkles className="mx-auto text-gold-300" size={22} />
          <p className="mt-4 font-display text-3xl font-semibold">{t(lang, "footer")}</p>
          <p className="mt-2 font-display text-2xl italic text-gold-300">
            {WEDDING.couple.groom} &amp; {WEDDING.couple.bride}
          </p>
          <div className="mx-auto mt-5 h-px w-24 bg-gold-300/60" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-cream-50/60">
            {WEDDING.date[lang]} · {WEDDING.venue.address}
          </p>

          <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-cream-50/45">
            {EXTRAS[lang].createdBy}
          </p>
        </div>
      </footer>
    </div>
  );
}
