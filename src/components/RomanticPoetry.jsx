import { motion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { poems } from '../data/config'

export default function RomanticPoetry() {
  return (
    <SectionWrapper id="poetry">
      <SectionTitle subtitle="Зүрхнээс урссан үгс">Чамд зориулсан</SectionTitle>

      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 px-4">
        {poems.map((poem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative glass-strong rounded-2xl p-8 md:p-10 group cursor-default w-full max-w-[20rem] md:w-72 lg:w-80 flex flex-col items-center text-center"
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: '0 0 40px rgba(255, 107, 157, 0.15)' }}
            />

            <div className="text-3xl mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
              {index === 0 ? '✨' : index === 1 ? '🌙' : '💫'}
            </div>

            <p
              className={`handwritten-poem w-full text-center whitespace-pre-line ${
                poem.style === 'italic'
                  ? 'italic text-pink-soft/80'
                  : poem.style === 'bold'
                  ? 'font-semibold text-gradient-gold'
                  : 'text-pink-soft/90 font-body'
              }`}
            >
              {poem.text}
            </p>

            <div className="mt-6 w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
