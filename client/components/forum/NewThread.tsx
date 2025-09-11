import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function generateId() {
  return `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const HARMFUL = [
  "suicid",
  "kill myself",
  "end my life",
  "harm myself",
  "want to die",
  "dont want to live",
  "hurt myself",
];

export default function NewThread({ onClose }: { onClose?: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("English");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [flagged, setFlagged] = useState(false);
  const [warning, setWarning] = useState("");

  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    if (!tags.includes(t)) setTags((s) => [...s, t]);
    setTagInput("");
  }

  function removeTag(t: string) {
    setTags((s) => s.filter((x) => x !== t));
  }

  function runFilter(text: string) {
    const low = text.toLowerCase();
    for (const kw of HARMFUL) {
      if (low.includes(kw)) return true;
    }
    return false;
  }

  function submit() {
    if (!title.trim() || !body.trim()) return;
    const isFlagged = runFilter(title + "\n" + body);
    setFlagged(isFlagged);
    if (isFlagged) {
      setWarning(
        "Content was flagged by our safety filters. If you are at immediate risk, contact local emergency services or a helpline. You can still post anonymously, or choose to seek immediate helpline support.",
      );
    }

    const id = generateId();
    const post = {
      id,
      title: title.trim(),
      body: body.trim(),
      language,
      tags,
      anonymous: Boolean(anonymous),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      reports: 0,
      flagged: isFlagged,
      comments: [],
    } as any;

    try {
      const raw = localStorage.getItem("dpis_forum_posts") || "[]";
      const arr = JSON.parse(raw);
      arr.push(post);
      localStorage.setItem("dpis_forum_posts", JSON.stringify(arr));
      try {
        window.dispatchEvent(
          new CustomEvent("forum:updated", { detail: post }),
        );
      } catch {}
    } catch {}

    // reset
    setTitle("");
    setBody("");
    setTags([]);
    setFlagged(false);
    setWarning("");
    if (onClose) onClose();
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <h3 className="text-sm font-semibold">Start a new thread</h3>
      <div className="mt-3 grid gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thread title"
          className="w-full rounded-md border bg-background px-3 py-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience or ask for support (anonymous by default)"
          className="w-full rounded-md border bg-background px-3 py-2 min-h-[100px]"
        />

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Spanish</option>
          </select>

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="add tag (e.g. stress)"
            className="rounded-md border bg-background px-3 py-2 text-sm"
          />
          <Button size="sm" variant="ghost" onClick={addTag}>
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => removeTag(t)}
              className="rounded-full bg-secondary/40 px-3 py-1 text-xs"
            >
              {t} ✕
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />{" "}
          Post anonymously
        </label>

        {warning && <div className="text-xs text-destructive">{warning}</div>}

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setTitle("");
              setBody("");
              setTags([]);
            }}
          >
            Clear
          </Button>
          <Button onClick={submit}>Post thread</Button>
        </div>
      </div>
    </div>
  );
}
