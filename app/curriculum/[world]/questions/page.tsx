"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getWorld } from "../../../lib/worlds";

type Q = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explain?: string;
};

export default function QuestionsPage({ params }: { params: { world: string } }) {
  const world = getWorld(params.world);

  // If the world doesn't exist, show a friendly page instead of exploding TS
  if (!world) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>World not found</h1>
        <Link href="/curriculum" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Curriculum
        </Link>
      </main>
    );
  }

  // ✅ IMPORTANT:
  // Your World type doesn't have `quiz`, so we safely look for questions in places that might exist.
  // Preferred: world.questions
  // Fallback: world.simulator.questions (if you put them under simulator)
  const questions: Q[] = useMemo(() => {
    const anyWorld = world as any;
    return (anyWorld.questions ?? anyWorld.simulator?.questions ?? []) as Q[];
  }, [world]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    let s = 0;
    for (const q of questions) {
      if ((answers[q.id] ?? "") === q.correctOptionId) s++;
    }
    return s;
  }, [submitted, answers, questions]);

  if (total === 0) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 980, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 34, margin: 0 }}>{world.title}: Questions</h1>
          <Link href={`/curriculum/${world.id}`} style={{ fontWeight: 800, textDecoration: "none" }}>
            ← Back to Curriculum
          </Link>
        </header>

        <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
          <p style={{ margin: 0, opacity: 0.9 }}>
            No questions are set up for this world yet.
          </p>
          <p style={{ marginTop: 10, opacity: 0.8 }}>
            Add them in <b>app/lib/worlds.ts</b> under <b>world.questions</b> (recommended).
          </p>
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 34, margin: 0 }}>{world.title}: Questions</h1>
          <p style={{ opacity: 0.85, marginTop: 6 }}>Answer the questions, then go to the simulator.</p>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Link href={`/curriculum/${world.id}`} style={{ fontWeight: 800, textDecoration: "none" }}>
            ← Curriculum
          </Link>
          <Link href={`/curriculum/${world.id}/simulator`} style={{ fontWeight: 800, textDecoration: "none" }}>
            Simulator →
          </Link>
        </div>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        {questions.map((q, idx) => {
          const picked = answers[q.id] ?? "";
          const correct = q.correctOptionId;
          const isRight = submitted && picked === correct;
          const isWrong = submitted && picked !== "" && picked !== correct;

          return (
            <div key={q.id} style={{ padding: 14, border: "1px solid #eee", borderRadius: 14, marginBottom: 12 }}>
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>
                {idx + 1}. {q.prompt}
              </h3>

              <div style={{ display: "grid", gap: 8 }}>
                {q.options.map((o) => (
                  <label key={o.id} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name={q.id}
                      value={o.id}
                      checked={picked === o.id}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      disabled={submitted}
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>

              {submitted && (
                <div style={{ marginTop: 10, fontWeight: 800 }}>
                  {isRight && <span>✅ Correct</span>}
                  {isWrong && <span>❌ Incorrect</span>}
                  {!picked && <span style={{ opacity: 0.8 }}>⚠️ Not answered</span>}
                </div>
              )}

              {submitted && q.explain && (
                <p style={{ marginTop: 8, opacity: 0.9, lineHeight: 1.6 }}>{q.explain}</p>
              )}
            </div>
          );
        })}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => setSubmitted(true)}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Submit
          </button>
          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Reset
          </button>
        </div>

        {submitted && (
          <div style={{ marginTop: 12, borderTop: "1px solid #eee", paddingTop: 12 }}>
            <p style={{ margin: 0, fontWeight: 900 }}>
              Score: {score} / {total}
            </p>
            <p style={{ marginTop: 6, opacity: 0.85 }}>
              When you’re ready, go to the simulator to pass/fail the world.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
