import React, { useMemo, useState } from "react";
import ResourceCard from "@/components/resources/ResourceCard";
import { Button } from "@/components/ui/button";

type Resource = {
  id: string;
  title: string;
  type: "video" | "audio" | "guide";
  language: string;
  tags: string[];
  src?: string;
  description?: string;
};

const SAMPLE: Resource[] = [
  {
    id: "r1",
    title: "5‑minute Guided Relaxation",
    type: "audio",
    language: "English",
    tags: ["stress", "relaxation"],
    src: "/assets/audio/relaxation-5min.mp3",
    description:
      "A short guided relaxation to reduce acute stress and ground attention.",
  },
  {
    id: "r2",
    title: "Breathing Exercise for Anxiety",
    type: "video",
    language: "English",
    tags: ["anxiety", "breathing"],
    src: "/assets/video/breathing.mp4",
    description:
      "Demonstration of paced breathing (4‑7‑8) with calming visuals.",
  },
  {
    id: "r3",
    title: "Exam Stress Toolkit (Guide)",
    type: "guide",
    language: "Hindi",
    tags: ["exam", "study tips"],
    src: "/assets/guides/exam-toolkit-hi.pdf",
    description: "Step-by-step strategies to manage exam anxiety in Hindi.",
  },
  {
    id: "r4",
    title: "Sleep Hygiene Tips",
    type: "guide",
    language: "English",
    tags: ["sleep", "insomnia"],
    src: "/assets/guides/sleep-hygiene.pdf",
    description:
      "Evidence-based sleep hygiene practices to improve sleep quality.",
  },
  {
    id: "r5",
    title: "Progressive Muscle Relaxation",
    type: "audio",
    language: "Tamil",
    tags: ["relaxation", "stress"],
    src: "/assets/audio/pmr-ta.mp3",
    description: "Guided progressive muscle relaxation in Tamil.",
  },
];

export default function Resources() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<string | "All">("All");
  const [category, setCategory] = useState<string | "All">("All");

  const languages = useMemo(
    () => Array.from(new Set(SAMPLE.map((r) => r.language))),
    [],
  );
  const tags = useMemo(() => {
    const s = new Set<string>();
    SAMPLE.forEach((r) => r.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = SAMPLE.filter((r) => {
    if (language !== "All" && r.language !== language) return false;
    if (category !== "All" && !r.tags.includes(category)) return false;
    if (
      query &&
      !`${r.title} ${r.tags.join(" ")} ${r.description || ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.06),transparent_60%)]" />
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">
            Psychoeducational Resource Hub
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Multimedia library with videos, relaxation audio, and step-by-step
            wellness guides in multiple languages.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <input
                placeholder="Search resources"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-md border bg-background px-3 py-2"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setLanguage("All");
                  setCategory("All");
                }}
              >
                Reset
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="All">All languages</option>
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="All">All categories</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
            {filtered.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No resources found.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
