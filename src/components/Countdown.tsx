import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING, type Lang } from "../data/wedding";
import { t } from "../i18n";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown({ lang }: { lang: Lang }) {
  const target = useMemo(() => new Date(WEDDING.dateISO).getTime(), []);
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const timer = window.setInterval(() => setTime(diff(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const items = [
    { value: time.days, label: t(lang, "countdownDays") },
    { value: time.hours, label: t(lang, "countdownHours") },
    { value: time.minutes, label: t(lang, "countdownMinutes") },
    { value: time.seconds, label: t(lang, "countdownSeconds") },
  ];

  return (
    <div className="px-6 py-8">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-600">
        {t(lang, "untilWedding")}
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="rounded-2xl border border-gold-300/50 bg-cream-50/90 px-1 py-4 text-center shadow-card backdrop-blur-sm"
          >
            <p className="font-display text-[1.85rem] font-semibold leading-none text-maroon-700 tabular-nums">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/50">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
