import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import type { Lang } from "../data/wedding";
import { t } from "../i18n";

type Props = {
  lang: Lang;
  onOpen: () => void;
};

export function GiftScreen({ lang, onOpen }: Props) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden px-6 py-10">
      <span className="floral-corner floral-corner--tl" aria-hidden="true" />
      <span className="floral-corner floral-corner--br" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2 text-center"
      >
        <p className="section-label">{t(lang, "invitationFor")}</p>
        <h1 className="mt-4 font-display text-[2.15rem] font-semibold leading-tight text-maroon-700">
          {t(lang, "dearGuest")}
        </h1>
        <p className="mx-auto mt-3 max-w-[19rem] text-sm leading-relaxed text-ink/65">
          {t(lang, "giftScreenSubtitle")}
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, type: "spring", stiffness: 120, damping: 16 }}
        whileTap={{ scale: 0.94, rotate: -1.5 }}
        whileHover={{ y: -4 }}
        className="relative my-10 outline-none"
        aria-label={t(lang, "openGift")}
      >
        <motion.span
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative block h-[210px] w-[210px]"
        >
          {/* Gift box */}
          <span className="absolute inset-x-4 bottom-0 top-12 rounded-2xl ikat shadow-[0_30px_50px_-28px_rgba(75,21,32,0.8)]" />
          <span className="absolute inset-x-4 bottom-0 top-12 rounded-2xl bg-gradient-to-b from-white/20 to-transparent" />
          {/* Lid */}
          <motion.span
            animate={{ rotate: [0, -1.5, 0, 1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1 right-1 top-6 h-10 rounded-xl ikat shadow-lg"
          />
          {/* Silk ribbon vertical */}
          <span className="absolute bottom-0 left-1/2 top-6 w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 opacity-90" />
          {/* Silk ribbon horizontal */}
          <span className="absolute left-1 right-1 top-[74px] h-5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 opacity-90" />
          {/* Bow */}
          <span className="absolute left-1/2 top-2 -translate-x-1/2 text-3xl drop-shadow-md">🎀</span>
          <Sparkles className="absolute -right-2 top-2 animate-pulse text-gold-500" size={20} />
          {[
            { left: "-6%", top: "18%", delay: 0 },
            { left: "98%", top: "30%", delay: 0.8 },
            { left: "8%", top: "82%", delay: 1.4 },
            { left: "88%", top: "76%", delay: 2 },
          ].map((heart) => (
            <motion.span
              key={heart.left}
              className="absolute text-lg"
              style={{ left: heart.left, top: heart.top }}
              animate={{ y: [0, -10, 0], opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: heart.delay, ease: "easeInOut" }}
              aria-hidden="true"
            >
              💛
            </motion.span>
          ))}
        </motion.span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onOpen}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary max-w-[19rem] text-[13px] tracking-[0.08em]"
      >
        <Gift size={17} />
        {t(lang, "openGift")}
      </motion.button>

      <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/40">{t(lang, "tapHint")}</p>
    </div>
  );
}
