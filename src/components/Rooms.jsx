import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/rooms`);
        const data = await res.json();
        setRooms(data);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  return (
    <section id="rooms" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl text-white font-semibold">Suites & Villas</h2>
            <p className="text-white/70 mt-1">Thoughtfully designed spaces, crafted for serenity.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r) => (
            <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {r.images?.[0] && (
                <img src={r.images[0]} alt={r.name} className="w-full h-44 object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-white text-lg font-semibold">{r.name}</h3>
                <p className="text-white/70 text-sm mt-1">{r.room_type} • Sleeps {r.capacity}</p>
                <p className="text-white mt-4 text-xl">${r.price_per_night.toLocaleString()} <span className="text-white/60 text-sm">/ night</span></p>
              </div>
            </div>
          ))}
          {rooms.length === 0 && (
            <div className="text-white/70">No rooms added yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
