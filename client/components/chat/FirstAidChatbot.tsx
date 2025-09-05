import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Globe } from "lucide-react";
import PHQ9Survey from "./surveys/PHQ9";
import GAD7Survey from "./surveys/GAD7";

type Msg = { id: string; sender: "user" | "bot" | "system"; text: string };

export default function FirstAidChatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m0", sender: "bot", text: "Hi — I'm your First‑Aid Support assistant. I can offer breathing exercises, journaling prompts, relaxation techniques, or run quick screenings like PHQ‑9 and GAD‑7. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPHQ9, setShowPHQ9] = useState(false);
  const [showGAD7, setShowGAD7] = useState(false);
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages]);

  function pushMessage(m: Msg) {
    setMessages((s) => [...s, m]);
  }

  function simulateBotResponse(userText: string) {
    setLoading(true);
    // very simple simulated NLP: keyword matching + heuristic
    const text = userText.toLowerCase();
    setTimeout(() => {
      if (/suicid|kill myself|end my life|harm myself/.test(text)) {
        pushMessage({ id: String(Date.now()), sender: "bot", text: "I hear that you're feeling extremely distressed and mentioning self-harm. This is serious. Please contact your campus counsellor or an emergency helpline right away. Would you like me to show numbers and immediate steps?" });
      } else if (/panic|panic attack|cant breathe|hypervent/.test(text)) {
        pushMessage({ id: String(Date.now()), sender: "bot", text: "It sounds like you might be having a panic attack. Try the 4‑7‑8 breathing: breathe in 4s, hold 7s, out 8s. Would you like a guided breathing exercise?" });
      } else if (/stress|anx|exam|overwhelm/.test(text)) {
        pushMessage({ id: String(Date.now()), sender: "bot", text: "Stress can feel overwhelming. Would you like a short grounding exercise, a journaling prompt, or run a quick GAD‑7 screening to understand symptoms?" });
      } else if (/depress|sad|hopeless/.test(text)) {
        pushMessage({ id: String(Date.now()), sender: "bot", text: "I'm sorry you're feeling low. There are evidence‑based strategies that can help, like behavioural activation and mood journaling. I can also run a PHQ‑9 screen to estimate severity if you'd like." });
      } else if (/phq|screen|questionnaire/.test(text)) {
        pushMessage({ id: String(Date.now()), sender: "bot", text: "I can run PHQ‑9 or GAD‑7. Which would you prefer?" });
      } else {
        // generic supportive reply
        pushMessage({ id: String(Date.now()), sender: "bot", text: "Thanks for sharing. I'm here to help. You can ask for breathing exercises, journaling prompts, relaxation, or I can run quick screens (PHQ‑9/GAD‑7)." });
      }
      setLoading(false);
    }, 800 + Math.random() * 800);
  }

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    pushMessage({ id: String(Date.now()), sender: "user", text });
    setInput("");
    simulateBotResponse(text);
  }

  function startPHQ9() {
    setShowPHQ9(true);
  }
  function startGAD7() {
    setShowGAD7(true);
  }

  function onPHQ9Complete(result: { score: number; severity: string }) {
    setShowPHQ9(false);
    pushMessage({ id: String(Date.now()), sender: "system", text: `PHQ-9 completed. Score: ${result.score} — ${result.severity}` });
    // escalate if severe
    if (result.score >= 15) {
      pushMessage({ id: String(Date.now()), sender: "bot", text: "YourPHQ-9 score indicates moderately severe to severe symptoms. I recommend contacting a counsellor or emergency services if you are at risk. Would you like counsellor contact options or to book an appointment?" });
    } else {
      pushMessage({ id: String(Date.now()), sender: "bot", text: "Thanks — based on this score, some self‑care strategies and a follow‑up with a counsellor could be helpful. Would you like a breathing exercise or journaling prompt now?" });
    }
  }

  function onGAD7Complete(result: { score: number; severity: string }) {
    setShowGAD7(false);
    pushMessage({ id: String(Date.now()), sender: "system", text: `GAD-7 completed. Score: ${result.score} — ${result.severity}` });
    if (result.score >= 15) {
      pushMessage({ id: String(Date.now()), sender: "bot", text: "Your GAD‑7 score indicates severe anxiety symptoms. I recommend reaching out to a counsellor or helpline. Would you like contact options or immediate coping steps?" });
    } else {
      pushMessage({ id: String(Date.now()), sender: "bot", text: "Thanks — coping strategies like paced breathing and short behavioural tasks can help. Would you like a guided exercise?" });
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-brand" />
          <div className="text-sm font-semibold">First‑Aid Chatbot</div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={startPHQ9}>Run PHQ‑9</Button>
          <Button size="sm" variant="outline" onClick={startGAD7}>Run GAD‑7</Button>
          <Button size="sm" variant="ghost" asChild>
            <a className="flex items-center gap-1" href="tel:+11234567890"><Phone className="h-4 w-4" /> Helpline</a>
          </Button>
          <Button size="sm" variant="ghost" className="ml-2">
            <Globe className="h-4 w-4" /> EN
          </Button>
        </div>
      </div>

      <div ref={scroller} className="mt-4 max-h-[40vh] overflow-y-auto space-y-3 px-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${m.sender === "user" ? "bg-primary text-primary-foreground" : m.sender === "bot" ? "bg-background/50" : "bg-accent/10 text-muted-foreground"} rounded-lg px-3 py-2 max-w-[80%] text-sm`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-muted-foreground">Assistant is typing…</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Describe how you're feeling or ask for help…" className="flex-1 h-10 rounded-md border bg-background px-3" />
        <Button onClick={handleSend}>Send</Button>
      </div>

      {showPHQ9 && <PHQ9Survey onClose={() => setShowPHQ9(false)} onComplete={onPHQ9Complete} />}
      {showGAD7 && <GAD7Survey onClose={() => setShowGAD7(false)} onComplete={onGAD7Complete} />}
    </div>
  );
}
