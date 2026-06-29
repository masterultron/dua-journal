'use client'
import { Heart } from 'lucide-react'
import { DuaCard } from '../DuaCard'
import data from '@/content/deceased-duas.json'

export function DeceasedDuaPage() {
  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
          <Heart className="w-6 h-6 text-rose-400" />
        </div>
        <div>
          <h2 className="text-noor-text font-semibold text-lg">Dua for the Deceased</h2>
          <p className="text-noor-muted text-sm">A gift for those who have passed</p>
        </div>
      </div>
      {data.map((dua) => (
        <DuaCard key={dua.id} dua={dua} />
      ))}
    </div>
  )
}