import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking so slowly that other people could have noticed or being fidgety",
  "Thoughts that you would be better off dead or of hurting yourself",
];

export default function PHQ9({ onClose, onComplete }: { onClose: () => void; onComplete: (res: { score: number; severity: string }) => void }) {
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));

  function setAnswer(i: number, v: number) {
    setAnswers((s) => { const copy = [...s]; copy[i] = v; return copy; });
  }

  function submit() {
    if (answers.some((a) => a < 0)) return;
    const score = answers.reduce((a, b) => a + b, 0);
    let severity = "Minimal";
    if (score >= 20) severity = "Severe";
    else if (score >= 15) severity = "Moderately severe";
    else if (score >= 10) severity = "Moderate";
    else if (score >= 5) severity = "Mild";
    onComplete({ score, severity });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">PHQ‑9 Screening</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Answer based on the last 2 weeks. Response scale: 0 (Not at all) to 3 (Nearly every day)</p>
        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {questions.map((q, i) => (
            <div key={i} className="rounded-md border p-3">
              <div className="text-sm font-medium">{i + 1}. {q}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                {[0,1,2,3].map((opt) => (
                  <button key={opt} onClick={() => setAnswer(i,opt)} className={`rounded-md px-3 py-1 ${answers[i]===opt?"bg-brand text-brand-foreground":"bg-background"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={submit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
