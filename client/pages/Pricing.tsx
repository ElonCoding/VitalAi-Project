import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Headset, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.14),transparent_60%)]" />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Start small and scale with confidence. Security and compliance included in every plan.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className={!annual ? "text-foreground" : ""}>Monthly</span>
            <button
              className="relative h-6 w-11 rounded-full bg-secondary transition"
              aria-label="Toggle billing"
              onClick={() => setAnnual((v) => !v)}
            >
              <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-background shadow transition ${annual ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span className={annual ? "text-foreground" : ""}>Annual <span className="text-brand">(save 15%)</span></span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container pb-10 md:pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Plan
            name="Starter"
            price={annual ? 49 : 59}
            tagline="For small teams exploring AI-assisted workflows."
            features={[
              "Up to 3 users",
              "Triage & CDS widgets",
              "Email support",
              "PHI encryption",
            ]}
            cta={{ label: "Get started", to: "/contact" }}
          />
          <Plan
            highlighted
            name="Professional"
            price={annual ? 199 : 229}
            tagline="For growing orgs with clinical and operational use cases."
            features={[
              "Unlimited users",
              "Imaging assist",
              "Audit trails",
              "Priority support",
            ]}
            cta={{ label: "Request demo", to: "/contact" }}
          />
          <Plan
            name="Enterprise"
            price={0}
            tagline="Advanced security, custom SLAs, and on‑prem options."
            features={[
              "SAML/SSO & SCIM",
              "On‑prem or private cloud",
              "BAA & compliance reviews",
              "Dedicated success manager",
            ]}
            enterprise
            cta={{ label: "Talk to sales", to: "/contact" }}
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ValueCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Security by default"
            desc="HIPAA-conscious practices, SOC2-aware controls, encryption in transit and at rest, and data minimization."
            badges={["HIPAA-conscious", "SOC2-ready", "PHI encryption"]}
          />
          <ValueCard
            icon={<Headset className="h-5 w-5" />}
            title="Partnered onboarding"
            desc="Clinical enablement and technical integration support to reach value quickly."
            badges={["Solution design", "Pilot planning", "Integration support"]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/20 to-accent/20" />
        <div className="container py-14 md:py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold md:text-3xl">Need a custom deployment?</h3>
            <p className="mt-3 text-muted-foreground">We support on-prem, air‑gapped, and private cloud options.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="shadow-brand"><Link to="/contact">Talk to sales</Link></Button>
              <Button asChild variant="outline"><Link to="/solutions">Explore solutions</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Plan({ name, price, tagline, features, cta, highlighted = false, enterprise = false }: {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  cta: { label: string; to: string };
  highlighted?: boolean;
  enterprise?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl border bg-card p-6 shadow-sm ${highlighted ? "ring-1 ring-brand" : ""}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border bg-background px-3 py-1 text-xs text-brand">
          Most popular
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{name}</h3>
        {enterprise && <Building2 className="h-4 w-4 text-muted-foreground" />}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
      <div className="mt-5 flex items-baseline gap-1">
        {price > 0 ? (
          <>
            <span className="text-3xl font-semibold">${price}</span>
            <span className="text-xs text-muted-foreground">/mo</span>
          </>
        ) : (
          <span className="text-2xl font-semibold">Custom</span>
        )}
      </div>
      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-[2px] h-4 w-4 text-brand" /> <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button asChild className="w-full">
          <Link to={cta.to}>{cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, desc, badges }: { icon: React.ReactNode; title: string; desc: string; badges: string[] }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-brand">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {badges.map((b) => (
          <span key={b} className="inline-flex items-center rounded-full border bg-background px-3 py-1">{b}</span>
        ))}
      </div>
    </div>
  );
}
