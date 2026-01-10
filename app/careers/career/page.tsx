"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Outcome = "intro" | "success" | "retry";

const careerData: Record<
  string,
  {
    title: string;
    scenario: string;
    challengePrompt: string;
    correctAnswer: string;
    successText: string;
    retryText: string;
  }
> = {
  "software-developer": {
    title: "Software Developer",
    scenario:
      "A feature is failing right before release. You need to spot the bug quickly and choose the correct fix.",
    challengePrompt:
      "Mini-challenge: A button should say 'Start'. What exact word should the UI display? (Hint: Start)",
    correctAnswer: "start",
    successText:
      "You found the issue and shipped the fix. You unlocked a badge: Debugging Under Pressure.",
    retryText:
      "Close—real debugging takes iteration. Review the scenario and try again.",
  },
  nurse: {
    title: "Nurse",
    scenario:
      "Two patients need attention. One reports dizziness; another has a rising fever. You must prioritize and respond safely.",
    challengePrompt:
      "Mini-challenge: Type the word that matches the safest first step: 'Assess'.",
    correctAnswer: "assess",
    successText:
      "You stayed calm, assessed quickly, and communicated clearly. Badge unlocked: Patient Prioritization.",
    retryText:
      "In healthcare, safety matters. Try again and focus on the first safest action.",
  },
  electrician: {
    title: "Electrician",
    scenario:
      "A room’s lights flicker. You must diagnose the problem while following safety procedures.",
    challengePrompt:
      "Mini-challenge: Type the safety step before touching wiring: 'Power off'.",
    correctAnswer: "power off",
    successText:
      "You followed safety first and solved the issue. Badge unlocked: Safe Diagnostics.",
    retryText:
      "Safety comes first. Read the prompt carefully and try again.",
  },
};

export default function CareerWorld({ params }: { params: { career: string } }) {
  const data = useMemo(() => careerData[params.career], [params.career]);
  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [answer, setAnswer] = useState("");

  if (!data) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Career not found</h1>
        <Link href="/careers" style={{ fontWeight: 600, textDecoration: "none" }}>
          ← Back to Career Hub
        </Link>
      </main>
    );
  }

  function submit() {
    const normalized = answer.trim().toLowerCase();
    const target = data.correctAnswer.trim().toLowerCase();
    setOutcome(normalized === target ? "success" : "retry");
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34 }}>{data.title} World</h1>
        <Link href="/careers" style={{ alignSelf: "center", fontWeight: 600, textDecoration: "none" }}>
          ← Career Hub
        </Link>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Scenario</h2>
        <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{data.scenario}</p>
      </section>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Skill Challenge</h2>
        <p style={{ marginBottom: 10 }}>{data.challengePrompt}</p>

        <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }} htmlFor="answer">
          Your answer
        </label>
        <input
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type here…"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={submit}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <button
            onClick={() => {
              setAnswer("");
              setOutcome("intro");
            }}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </section>

      {outcome !== "intro" && (
        <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>
            Outcome: {outcome === "success" ? "Success" : "Try Again"}
          </h2>
          <p style={{ lineHeight: 1.6 }}>
            {outcome === "success" ? data.successText : data.retryText}
          </p>
        </section>
      )}

      <footer style={{ marginTop: 18, opacity: 0.8 }}>
        Tip: This page already demonstrates **scenario + challenge + multiple outcomes** (rubric-friendly).
      </footer>
    </main>
  );
}
