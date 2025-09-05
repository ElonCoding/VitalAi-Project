import React, { useEffect, useMemo, useState } from "react";
import NewThread from "@/components/forum/NewThread";
import ThreadCard from "@/components/forum/ThreadCard";
import { Button } from "@/components/ui/button";

export default function Forum() {
  const [posts, setPosts] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<string | "All">("All");
  const [tag, setTag] = useState<string | "All">("All");
  const [isModerator, setIsModerator] = useState<boolean>(() => sessionStorage.getItem("dpis_mod") === "1");

  useEffect(() => {
    load();
    const h = () => load();
    window.addEventListener("forum:updated", h as EventListener);
    return () => window.removeEventListener("forum:updated", h as EventListener);
  }, []);

  function load() {
    try {
      const raw = localStorage.getItem("dpis_forum_posts") || "[]";
      const arr = JSON.parse(raw) as any[];
      // show non-flagged posts + flagged only to moderators
      setPosts(arr.reverse());
    } catch {
      setPosts([]);
    }
  }

  const languages = useMemo(() => Array.from(new Set(posts.map((p) => p.language || "English"))), [posts]);
  const tags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t: string) => s.add(t)));
    return Array.from(s);
  }, [posts]);

  const visible = posts.filter((p) => {
    // hide flagged posts from regular users
    if (p.flagged && !isModerator) return false;
    if (language !== "All" && p.language !== language) return false;
    if (tag !== "All" && !(p.tags || []).includes(tag)) return false;
    if (query && !(`${p.title} ${p.tags?.join(" ")} ${p.body}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  function toggleModerator() {
    const next = !isModerator;
    setIsModerator(next);
    try { sessionStorage.setItem("dpis_mod", next ? "1" : "0"); } catch {}
  }

  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.06),transparent_60%)]" />
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Peer support forum</h1>
              <p className="mt-2 text-sm text-muted-foreground">A moderated, anonymous space where students can share experiences and support each other.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={toggleModerator}>{isModerator ? "Moderator: ON" : "Moderator: OFF"}</Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <NewThread />
              <div className="mt-4">
                <div className="text-xs text-muted-foreground">Community rules: Be respectful, no hate speech, no doxxing. Posts mentioning self-harm are flagged and routed to helplines.</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-md border bg-background px-3 py-2 w-full" />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="All">All languages</option>
                  {languages.map((l) => (<option key={l} value={l}>{l}</option>))}
                </select>
                <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="All">All categories</option>
                  {tags.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
              </div>

              <div className="mt-4 space-y-3">
                {visible.length === 0 && <div className="text-sm text-muted-foreground">No threads to show.</div>}
                {visible.map((p) => (
                  <ThreadCard key={p.id} post={p} isModerator={isModerator} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
