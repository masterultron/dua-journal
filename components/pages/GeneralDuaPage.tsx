'use client'
import { HandHeart } from 'lucide-react'
import { DuaCard } from '../DuaCard'
import data from '@/content/general-duas.json'

export function GeneralDuaPage() {
  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <HandHeart className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-noor-text font-semibold text-lg">General Duas</h2>
          <p className="text-noor-muted text-sm">For every moment</p>
        </div>
      </div>
      {data.map((dua) => (
        <DuaCard key={dua.id} dua={dua} />
      ))}
    </div>
  )
}