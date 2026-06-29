'use client'
import { useState } from 'react'
import { SplashScreen } from '@/components/SplashScreen'
import { HomePage } from '@/components/HomePage'

export default function RootPage() {
  const [splashDone, setSplashDone] = useState(false)
  return splashDone
    ? <HomePage />
    : <SplashScreen onComplete={() => setSplashDone(true)} />
}