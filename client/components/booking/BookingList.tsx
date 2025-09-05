import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function BookingList({ compact = false }: { compact?: boolean }) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [myAnonIds, setMyAnonIds] = useState<string[]>([]);

  useEffect(() => {
    load();
    const h = () => load();
    window.addEventListener("bookings:updated", h as EventListener);
    return () => window.removeEventListener("bookings:updated", h as EventListener);
  }, []);

  function load() {
    try {
      const raw = localStorage.getItem("dpis_bookings") || "[]";
      const arr = JSON.parse(raw) as any[];
      setBookings(arr.reverse());
    } catch {
      setBookings([]);
    }
    try {
      setUserEmail(localStorage.getItem("user_email"));
    } catch {
      setUserEmail(null);
    }
    try {
      const raw = localStorage.getItem("dpis_my_anon") || "[]";
      setMyAnonIds(JSON.parse(raw));
    } catch {
      setMyAnonIds([]);
    }
  }

  const visible = bookings.filter((b) => {
    if (b.anonymous) {
      // show anonymous bookings only if they belong to this user locally
      return myAnonIds.includes(b.id);
    }
    if (userEmail && b.email && b.email === userEmail) return true;
    // also allow seeing bookings if not anonymous and name matches
    try {
      const userName = localStorage.getItem("user_name");
      if (b.name && userName && b.name === userName) return true;
    } catch {}
    return false;
  });

  if (visible.length === 0) {
    return (
      <div className={compact ? "p-0" : "rounded-2xl border bg-card p-4"}>
        <div className="text-sm text-muted-foreground">No bookings found.</div>
      </div>
    );
  }

  return (
    <div className={compact ? "p-0" : "rounded-2xl border bg-card p-4"}>
      <div className="space-y-3">
        {visible.map((b) => (
          <div key={b.id} className="rounded-md border p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{b.mode === 'helpline' ? 'Helpline / Crisis' : b.mode === 'tele' ? 'Tele‑counselling' : 'In‑person'}</div>
              <div className="text-xs text-muted-foreground">{new Date(b.datetime).toLocaleString()}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Counsellor: {b.counselor}</div>
            {b.anonymous ? (
              <div className="mt-2 text-sm">Booked anonymously</div>
            ) : (
              <div className="mt-2 text-sm">Booked for: <span className="font-medium">{b.name || b.email}</span></div>
            )}
            {b.notes && <div className="mt-2 text-xs text-muted-foreground">Notes: {b.notes}</div>}
            <div className="mt-3 flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => cancel(b.id)}>Cancel</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function cancel(id: string) {
    try {
      const raw = localStorage.getItem("dpis_bookings") || "[]";
      const arr = JSON.parse(raw) as any[];
      const remaining = arr.filter((x) => x.id !== id);
      localStorage.setItem("dpis_bookings", JSON.stringify(remaining));
      // remove anon id mapping
      try {
        const myRaw = localStorage.getItem("dpis_my_anon") || "[]";
        const my = JSON.parse(myRaw) as string[];
        const filtered = my.filter((x) => x !== id);
        localStorage.setItem("dpis_my_anon", JSON.stringify(filtered));
      } catch {}
      window.dispatchEvent(new CustomEvent("bookings:updated"));
      load();
    } catch {}
  }
}
