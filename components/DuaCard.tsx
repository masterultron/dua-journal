'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, BookOpen, RotateCcw, ChevronDown } from 'lucide-react'
import { toggleFavorite, isFavorite } from '@/lib/storage'
import { InsightsDrawer } from './InsightsDrawer'

interface Insights {
  meaning: string
  benefits: string
  when: string
  source: string
  reference: string
  explanation: string
}

export interface Dua {
  id: string
  arabic: string
  transliteration: string
  translation: string
  count?: number
  insights: Insights
}

export function DuaCard({ dua }: { dua: Dua }) {
  const [favorited, setFavorited] = useState(() => isFavorite(dua.id))
  const [counter, setCounter] = useState(0)
  const [showDrawer, setShowDrawer] = useState(false)

  const handleFavorite = () => {
    const result = toggleFavorite(dua.id)
    setFavorited(result)
  }

  const handleCount = () => {
    if (dua.count && counter < dua.count) {
      setCounter(c => c + 1)
    } else if (!dua.count) {
      setCounter(c => c + 1)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-noor-border overflow-hidden mb-4 shadow-sm"
      >
        {/* Arabic text */}
        <div className="px-6 pt-6 pb-4">
          <p
            className="text-2xl text-noor-text leading-loose text-right arabic-text"
            style={{ fontFamily: 'Amiri, serif' }}
            dir="rtl"
          >
            {dua.arabic}
          </p>
        </div>

        <div className="h-px bg-noor-border/50 mx-6" />

        {/* Transliteration */}
        <div className="px-6 py-3">
          <p className="text-noor-muted text-sm italic leading-relaxed">{dua.transliteration}</p>
        </div>

        <div className="h-px bg-noor-border/50 mx-6" />

        {/* Translation */}
        <div className="px-6 py-4">
          <p className="text-noor-text text-sm leading-relaxed">{dua.translation}</p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Favorite button */}
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full transition-colors ${
                favorited ? 'bg-rose-50 text-rose-500' : 'hover:bg-noor-lavender text-noor-muted'
              }`}
            >
              <Heart className="w-4 h-4" fill={favorited ? 'currentColor' : 'none'} />
            </button>

            {/* Insights button */}
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-1.5 text-noor-purple text-xs bg-noor-lavender px-3 py-2 rounded-full hover:bg-noor-accent/20 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Insights</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Counter */}
          {dua.count && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCounter(0)}
                className="p-1.5 rounded-full hover:bg-noor-lavender transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-noor-muted" />
              </button>
              <button
                onClick={handleCount}
                className={`min-w-[56px] text-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  counter >= dua.count
                    ? 'bg-noor-purple text-white'
                    : 'bg-noor-lavender text-noor-purple'
                }`}
              >
                {counter}/{dua.count}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <InsightsDrawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        insights={dua.insights}
        duaTitle={dua.transliteration.slice(0, 40) + '...'}
      />
    </>
  )
}