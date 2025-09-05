import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { onClose: () => void };

const counselors = [
  { id: "c1", name: "Dr. Mei Chen" },
  { id: "c2", name: "Alex Rivera" },
  { id: "c3", name: "Campus Counsellor" },
];

export default function BookingForm({ onClose }: Props) {
  const [datetime, setDatetime] = useState<string>(() => {
    // default to next hour
    const dt = new Date();
    dt.setHours(dt.getHours() + 24);
    dt.setMinutes(30, 0, 0);
    return dt.toISOString().slice(0, 16);
  });
  const [counselor, setCounselor] = useState(counselors[2].id);
  const [mode, setMode] = useState("in_person");
  const [notes, setNotes] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const n = localStorage.getItem("user_name");
      const e = localStorage.getItem("user_email");
      if (n) setName(n);
      if (e) setEmail(e);
    } catch {}
  }, []);

  function generateId() {
    return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function submit() {
    // create booking entry
    const id = generateId();
    const booking: any = {
      id,
      counselor,
      datetime,
      mode,
      notes,
      anonymous: Boolean(anonymous),
      createdAt: new Date().toISOString(),
    };

    if (!anonymous) {
      booking.name = name || null;
      booking.email = email || null;
    } else {
      // create a local anon token so this user can view their anonymous booking locally
      booking.anon_key = Math.random().toString(36).slice(2, 10);
      try {
        const myAnonRaw = localStorage.getItem("dpis_my_anon") || "[]";
        const myAnon = JSON.parse(myAnonRaw) as string[];
        myAnon.push(id);
        localStorage.setItem("dpis_my_anon", JSON.stringify(myAnon));
      } catch {}
    }

    try {
      const raw = localStorage.getItem("dpis_bookings") || "[]";
      const arr = JSON.parse(raw);
      arr.push(booking);
      localStorage.setItem("dpis_bookings", JSON.stringify(arr));
      // dispatch update event
      try { window.dispatchEvent(new CustomEvent("bookings:updated", { detail: booking })); } catch {}
    } catch (e) {
      // ignore
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Confidential Appointment Booking</h3>
          <div />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Book a confidential appointment with campus counsellors. Choose anonymous booking to keep your identity private.</p>

        <div className="mt-4 grid gap-3">
          <label className="text-sm">
            Appointment time
            <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
          </label>

          <label className="text-sm">
            Counselor
            <select value={counselor} onChange={(e) => setCounselor(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2">
              {counselors.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            Mode
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2">
              <option value="in_person">In‑person (on campus)</option>
              <option value="tele">Tele‑counselling</option>
              <option value="helpline">24x7 Helpline</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} /> Book anonymously (recommended)
          </label>

          {!anonymous && (
            <div>
              <label className="text-sm">Your name
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="text-sm">Your email
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
          )}

          <label className="text-sm">Notes (optional)
            <textarea className="mt-1 w-full rounded-md border bg-background px-3 py-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit}>Book appointment</Button>
        </div>
      </div>
    </div>
  );
}
