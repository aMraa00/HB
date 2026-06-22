import { motion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { loveLetter } from '../data/config'

export default function LoveLetter() {
  const lines = loveLetter.split('\n')

  return (
    <SectionWrapper id="letter">
      <SectionTitle>Миний зүрхнээс илгээсэн захидал</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto"
        style={{ perspective: '1000px' }}
      >
        <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-deep/20 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gold/20 to-transparent rounded-tl-full" />

          <div className="absolute top-6 right-8 text-6xl opacity-10 select-none">💌</div>

          <div className="relative z-10">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`love-letter-text mb-3 ${
                  i === 0
                    ? 'text-gradient-gold text-2xl md:text-3xl font-display mb-6'
                    : 'text-pink-soft/85 font-body'
                }`}
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: 'spring' }}
            className="mt-8 text-right text-3xl"
          >
            ❤️
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
