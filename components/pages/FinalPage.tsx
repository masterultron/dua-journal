'use client'
import { motion } from 'framer-motion'
import { GeometricBackground } from '../GeometricBackground'

export function FinalPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center relative px-5">
      <GeometricBackground />

      <div className="relative z-10 text-center">
        {/* Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p
            className="text-7xl text-noor-purple leading-none"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            النور
          </p>
        </motion.div>

        {/* AMIN */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-noor-dark tracking-widest mb-12"
        >
          AMIN
        </motion.p>

        {/* Closing dua */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-2 mb-16"
        >
          <p
            className="text-noor-muted text-lg"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            وَالسَّلَامُ عَلَيْكِ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
          <p className="text-noor-muted text-sm">
            And peace be upon you, and the mercy of Allah and His blessings.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-noor-muted text-xs tracking-widest uppercase"
        >
          Built with Love by Abdul
        </motion.p>
      </div>
    </div>
  )
}
