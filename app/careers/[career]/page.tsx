"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addBadge } from "../../lib/progress";

type Outcome = "intro" | "success" | "retry";

const careerData: Record<
  string,
  {
    id: "software-developer" | "nurse" | "electrician";
    title: string;
    scenario: string;
    challengePrompt: string;
    correctAnswer: string;
    successText: string;
    retryText: string;
  }
> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    scenario:
      "A feature is failing right before release. You need to confirm the correct UI label and ship the fix.",
    challengePrompt: "Mini-challenge: Type the word 'start' exactly.",
    correctAnswer: "start",
    successText: "You shipped the fix. Badge unlocked: software-developer",
    retryText: "Close—debugging takes iteration. Try again.",
  },
  nurse: {
    id: "nurse",
    title: "Nurse",
    scenario:
      "Two patients need attention. You must prioritize, assess symptoms, and communicate clearly.",
    challengePrompt: "Mini-challenge: Type the word 'assess' exactly.",
    correctAnswer: "assess",
    successText: "You stayed calm and made a safe call. Badge unlocked: nurse",
    retryText: "Try again—focus on the safest first step.",
  },
  electrician: {
    id: "electrician",
    title: "Electrician",
    scenario:
      "A room’s lights flicker. Diagnose the issue while following safety procedures.",
    challengePrompt: "Mini-challenge: Type 'power off' (two words) exactly.",
    correctAnswer: "power off",
    successText: "Safety first. Badge unlocked: electrician",
    retryText: "Try again—always start with safety.",
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
        <Link href="/careers" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Career Hub
        </Link>
      </main>
    );
  }

  function submit() {
    const normalized = answer.trim().toLowerCase();
    const target = data.correctAnswer.trim().toLowerCase();
    const ok = normalized === target;
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(data.id);
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34 }}>{data.title} World</h1>
        <Link href="/careers" style={{ alignSelf: "center", fontWeight: 800, textDecoration: "none" }}>
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

        <label style={{ display: "block", marginBottom: 8, fontWeight: 800 }} htmlFor="answer">
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
              fontWeight: 900,
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
              fontWeight: 900,
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
            Outcome: {outcome === "success" ? "Success ✅" : "Try Again"}
          </h2>
          <p style={{ lineHeight: 1.6 }}>
            {outcome === "success" ? data.successText : data.retryText}
          </p>

          {outcome === "success" && (
            <p style={{ marginTop: 10, opacity: 0.85 }}>
              Go back to the Career Hub to see your badge.
            </p>
          )}
        </section>
      )}
    </main>
  );
}
