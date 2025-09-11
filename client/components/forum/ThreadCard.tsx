import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThreadCard({
  post,
  isModerator = false,
}: {
  post: any;
  isModerator?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [reports, setReports] = useState(post.reports || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  function persistUpdate(changes: any) {
    try {
      const raw = localStorage.getItem("dpis_forum_posts") || "[]";
      const arr = JSON.parse(raw) as any[];
      const idx = arr.findIndex((x) => x.id === post.id);
      if (idx >= 0) {
        arr[idx] = { ...arr[idx], ...changes };
        localStorage.setItem("dpis_forum_posts", JSON.stringify(arr));
        try {
          window.dispatchEvent(
            new CustomEvent("forum:updated", { detail: arr[idx] }),
          );
        } catch {}
      }
    } catch {}
  }

  function doUpvote() {
    setUpvotes((v) => v + 1);
    persistUpdate({ upvotes: upvotes + 1 });
  }

  function doReport() {
    setReports((r) => r + 1);
    persistUpdate({ reports: reports + 1 });
  }

  function addComment() {
    if (!commentText.trim()) return;
    const c = {
      id: `c_${Date.now()}`,
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [...comments, c];
    setComments(next);
    setCommentText("");
    persistUpdate({ comments: next });
  }

  function removePost() {
    try {
      const raw = localStorage.getItem("dpis_forum_posts") || "[]";
      const arr = JSON.parse(raw) as any[];
      const remaining = arr.filter((x) => x.id !== post.id);
      localStorage.setItem("dpis_forum_posts", JSON.stringify(remaining));
      try {
        window.dispatchEvent(new CustomEvent("forum:updated"));
      } catch {}
    } catch {}
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold">{post.title}</div>
            <div className="text-xs text-muted-foreground">{post.language}</div>
            <div className="ml-2 text-xs text-muted-foreground">
              {post.tags?.join(" · ")}
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {expanded
              ? post.body
              : `${post.body.slice(0, 200)}${post.body.length > 200 ? "..." : ""}`}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            {post.anonymous ? "Posted anonymously" : "Posted"} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-sm">▲ {upvotes}</div>
          <div className="text-xs text-muted-foreground">⚑ {reports}</div>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setExpanded((s) => !s)}
            >
              {expanded ? "Collapse" : "View"}
            </Button>
            <Button size="sm" variant="outline" onClick={doUpvote}>
              Upvote
            </Button>
            <Button size="sm" variant="ghost" onClick={doReport}>
              Report
            </Button>
            {isModerator && (
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="destructive" onClick={removePost}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4">
          <div className="space-y-2">
            {comments.map((c: any) => (
              <div
                key={c.id}
                className="rounded-md border bg-background p-2 text-sm"
              >
                {c.text}
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Reply (be supportive)"
              className="flex-1 rounded-md border bg-background px-3 py-2"
            />
            <Button size="sm" onClick={addComment}>
              Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
