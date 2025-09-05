import { Button } from "@/components/ui/button";
import { Brain, HeartPulse, Scan, Stethoscope, Cpu, ShieldCheck, Activity, BarChart3, Bot, Building2, Lock, Database } from "lucide-react";
import { Link } from "react-router-dom";

export default function Solutions() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.15),transparent_60%)]" />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-brand" /> AI solutions for care and operations
          </span>
          <h1 className="mt-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Solutions built for healthcare impact
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Deploy targeted capabilities that plug into your EHR and imaging stack—improving outcomes while keeping PHI protected.
          </p>
        </div>
      </section>

      {/* Clinical solutions */}
      <section className="container py-10 md:py-14">
        <Header title="Clinical" subtitle="Support clinicians with explainable, workflow-native assistance." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SolutionCard
            icon={<Stethoscope className="h-5 w-5" />}
            title="Clinical Decision Support"
            bullets={["Evidence-grounded summaries", "Next-best action", "Order set suggestions"]}
          />
          <SolutionCard
            icon={<HeartPulse className="h-5 w-5" />}
            title="Patient Triage"
            bullets={["Risk-aware intake scoring", "Explainable factors", "Queue prioritization"]}
          />
          <SolutionCard
            icon={<Scan className="h-5 w-5" />}
            title="Imaging Assist"
            bullets={["Finding detection", "Structured impressions", "Report drafting"]}
          />
        </div>
      </section>

      {/* Operational solutions */}
      <section className="container py-10 md:py-14">
        <Header title="Operations" subtitle="Automate back-office work while maintaining full auditability." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SolutionCard
            icon={<Cpu className="h-5 w-5" />}
            title="Prior Auth & Utilization"
            bullets={["Smart document extraction", "Criteria matching", "Case status updates"]}
          />
          <SolutionCard
            icon={<Bot className="h-5 w-5" />}
            title="Agentic RPA"
            bullets={["Multi-step task automation", "Human-in-the-loop gates", "EHR-safe actions"]}
          />
          <SolutionCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="Clinical Documentation"
            bullets={["Note drafting", "Template adherence", "Coding hints"]}
          />
        </div>
      </section>

      {/* Integration & Security */}
      <section className="container py-10 md:py-14">
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-brand">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Seamless integrations</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Connect via FHIR/HL7, DICOM, SFTP, and event streams. Drop-in widgets surface insights in clinician workflows.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge>FHIR</Badge>
              <Badge>HL7v2</Badge>
              <Badge>DICOM</Badge>
              <Badge>SMART on FHIR</Badge>
              <Badge>Webhooks</Badge>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-brand">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-medium">Security & compliance</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              PHI is encrypted in transit and at rest. Fine-grained controls, redaction, and full audit trails.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-3">
              <Badge className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> PHI encryption</Badge>
              <Badge className="flex items-center gap-1"><Database className="h-3.5 w-3.5" /> Data minimization</Badge>
              <Badge className="flex items-center gap-1">SOC2-ready</Badge>
              <Badge className="flex items-center gap-1">HIPAA-conscious</Badge>
              <Badge className="flex items-center gap-1">Audit trails</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/20 to-accent/20" />
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold md:text-3xl">See a solution tailored to your workflows</h3>
            <p className="mt-3 text-muted-foreground">Schedule a discovery session and get a pilot in under two weeks.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="shadow-brand"><Link to="/contact">Request a demo</Link></Button>
              <Button asChild variant="outline"><Link to="/pricing">View pricing</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function SolutionCard({ icon, title, bullets }: { icon: React.ReactNode; title: string; bullets: string[] }) {
  return (
    <div className="group rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-brand">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-brand/20 to-accent/20 text-brand">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Activity className="mt-[2px] h-3.5 w-3.5 text-brand" /> <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button asChild size="sm">
          <Link to="/contact">Talk to us</Link>
        </Button>
      </div>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}
