"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addBadge } from "../../lib/progress";

type WorldId = "software-developer" | "nurse" | "electrician";

type Option = { id: string; label: string };

type MCQWorld = {
  id: WorldId;
  title: string;
  icon: string;
  scenario: string;
  type: "mcq";
  prompt: string;
  options: Option[];
  correctOptionId: string;
  success: string;
  retry: string;
};

type SequenceWorld = {
  id: WorldId;
  title: string;
  icon: string;
  scenario: string;
  type: "sequence";
  prompt: string;
  options: Option[];
  correctSequence: string[];
  success: string;
  retry: string;
};

type World = MCQWorld | SequenceWorld;

const WORLDS: Record<string, World> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario:
      "Right before release, a bug report says the Start button text is wrong in the UI. You need to pick the correct label to ship the hotfix.",
    type: "mcq",
    prompt: "Which label should the button use?",
    options: [
      { id: "a", label: "Start" },
      { id: "b", label: "Begin" },
      { id: "c", label: "Go" },
    ],
    correctOptionId: "a",
    success: "Hotfix shipped. Badge unlocked: software-developer ✅",
    retry: "Not quite—double-check the expected UI label and try again.",
  },
  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario:
      "Two patients arrive at the same time. You need to choose the safest first step before anything else.",
    type: "mcq",
    prompt: "What should you do first?",
    options: [
      { id: "a", label: "Assess the most critical patient first" },
      { id: "b", label: "Finish paperwork before triage" },
      { id: "c", label: "Wait for the doctor to arrive" },
    ],
    correctOptionId: "a",
    success: "You prioritized safely. Badge unlocked: nurse ✅",
    retry: "Try again—focus on the safest first action in a busy moment.",
  },
  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario:
      "A room’s lights flicker. You must follow safe procedure and put the steps in order.",
    type: "sequence",
    prompt: "Put the steps in the safest order:",
    options: [
      { id: "off", label: "Turn power off at the breaker" },
      { id: "test", label: "Test that the circuit is de-energized" },
      { id: "inspect", label: "Inspect wiring / connections" },
    ],
    correctSequence: ["off", "test", "inspect"],
    success: "Safety first. Badge unlocked: electrician ✅",
    retry: "Not quite—remember: power off, then verify, then inspect.",
  },
};

type Outcome = "intro" | "success" | "retry";

export default function CareerWorld({ params }: { params: { career: string } }) {
  const world = useMemo(() => WORLDS[params.career], [params.career]);

  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [picked, setPicked] = useState<string>("");
  const [sequence, setSequence] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  function addAttempt() {
    setAttempts((a) => a + 1);
  }

  if (!world) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Career not found</h1>
        <Link href="/careers" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Career Hub
        </Link>
      </main>
    );
  }

  function submitMCQ() {
    addAttempt();
    if (world.type !== "mcq") return;
    const ok = picked === world.correctOptionId;
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  function toggleSeq(id: string) {
    setSequence((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function submitSequence() {
    addAttempt();
    if (world.type !== "sequence") return;
    const ok =
      sequence.length === world.correctSequence.length &&
      sequence.every((v, i) => v === world.correctSequence[i]);

    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  function reset() {
    setOutcome("intro");
    setPicked("");
    setSequence([]);
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34 }}>
          {world.icon} {world.title}
        </h1>
        <Link href="/careers" style={{ alignSelf: "center", fontWeight: 800, textDecoration: "none" }}>
          ← Career Hub
        </Link>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Scenario</h2>
        <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{world.scenario}</p>
      </section>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Skill Challenge</h2>
        <p style={{ marginBottom: 10 }}>{world.prompt}</p>

        {world.type === "mcq" ? (
          <div style={{ display: "grid", gap: 10 }}>
            {world.options.map((o) => (
              <label
                key={o.id}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: 10,
                  border: "1px solid #ccc",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="mcq"
                  value={o.id}
                  checked={picked === o.id}
                  onChange={() => setPicked(o.id)}
                />
                <span style={{ fontWeight: 700 }}>{o.label}</span>
              </label>
            ))}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
              <button
                onClick={submitMCQ}
                disabled={!picked}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  fontWeight: 900,
                  cursor: picked ? "pointer" : "not-allowed",
                  opacity: picked ? 1 : 0.6,
                }}
              >
                Submit
              </button>
              <button
                onClick={reset}
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
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            <p style={{ margin: 0, opacity: 0.85 }}>
              Click steps in order. Your current order:{" "}
              <span style={{ fontWeight: 900 }}>{sequence.join(" → ") || "(none yet)"}</span>
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              {world.options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => toggleSeq(o.id)}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid #ccc",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {sequence.includes(o.id) ? "✅ " : ""}{o.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
              <button
                onClick={submitSequence}
                disabled={sequence.length === 0}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  fontWeight: 900,
                  cursor: sequence.length ? "pointer" : "not-allowed",
                  opacity: sequence.length ? 1 : 0.6,
                }}
              >
                Submit
              </button>
              <button
                onClick={reset}
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
          </div>
        )}
      </section>

      {outcome !== "intro" && (
        <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>
            Outcome: {outcome === "success" ? "Success ✅" : "Try Again"}
          </h2>
          <p style={{ lineHeight: 1.6 }}>{outcome === "success" ? world.success : world.retry}</p>
          <p style={{ marginTop: 10, opacity: 0.8 }}>Attempts this session: <b>{attempts}</b></p>
        </section>
      )}
    </main>
  );
}
