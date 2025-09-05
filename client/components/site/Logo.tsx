import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg aria-hidden className="h-6 w-6" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--brand))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#g)" />
        <path d="M9.5 16c0-3.59 2.91-6.5 6.5-6.5S22.5 12.41 22.5 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" fill="white" />
      </svg>
      <span className="text-base font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
          VitalAI Health
        </span>
      </span>
    </div>
  );
}
