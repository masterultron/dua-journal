'use client'
import { Moon } from 'lucide-react'
import { DuaCard } from '../DuaCard'
import eveningData from '@/content/evening-azkar.json'

export function EveningAdhkarPage() {
  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <Moon className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-noor-text font-semibold text-lg">Evening Adhkar</h2>
          <p className="text-noor-muted text-sm">After Asr prayer</p>
        </div>
      </div>
      <p className="text-right text-noor-muted text-base mb-6" style={{ fontFamily: 'Amiri, serif' }} dir="rtl">
        أذكار المساء
      </p>
      {eveningData.map((dua) => (
        <DuaCard key={dua.id} dua={dua} />
      ))}
    </div>
  )
}