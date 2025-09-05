import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Building2, User, MessageSquare, Phone, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const org = String(form.get("org") || "");
    const message = String(form.get("message") || "");

    if (!name || !email || !message) {
      toast.error("Please fill in name, email, and message.");
      setLoading(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    (e.currentTarget as HTMLFormElement).reset();
    toast.success("Thanks! We'll reach out shortly.");
  }

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.12),transparent_60%)]" />

      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Contact us
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us about your workflows and we’ll tailor a pilot for your team.
          </p>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4">
              <Field label="Full name" htmlFor="name" icon={<User className="h-4 w-4 text-brand" />}>
                <input id="name" name="name" type="text" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </Field>
              <Field label="Work email" htmlFor="email" icon={<Mail className="h-4 w-4 text-brand" />}>
                <input id="email" name="email" type="email" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </Field>
              <Field label="Organization" htmlFor="org" icon={<Building2 className="h-4 w-4 text-brand" />}>
                <input id="org" name="org" type="text" className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </Field>
              <Field label="Message" htmlFor="message" icon={<MessageSquare className="h-4 w-4 text-brand" />}>
                <textarea id="message" name="message" required rows={5} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </Field>
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" name="compliance" className="mt-[3px]" />
                I agree that my information will be handled according to the privacy policy.
              </label>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button type="submit" disabled={loading} className="shadow-brand">
                {loading ? "Sending…" : "Send message"}
              </Button>
              <a href="mailto:hello@example.com" className="text-sm text-brand underline-offset-4 hover:underline">Or email us directly</a>
            </div>
          </form>

          <aside className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold">How we partner</h3>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Phone className="mt-[2px] h-4 w-4 text-brand" /> Discovery call to map workflows and objectives</li>
              <li className="flex items-start gap-2"><Shield className="mt-[2px] h-4 w-4 text-brand" /> Security & compliance review</li>
              <li className="flex items-start gap-2"><MessageSquare className="mt-[2px] h-4 w-4 text-brand" /> Pilot with measurable KPIs</li>
            </ul>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-brand/15 to-accent/15 p-4 text-xs text-muted-foreground">
              We support on‑prem, air‑gapped, and private cloud deployments.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ label, htmlFor, icon, children }: { label: string; htmlFor: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        <div className="pl-8">{children}</div>
      </div>
    </div>
  );
}
