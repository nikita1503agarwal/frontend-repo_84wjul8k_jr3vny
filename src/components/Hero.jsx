import { motion } from "framer-motion";

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.p
            initial={{ letterSpacing: "0.2em" }}
            animate={{ letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="uppercase tracking-[0.35em] text-sm text-white/60 mb-4"
          >
            La Luna Resort
          </motion.p>
          <motion.h1
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]"
          >
            Where luxury meets the sea
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-lg text-white/70 max-w-2xl mx-auto"
          >
            Book oceanfront suites, private villas, and curated experiences designed for blissful escapes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExplore}
              className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium hover:bg-white/90 transition"
            >
              Check availability
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#rooms"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition"
            >
              Explore rooms
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
