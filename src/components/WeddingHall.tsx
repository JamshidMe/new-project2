import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, Heart, Shield, Sparkles } from "lucide-react";
import type { Lang } from "../data/wedding";
import { EXTRAS } from "../i18n";

type Side = "women" | "men";

export function WeddingHall({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<Side | null>(null);
  const copy = EXTRAS[lang];

  const cards: Array<{
    side: Side;
    title: string;
    wishes: string[];
    icon: React.ReactNode;
    accent: string;
    soft: string;
  }> = [
    {
      side: "women",
      title: copy.womenSideTitle,
      wishes: copy.womenWishes,
      icon: <Flower2 size={20} />,
      accent: "from-gold-300/90 to-gold-500/90",
      soft: "bg-cream-50",
    },
    {
      side: "men",
      title: copy.menSideTitle,
      wishes: copy.menWishes,
      icon: <Shield size={20} />,
      accent: "from-maroon-600 to-maroon-800",
      soft: "bg-cream-50",
    },
  ];

  return (
    <section className="px-6 py-10">
      <div className="mb-6 text-center">
        <p className="section-label">{copy.hallTitle}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">{copy.hallTitle}</h2>
        <p className="mx-auto mt-2 max-w-[22rem] text-sm leading-relaxed text-ink/60">
          {copy.hallSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, index) => {
          const isOpen = open === card.side;
          return (
            <motion.button
              key={card.side}
              type="button"
              onClick={() => setOpen(isOpen ? null : card.side)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl border border-gold-300/50 bg-cream-50 p-4 text-left shadow-card"
            >
              <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`} />

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-600/10 text-maroon-700">
                {card.icon}
              </span>

              <span className="mt-3 font-display text-lg font-semibold leading-tight text-maroon-700">
                {card.title}
              </span>

              <span className="mt-1 text-[11px] leading-relaxed text-ink/50">{copy.hallHint}</span>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.span
                    key="wishes"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 flex flex-col gap-2 overflow-hidden"
                  >
                    {card.wishes.map((wish, wishIndex) => (
                      <motion.span
                        key={wish}
                        initial={{ opacity: 0, x: card.side === "women" ? -8 : 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: wishIndex * 0.1 }}
                        className="flex items-start gap-2 rounded-2xl bg-cream-100 p-2.5 text-[11.5px] leading-relaxed text-ink/75"
                      >
                        <Heart size={12} className="mt-1 shrink-0 text-gold-500" fill="currentColor" />
                        <span>{wish}</span>
                      </motion.span>
                    ))}
                  </motion.span>
                )}
              </AnimatePresence>

              <span className="mt-auto flex items-center gap-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600">
                <Sparkles size={11} />
                {card.side === "women" ? "←" : "→"}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
