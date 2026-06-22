import { motion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { wishes } from '../data/config'

export default function BirthdayWishes() {
  return (
    <SectionWrapper id="wishes">
      <SectionTitle subtitle="Миний зүрхнээс чиний зүрх рүү">Чамд зориулсан миний хүслүүд</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.title}
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 },
            }}
            className="relative glass-strong rounded-2xl p-6 md:p-8 text-center group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              className="text-4xl md:text-5xl mb-4"
            >
              {wish.icon}
            </motion.div>

            <h3
              className="text-xl md:text-2xl text-gradient-gold mb-3 font-display"
            >
              {wish.title}
            </h3>

            <p className="text-pink-soft/70 text-lg md:text-xl font-body leading-relaxed">
              {wish.description}
            </p>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
