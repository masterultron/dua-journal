'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTodayHijri, getDaysUntilRamadan, getDaysUntilEidAlFitr, isRamadan } from '@/lib/hijri'
import { GeometricBackground } from './GeometricBackground'

interface Props { onComplete: () => void }

type Phase = 'greeting' | 'welcome' | 'dates' | 'done'

export function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('greeting')
  const hijri = getTodayHijri()
  const today = new Date()

 useEffect(() => {
  const t1 = setTimeout(() => setPhase('welcome'), 2000)   // greeting stays 3s
  const t2 = setTimeout(() => setPhase('dates'),   4000)   // welcome stays 3s
  const t3 = setTimeout(() => setPhase('done'),    6000)   // dates stays 3s
  const t4 = setTimeout(onComplete,                6600)   // quick fade then home
  return () => [t1, t2, t3, t4].forEach(clearTimeout)
}, [onComplete])

  const handleSkip = () => onComplete()

  const gregorianStr = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const daysUntilRamadan = getDaysUntilRamadan()
  const daysUntilEid = getDaysUntilEidAlFitr()
  const inRamadan = isRamadan()

  return (
    <div
      className="fixed inset-0 bg-noor-bg flex items-center justify-center cursor-pointer z-50"
      onClick={handleSkip}
    >
      <GeometricBackground />

      <div className="relative z-10 text-center px-8 max-w-sm w-full">
        <AnimatePresence mode="wait">
          {phase === 'greeting' && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-noor-muted text-sm tracking-widest uppercase">Peace be upon you</p>
              <h1 className="text-3xl font-light text-noor-purple">
                Assalamu Alaiki,
              </h1>
              <h2
                className="text-5xl text-noor-dark"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                An Noor
              </h2>
            </motion.div>
          )}

          {phase === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div
                className="text-5xl text-noor-purple mb-4"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                النور
              </div>
              <p className="text-noor-muted text-sm tracking-wide leading-relaxed">
                Welcome to your<br />
                <span className="text-noor-text font-medium">Personalized Prayer Journal</span>
              </p>
            </motion.div>
          )}

          {phase === 'dates' && (
            <motion.div
              key="dates"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Hijri date */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-noor-border">
                <p className="text-noor-muted text-xs tracking-widest uppercase mb-1">Hijri Date</p>
                <p
                  className="text-2xl text-noor-purple"
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  {hijri.day} {hijri.monthName} {hijri.year} AH
                </p>
                <p className="text-noor-muted text-sm mt-1">{gregorianStr}</p>
              </div>

              {/* Countdown */}
              <div className="bg-gradient-to-br from-noor-purple to-noor-accent rounded-2xl p-5 text-white">
                {inRamadan ? (
                  <>
                    <p className="text-white/80 text-xs tracking-widest uppercase">You are in</p>
                    <p className="text-2xl font-medium mt-1">Ramadan Mubarak</p>
                    <p className="text-white/70 text-sm mt-1">Day {hijri.day} of Ramadan</p>
                  </>
                ) : (
                  <>
                    <p className="text-white/80 text-xs tracking-widest uppercase">Next Ramadan</p>
                    <p className="text-3xl font-light mt-1">{daysUntilRamadan} days</p>
                    <p className="text-white/70 text-sm mt-1">Eid al-Fitr in {daysUntilEid} days</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap to skip
        <motion.p
          className="absolute bottom-12 left-0 right-0 text-center text-noor-muted text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          tap anywhere to skip
        </motion.p> */}
      </div>
    </div>
  )
}