import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo mark */}
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-xl shadow-glow-md"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          SV
        </motion.div>

        {/* Loading bar */}
        <div className="w-40 h-0.5 bg-border rounded-full overflow-hidden" aria-hidden="true">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <p className="text-xs font-mono text-text-muted tracking-widest uppercase">
          Loading<span className="cursor-blink">_</span>
        </p>
      </div>
    </div>
  )
}
