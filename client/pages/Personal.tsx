import { Button } from "@/components/ui/button";
import BookingForm from "@/components/booking/BookingForm";
import BookingList from "@/components/booking/BookingList";
import {
  User,
  ShieldCheck,
  LogOut,
  Pencil,
  HeartPulse,
  Stethoscope,
  Pill,
  FlaskConical,
  CalendarClock,
  Activity,
  Phone,
  Mail,
  FileText,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Personal() {
  const [name, setName] = useState("Guest");
  const [email, setEmail] = useState("guest@example.com");
  const [showBooking, setShowBooking] = useState(false);
  useEffect(() => {
    try {
      const n = localStorage.getItem("user_name");
      const e = localStorage.getItem("user_email");
      if (n) setName(n);
      if (e) setEmail(e);
    } catch {}
  }, []);

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.12),transparent_60%)]" />

      {/* Greeting */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Welcome back, {name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Here’s a quick view of your health, care team, and upcoming tasks.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Button asChild variant="outline">
              <a href="/">Back to home</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="container py-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confidential booking</h2>
            <div>
              <Button size="sm" onClick={() => setShowBooking(true)}>Book appointment</Button>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Securely book with campus counsellors. Choose anonymous booking to keep your identity private.</p>
          <div className="mt-4"><BookingList /></div>
        </div>
      </section>

      {/* Top summary cards */}
      <section className="container">
        <div className="grid gap-6 md:grid-cols-4">
          <Stat icon={<HeartPulse className="h-5 w-5" />} label="Resting HR" value="64 bpm" trend="Stable" />
          <Stat icon={<Activity className="h-5 w-5" />} label="SpO₂" value="98%" trend="Normal" />
          <Stat icon={<FileText className="h-5 w-5" />} label="Labs due" value="2" trend="Next: A1C" />
          <Stat icon={<CalendarClock className="h-5 w-5" />} label="Next visit" value="Tue 10:30" trend="Dr. Chen" />
        </div>
      </section>

      {/* Main grid */}
      <section className="container py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Care plan */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-brand">
                <Stethoscope className="h-5 w-5" />
                <h3 className="text-sm font-semibold">Personal care plan</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" /> 30‑min walk, 5 days/week</li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" /> Check blood pressure 3×/week and log results</li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" /> Mediterranean‑style meals; track hydration</li>
              </ul>
              <div className="mt-5 flex gap-2">
                <Button size="sm" variant="outline" className="gap-2"><Pencil className="h-4 w-4" /> Update goals</Button>
                <Button size="sm" className="gap-2">Share with provider</Button>
              </div>
            </div>

            {/* Medications & Labs */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 text-brand"><Pill className="h-5 w-5" /><h4 className="text-sm font-semibold">Medications</h4></div>
                <ul className="mt-3 space-y-3 text-sm">
                  <Med name="Atorvastatin 20mg" instr="1 tab nightly" />
                  <Med name="Metformin 500mg" instr="1 tab twice daily" />
                  <Med name="Lisinopril 10mg" instr="1 tab each morning" />
                </ul>
                <div className="mt-4 text-xs text-muted-foreground">Set reminders in Settings to avoid missed doses.</div>
              </div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 text-brand"><FlaskConical className="h-5 w-5" /><h4 className="text-sm font-semibold">Recent labs</h4></div>
                <ul className="mt-3 space-y-3 text-sm">
                  <Lab name="A1C" value="6.7%" range="Goal < 7%" />
                  <Lab name="LDL" value="92 mg/dL" range="Goal < 100" />
                  <Lab name="Creatinine" value="0.9 mg/dL" range="Normal" />
                </ul>
              </div>
            </div>

            {/* Vitals trend */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand"><Activity className="h-5 w-5" /><h4 className="text-sm font-semibold">Vitals (last 7 days)</h4></div>
                <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">Wearable</span>
              </div>
              <div className="mt-4 grid gap-6 md:grid-cols-3">
                <MiniChart label="Heart Rate" value="64 bpm" color="var(--brand)" />
                <MiniChart label="Blood Pressure" value="118/76" color="var(--accent)" />
                <MiniChart label="Steps" value="8,240" color="var(--brand)" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Profile */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-accent/20 text-brand">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{name}</div>
                  <div className="text-xs text-muted-foreground">{email}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="gap-2"><Pencil className="h-4 w-4" /> Edit</Button>
                <Button size="sm" variant="ghost" className="gap-2"><LogOut className="h-4 w-4" /> Logout</Button>
              </div>
            </div>

            {/* Care team */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h4 className="text-sm font-semibold">Care team</h4>
              <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                <Team name="Dr. Mei Chen" role="Primary Care" phone="(555) 214‑0191" />
                <Team name="Alex Rivera, RN" role="Care Navigator" phone="(555) 308‑4421" />
              </ul>
              <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Mercy Medical Center, SF</div>
            </div>

            {/* Contacts */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h4 className="text-sm font-semibold">Get support</h4>
              <div className="mt-3 grid gap-3 text-sm">
                <a className="flex items-center gap-2 text-brand" href="tel:+15551234567"><Phone className="h-4 w-4" /> Call nurse line</a>
                <a className="flex items-center gap-2 text-brand" href="mailto:care@vitalai.health"><Mail className="h-4 w-4" /> care@vitalai.health</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}
    </main>
  );
}

function Stat({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs">{label}</span></div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{trend}</div>
    </div>
  );
}

function Med({ name, instr }: { name: string; instr: string }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{instr}</div>
      </div>
      <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">On track</span>
    </li>
  );
}

function Lab({ name, value, range }: { name: string; value: string; range: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <div className="font-medium">{name}</div>
      <div className="text-right">
        <div className="text-sm font-semibold">{value}</div>
        <div className="text-xs text-muted-foreground">{range}</div>
      </div>
    </li>
  );
}

function Team({ name, role, phone }: { name: string; role: string; phone: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
      <a className="text-xs text-brand" href={`tel:${phone}`}>{phone}</a>
    </li>
  );
}

function MiniChart({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <svg viewBox="0 0 120 40" className="mt-2 h-16 w-full">
        <path d="M0 28 L15 26 L25 30 L35 18 L45 24 L55 14 L65 22 L75 12 L85 20 L95 16 L105 22 L120 18" fill="none" stroke={`hsl(${color})`} strokeWidth="2" />
      </svg>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
