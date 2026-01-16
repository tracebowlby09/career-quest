"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getWorld, type SimulatorSequence } from "../../../lib/worlds";
import { addBadge } from "../../../lib/progress";

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

const panel: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 14,
  marginTop: 12,
};

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (from === to) return arr;
  if (from < 0 || from >= arr.length) return arr;
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  if (item === undefined) return arr;
  copy.splice(to, 0, item);
  return copy;
}

export default function SimulatorPage({
  params,
}: {
  params: { world: string };
}) {
  const world = useMemo(() => getWorld(params.world), [params.world]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const [result, setResult] = useState<"pass" | "fail" | null>(null);

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

  function resetAttempt() {
    setSelectedOption(null);
    setSequence([]);
    setResult(null);
  }

  function onSubmitMCQ(correctOptionId: string) {
    if (!selectedOption) return;
    const passed = selectedOption === correctOptionId;
    setResult(passed ? "pass" : "fail");
    if (passed) addBadge(world.id);
  }

  function onSubmitSequence(sim: SimulatorSequence) {
    const passed = arraysEqual(sequence, sim.correctSequence);
    setResult(passed ? "pass" : "fail");
    if (passed) addBadge(world.id);
  }

  const sim = world.simulator;

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
            <div style={{ opacity: 0.75 }}>Step 3: Simulator</div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href={`/curriculum/${world.id}/questions`} style={button}>
              Back to Questions
            </Link>
            <Link href="/careers" style={button}>
              Hub
            </Link>
          </div>
        </div>

        <div style={panel}>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>
            {sim.prompt}
          </div>

          {sim.type === "mcq" ? (
            <div style={{ display: "grid", gap: 8 }}>
              {sim.options.map((opt) => {
                const checked = selectedOption === opt.id;
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
                      cursor: result ? "default" : "pointer",
                      opacity: result ? 0.95 : 1,
                    }}
                  >
                    <input
                      type="radio"
                      name="sim-mcq"
                      value={opt.id}
                      checked={checked}
                      disabled={Boolean(result)}
                      onChange={() => setSelectedOption(opt.id)}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}

              <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  type="button"
                  style={button}
                  onClick={() => onSubmitMCQ(sim.correctOptionId)}
                  disabled={Boolean(result) || !selectedOption}
                >
                  Submit
                </button>
                <button type="button" style={button} onClick={resetAttempt}>
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ opacity: 0.8, marginBottom: 10 }}>
                Build the correct order. Use Add, then adjust with Up/Down.
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Available steps</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {sim.steps.map((step) => {
                      const already = sequence.includes(step.id);
                      return (
                        <button
                          key={step.id}
                          type="button"
                          style={{ ...button, opacity: result ? 0.6 : already ? 0.6 : 1 }}
                          disabled={Boolean(result) || already}
                          onClick={() => setSequence((prev) => [...prev, step.id])}
                        >
                          Add: {step.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>Your order</div>

                  {sequence.length === 0 ? (
                    <div style={{ opacity: 0.75 }}>No steps selected yet.</div>
                  ) : (
                    <ol style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
                      {sequence.map((id, idx) => {
                        const step = sim.steps.find((s) => s.id === id);
                        const label = step?.label ?? id;

                        return (
                          <li key={`${id}-${idx}`}>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                              <span style={{ fontWeight: 700 }}>{label}</span>

                              <button
                                type="button"
                                style={button}
                                disabled={Boolean(result) || idx === 0}
                                onClick={() => setSequence((prev) => moveItem(prev, idx, idx - 1))}
                              >
                                Up
                              </button>

                              <button
                                type="button"
                                style={button}
                                disabled={Boolean(result) || idx === sequence.length - 1}
                                onClick={() => setSequence((prev) => moveItem(prev, idx, idx + 1))}
                              >
                                Down
                              </button>

                              <button
                                type="button"
                                style={button}
                                disabled={Boolean(result)}
                                onClick={() => setSequence((prev) => prev.filter((_, i) => i !== idx))}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  )}

                  <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      style={button}
                      onClick={() => onSubmitSequence(sim)}
                      disabled={Boolean(result) || sequence.length !== sim.correctSequence.length}
                    >
                      Submit
                    </button>
                    <button type="button" style={button} onClick={resetAttempt}>
                      Retry
                    </button>
                  </div>

                  {sequence.length !== sim.correctSequence.length && !result ? (
                    <div style={{ marginTop: 8, opacity: 0.7 }}>
                      Select all {sim.correctSequence.length} steps before submitting.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        {result ? (
          <div style={{ marginTop: 14, borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              {result === "pass" ? "✅ Passed" : "❌ Failed"}
            </div>

            <p style={{ lineHeight: 1.6, marginTop: 8 }}>
              {result === "pass" ? sim.passText : sim.failText}
            </p>

            {result === "pass" ? (
              <div style={{ fontWeight: 800, marginBottom: 10 }}>Badge earned!</div>
            ) : null}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/careers" style={button}>
                Back to Hub
              </Link>
              {result === "fail" ? (
                <button type="button" style={button} onClick={resetAttempt}>
                  Retry Simulator
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}