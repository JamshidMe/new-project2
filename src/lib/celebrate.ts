import confetti from "canvas-confetti";

const COLORS = ["#8E2F3C", "#C19239", "#E3C27A", "#FBF6EC", "#D4A94F"];

export function celebrate() {
  const heart = confetti.shapeFromText({ text: "❤️", scalar: 2.2 });

  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    origin: { x: 0.2, y: 0.75 },
    colors: COLORS,
    scalar: 0.9,
    zIndex: 60,
  });
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    origin: { x: 0.8, y: 0.75 },
    colors: COLORS,
    scalar: 0.9,
    zIndex: 60,
  });

  window.setTimeout(() => {
    confetti({
      particleCount: 22,
      spread: 100,
      startVelocity: 28,
      origin: { x: 0.5, y: 0.4 },
      shapes: [heart],
      scalar: 1.8,
      zIndex: 60,
    });
  }, 260);

  window.setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 32,
      decay: 0.92,
      origin: { x: 0.5, y: 0.3 },
      colors: COLORS,
      zIndex: 60,
    });
  }, 520);
}
