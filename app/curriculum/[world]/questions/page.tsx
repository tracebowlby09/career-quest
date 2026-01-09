"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { WORLDS, Question, WorldId } from "../../../lib/worlds";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams<{ world?: string }>();

  const slug = useMemo(() => {
    const raw = params?.world;
    if (!raw) return "";
    const v = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(v).trim().toLowerCase();
  }, [params]);

  const world = (WORLDS as Record<string, any>)[slug] as (typeof WORLDS)[WorldId] | undefined;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  if (!world) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1>World not found</h1>
        <p>Requested: <b>{slug || "(empty)"}</b></p>
        <Link href="/curriculum" style={{ fontWeight: 800, textDecoration: "none" }}>← Curriculum</Link>
      </main>
    );
  }

  const questions = world.quiz.questions;

  function scoreQuestion(q: Question): boolean {
    const a = answers[q.id] ?? "";
    if (q.type === "mcq") return a === q.answerId;
    if (q.type === "tf") return a === String(q.answer);
    return normalize(a) === normalize(q.answer);
  }

  const correctCount = questions.reduce((acc, q) => acc + (scoreQuestion(q) ? 1 : 0), 0);
  const percent = Math.round((correctCount / questions.length) * 100);
  const passed = percent >= world.quiz.passPercent;

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>{world.icon} {world.title} Questions</h1>
        <Link href={`/curriculum/${world.id}`} style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Curriculum
        </Link>
      </header>

      <p style={{ opacity: 0.85, marginTop: 10 }}>
        Pass requirement: <b>{world.quiz.passPercent}%</b>
      </p>

      <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
        {questions.map((q, idx) => (
          <section key={q.id} style={{ border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
            <h2 style={{ fontSize: 18, marginTop: 0 }}>Q{idx + 1}</h2>
            <p style={{ marginTop: 0 }}>{q.prompt}</p>

            {q.type === "mcq" && (
              <div style={{ display: "grid", gap: 10 }}>
                {q.options.map((o) => (
                  <label key={o.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={(answers[q.id] ?? "") === o.id}
                      onChange={() => setAnswers((m) => ({ ...m, [q.id]: o.id }))}
                    />
                    <span style={{ fontWeight: 700 }}>{o.label}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === "tf" && (
              <div style={{ display: "flex", gap: 14 }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="radio"
                    name={q.id}
                    checked={(answers[q.id] ?? "") === "true"}
                    onChange={() => setAnswers((m) => ({ ...m, [q.id]: "true" }))}
                  />
                  True
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="radio"
                    name={q.id}
                    checked={(answers[q.id] ?? "") === "false"}
                    onChange={() => setAnswers((m) => ({ ...m, [q.id]: "false" }))}
                  />
                  False
                </label>
              </div>
            )}

            {q.type === "short" && (
              <input
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswers((m) => ({ ...m, [q.id]: e.target.value }))}
                placeholder="Type your answer…"
                style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
              />
            )}

            {checked && (
              <div style={{ marginTop: 10, padding: 10, borderRadius: 12, border: "1px solid #ccc" }}>
                <div style={{ fontWeight: 900 }}>
                  {scoreQuestion(q) ? "Correct ✅" : "Not quite ❌"}
                </div>
                <div style={{ opacity: 0.9, marginTop: 6 }}>{q.explain}</div>
              </div>
            )}
          </section>
        ))}
      </div>

      <section style={{ marginTop: 16, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Results</h2>
        <p style={{ margin: 0 }}>
          Score: <b>{correctCount}/{questions.length}</b> = <b>{percent}%</b>
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <button
            onClick={() => setChecked(true)}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Check Answers
          </button>

          <button
            onClick={() => { setAnswers({}); setChecked(false); }}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Reset Quiz
          </button>

          <button
            onClick={() => router.push(`/curriculum/${world.id}/simulator`)}
            disabled={!passed}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontWeight: 900,
              cursor: passed ? "pointer" : "not-allowed",
              opacity: passed ? 1 : 0.6,
            }}
            title={passed ? "Go to simulator" : "Pass the quiz to unlock simulator"}
          >
            Go to Simulator →
          </button>
        </div>
      </section>
    </main>
  );
}
