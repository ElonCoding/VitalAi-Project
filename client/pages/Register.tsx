import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Building2, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    const name = String(form.get("name") || "");
    if (!email || !password || !name) {
      toast.error("Name, email and password are required.");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 600));
    try {
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      // notify other components in the SPA about login
      try { window.dispatchEvent(new CustomEvent('user:login', { detail: { name, email } })); } catch {}
    } catch {}
    toast.success("Account created. Welcome!");
    navigate("/dashboard");
  }

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.12),transparent_60%)]" />
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <h1 className="text-center bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">Create your account</h1>
          <p className="mt-4 text-center text-muted-foreground">Start your personalized healthcare journey.</p>
          <form onSubmit={onSubmit} className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
            <Field label="Full name" htmlFor="name" icon={<User className="h-4 w-4 text-brand" />}>
              <input id="name" name="name" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </Field>
            <div className="mt-4" />
            <Field label="Work email" htmlFor="email" icon={<Mail className="h-4 w-4 text-brand" />}>
              <input id="email" name="email" type="email" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </Field>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Password" htmlFor="password" icon={<Lock className="h-4 w-4 text-brand" />}>
                <input id="password" name="password" type="password" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </Field>
              <Field label="Confirm" htmlFor="confirm" icon={<Lock className="h-4 w-4 text-brand" />}>
                <input id="confirm" name="confirm" type="password" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </Field>
            </div>
            <div className="mt-4" />
            <Field label="Organization (optional)" htmlFor="org" icon={<Building2 className="h-4 w-4 text-brand" />}>
              <input id="org" name="org" className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </Field>
            <div className="mt-6 flex items-center gap-2">
              <Button type="submit" disabled={loading} className="w-full gap-2 shadow-brand">
                <UserPlus className="h-4 w-4" /> {loading ? "Creating…" : "Create account"}
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Already have an account? <Link to="/login" className="text-brand">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, htmlFor, icon, children }: { label: string; htmlFor: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        <div className="pl-8">{children}</div>
      </div>
    </div>
  );
}
