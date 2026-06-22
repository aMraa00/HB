import { motion } from 'framer-motion'

export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 md:py-28 overflow-x-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/20 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">{children}</div>
    </section>
  )
}

export function SectionTitle({ children, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
      <h2 className="section-title text-gradient-gold">{children}</h2>
      {subtitle && (
        <p className="mt-4 text-pink-soft/70 text-lg md:text-xl font-body tracking-wide">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
    </motion.div>
  )
}

export function FloatingHeart({ delay = 0, size = 20, left, top }) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none"
      style={{ left: `${left}%`, top: `${top}%`, fontSize: size }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [-20, -120],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    >
      ❤️
    </motion.span>
  )
}
