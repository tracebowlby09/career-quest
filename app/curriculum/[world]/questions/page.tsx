"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getWorld, type Question } from "../../../lib/worlds";

const container: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 24,
};

const button: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  border: "1px solid #111827",
  borderRadius: 12,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 600,
  background: "transparent",
  cursor: "pointer",
};

const questionCard: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 14,
  marginTop: 12,
};

type AnswerMap = Record<string, string | undefined>;

function difficultyLabel(d: Question["difficulty"]): string {
  switch (d) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
    default: {
      const _exhaustive: never = d;
      return String(_exhaustive);
    }
  }
}

export default function QuestionsPage({
  params,
}: {
  params: { world: string };
}) {
  const world = useMemo(() => getWorld(params.world), [params.world]);

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);

  if (!world) {
    return (
      <main style={container}>
        <section style={card}>
          <h1 style={{ marginTop: 0, fontSize: 28 }}>World not found</h1>
          <p style={{ lineHeight: 1.6 }}>
            We couldn’t find that career world. Head back to the Career Hub.
          </p>
          <Link href="/careers" style={button}>
            Back to Career Hub
          </Link>
        </section>
      </main>
    );
  }

  const allAnswered = world.questions.every((q) => Boolean(answers[q.id]));
  const score = world.questions.reduce((acc, q) => {
    const chosen = answers[q.id];
    return acc + (chosen === q.correctOptionId ? 1 : 0);
  }, 0);

  const passed = submitted && score >= 2;

  function choose(qid: string, oid: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: oid }));
  }

  function onSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function onRetry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <main style={container}>
      <section style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ marginTop: 0, fontSize: 28 }}>
              {world.icon} {world.title}
            </h1>
            <div style={{ opacity: 0.75 }}>
              Step 2: Questions (need 2/3 correct)
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href={`/curriculum/${world.id}`} style={button}>
              Back to Curriculum
            </Link>
            <Link href="/careers" style={button}>
              Hub
            </Link>
          </div>
        </div>

        {world.questions.map((q) => {
          const chosen = answers[q.id];
          const isCorrect = submitted && chosen === q.correctOptionId;

          return (
            <div key={q.id} style={questionCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ fontWeight: 800 }}>
                  {difficultyLabel(q.difficulty)} — {q.prompt}
                </div>
                {submitted ? (
                  <div style={{ fontWeight: 800 }}>{isCorrect ? "✅" : "❌"}</div>
                ) : null}
              </div>

              <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                {q.options.map((opt) => {
                  const checked = chosen === opt.id;
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: 10,
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        cursor: submitted ? "default" : "pointer",
                        opacity: submitted ? 0.95 : 1,
                      }}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={checked}
                        disabled={submitted}
                        onChange={() => choose(q.id, opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>

              {submitted ? (
                <div style={{ marginTop: 10, lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 800, marginBottom: 4 }}>
                    Explanation
                  </div>
                  <div style={{ opacity: 0.85 }}>{q.explanation}</div>
                </div>
              ) : null}
            </div>
          );
        })}

        <div
          style={{
            marginTop: 16,
            borderTop: "1px solid #e5e7eb",
            paddingTop: 16,
          }}
        >
          {!submitted ? (
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={onSubmit}
                style={button}
                disabled={!allAnswered}
              >
                Submit Answers
              </button>
              {!allAnswered ? (
                <span style={{ opacity: 0.7 }}>
                  Answer all questions to submit.
                </span>
              ) : null}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>
                Score: {score}/3
              </div>

              {passed ? (
                <div style={{ marginTop: 8 }}>
                  <p style={{ marginTop: 0, lineHeight: 1.6 }}>
                    You passed! Continue to the simulator.
                  </p>
                  <Link href={`/curriculum/${world.id}/simulator`} style={button}>
                    Continue to Simulator
                  </Link>
                </div>
              ) : (
                <div style={{ marginTop: 8 }}>
                  <p style={{ marginTop: 0, lineHeight: 1.6 }}>
                    You didn’t pass this time. Review the explanations and try again.
                  </p>
                  <button type="button" onClick={onRetry} style={button}>
                    Retry Questions
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}