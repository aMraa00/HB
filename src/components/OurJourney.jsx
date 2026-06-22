import { motion } from "framer-motion";
import SectionWrapper, { SectionTitle, FloatingHeart } from "./SectionWrapper";
import { journeyMemories } from "../data/config";

function TimelineItem({ memory, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`relative flex items-center gap-6 md:gap-12 mb-16 md:mb-24 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      <div className="relative flex-1 w-full max-w-md">
        <div className="relative rounded-2xl overflow-hidden glass-strong group">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/60 to-transparent" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: "inset 0 0 40px rgba(212, 175, 55, 0.2)" }}
          />
        </div>
        {[...Array(3)].map((_, i) => (
          <FloatingHeart
            key={i}
            delay={i * 1.5 + index}
            size={14 + i * 4}
            left={20 + i * 25}
            top={10 + i * 15}
          />
        ))}
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="w-5 h-5 rounded-full bg-gradient-to-br from-gold to-pink-deep ring-4 ring-purple-deep"
        />
      </div>

      <div
        className={`flex-1 w-full max-w-md  ${isEven ? "md:text-left" : "md:text-right"} text-center`}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-gold text-base md:text-xl tracking-wide mb-2 font-body"
        >
          {memory.date}
        </motion.span>
        <h3 className="text-xl md:text-4xl font-display text-gradient-rose mb-4">
          {memory.title}
        </h3>
        <p className="text-pink-soft/70 text-lg md:text-2xl leading-relaxed font-body">
          {memory.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function OurJourney() {
  return (
    <SectionWrapper id="journey">
      <SectionTitle subtitle="Бидний хайрын түүхийн алхам бүр">
        Бидний хамт өнгөрүүлсэн агшнууд
      </SectionTitle>

      <div className="relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent -translate-x-1/2" />

        {journeyMemories.map((memory, index) => (
          <TimelineItem key={index} memory={memory} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
