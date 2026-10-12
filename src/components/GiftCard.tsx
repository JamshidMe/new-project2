import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, CreditCard } from "lucide-react";
import { WEDDING, type Lang } from "../data/wedding";
import { t } from "../i18n";

export function GiftCard({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(WEDDING.gift.cardRaw);
    } catch {
      const input = document.createElement("input");
      input.value = WEDDING.gift.cardRaw;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="rounded-3xl border border-gold-300/50 bg-cream-50 p-5 shadow-card">
      <p className="text-sm leading-relaxed text-ink/65">{t(lang, "giftText")}</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-maroon-700 via-maroon-600 to-maroon-800 p-5 text-cream-50 shadow-soft"
      >
        <span
          aria-hidden="true"
          className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-gold-400/20 blur-2xl"
        />
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-300">
            {WEDDING.gift.bank}
          </span>
          <CreditCard size={20} className="text-gold-300" />
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-8 w-11 rounded-md bg-gradient-to-br from-gold-300 to-gold-500 shadow-inner" />
          <span className="text-[11px] uppercase tracking-widest text-cream-50/70">UZCARD</span>
        </div>

        <p className="mt-4 font-display text-2xl tracking-[0.14em]">{WEDDING.gift.cardNumber}</p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream-50/55">
              {t(lang, "cardholder")}
            </p>
            <p className="text-sm font-semibold">{WEDDING.gift.holder}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream-50/55">EXP</p>
            <p className="text-sm font-semibold">••/••</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={copy}
        className="btn-primary mt-4"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? t(lang, "copied") : t(lang, "copyCard")}
      </motion.button>
    </div>
  );
}
