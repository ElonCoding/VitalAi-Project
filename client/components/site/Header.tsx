import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/chat", label: "Chatbot" },
  { to: "/resources", label: "Resources" },
  { to: "/forum", label: "Forum" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const n = localStorage.getItem("user_name");
      setUserName(n);
    } catch {
      setUserName(null);
    }

    const handler = (e: Event) => {
      try {
        const detail = (e as CustomEvent)?.detail;
        if (detail?.name) setUserName(detail.name);
        else {
          const n = localStorage.getItem("user_name");
          setUserName(n);
        }
      } catch {
        const n = localStorage.getItem("user_name");
        setUserName(n);
      }
    };

    window.addEventListener("user:login", handler as EventListener);
    return () => window.removeEventListener("user:login", handler as EventListener);
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      try { window.dispatchEvent(new CustomEvent('user:logout')); } catch {}
    } catch {}
    setUserName(null);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {userName ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="!px-2">
                <User className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{userName}</span>
                <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
              <Button asChild className="shadow-brand">
                <Link to="/contact">Request demo</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <div className="container py-2">
            <div className="flex flex-col gap-1 py-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent ${isActive ? "text-foreground" : "text-muted-foreground"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="ghost" onClick={() => { toggle(); setOpen(false); }} aria-label="Toggle theme">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {userName ? (
                  <>
                    <Button asChild variant="ghost">
                      <Link to="/me" onClick={() => setOpen(false)}>Profile</Link>
                    </Button>
                    <Button variant="outline" onClick={() => { setOpen(false); handleLogout(); }}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost">
                      <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <Button asChild className="mt-2">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Request demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
