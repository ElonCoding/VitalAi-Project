import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, HeartPulse, Activity, CalendarClock, Stethoscope, Pill, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "@/components/booking/BookingForm";
import BookingList from "@/components/booking/BookingList";

export default function Dashboard() {
  const [name, setName] = useState("Friend");
  const [showBooking, setShowBooking] = useState(false);
  useEffect(() => {
    try {
      const n = localStorage.getItem("user_name");
      if (n) setName(n);
    } catch {}
  }, []);

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.12),transparent_60%)]" />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-brand" /> Personalized dashboard
          </div>
          <h1 className="mt-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Welcome to your dashboard, {name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Quick insights and shortcuts across your health data and tasks.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild className="shadow-brand"><Link to="/me">View profile</Link></Button>
            <Button onClick={() => setShowBooking(true)} variant="outline">Book appointment</Button>
            <Button asChild variant="outline"><Link to="/contact">Get support</Link></Button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card icon={<HeartPulse className="h-5 w-5" />} title="Vitals" body={<span className="text-xl font-semibold">HR 64 • SpO₂ 98%</span>} footer="Stable last 7 days" />
          <Card icon={<CalendarClock className="h-5 w-5" />} title="Next visit" body={<span className="text-xl font-semibold">Tue 10:30</span>} footer="With Dr. Chen" />
          <Card icon={<Pill className="h-5 w-5" />} title="Medications" body={<span className="text-xl font-semibold">3 active</span>} footer={<Link to="/me" className="text-xs text-brand">Manage</Link>} />
          <Card icon={<FileText className="h-5 w-5" />} title="Labs due" body={<span className="text-xl font-semibold">2</span>} footer="Next: A1C" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-2 text-brand"><Activity className="h-5 w-5" /><h3 className="text-sm font-semibold">Activity overview</h3></div>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <MiniChart label="Steps" value="8,240" />
              <MiniChart label="Heart Rate" value="64 bpm" />
              <MiniChart label="Sleep" value="7h 45m" />
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-brand"><Stethoscope className="h-5 w-5" /><h3 className="text-sm font-semibold">Care plan</h3></div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• 30‑min walk, 5 days/week</li>
              <li>• Check blood pressure 3×/week</li>
              <li>• Mediterranean‑style meals</li>
            </ul>
            <div className="mt-4"><Button asChild size="sm"><Link to="/me">Update goals</Link></Button></div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-lg font-semibold">Your bookings</h3>
          <p className="mt-2 text-sm text-muted-foreground">View or cancel confidential appointments you've made. Anonymous bookings remain private.</p>
          <div className="mt-4"><BookingList /></div>
        </div>
      </section>

      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}
    </main>
  );
}

function Card({ icon, title, body, footer }: { icon: React.ReactNode; title: string; body: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-brand">{icon}<h4 className="text-sm font-semibold">{title}</h4></div>
      <div className="mt-3">{body}</div>
      {footer && <div className="mt-2 text-xs text-muted-foreground">{footer}</div>}
    </div>
  );
}

function MiniChart({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <svg viewBox="0 0 120 40" className="mt-2 h-16 w-full">
        <path d="M0 28 L10 24 L20 26 L30 18 L40 22 L50 14 L60 20 L70 12 L80 22 L90 16 L100 22 L120 18" fill="none" stroke="hsl(var(--brand))" strokeWidth="2" />
      </svg>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
