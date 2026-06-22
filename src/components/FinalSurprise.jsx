import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Firework({ x, y, delay }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    color: ["#ff6b9d", "#d4af37", "#c8508a", "#ffb6c1"][i % 4],
  }));

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * 80,
            y: Math.sin(p.angle) * 80,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function RosePetal({ delay, left }) {
  return (
    <motion.div
      className="absolute pointer-events-none text-2xl select-none"
      style={{ left: `${left}%`, top: "-5%" }}
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ["0vh", "110vh"],
        rotate: [0, 360, 720],
        opacity: [0, 1, 1, 0],
        x: [0, 30, -20, 40],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    >
      🌹
    </motion.div>
  );
}

function HeartExplosion({ trigger }) {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (i / 30) * Math.PI * 2,
    distance: 100 + Math.random() * 200,
    size: 16 + Math.random() * 24,
    delay: Math.random() * 0.5,
  }));

  if (!trigger) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{ fontSize: h.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos(h.angle) * h.distance,
            y: Math.sin(h.angle) * h.distance,
            opacity: [1, 1, 0],
            scale: [0, 1.5, 0.5],
          }}
          transition={{ duration: 2, delay: h.delay, ease: "easeOut" }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}

export default function FinalSurprise() {
  const [phase, setPhase] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [heartExplosion, setHeartExplosion] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const triggerSequence = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);

    setTimeout(() => setPhase(1), 500);
    setTimeout(() => {
      setHeartExplosion(true);
      setShowFireworks(true);
    }, 2000);
    setTimeout(() => setPhase(2), 3500);
  }, [hasTriggered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) triggerSequence();
      },
      { threshold: 0.5 },
    );

    const el = document.getElementById("surprise");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [triggerSequence]);

  const fireworks = showFireworks
    ? Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: `${15 + Math.random() * 70}%`,
        y: `${10 + Math.random() * 50}%`,
        delay: i * 0.3,
      }))
    : [];

  return (
    <section
      id="surprise"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-deep/5 to-purple-deep/20 pointer-events-none" />

      {Array.from({ length: 15 }, (_, i) => (
        <RosePetal key={i} delay={i * 0.8} left={Math.random() * 100} />
      ))}

      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x} y={fw.y} delay={fw.delay} />
      ))}

      <HeartExplosion trigger={heartExplosion} />

      <div className="relative z-10 text-right">
        <AnimatePresence mode="wait">
          {phase >= 1 && (
            <motion.h2
              key="love"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl font-display text-gradient-rose mb-8"
            >
              Би чамайгаа хайрладаг
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-5xl ml-3"
              >
                ❤️
              </motion.span>
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p className="text-2xl sm:text-3xl md:text-7xl text-gradient-gold font-display">
                Төрсөн өдрийн мэнд миний Queen
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-pink-soft/60 text-4xl font-body tracking-widest"
              >
                Мөнхөд, үүрд чинийх
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {!hasTriggered && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-soft/40 text-base tracking-wide font-body mt-12"
          >
            Гайхамшгийг илрүүлэхийн тулд доош гүйлгэнэ үү
          </motion.p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0514] to-transparent pointer-events-none" />
    </section>
  );
}
