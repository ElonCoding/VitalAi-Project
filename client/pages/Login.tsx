import { Button } from "@/components/ui/button";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    if (!email || !password) {
      toast.error("Email and password are required.");
      setLoading(false);
      return;
    }
    await new Promise((r) => setTimeout(r, 500));
    try {
      localStorage.setItem("user_email", email);
      const existing = localStorage.getItem("user_name");
      if (!existing) {
        const inferred = email.split("@")[0].replace(/[^a-zA-Z0-9]+/g, " ").trim();
        if (inferred) localStorage.setItem("user_name", inferred.charAt(0).toUpperCase() + inferred.slice(1));
      }
      try { window.dispatchEvent(new CustomEvent('user:login', { detail: { name: localStorage.getItem('user_name'), email } })); } catch {}
    } catch {}
    toast.success("Welcome back!");
    navigate("/me");
  }

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.12),transparent_60%)]" />
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <h1 className="text-center bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">Login</h1>
          <p className="mt-4 text-center text-muted-foreground">Access your personal health dashboard.</p>
          <form onSubmit={onSubmit} className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
            <Field label="Email" htmlFor="email" icon={<Mail className="h-4 w-4 text-brand" />}>
              <input id="email" name="email" type="email" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </Field>
            <div className="mt-4" />
            <Field label="Password" htmlFor="password" icon={<Lock className="h-4 w-4 text-brand" />}>
              <input id="password" name="password" type="password" required className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </Field>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <label className="flex items-center gap-2"><input type="checkbox" name="remember" /> Remember me</label>
              <a href="#" className="text-brand">Forgot password?</a>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Button type="submit" disabled={loading} className="w-full gap-2 shadow-brand">
                <LogIn className="h-4 w-4" /> {loading ? "Signing in…" : "Sign in"}
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              New here? <Link to="/register" className="text-brand">Create an account</Link>
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
