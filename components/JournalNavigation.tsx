'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MorningAdhkarPage } from './pages/MorningAdhkarPage'
import { EveningAdhkarPage } from './pages/EveningAdhkarPage'
import { TahajjudPage } from './pages/TahajjudPage'
import { DeceasedDuaPage } from './pages/DeceasedDuaPage'
import { GeneralDuaPage } from './pages/GeneralDuaPage'
import { PrayerJournalPage } from './pages/PrayerJournalPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { PrayerTrackerPage } from './pages/PrayerTrackerPage'
import { GratitudePage } from './pages/GratitudePage'
import { SettingsPage } from './pages/SettingsPage'
import { FinalPage } from './pages/FinalPage'

const PAGES = [
  { id: 'morning',  label: 'Morning Adhkar',    component: MorningAdhkarPage },
  { id: 'evening',  label: 'Evening Adhkar',    component: EveningAdhkarPage },
  { id: 'tahajjud', label: 'Tahajjud Duas',     component: TahajjudPage },
  { id: 'deceased', label: 'Dua for Deceased',  component: DeceasedDuaPage },
  { id: 'general',  label: 'General Duas',      component: GeneralDuaPage },
  { id: 'journal',  label: 'Prayer Journal',    component: PrayerJournalPage },
  { id: 'favorites',label: 'Favourite Duas',    component: FavoritesPage },
  { id: 'tracker',  label: 'Prayer Tracker',    component: PrayerTrackerPage },
  { id: 'gratitude',label: 'Gratitude Journal', component: GratitudePage },
  { id: 'settings', label: 'Settings',          component: SettingsPage },
  { id: 'final',    label: 'الختام',             component: FinalPage },
]

export function JournalNavigation({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= PAGES.length) return
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
  }

  const CurrentPage = PAGES[currentIndex].component

  return (
    <div className="min-h-screen bg-noor-bg flex flex-col">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 sticky top-0 bg-noor-bg/95 backdrop-blur z-20 border-b border-noor-border/50">
        <button
          onClick={currentIndex === 0 ? onBack : () => goTo(currentIndex - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-noor-lavender transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-noor-purple" />
        </button>

        <div className="text-center">
          <p className="text-noor-text font-medium text-sm">{PAGES[currentIndex].label}</p>
          <p className="text-noor-muted text-xs">{currentIndex + 1} / {PAGES.length}</p>
        </div>

        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === PAGES.length - 1}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-noor-lavender transition-colors disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5 text-noor-purple" />
        </button>
      </div>

      {/* Page content with animation */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CurrentPage />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom progress dots */}
      <div className="flex justify-center gap-1.5 py-4 border-t border-noor-border/50 bg-noor-bg">
        {PAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${
              i === currentIndex
                ? 'w-6 h-2 bg-noor-purple'
                : 'w-2 h-2 bg-noor-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}