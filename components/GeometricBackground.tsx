'use client'
import { motion } from 'framer-motion'

export function GeometricBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-noor-accent/5 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-noor-purple/5 blur-3xl" />

      {/* Animated geometric pattern */}
      <motion.svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
        width="800"
        height="800"
        viewBox="0 0 800 800"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {/* 8-pointed star / Islamic geometric pattern */}
        <g fill="none" stroke="#6D28D9" strokeWidth="1">
          {[0, 45, 90, 135].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 400 400)`}>
              <rect x="200" y="200" width="400" height="400" />
            </g>
          ))}
          <circle cx="400" cy="400" r="280" />
          <circle cx="400" cy="400" r="200" />
          <circle cx="400" cy="400" r="120" />
          {[0, 30, 60, 90, 120, 150].map((a) => (
            <line
              key={a}
              x1="400" y1="120"
              x2="400" y2="680"
              transform={`rotate(${a} 400 400)`}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  )
}