'use client'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { DuaCard, Dua } from '../DuaCard'
import { getFavorites } from '@/lib/storage'
import morningData from '@/content/morning-azkar.json'
import eveningData from '@/content/evening-azkar.json'
import tahajjudData from '@/content/tahajjud-duas.json'
import deceasedData from '@/content/deceased-duas.json'
import generalData from '@/content/general-duas.json'

const ALL_DUAS: Dua[] = [
  ...morningData, ...eveningData, ...tahajjudData, ...deceasedData, ...generalData
]

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Dua[]>([])

  useEffect(() => {
    const ids = getFavorites()
    setFavorites(ALL_DUAS.filter(d => ids.includes(d.id)))
  }, [])

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
          <Heart className="w-6 h-6 text-rose-400" fill="currentColor" />
        </div>
        <div>
          <h2 className="text-noor-text font-semibold text-lg">Favourite Duas</h2>
          <p className="text-noor-muted text-sm">{favorites.length} saved</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-12 h-12 text-noor-border mx-auto mb-3" />
          <p className="text-noor-muted text-sm">Tap the heart on any dua to save it here</p>
        </div>
      ) : (
        favorites.map(dua => <DuaCard key={dua.id} dua={dua} />)
      )}
    </div>
  )
}
