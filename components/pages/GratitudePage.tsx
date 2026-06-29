'use client'
import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { saveGratitudeEntry, getGratitudeEntries, GratitudeEntry } from '@/lib/storage'
import { getTodayHijri } from '@/lib/hijri'

export function GratitudePage() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([])
  const [items, setItems] = useState(['', '', ''])
  const [saving, setSaving] = useState(false)

  useEffect(() => { getGratitudeEntries().then(setEntries) }, [])

  const handleSave = async () => {
    const filtered = items.filter(i => i.trim())
    if (!filtered.length) return
    setSaving(true)
    const hijri = getTodayHijri()
    const entry: GratitudeEntry = {
      id: `g-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items: filtered,
      createdAt: Date.now(),
    }
    await saveGratitudeEntry(entry)
    setEntries(e => [entry, ...e])
    setItems(['', '', ''])
    setSaving(false)
  }

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-noor-text font-semibold text-lg">Gratitude Journal</h2>
        <p className="text-noor-muted text-sm">Alhamdulillah for today</p>
      </div>

      {/* Today's entry */}
      <div className="bg-gradient-to-br from-noor-purple to-noor-accent rounded-3xl p-5 mb-6 text-white">
        <p className="text-white/80 text-xs tracking-widest uppercase mb-4">Today I am grateful for...</p>
        {items.map((item, i) => (
          <input
            key={i}
            value={item}
            onChange={e => {
              const next = [...items]
              next[i] = e.target.value
              setItems(next)
            }}
            placeholder={`${i + 1}. Something beautiful...`}
            className="w-full bg-white/10 text-white placeholder:text-white/40 rounded-xl px-4 py-2.5 mb-2 text-sm focus:outline-none focus:bg-white/20 border border-white/10"
          />
        ))}
        <button
          onClick={handleSave}
          disabled={saving || items.every(i => !i.trim())}
          className="w-full bg-white text-noor-purple font-medium py-2.5 rounded-xl text-sm mt-2 disabled:opacity-50"
        >
          Save
        </button>
      </div>

      {/* Past entries */}
      <div className="space-y-3">
        {entries.map(entry => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-noor-border p-4"
          >
            <p className="text-noor-muted text-xs mb-3">
              {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            {entry.items.map((item, i) => (
              <p key={i} className="text-noor-text text-sm mb-1">
                <span className="text-noor-purple font-medium">{i + 1}.</span> {item}
              </p>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
