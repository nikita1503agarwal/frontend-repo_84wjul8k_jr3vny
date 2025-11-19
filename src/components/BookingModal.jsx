import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function BookingModal({ open, onClose, room, dates, guests }) {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [special, setSpecial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const nights = useMemo(() => {
    if (!dates?.checkIn || !dates?.checkOut) return 1;
    const a = new Date(dates.checkIn);
    const b = new Date(dates.checkOut);
    const diff = Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
    return diff;
  }, [dates]);

  const total = useMemo(() => {
    if (!room) return 0;
    return nights * (room.price_per_night || 0);
  }, [room, nights]);

  const submit = async (e) => {
    e?.preventDefault();
    if (!room) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: room.id,
          guest_name: guestName,
          email,
          phone,
          check_in: dates.checkIn,
          check_out: dates.checkOut,
          guests,
          special_requests: special,
          status: "confirmed",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to create booking");
      setConfirmation(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setGuestName("");
    setEmail("");
    setPhone("");
    setSpecial("");
    setError("");
    setConfirmation(null);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={resetAndClose} />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative w-[90vw] max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0E14]/95 text-white shadow-2xl"
          >
            <div className="absolute -top-32 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)] pointer-events-none" />

            <div className="relative p-6">
              {!confirmation ? (
                <form onSubmit={submit}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">Confirm your stay</h3>
                      <p className="text-white/70 text-sm mt-1">{room?.name} • {nights} night{nights>1?"s":""} • {guests} guest{guests>1?"s":""}</p>
                    </div>
                    <button type="button" onClick={resetAndClose} className="text-white/60 hover:text-white">✕</button>
                  </div>

                  {room?.images?.[0] && (
                    <div className="mt-4 overflow-hidden rounded-xl">
                      <img src={room.images[0]} alt={room.name} className="h-32 w-full object-cover" />
                    </div>
                  )}

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Full name</label>
                      <input required value={guestName} onChange={(e)=>setGuestName(e.target.value)} className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Ava Thompson" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Email</label>
                      <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="ava@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Phone</label>
                      <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="+1 555 123 4567" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Special requests</label>
                      <input value={special} onChange={(e)=>setSpecial(e.target.value)} className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Allergies, arrival time, etc." />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-white/80">
                      <div className="text-sm">Total</div>
                      <div className="text-2xl font-semibold">${total.toLocaleString()}</div>
                      <div className="text-xs text-white/60">Taxes included • Pay at property</div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="size-2 rounded-full bg-slate-900 animate-pulse" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          Reserve now
                        </>
                      )}
                    </motion.button>
                  </div>

                  {error && <div className="mt-4 text-sm text-rose-300">{error}</div>}
                </form>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">Reservation confirmed</h3>
                      <p className="text-white/70 text-sm mt-1">We’ve sent a confirmation to {confirmation.email}.</p>
                    </div>
                    <button type="button" onClick={resetAndClose} className="text-white/60 hover:text-white">✕</button>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-white/60">Guest</span><span>{confirmation.guest_name}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Room</span><span>{room?.name}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Dates</span><span>{dates.checkIn} → {dates.checkOut}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Guests</span><span>{confirmation.guests}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Total</span><span>${total.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Reservation ID</span><span className="font-mono text-white/80">{confirmation.id}</span></div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button onClick={resetAndClose} className="rounded-xl border border-white/20 px-5 py-2 text-white hover:border-white/40">Close</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
