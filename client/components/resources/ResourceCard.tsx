import React from "react";
import { Play, FileText, Video, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResourceCard({
  resource,
}: {
  resource: {
    id: string;
    title: string;
    type: "video" | "audio" | "guide";
    language: string;
    tags: string[];
    src?: string;
    description?: string;
  };
}) {
  const { title, type, language, tags, src, description } = resource;

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{language} • {tags.join(" · ")}</div>
          {description && <div className="mt-3 text-sm text-muted-foreground">{description}</div>}
        </div>
        <div className="flex flex-col items-end gap-2">
          {type === "video" && src ? (
            <video controls className="h-24 w-36 rounded-md bg-black" src={src} />
          ) : type === "audio" && src ? (
            <audio controls src={src} className="w-44" />
          ) : (
            <div className="text-xs text-muted-foreground">{type.toUpperCase()}</div>
          )}

          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" variant="ghost" asChild>
              <a href={src || "#"} target="_blank" rel="noreferrer">Open</a>
            </Button>
            <Button size="sm" variant="outline">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
