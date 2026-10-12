import { motion } from "framer-motion";

export function Fireflies({ count = 16 }: { count?: number }) {
  const flies = Array.from({ length: count }, (_, index) => ({
    id: index,
    left: (index * 61) % 100,
    top: 30 + ((index * 37) % 60),
    delay: (index % 8) * 0.9,
    duration: 6 + (index % 5) * 1.8,
    size: 3 + (index % 3),
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {flies.map((fly) => (
        <motion.span
          key={fly.id}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: `${fly.left}%`,
            top: `${fly.top}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            boxShadow: "0 0 10px 3px rgba(227,194,122,0.65)",
          }}
          animate={{
            y: [0, -26, 6, -18, 0],
            x: [0, 10, -8, 6, 0],
            opacity: [0, 0.9, 0.5, 0.85, 0],
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
