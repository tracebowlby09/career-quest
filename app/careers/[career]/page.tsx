"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { addBadge } from "../../lib/progress";
import { notFound } from "next/navigation";
import { page, shell, card, topbar, h1, p, btn, btnPrimary, input, tag } from "../../ui/styles";

import { notFound } from "next/navigation";
type Outcome = "intro" | "success" | "retry";

type World = {
  id: "software-developer" | "nurse" | "electrician";
  title: string;
  icon: string;
  scenario: string;
  prompt: string;
  correctAnswer: string;
  success: string;
  retry: string;
};

const WORLDS: Record<string, World> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario: "A feature is failing right before release. Confirm the correct UI label and ship the fix.",
    prompt: "Type the word: start",
    correctAnswer: "start",
    success: "Fix shipped. Badge earned: 💻 Software Developer",
    retry: "Not quite. Re-read the prompt and try again.",
  },
  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario: "Two patients need attention. Choose the safest first action and communicate clearly.",
    prompt: "Type the word: assess",
    correctAnswer: "assess",
    success: "Good call. Badge earned: 🩺 Nurse",
    retry: "Try again—focus on the safest first action.",
  },
  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario: "A room’s lights flicker. Diagnose while following safety procedure.",
    prompt: "Type the two words: power off",
    correctAnswer: "power off",
    success: "Safety first. Badge earned: ⚡ Electrician",
    retry: "Try again—start with safety.",
  },
};

export default function CareerWorld({ params }: { params: { career?: string } }) {
  const world = useMemo(() => (params?.career ? WORLDS[params.career] : undefined), [params?.career]);
  if (!world) notFound();
  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [answer, setAnswer] = useState("");

  if (!world) {
    return (
      <main style={page}>
        <div style={shell}>
          <div style={card}>
            <h1 style={h1}>Career not found</h1>
            <p style={{ ...p, marginTop: 10 }}>
              Requested: {params?.career ? params.career : "(empty)"} — go back and choose a world.
            </p>
            <div style={{ marginTop: 14 }}>
              <Link href="/careers" style={btn}>← Back to Career Hub</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  function submit() {
    const ok = answer.trim().toLowerCase() === world.correctAnswer.trim().toLowerCase();
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  return (
    <main style={page}>
      <div style={shell}>
        <div style={topbar}>
          <div>
            <h1 style={h1}>
              {world.icon} {world.title} World
            </h1>
            <p style={{ ...p, marginTop: 6 }}>Simulator (we’ll add curriculum + questions next).</p>
          </div>
          <Link href="/careers" style={btn}>← Career Hub</Link>
        </div>

        <div style={{ ...card, marginBottom: 12 }}>
          <span style={tag}>Scenario</span>
          <p style={{ ...p, marginTop: 10, fontSize: 17 }}>{world.scenario}</p>
        </div>

        <div style={card}>
          <span style={tag}>Simulator Challenge</span>
          <p style={{ ...p, marginTop: 10 }}>{world.prompt}</p>

          <div style={{ marginTop: 12 }}>
            <input
              style={input}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type here…"
              aria-label="Answer"
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            <button onClick={submit} style={btnPrimary}>Submit</button>
            <button
              onClick={() => {
                setAnswer("");
                setOutcome("intro");
              }}
              style={btn}
            >
              Reset
            </button>
          </div>
        </div>

        {outcome !== "intro" && (
          <div style={{ ...card, marginTop: 12 }}>
            <span style={tag}>{outcome === "success" ? "✅ Success" : "🔁 Try Again"}</span>
            <p style={{ ...p, marginTop: 10, fontSize: 17 }}>
              {outcome === "success" ? world.success : world.retry}
            </p>
            {outcome === "success" && (
              <div style={{ marginTop: 12 }}>
                <Link href="/careers" style={btn}>Back to Hub →</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

