'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Moon, Sun, Heart } from 'lucide-react'
import { getTodayHijri } from '@/lib/hijri'
import { GeometricBackground } from './GeometricBackground'
import { JournalNavigation } from './JournalNavigation'
import dailyQuotes from '@/content/daily-quotes.json'

export function HomePage() {
  const [journalOpen, setJournalOpen] = useState(false)
  const [initialPage, setInitialPage] = useState(0)
  const hijri = getTodayHijri()
  const today = new Date()

  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  const quote = dailyQuotes[dayOfYear % dailyQuotes.length]

  const openTo = (pageIndex: number) => {
    setInitialPage(pageIndex)
    setJournalOpen(true)
  }

  if (journalOpen) return (
    <JournalNavigation
      initialPage={initialPage}
      onBack={() => setJournalOpen(false)}
    />
  )

  return (
    <div className="min-h-screen bg-noor-bg flex flex-col relative">
      <GeometricBackground />

      <div className="relative z-10 flex flex-col min-h-screen px-5 py-10 max-w-md mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-noor-muted text-xs tracking-widest uppercase mb-2">Bismillah</p>
          <div className="text-4xl text-noor-purple" style={{ fontFamily: 'Amiri, serif' }}>
            النور
          </div>
        </motion.div>

        {/* Date card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-noor-border mb-4"
        >
          <p className="text-noor-muted text-xs tracking-widest uppercase mb-1">Today</p>
          <p className="text-xl font-medium text-noor-text">
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-noor-purple text-sm mt-1" style={{ fontFamily: 'Amiri, serif' }}>
            {hijri.day} {hijri.monthName} {hijri.year} AH
          </p>
        </motion.div>

        {/* Daily quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-noor-purple to-noor-accent rounded-3xl p-6 text-white mb-4"
        >
          <p className="text-white/70 text-xs tracking-widest uppercase mb-3">Today's Reflection</p>
          {quote.arabic && (
            <p
              className="text-lg text-white/90 text-right mb-3 leading-relaxed"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              {quote.arabic}
            </p>
          )}
          <p className="text-white/90 text-sm leading-relaxed italic">"{quote.text}"</p>
          <p className="text-white/60 text-xs mt-3">{quote.source}</p>
        </motion.div>

        {/* Open Journal button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => openTo(0)}
          className="w-full bg-gradient-to-r from-noor-purple to-noor-accent text-white rounded-2xl p-5 flex items-center justify-between mb-4 shadow-lg shadow-noor-purple/20 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-lg">Open Journal</span>
          </div>
          <ChevronRight className="w-5 h-5 opacity-70" />
        </motion.button>

        {/* Quick access grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: Sun,   label: 'Morning',   color: 'text-amber-500', bg: 'bg-amber-50',  pageIndex: 0 },
            { icon: Moon,  label: 'Evening',   color: 'text-indigo-500', bg: 'bg-indigo-50', pageIndex: 1 },
            { icon: Heart, label: 'Favorites', color: 'text-rose-500',  bg: 'bg-rose-50',   pageIndex: 6 },
          ].map(({ icon: Icon, label, color, bg, pageIndex }) => (
            <button
              key={label}
              onClick={() => openTo(pageIndex)}
              className={`${bg} rounded-2xl p-4 flex flex-col items-center gap-2 border border-white active:scale-95 transition-transform`}
            >
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-noor-text text-xs font-medium">{label}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}