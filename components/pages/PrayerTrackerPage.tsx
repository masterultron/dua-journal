'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { savePrayerLog, getPrayerLog, getAllPrayerLogs, PrayerLog } from '@/lib/storage'

const PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud'] as const
type Prayer = typeof PRAYERS[number]

const PRAYER_LABELS: Record<Prayer, { label: string; arabic: string; time: string }> = {
  fajr:     { label: 'Fajr',     arabic: 'الفجر',    time: 'Before sunrise' },
  dhuhr:    { label: 'Dhuhr',    arabic: 'الظهر',    time: 'Midday' },
  asr:      { label: 'Asr',      arabic: 'العصر',    time: 'Afternoon' },
  maghrib:  { label: 'Maghrib',  arabic: 'المغرب',   time: 'Sunset' },
  isha:     { label: 'Isha',     arabic: 'العشاء',   time: 'Night' },
  tahajjud: { label: 'Tahajjud', arabic: 'التهجد',   time: 'Late night' },
}

export function PrayerTrackerPage() {
  const today = new Date().toISOString().split('T')[0]
  const [todayLog, setTodayLog] = useState<PrayerLog>({
    date: today, fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false, tahajjud: false,
  })
  const [weekStats, setWeekStats] = useState<Record<Prayer, number>>({
    fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, tahajjud: 0,
  })

  useEffect(() => {
    getPrayerLog(today).then(log => {
      if (log) setTodayLog(log)
    })
    getAllPrayerLogs().then(logs => {
      const weekAgo = Date.now() - 7 * 86400000
      const recent = logs.filter(l => new Date(l.date).getTime() >= weekAgo)
      const stats = {} as Record<Prayer, number>
      PRAYERS.forEach(p => {
        stats[p] = recent.filter(l => l[p]).length
      })
      setWeekStats(stats)
    })
  }, [today])

  const toggle = async (prayer: Prayer) => {
    const updated = { ...todayLog, [prayer]: !todayLog[prayer] }
    setTodayLog(updated)
    await savePrayerLog(updated)
  }

  const completed = PRAYERS.filter(p => todayLog[p]).length

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-noor-text font-semibold text-lg">Prayer Tracker</h2>
        <p className="text-noor-muted text-sm">{completed} of {PRAYERS.length} today</p>
      </div>

      {/* Progress ring */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#E9D5FF" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#6D28D9" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(completed / PRAYERS.length) * 314} 314`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-noor-purple">{completed}</span>
            <span className="text-noor-muted text-xs">prayers</span>
          </div>
        </div>
      </div>

      {/* Prayer list */}
      <div className="space-y-3 mb-8">
        {PRAYERS.map(prayer => {
          const info = PRAYER_LABELS[prayer]
          const done = todayLog[prayer]
          return (
            <motion.button
              key={prayer}
              onClick={() => toggle(prayer)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                done
                  ? 'bg-noor-purple border-noor-purple text-white'
                  : 'bg-white border-noor-border text-noor-text'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  done ? 'bg-white/20' : 'bg-noor-lavender'
                }`}>
                  {done
                    ? <Check className="w-4 h-4 text-white" />
                    : <span className="text-sm" style={{ fontFamily: 'Amiri, serif' }}>{info.arabic[0]}</span>
                  }
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{info.label}</p>
                  <p className={`text-xs ${done ? 'text-white/70' : 'text-noor-muted'}`}>{info.time}</p>
                </div>
              </div>
              <span
                className={`text-base ${done ? 'text-white/80' : 'text-noor-purple'}`}
                style={{ fontFamily: 'Amiri, serif' }}
              >
                {info.arabic}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Weekly stats */}
      <div className="bg-white rounded-3xl border border-noor-border p-5">
        <h3 className="text-noor-text font-medium text-sm mb-4">This Week</h3>
        <div className="space-y-2">
          {PRAYERS.map(prayer => (
            <div key={prayer} className="flex items-center gap-3">
              <span className="text-noor-muted text-xs w-16 capitalize">{prayer}</span>
              <div className="flex-1 bg-noor-lavender rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-noor-purple rounded-full transition-all duration-700"
                  style={{ width: `${(weekStats[prayer] / 7) * 100}%` }}
                />
              </div>
              <span className="text-noor-muted text-xs w-8 text-right">{weekStats[prayer]}/7</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}