import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper, { SectionTitle } from "./SectionWrapper";
import { galleryPhotos } from "../data/config";

function GalleryCard({ photo, index, active, onOpen, onSelect, total }) {
  const offset = index - active;
  const absOffset = Math.abs(offset);

  if (absOffset > 3) return null;

  const isActive = offset === 0;
  const translateX = offset * 220;
  const rotateY = offset * -18;
  const translateZ = -absOffset * 90;
  const scale = isActive ? 1 : 1 - absOffset * 0.11;
  const opacity = isActive ? 1 : Math.max(0.35, 1 - absOffset * 0.22);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        zIndex: isActive ? total + 1 : total - absOffset,
      }}
      initial={false}
      animate={{
        x: translateX,
        y: "-50%",
        z: translateZ,
        rotateY,
        scale,
        opacity,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      onClick={() => (isActive ? onOpen(photo) : onSelect(index))}
    >
      <div
        className={`relative -translate-x-1/2 w-48 h-64 sm:w-56 sm:h-72 md:w-80 md:h-100 rounded-2xl overflow-hidden glass-strong group transition-shadow duration-300 ${
          isActive
            ? "shadow-[0_0_40px_rgba(255,107,157,0.35)] ring-2 ring-gold/40"
            : "shadow-xl ring-1 ring-white/10"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/90 via-purple-deep/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-white/90 font-body tracking-wide line-clamp-2">
            {photo.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function PhotoModal({ photo, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative max-w-2xl w-full glass-strong rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Хаах"
        >
          <X size={20} />
        </button>
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full aspect-[3/4] object-cover"
        />
        <div className="p-6 text-center">
          <p className="text-lg text-gradient-gold font-display">
            {photo.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LoveGallery() {
  const [active, setActive] = useState(0);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActive((index + galleryPhotos.length) % galleryPhotos.length);
  }, []);

  const next = useCallback(() => {
    setActive((a) => (a + 1) % galleryPhotos.length);
  }, []);

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + galleryPhotos.length) % galleryPhotos.length);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const id = setInterval(() => {
      setActive((a) => (a + 1) % galleryPhotos.length);
    }, 4000);

    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <SectionWrapper id="gallery" className="overflow-x-hidden">
      <SectionTitle subtitle="">Бидний хөөрхөн дурсамжууд</SectionTitle>

      <div
        className="relative w-full max-w-6xl mx-auto px-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="relative mx-auto h-[19rem] sm:h-[23rem] md:h-[27rem] overflow-visible"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {galleryPhotos.map((photo, i) => (
              <GalleryCard
                key={photo.id}
                photo={photo}
                index={i}
                active={active}
                total={galleryPhotos.length}
                onOpen={setModalPhoto}
                onSelect={goTo}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 sm:gap-6 mt-10">
          <button
            type="button"
            onClick={prev}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Өмнөх зураг"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex flex-wrap justify-center gap-2 max-w-[12rem] sm:max-w-none">
            {galleryPhotos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === active
                    ? "bg-gold w-6"
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
                aria-label={`${i + 1}-р зураг руу очих`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Дараагийн зураг"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modalPhoto && (
          <PhotoModal photo={modalPhoto} onClose={() => setModalPhoto(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
