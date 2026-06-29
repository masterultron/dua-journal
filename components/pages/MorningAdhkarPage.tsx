'use client'
import { Sun } from 'lucide-react'
import { DuaCard } from '../DuaCard'
import morningData from '@/content/morning-azkar.json'

export function MorningAdhkarPage() {
  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
          <Sun className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-noor-text font-semibold text-lg">Morning Adhkar</h2>
          <p className="text-noor-muted text-sm">After Fajr prayer</p>
        </div>
      </div>

      {/* Arabic header */}
      <p
        className="text-right text-noor-muted text-base mb-6"
        style={{ fontFamily: 'Amiri, serif' }}
        dir="rtl"
      >
        أذكار الصباح
      </p>

      {/* Dua cards */}
      {morningData.map((dua) => (
        <DuaCard key={dua.id} dua={dua} />
      ))}
    </div>
  )
}