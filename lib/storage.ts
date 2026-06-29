import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'noor-db'
const DB_VERSION = 1

export interface JournalEntry {
  id: string
  date: string          // ISO date string
  hijriDate: string     // e.g. "15 Ramadan 1446"
  content: string
  mood: 'peaceful' | 'grateful' | 'reflective' | 'hopeful' | 'struggling'
  lessons: string
  createdAt: number
  updatedAt: number
}

export interface GratitudeEntry {
  id: string
  date: string
  items: string[]
  createdAt: number
}

export interface PrayerLog {
  date: string   // YYYY-MM-DD
  fajr: boolean
  dhuhr: boolean
  asr: boolean
  maghrib: boolean
  isha: boolean
  tahajjud: boolean
}

let db: IDBPDatabase | null = null

async function getDB(): Promise<IDBPDatabase> {
  if (db) return db
  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('journal')) {
        const j = database.createObjectStore('journal', { keyPath: 'id' })
        j.createIndex('date', 'date')
        j.createIndex('createdAt', 'createdAt')
      }
      if (!database.objectStoreNames.contains('gratitude')) {
        const g = database.createObjectStore('gratitude', { keyPath: 'id' })
        g.createIndex('date', 'date')
      }
      if (!database.objectStoreNames.contains('prayers')) {
        database.createObjectStore('prayers', { keyPath: 'date' })
      }
    },
  })
  return db
}

// ─── Journal ─────────────────────────────────────────────
export async function saveJournalEntry(entry: JournalEntry): Promise<void> {
  const database = await getDB()
  await database.put('journal', entry)
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const database = await getDB()
  const all = await database.getAll('journal')
  return all.sort((a, b) => b.createdAt - a.createdAt)
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const database = await getDB()
  await database.delete('journal', id)
}

// ─── Gratitude ────────────────────────────────────────────
export async function saveGratitudeEntry(entry: GratitudeEntry): Promise<void> {
  const database = await getDB()
  await database.put('gratitude', entry)
}

export async function getGratitudeEntries(): Promise<GratitudeEntry[]> {
  const database = await getDB()
  const all = await database.getAll('gratitude')
  return all.sort((a, b) => b.createdAt - a.createdAt)
}

// ─── Prayers ─────────────────────────────────────────────
export async function savePrayerLog(log: PrayerLog): Promise<void> {
  const database = await getDB()
  await database.put('prayers', log)
}

export async function getPrayerLog(date: string): Promise<PrayerLog | undefined> {
  const database = await getDB()
  return database.get('prayers', date)
}

export async function getAllPrayerLogs(): Promise<PrayerLog[]> {
  const database = await getDB()
  return database.getAll('prayers')
}

// ─── localStorage helpers ─────────────────────────────────
export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem('noor-favorites')
  return raw ? JSON.parse(raw) : []
}

export function toggleFavorite(id: string): boolean {
  const favs = getFavorites()
  const idx = favs.indexOf(id)
  if (idx === -1) { favs.push(id); localStorage.setItem('noor-favorites', JSON.stringify(favs)); return true }
  favs.splice(idx, 1); localStorage.setItem('noor-favorites', JSON.stringify(favs)); return false
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id)
}

export function getStreak(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem('noor-streak') || '0', 10)
}

export function setStreak(n: number): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('noor-streak', String(n))
}

export function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem('noor-theme') as 'light' | 'dark') || 'light'
}

export function setTheme(t: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('noor-theme', t)
}