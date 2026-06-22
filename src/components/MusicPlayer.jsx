import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import SectionWrapper, { SectionTitle } from './SectionWrapper'
import { MUSIC_URL } from '../data/config'

function VinylRecord({ isPlaying }) {
  return (
    <motion.div
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
      className="relative w-48 h-48 md:w-56 md:h-56 mx-auto"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
        <div className="absolute inset-2 rounded-full border border-gray-700/50" />
        <div className="absolute inset-6 rounded-full border border-gray-700/30" />
        <div className="absolute inset-10 rounded-full border border-gray-700/20" />
        <div className="absolute inset-14 rounded-full border border-gray-700/15" />
        <div className="absolute inset-[4.5rem] rounded-full bg-gradient-to-br from-pink-deep to-purple-deep flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gold/80" />
        </div>
        <div className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.03), transparent, rgba(255,255,255,0.03), transparent)',
          }}
        />
      </div>
      <motion.div
        className="absolute -top-2 right-8 w-20 h-3 bg-gradient-to-r from-gold to-gold-light rounded-full origin-right"
        animate={{ rotate: isPlaying ? -25 : -5 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: 'right center' }}
      />
    </motion.div>
  )
}

function Visualizer({ analyser, isPlaying }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !analyser || !isPlaying) return

    const ctx = canvas.getContext('2d')
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
        gradient.addColorStop(0, '#c8508a')
        gradient.addColorStop(0.5, '#ff6b9d')
        gradient.addColorStop(1, '#d4af37')
        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)
        x += barWidth
      }
    }

    draw()
    return () => cancelAnimationFrame(animationRef.current)
  }, [analyser, isPlaying])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={80}
      className="w-full max-w-md mx-auto rounded-xl opacity-80"
    />
  )
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const analyserRef = useRef(null)
  const audioContextRef = useRef(null)

  const setupAudio = useCallback(() => {
    if (audioContextRef.current) return
    const audio = audioRef.current
    if (!audio) return

    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(audio)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    analyser.connect(ctx.destination)
    audioContextRef.current = ctx
    analyserRef.current = analyser
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    setupAudio()
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    if (isPlaying) {
      audio.pause()
    } else {
      await audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio) {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (audio && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      audio.currentTime = (x / rect.width) * duration
    }
  }

  const formatTime = (t) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <SectionWrapper id="music">
      <SectionTitle subtitle="Манай зүрхний аялгуу">Манай дуу</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto glass-strong rounded-3xl p-8 md:p-10"
      >
        <VinylRecord isPlaying={isPlaying} />

        <div className="mt-8">
          <Visualizer analyser={analyserRef.current} isPlaying={isPlaying} />
        </div>

        <div className="mt-6">
          <div
            className="h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden"
            onClick={handleSeek}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-deep to-gold rounded-full"
              style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-pink-soft/50">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Дуу нээх' : 'Дуу хаах'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-deep to-purple-deep flex items-center justify-center shadow-lg shadow-pink-deep/30 cursor-pointer"
            aria-label={isPlaying ? 'Зогсоох' : 'Тоглуулах'}
          >
            {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
          </motion.button>

          <div className="w-10" />
        </div>

        <p className="text-center text-pink-soft/50 text-base md:text-lg font-body mt-4">
          Манай онцгой дууг сонсохын тулд тоглуулах дарна уу
        </p>
      </motion.div>

      <audio ref={audioRef} src={MUSIC_URL} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} preload="metadata" />
    </SectionWrapper>
  )
}
