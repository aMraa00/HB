import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { MET_DATE } from '../data/config'

function calculateTimeSince(date) {
  const now = new Date()
  const diff = now - date

  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
  const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000))
  const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))

  return { years, months, days, hours }
}

function TimeBlock({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative glass-strong rounded-2xl p-6 md:p-8 text-center min-w-[120px] flex-1"
    >
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-display text-gradient-gold mb-2"
      >
        {value}
      </motion.div>
      <p className="text-pink-soft/60 text-base md:text-lg tracking-wide font-body">
        {label}
      </p>
    </motion.div>
  )
}

export default function CountdownSection() {
  const [time, setTime] = useState(calculateTimeSince(MET_DATE))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeSince(MET_DATE))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const blocks = [
    { value: time.years, label: 'Жил' },
    { value: time.months, label: 'Сар' },
    { value: time.days, label: 'Өдөр' },
    { value: time.hours, label: 'Цаг' },
  ]

  return (
    <SectionWrapper id="countdown">
      <SectionTitle subtitle="Секунд бүр тоолж байна">Бид танилцсан хугацаа</SectionTitle>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
        {blocks.map((block, i) => (
          <TimeBlock key={block.label} value={block.value} label={block.label} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center mt-10 text-pink-soft/50 text-lg md:text-xl font-body"
      >
        Хамтдаа энэ өдрөөс{' '}
        <span className="text-gold">
          {MET_DATE.toLocaleDateString('mn-MN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </motion.p>
    </SectionWrapper>
  )
}
