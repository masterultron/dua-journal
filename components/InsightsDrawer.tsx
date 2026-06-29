'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Clock, Sparkles, ScrollText } from 'lucide-react'

interface Insights {
  meaning: string
  benefits: string
  when: string
  source: string
  reference: string
  explanation: string
}

interface Props {
  open: boolean
  onClose: () => void
  insights: Insights
  duaTitle?: string
}

export function InsightsDrawer({ open, onClose, insights, duaTitle }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-noor-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-noor-border">
              <div>
                <h3 className="font-semibold text-noor-text">Insights & Reference</h3>
                {duaTitle && <p className="text-noor-muted text-xs mt-0.5 truncate max-w-[220px]">{duaTitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-noor-lavender"
              >
                <X className="w-4 h-4 text-noor-purple" />
              </button>
            </div>

            {/* Source badge */}
            <div className="px-6 pt-4">
              <span className="inline-flex items-center gap-1.5 bg-noor-lavender text-noor-purple text-xs px-3 py-1.5 rounded-full">
                <ScrollText className="w-3 h-3" />
                {insights.source} — {insights.reference}
              </span>
            </div>

            {/* Content sections */}
            <div className="px-6 py-4 space-y-5 pb-10">
              {[
                { icon: BookOpen, title: 'Meaning', content: insights.meaning, color: 'text-noor-purple', bg: 'bg-noor-lavender' },
                { icon: Sparkles, title: 'Benefits', content: insights.benefits, color: 'text-amber-600', bg: 'bg-amber-50' },
                { icon: Clock, title: 'When to recite', content: insights.when, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { icon: ScrollText, title: 'Explanation', content: insights.explanation, color: 'text-noor-purple', bg: 'bg-noor-lavender/50' },
              ].map(({ icon: Icon, title, content, color, bg }) => (
                <div key={title}>
                  <div className={`flex items-center gap-2 mb-2`}>
                    <div className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center`}>
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                    </div>
                    <h4 className="text-noor-text font-medium text-sm">{title}</h4>
                  </div>
                  <p className="text-noor-muted text-sm leading-relaxed pl-9">{content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}