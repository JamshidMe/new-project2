import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Heart } from "lucide-react";
import type { Lang } from "../data/wedding";
import { t } from "../i18n";

type Props = {
  lang: Lang;
  dateISO: string;
  onAddToCalendar: () => void;
};

export function CalendarRing({ lang, dateISO, onAddToCalendar }: Props) {
  const date = useMemo(() => new Date(dateISO), [dateISO]);
  const [selected, setSelected] = useState(date.getDate());
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const monthNames = {
    uz: [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
    ],
    en: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[280px] w-[280px]">
        <svg viewBox="0 0 280 280" className="absolute inset-0 h-full w-full">
          <circle cx="140" cy="140" r="122" fill="none" stroke="#EAD9BC" strokeWidth="1.5" />
          <motion.circle
            cx="140"
            cy="140"
            r="122"
            fill="none"
            stroke="#C19239"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="766"
            initial={{ strokeDashoffset: 766 }}
            animate={{ strokeDashoffset: 766 - (date.getDate() / daysInMonth) * 766 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            transform="rotate(-90 140 140)"
          />
        </svg>

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const angle = (index / daysInMonth) * Math.PI * 2 - Math.PI / 2;
          const radius = 122;
          const x = 140 + Math.cos(angle) * radius;
          const y = 140 + Math.sin(angle) * radius;
          const isWedding = day === date.getDate();
          const isSelected = day === selected;
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelected(day)}
              aria-label={String(day)}
              className="absolute flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold transition"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className={
                  isWedding
                    ? "flex h-7 w-7 items-center justify-center rounded-full bg-maroon-600 text-[10px] font-bold text-cream-50 shadow-md"
                    : isSelected
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-maroon-800"
                      : "flex h-6 w-6 items-center justify-center rounded-full text-ink/55 hover:bg-cream-200"
                }
              >
                {day}
              </span>
            </button>
          );
        })}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-600">
            {monthNames[lang][date.getMonth()]}
          </span>
          <span className="font-display text-6xl font-semibold leading-none text-maroon-700">
            {date.getDate()}
          </span>
          <span className="text-xs font-medium tracking-wide text-ink/50">{date.getFullYear()}</span>
          {selected === date.getDate() ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-maroon-600/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-maroon-700"
            >
              <Heart size={11} /> {t(lang, "weddingTitle")}
            </motion.span>
          ) : (
            <span className="mt-2 text-[10px] uppercase tracking-wider text-ink/40">
              {t(lang, "tapDayHint")}
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 text-center text-[11px] text-ink/45">
        {t(lang, "dateLabel")}:{" "}
        {new Intl.DateTimeFormat(lang === "uz" ? "uz-UZ" : "en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(date)}
      </p>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onAddToCalendar}
        className="btn-primary mt-5 max-w-[19rem]"
      >
        <CalendarPlus size={18} />
        {t(lang, "addToCalendar")}
      </motion.button>
    </div>
  );
}
