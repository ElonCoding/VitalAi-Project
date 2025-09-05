import { Link } from "react-router-dom";

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80rem_40rem_at_50%_-20%,hsl(var(--brand)/0.15),transparent_60%)]" />
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            This page is a placeholder. Continue prompting to fill in tailored content and components.
          </p>
          <div className="mt-8">
            <Link to="/" className="text-sm text-brand underline-offset-4 hover:underline">Back to home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
