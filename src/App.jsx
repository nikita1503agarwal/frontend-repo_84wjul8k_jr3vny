import { useRef } from "react";
import Hero from "./components/Hero";
import Availability from "./components/Availability";
import Rooms from "./components/Rooms";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  const availRef = useRef(null);
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_40%)]" />
      <div className="relative">
        <Hero onExplore={() => {
          const el = document.getElementById("availability");
          el?.scrollIntoView({ behavior: "smooth" });
        }} />
        <Availability ref={availRef} />
        <Rooms />
        <footer className="py-16 text-center text-white/50">© {new Date().getFullYear()} La Luna Resort</footer>
      </div>
    </div>
  );
}

export default App;
