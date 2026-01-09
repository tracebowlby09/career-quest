"use client";

import { useMemo, useState } from "react";
import { addBadge } from "../../lib/progress";
import { Card, CardTitle, Container, Header, Pill, Row, TextLink, Button } from "../../components/ui";

type Outcome = "intro" | "success" | "retry";

type WorldId = "software-developer" | "nurse" | "electrician";
type World =
  | {
      id: WorldId;
      title: string;
      icon: string;
      scenario: string;
      type: "mcq";
      prompt: string;
      options: { id: string; label: string }[];
      correctOptionId: string;
      success: string;
      retry: string;
    }
  | {
      id: WorldId;
      title: string;
      icon: string;
      scenario: string;
      type: "sequence";
      prompt: string;
      options: { id: string; label: string }[];
      correctSequence: string[];
      success: string;
      retry: string;
    };

const WORLDS: Record<string, World> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario: "A release is blocked by a failing feature. Pick the best next step to debug safely.",
    type: "mcq",
    prompt: "What should you do first?",
    options: [
      { id: "a", label: "Change random code until tests pass" },
      { id: "b", label: "Reproduce the bug and read the error message" },
      { id: "c", label: "Delete the failing test" },
    ],
    correctOptionId: "b",
    success: "Nice. Reproduce + read errors is the fastest, safest start.",
    retry: "Try again. Think: what gives you the most information first?",
  },
  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario: "Two patients need help. Choose the best first action to keep everyone safe.",
    type: "mcq",
    prompt: "What is the safest first step?",
    options: [
      { id: "a", label: "Assess airway/breathing/circulation (ABCs)" },
      { id: "b", label: "Finish paperwork first" },
      { id: "c", label: "Assume it’s not urgent" },
    ],
    correctOptionId: "a",
    success: "Correct. Start with safety and basic assessment (ABCs).",
    retry: "Not quite. In healthcare, start with safety + assessment.",
  },
  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario: "Lights flicker in a room. You need to diagnose without creating danger.",
    type: "sequence",
    prompt: "Put the steps in the safest order:",
    options: [
      { id: "off", label: "Turn off power at the breaker" },
      { id: "test", label: "Test to confirm power is off" },
      { id: "inspect", label: "Inspect wiring / connections" },
    ],
    correctSequence: ["off", "test", "inspect"],
    success: "Yes. Power off → confirm → then inspect.",
    retry: "Try again. Think: safety first, then verify, then diagnose.",
  },
};

export default function CareerWorld({ params }: { params: { career: string } }) {
  const world = useMemo(() => WORLDS[params.career], [params.career]);
  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [picked, setPicked] = useState<string>("");
  const [sequence, setSequence] = useState<string[]>([]);

  if (!world) {
    return (
      <Container>
        <Header title="Career not found" right={<TextLink href="/careers">← Career Hub</TextLink>} />
        <Card>
          <div style={{ opacity: 0.85 }}>
            That world ID doesn’t exist. Go back and pick one of the three worlds.
          </div>
        </Card>
      </Container>
    );
  }

  function reset() {
    setOutcome("intro");
    setPicked("");
    setSequence([]);
  }

  function submitMCQ() {
    if (world.type !== "mcq") return;
    const ok = picked === world.correctOptionId;
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  function tapSequence(id: string) {
    if (world.type !== "sequence") return;
    if (sequence.includes(id)) return;
    setSequence([...sequence, id]);
  }

  function submitSequence() {
    if (world.type !== "sequence") return;
    const ok =
      sequence.length === world.correctSequence.length &&
      sequence.every((v, i) => v === world.correctSequence[i]);
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(world.id);
  }

  return (
    <Container>
      <Header
        title={`${world.icon} ${world.title} World`}
        subtitle="Scenario → challenge → outcome (pass earns a badge)."
        right={<TextLink href="/careers">← Career Hub</TextLink>}
      />

      <Card>
        <CardTitle>Scenario</CardTitle>
        <div style={{ opacity: 0.85, lineHeight: 1.6 }}>{world.scenario}</div>
      </Card>

      <div style={{ height: 14 }} />

      <Card>
        <CardTitle>Challenge</CardTitle>
        <div style={{ opacity: 0.85, marginBottom: 12 }}>{world.prompt}</div>

        {world.type === "mcq" ? (
          <div style={{ display: "grid", gap: 10 }}>
            {world.options.map((o) => (
              <button
                key={o.id}
                onClick={() => setPicked(o.id)}
                style={{
                  textAlign: "left",
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: "1px solid var(--border)",
                  background: picked === o.id ? "rgba(120,160,255,0.20)" : "rgba(255,255,255,0.06)",
                  color: "var(--text)",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {o.label}
              </button>
            ))}

            <Row>
              <Button onClick={submitMCQ}>Submit</Button>
              <Button onClick={reset}>Reset</Button>
              {picked && <Pill>Picked: {picked.toUpperCase()}</Pill>}
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              {world.options.map((o) => (
                <Button key={o.id} onClick={() => tapSequence(o.id)}>
                  {sequence.includes(o.id) ? "✓ " : ""}{o.label}
                </Button>
              ))}
            </Row>

            <div style={{ height: 10 }} />

            <Card
              children={
                <>
                  <CardTitle>Your order</CardTitle>
                  {sequence.length === 0 ? (
                    <div style={{ opacity: 0.8 }}>Tap the steps above in order.</div>
                  ) : (
                    <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, opacity: 0.9 }}>
                      {sequence.map((id) => (
                        <li key={id}>{world.options.find((o) => o.id === id)?.label}</li>
                      ))}
                    </ol>
                  )}
                </>
              }
            />

            <div style={{ height: 10 }} />

            <Row>
              <Button onClick={submitSequence}>Submit</Button>
              <Button onClick={reset}>Reset</Button>
            </Row>
          </div>
        )}
      </Card>

      {outcome !== "intro" && (
        <div style={{ height: 14 }} />
      )}

      {outcome !== "intro" && (
        <Card>
          <CardTitle>Outcome</CardTitle>
          <Row>
            {outcome === "success" ? <Pill>✅ Pass</Pill> : <Pill>❌ Retry</Pill>}
          </Row>
          <div style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.6 }}>
            {outcome === "success" ? world.success : world.retry}
          </div>
        </Card>
      )}
    </Container>
  );
}
