'use client'
import { Stars } from 'lucide-react'
import { DuaCard } from '../DuaCard'
import data from '@/content/tahajjud-duas.json'

export function TahajjudPage() {
  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
          <Stars className="w-6 h-6 text-noor-purple" />
        </div>
        <div>
          <h2 className="text-noor-text font-semibold text-lg">Tahajjud Duas</h2>
          <p className="text-noor-muted text-sm">The night prayer</p>
        </div>
      </div>
      {data.map((dua) => (
        <DuaCard key={dua.id} dua={dua} />
      ))}
    </div>
  )
}