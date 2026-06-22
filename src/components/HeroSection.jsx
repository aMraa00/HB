import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden font-hero">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,80,138,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto px-2"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="text-5xl md:text-5xl mb-6 md:mb-8"
        >
          💝
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-3 md:gap-4 mb-8 md:mb-10"
        >
          <h1 className="m-0 flex flex-col items-center gap-3 md:gap-4">
            <span className="hero-title-line text-gradient-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Төрсөн өдрийн мэнд
            </span>

            <span className="hero-title-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl flex items-center justify-center gap-3 md:gap-4">
              <span className="text-gradient-rose">Миний үр</span>
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex text-3xl sm:text-4xl md:text-5xl leading-none"
                aria-hidden="true"
              >
                ❤️
              </motion.span>
            </span>
          </h1>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hero-subtitle"
        >
          Чамтайгаа өнгөрүүлсэн агшин бүр
          <br />
          миний амьдралыг илүү сайхан болгодог.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-16 md:bottom-20 left-0 right-0 z-10 flex flex-col items-center gap-4"
      >
        <motion.button
          onClick={scrollToGallery}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-20 h-20 rounded-full glass-strong animate-pulse-glow cursor-pointer flex items-center justify-center"
          aria-label="Галерей руу гүйлгэх"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-4xl"
          >
            ❤️
          </motion.span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-deep/20 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-pink-soft/50"
        >
          <span className="text-base md:text-lg tracking-wide font-hero">
            Бидний түүхийг нээж үзий
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0514] to-transparent pointer-events-none" />
    </section>
  );
}
