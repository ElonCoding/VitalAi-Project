import React from "react";
import FirstAidChatbot from "@/components/chat/FirstAidChatbot";

export default function Chatbot() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90rem_40rem_at_50%_-15%,hsl(var(--brand)/0.06),transparent_60%)]" />
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold">AI‑Guided First‑Aid Support</h1>
          <p className="mt-2 text-sm text-muted-foreground">Interactive, evidence‑informed support with quick screening (PHQ‑9, GAD‑7) and escalation pathways.</p>
          <div className="mt-6">
            <FirstAidChatbot />
          </div>
        </div>
      </section>
    </main>
  );
}
