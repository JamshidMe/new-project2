import { motion } from "framer-motion";
import type { Lang } from "../data/wedding";

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  right?: React.ReactNode;
};

export function TopBar({ lang, setLang, right }: Props) {
  return (
    <div className="sticky top-0 z-40 border-b border-gold-300/40 bg-cream-100/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-wide text-maroon-700">
            J&nbsp;&amp;&nbsp;K
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-gold-600 sm:inline">
            Taklifnoma
          </span>
        </div>

        <div className="flex items-center gap-2">
          {right}
          <div className="flex items-center rounded-full border border-gold-300/60 bg-cream-50 p-0.5">
            {(["uz", "en"] as Lang[]).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className="relative rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition"
                  aria-pressed={active}
                >
                  {active && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 rounded-full bg-maroon-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={active ? "relative text-cream-50" : "relative text-maroon-700/70"}>
                    {code === "uz" ? "UZB" : "ENG"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
