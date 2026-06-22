import ThreeBackground from './components/ThreeBackground'
import HeroSection from './components/HeroSection'
import LoveGallery from './components/LoveGallery'
import OurJourney from './components/OurJourney'
import LoveLetter from './components/LoveLetter'
import RomanticPoetry from './components/RomanticPoetry'
import BirthdayWishes from './components/BirthdayWishes'
import MusicPlayer from './components/MusicPlayer'
import CountdownSection from './components/CountdownSection'
import FinalSurprise from './components/FinalSurprise'

export default function App() {
  return (
    <div className="relative">
      <ThreeBackground />
      <main className="relative z-10 overflow-x-hidden">
        <HeroSection />
        <LoveGallery />
        <OurJourney />
        <LoveLetter />
        <RomanticPoetry />
        <BirthdayWishes />
        <MusicPlayer />
        <CountdownSection />
        <FinalSurprise />
      </main>
    </div>
  )
}
