import { Button } from "@/components/ui/button";
import { CheckCircle2, HeartPulse, ShieldCheck, Sparkles, Stethoscope, Brain, LineChart, Lock, Scan } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_35rem_at_50%_-10%,hsl(var(--brand)/0.18),transparent_60%)]" />

      {/* Hero */}
      <section className="container py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand" /> AI for safer, smarter care
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Elevate healthcare with trusted AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:max-w-[48ch]">
              VitalAI Health blends clinical expertise with cutting-edge models to assist decisions, automate workflows, and keep data private by design.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="shadow-brand">
                <Link to="/contact">Request a demo</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/solutions">Explore solutions</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-brand" /> HIPAA-aware • On-prem or cloud • Human-in-the-loop
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand/15 to-accent/20 blur-2xl" />
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <MetricCard icon={<HeartPulse className="h-5 w-5" />} title="Triage" value="98.6%" subtitle="Precision" />
                <MetricCard icon={<Scan className="h-5 w-5" />} title="Imaging" value="+37%" subtitle="Faster reads" />
                <MetricCard icon={<Stethoscope className="h-5 w-5" />} title="CDS" value="-28%" subtitle="Decision time" />
                <MetricCard icon={<Lock className="h-5 w-5" />} title="Privacy" value="100%" subtitle="PHI encrypted" />
              </div>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-brand/15 to-accent/15 p-4">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-brand" />
                  <p className="text-sm">On-device inference options for protected workflows.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="border-y bg-muted/30">
        <div className="container py-8 md:py-10">
          <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">Built with security and safety at the core</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <Badge>HIPAA-conscious</Badge>
            <Badge>SOC2-ready</Badge>
            <Badge>PHI Encryption</Badge>
            <Badge>Audit Trails</Badge>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Healthcare-grade AI capabilities</h2>
          <p className="mt-4 text-muted-foreground">Modular building blocks that slot into your clinical and operational workflows.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<Stethoscope className="h-5 w-5" />} title="Clinical support" desc="Evidence-grounded summaries and order sets for complex cases." />
          <Feature icon={<HeartPulse className="h-5 w-5" />} title="Patient triage" desc="Prioritize intake with risk-aware, explainable scoring." />
          <Feature icon={<Scan className="h-5 w-5" />} title="Imaging assist" desc="Flag findings and generate structured impressions." />
          <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Compliance" desc="Data minimization, redaction, and robust access controls." />
        </div>
      </section>

      {/* How it works */}
      <section className="container py-20 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold md:text-3xl">How it works</h3>
            <ol className="mt-6 space-y-6">
              <Step n={1} title="Connect" desc="Integrate EHR, imaging, and device data via secure connectors." />
              <Step n={2} title="Analyze" desc="Run task-tuned models with optional human review gates." />
              <Step n={3} title="Act" desc="Deliver insights back into your systems with full auditability." />
            </ol>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-brand" />
                <span className="text-sm font-medium">Impact preview</span>
              </div>
              <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">Live</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <Impact kpi="Time to triage" value="-28%" />
              <Impact kpi="Length of stay" value="-12%" />
              <Impact kpi="Readmissions" value="-9%" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/20 to-accent/20" />
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold md:text-3xl">Ready to accelerate patient outcomes?</h3>
            <p className="mt-3 text-muted-foreground">Start with a security review and a pilot in under 2 weeks.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="shadow-brand"><Link to="/contact">Book a demo</Link></Button>
              <Button asChild variant="outline"><Link to="/pricing">View pricing</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-brand">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-brand/20 to-accent/20 text-brand">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="relative pl-9">
      <span className="absolute left-0 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-brand-foreground">
        {n}
      </span>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </li>
  );
}

function MetricCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="text-brand">{icon}</div>
        <span className="text-xs">{title}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  );
}

function Impact({ kpi, value }: { kpi: string; value: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs text-muted-foreground">{kpi}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}
