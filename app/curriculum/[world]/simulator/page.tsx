"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Outcome = "start" | "pass" | "fail";

type World = {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: { id: string; label: string }[];
  correct: string;
  passText: string;
  failText: string;
};

const worlds: Record<string, World> = {
  developer: {
    id: "developer",
    title: "Software Developer",
    scenario: "Your app crashes on launch. What do you check first?",
    question: "What should you inspect?",
    options: [
      { id: "a", label: "Console errors" },
      { id: "b", label: "Change colors" },
      { id: "c", label: "Ignore it" },
    ],
    correct: "a",
    passText: "Correct! Logs help debug crashes.",
    failText: "Wrong. Always check console logs first.",
  },

  nurse: {
    id: "nurse",
    title: "Nurse",
    scenario: "A patient feels dizzy and weak.",
    question: "What should you do first?",
    options: [
      { id: "a", label: "Ignore" },
      { id: "b", label: "Assess vitals" },
      { id: "c", label: "Leave" },
    ],
    correct: "b",
    passText: "Correct! Assessing vitals is priority.",
    failText: "Wrong. Always assess vitals first.",
  },

  electrician: {
    id: "electrician",
    title: "Electrician",
    scenario: "A light flickers constantly.",
    question: "What is step one?",
    options: [
      { id: "a", label: "Touch wires" },
      { id: "b", label: "Turn off power" },
      { id: "c", label: "Ignore" },
    ],
    correct: "b",
    passText: "Correct! Safety first.",
    failText: "Wrong. Always turn off power first.",
  },
};

export default function Simulator({ params }: { params: { world: string } }) {
  const world = useMemo(() => worlds[params.world], [params.world]);

  const [picked, setPicked] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome>("start");

  if (!world) {
    return (
      <main style={{ padding: 30 }}>
        <h1>World not found</h1>
        <Link href="/careers">Back</Link>
      </main>
    );
  }

  function submit() {
    if (!picked) return;
    const ok = picked === world.correct;
    setOutcome(ok ? "pass" : "fail");
  }

  return (
    <main style={{ padding: 30, maxWidth: 800, margin: "0 auto" }}>
      <h1>{world.title} Simulator</h1>

      <p><b>Scenario:</b> {world.scenario}</p>
      <p><b>Question:</b> {world.question}</p>

      {world.options.map((o) => (
        <div key={o.id}>
          <label>
            <input
              type="radio"
              name="q"
              value={o.id}
              onChange={() => setPicked(o.id)}
            />
            {o.label}
          </label>
        </div>
      ))}

      <button onClick={submit} style={{ marginTop: 10 }}>
        Submit
      </button>

      {outcome === "pass" && <p> {world.passText}</p>}
      {outcome === "fail" && <p> {world.failText}</p>}

      <br />
      <Link href="/careers"> Back</Link>
    </main>
  );
}
