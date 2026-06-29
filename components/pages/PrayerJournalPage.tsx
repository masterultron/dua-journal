'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Trash2, Edit3, X } from 'lucide-react'
import { saveJournalEntry, getJournalEntries, deleteJournalEntry, JournalEntry } from '@/lib/storage'
import { getTodayHijri } from '@/lib/hijri'

const MOODS = [
  { value: 'peaceful', label: 'Peaceful', emoji: '🌿' },
  { value: 'grateful', label: 'Grateful', emoji: '✨' },
  { value: 'reflective', label: 'Reflective', emoji: '🌙' },
  { value: 'hopeful', label: 'Hopeful', emoji: '☀️' },
  { value: 'struggling', label: 'Struggling', emoji: '🌊' },
] as const

export function PrayerJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [writing, setWriting] = useState(false)
  const [search, setSearch] = useState('')
  const [content, setContent] = useState('')
  const [lessons, setLessons] = useState('')
  const [mood, setMood] = useState<JournalEntry['mood']>('peaceful')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    getJournalEntries().then(setEntries)
  }, [])

  const handleSave = async () => {
    const hijri = getTodayHijri()
    const now = Date.now()
    const entry: JournalEntry = {
      id: editingId || `j-${now}`,
      date: new Date().toISOString().split('T')[0],
      hijriDate: `${hijri.day} ${hijri.monthName} ${hijri.year} AH`,
      content,
      mood,
      lessons,
      createdAt: editingId ? (entries.find(e => e.id === editingId)?.createdAt || now) : now,
      updatedAt: now,
    }
    await saveJournalEntry(entry)
    const updated = await getJournalEntries()
    setEntries(updated)
    setWriting(false)
    setContent('')
    setLessons('')
    setMood('peaceful')
    setEditingId(null)
  }

  const handleDelete = async (id: string) => {
    await deleteJournalEntry(id)
    setEntries(e => e.filter(x => x.id !== id))
  }

  const handleEdit = (entry: JournalEntry) => {
    setContent(entry.content)
    setLessons(entry.lessons)
    setMood(entry.mood)
    setEditingId(entry.id)
    setWriting(true)
  }

  const filtered = entries.filter(e =>
    e.content.toLowerCase().includes(search.toLowerCase()) ||
    e.lessons.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-noor-text font-semibold text-lg">Prayer Journal</h2>
          <p className="text-noor-muted text-sm">{entries.length} entries</p>
        </div>
        <button
          onClick={() => setWriting(true)}
          className="w-10 h-10 rounded-full bg-noor-gradient flex items-center justify-center shadow-md shadow-noor-purple/30"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-noor-muted" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search entries..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-noor-border text-sm text-noor-text placeholder:text-noor-muted focus:outline-none focus:border-noor-accent"
        />
      </div>

      {/* Writing modal */}
      <AnimatePresence>
        {writing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-3xl border border-noor-border p-5 mb-5 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-noor-text">{editingId ? 'Edit Entry' : 'New Entry'}</h3>
              <button onClick={() => { setWriting(false); setEditingId(null) }}>
                <X className="w-4 h-4 text-noor-muted" />
              </button>
            </div>

            {/* Mood selector */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    mood === m.value
                      ? 'bg-noor-purple text-white'
                      : 'bg-noor-lavender text-noor-purple'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your reflection, thoughts, or dua..."
              rows={4}
              className="w-full p-3 bg-noor-bg rounded-xl border border-noor-border text-sm text-noor-text placeholder:text-noor-muted focus:outline-none focus:border-noor-accent resize-none mb-3"
            />

            <textarea
              value={lessons}
              onChange={e => setLessons(e.target.value)}
              placeholder="Lessons learned today..."
              rows={2}
              className="w-full p-3 bg-noor-bg rounded-xl border border-noor-border text-sm text-noor-text placeholder:text-noor-muted focus:outline-none focus:border-noor-accent resize-none mb-4"
            />

            <button
              onClick={handleSave}
              disabled={!content.trim()}
              className="w-full bg-noor-gradient text-white py-3 rounded-xl font-medium text-sm disabled:opacity-50"
            >
              Save Entry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries list */}
      <div className="space-y-3">
        {filtered.length === 0 && !writing && (
          <div className="text-center py-12 text-noor-muted text-sm">
            <p className="text-2xl mb-2" style={{ fontFamily: 'Amiri, serif' }}>بسم الله</p>
            <p>Begin your journal journey</p>
          </div>
        )}

        {filtered.map(entry => {
          const moodMeta = MOODS.find(m => m.value === entry.mood)
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-noor-border p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs bg-noor-lavender text-noor-purple px-2 py-0.5 rounded-full">
                    {moodMeta?.label}
                  </span>
                  <p className="text-noor-muted text-xs mt-1">{entry.hijriDate}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(entry)} className="p-1.5 hover:bg-noor-lavender rounded-lg">
                    <Edit3 className="w-3.5 h-3.5 text-noor-muted" />
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="p-1.5 hover:bg-rose-50 rounded-lg">
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              </div>
              <p className="text-noor-text text-sm leading-relaxed">{entry.content}</p>
              {entry.lessons && (
                <p className="text-noor-muted text-xs mt-2 italic">Lesson: {entry.lessons}</p>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}