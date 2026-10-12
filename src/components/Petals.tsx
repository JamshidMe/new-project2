import { motion } from "framer-motion";

const PETALS = ["🌸", "🌷", "✨", "🤍", "🌹"];

export function Petals({ count = 14 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, index) => ({
    id: index,
    emoji: PETALS[index % PETALS.length],
    left: (index * 137.5) % 100,
    delay: (index % 7) * 0.8,
    duration: 9 + (index % 5) * 1.6,
    size: 10 + (index % 4) * 4,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute -top-10 select-none"
          style={{ left: `${petal.left}%`, fontSize: `${petal.size}px` }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "108vh", opacity: [0, 0.85, 0.85, 0], rotate: 320 }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {petal.emoji}
        </motion.span>
      ))}
    </div>
  );
}
