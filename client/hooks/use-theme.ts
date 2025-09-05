import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  const system = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return system ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement.classList;
    if (theme === "dark") root.add("dark");
    else root.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-animating");
    window.setTimeout(() => root.classList.remove("theme-animating"), 350);
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggle };
}
