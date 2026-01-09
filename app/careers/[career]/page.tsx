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

const WORLDS: Record<WorldId, World> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario:
      "A release build is blocked because users report the primary button text is incorrect. You need to choose the correct label so the UI matches the spec.",
    type: "mcq",
    prompt: "Which label should the primary button use?",
    options: [
      { id: "start", label: "Start" },
      { id: "begin", label: "Begin" },
      { id: "launch", label: "Launch" },
    ],
    correctOptionId: "start",
    success: "Nice work — you fixed the UI issue and unblocked the release.",
    retry: "Not quite — check the spec wording and try again.",
  },

  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario:
      "Two patients arrive at the same time. One is short of breath and looks pale; the other has a minor cut and is stable. You must choose the safest first step.",
    type: "mcq",
    prompt: "What should you do first?",
    options: [
      { id: "assess", label: "Assess the short-of-breath patient first (airway/breathing priority)" },
      { id: "paperwork", label: "Complete intake paperwork before anything else" },
      { id: "wait", label: "Wait for the doctor before taking action" },
    ],
    correctOptionId: "assess",
    success: "Good call — you prioritized the highest-risk patient first.",
    retry: "Try again — prioritize the patient with the most urgent symptoms first.",
  },

  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario:
      "Lights flicker in a room and the homeowner reports a burning smell earlier in the day. You must follow safe procedure and order the steps correctly.",
    type: "sequence",
    prompt: "Click the steps in the correct (safest) order:",
    options: [
      { id: "breaker", label: "Turn off power at the breaker" },
      { id: "verify", label: "Verify the circuit is de-energized (test)" },
      { id: "inspect", label: "Inspect the fixture/wiring and connections" },
    ],
    correctSequence: ["breaker", "verify", "inspect"],
    success: "Perfect — you followed safe procedure before troubleshooting.",
    retry: "Not quite — remember: shut off power, verify, then inspect.",
  },
};

type Outcome = "intro" | "success" | "retry";

export default function CareerWorld({ params }: { params: { career: string } }) {
  const slug = useMemo(() => decodeURIComponent(params.career ?? "").trim().toLowerCase(), [params.career]);
  const maybeWorld = useMemo(() => (WORLDS as Record<string, World>)[slug], [slug]);

  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [picked, setPicked] = useState<string>("");
  const [sequence, setSequence] = useState<string[]>([]);

  if (!maybeWorld) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>Career not found</h1>
        <p style={{ opacity: 0.85, marginTop: 0 }}>
          Requested: <b>{slug || "(empty)"}</b>
        </p>
        <Link href="/careers" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Career Hub
        </Link>
      </main>
    );
  }

  // ✅ From here on, world is guaranteed (fixes Vercel TS error)
  const world = maybeWorld;

  function submitMCQ() {
    if (world.type !== "mcq") return;
    const ok = picked === world.correctOptionId;
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  function toggleSeq(id: string) {
    setSequence((s) => (s.includes(id) ? s : [...s, id]));
  }

  function undoLast() {
    setSequence((s) => s.slice(0, -1));
  }

  function clearSeq() {
    setSequence([]);
  }

  function submitSequence() {
    if (world.type !== "sequence") return;

    const ok =
      sequence.length === world.correctSequence.length &&
      sequence.every((v, i) => v === world.correctSequence[i]);

    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  function resetAll() {
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
        <p style={{ lineHeight: 1.6, opacity: 0.9, margin: 0 }}>{world.scenario}</p>
      </section>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Challenge</h2>
        <p style={{ marginBottom: 12 }}>{world.prompt}</p>

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
                <input type="radio" name="mcq" value={o.id} checked={picked === o.id} onChange={() => setPicked(o.id)} />
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
                onClick={resetAll}
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
            <div style={{ padding: 10, border: "1px solid #ccc", borderRadius: 12 }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>Your order</div>
              <div style={{ opacity: 0.9 }}>{sequence.length === 0 ? "(click steps below)" : sequence.join(" → ")}</div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {world.options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => toggleSeq(o.id)}
                  disabled={sequence.includes(o.id)}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid #ccc",
                    fontWeight: 800,
                    cursor: sequence.includes(o.id) ? "not-allowed" : "pointer",
                    opacity: sequence.includes(o.id) ? 0.6 : 1,
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
              <button
                onClick={submitSequence}
                disabled={sequence.length !== world.correctSequence.length}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  fontWeight: 900,
                  cursor: sequence.length === world.correctSequence.length ? "pointer" : "not-allowed",
                  opacity: sequence.length === world.correctSequence.length ? 1 : 0.6,
                }}
              >
                Submit
              </button>

              <button
                onClick={undoLast}
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
                Undo
              </button>

              <button
                onClick={clearSeq}
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
                Clear
              </button>

              <button
                onClick={resetAll}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Reset All
              </button>
            </div>
          </div>
        )}
      </section>

      {outcome !== "intro" && (
        <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>{outcome === "success" ? "Success ✅" : "Try Again"}</h2>
          <p style={{ lineHeight: 1.6, margin: 0 }}>{outcome === "success" ? world.success : world.retry}</p>
        </section>
      )}
    </main>
  );
}
