import { motion } from "framer-motion";

export default function AnimatedCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
