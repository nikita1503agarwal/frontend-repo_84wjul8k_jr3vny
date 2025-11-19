import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Availability() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  const fetchAvailability = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check_in: checkIn, check_out: checkOut, guests }),
      });
      if (!res.ok) throw new Error("Failed to check availability");
      const data = await res.json();
      setRooms(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="availability" className="relative py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Check-in</label>
              <input type="date" className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Check-out</label>
              <input type="date" className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Guests</label>
              <input type="number" min={1} max={12} className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" value={guests} onChange={(e) => setGuests(parseInt(e.target.value || 1))} />
            </div>
            <div className="md:col-span-2 flex items-end gap-3">
              <button onClick={fetchAvailability} className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-white/90 transition">
                {loading ? "Checking..." : "Check availability"}
              </button>
              {error && <span className="text-rose-300 text-sm">{error}</span>}
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r) => (
            <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {r.images?.[0] && (
                <img src={r.images[0]} alt={r.name} className="w-full h-44 object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-white text-lg font-semibold">{r.name}</h3>
                <p className="text-white/70 text-sm mt-1">Sleeps {r.capacity} • {r.beds} beds</p>
                <p className="text-white mt-4 text-xl">${r.price_per_night.toLocaleString()} <span className="text-white/60 text-sm">/ night</span></p>
                <a href={`#book-${r.id}`} className="mt-4 inline-block px-4 py-2 rounded-lg bg-white text-slate-900">Book now</a>
              </div>
            </div>
          ))}
          {!loading && rooms.length === 0 && (
            <div className="text-white/70">No rooms available for these dates.</div>
          )}
        </div>
      </div>
    </section>
  );
}
