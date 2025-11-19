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
          <p className="uppercase tracking-[0.35em] text-sm text-white/60 mb-4">La Luna Resort</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
            Where luxury meets the sea
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Book oceanfront suites, private villas, and curated experiences designed for blissful escapes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button onClick={onExplore} className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium hover:bg-white/90 transition">
              Check availability
            </button>
            <a href="#rooms" className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-white/40 transition">
              Explore rooms
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
