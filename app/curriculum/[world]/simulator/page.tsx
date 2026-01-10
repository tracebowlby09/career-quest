"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import { addBadge } from "../../../lib/progress";
import { getWorld } from "../../../lib/worlds";

type Outcome = "playing" | "pass" | "fail";

export default function SimulatorPage({ params }: { params: { world?: string } }) {
  const world = useMemo(() => getWorld(params.world), [params.world]);

  // HARD STOP: fixes "'world' possibly undefined" everywhere
  if (!world) notFound();

  const [outcome, setOutcome] = useState<Outcome>("playing");
  const [picked, setPicked] = useState<string>("");
  const [sequence, setSequence] = useState<string[]>([]);

  function reset() {
    setOutcome("playing");
    setPicked("");
    setSequence([]);
  }

  function submit() {
    if (world.simulator.type === "mcq") {
      const ok = picked === world.simulator.correctOptionId;
      setOutcome(ok ? "pass" : "fail");
      if (ok) addBadge(world.id);
      return;
    }

    // sequence
    const target = world.simulator.correctSequence.join("|");
    const attempt = sequence.join("|");
    const ok = attempt === target;
    setOutcome(ok ? "pass" : "fail");
    if (ok) addBadge(world.id);
  }

  function pickStep(stepId: string) {
    if (world.simulator.type !== "sequence") return;
    if (outcome !== "playing") return;
    setSequence((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]));
  }

  function undoStep() {
    setSequence((prev) => prev.slice(0, -1));
  }

  const isMCQ = world.simulator.type === "mcq";
  const isSequence = world.simulator.type === "sequence";

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>
          {world.icon} {world.title} — Simulator
        </h1>
        <Link href="/careers" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Career Hub
        </Link>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Scenario</h2>
        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>{world.scenario}</p>
      </section>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Simulator Challenge</h2>
        <p style={{ marginTop: 0, marginBottom: 12, fontWeight: 700 }}>{world.simulator.prompt}</p>

        {isMCQ && (
          <div style={{ display: "grid", gap: 10 }}>
            {world.simulator.options.map((o) => (
              <label
                key={o.id}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  cursor: outcome === "playing" ? "pointer" : "not-allowed",
                  opacity: outcome === "playing" ? 1 : 0.7,
                }}
              >
                <input
                  type="radio"
                  name="mcq"
                  value={o.id}
                  checked={picked === o.id}
                  onChange={() => setPicked(o.id)}
                  disabled={outcome !== "playing"}
                />
                <span style={{ fontWeight: 700 }}>{o.label}</span>
              </label>
            ))}
          </div>
        )}

        {isSequence && (
          <div>
            <div style={{ display: "grid", gap: 10 }}>
              {world.simulator.steps.map((s) => {
                const chosen = sequence.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => pickStep(s.id)}
                    disabled={outcome !== "playing" || chosen}
                    style={{
                      textAlign: "left",
                      padding: 12,
                      borderRadius: 12,
                      border: "1px solid #ccc",
                      fontWeight: 800,
                      cursor: outcome === "playing" && !chosen ? "pointer" : "not-allowed",
                      opacity: chosen ? 0.65 : 1,
                    }}
                  >
                    {chosen ? "✅ " : ""}{s.label}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px dashed #bbb" }}>
              <div style={{ fontWeight: 900, marginBottom: 8 }}>Your order:</div>
              {sequence.length === 0 ? (
                <div style={{ opacity: 0.8 }}>Pick steps above…</div>
              ) : (
                <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                  {sequence.map((id) => {
                    const label = world.simulator.steps.find((x) => x.id === id)?.label ?? id;
                    return <li key={id} style={{ fontWeight: 700 }}>{label}</li>;
                  })}
                </ol>
              )}

              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={undoStep}
                  disabled={outcome !== "playing" || sequence.length === 0}
                  style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
                >
                  Undo Last
                </button>
                <button
                  onClick={() => setSequence([])}
                  disabled={outcome !== "playing" || sequence.length === 0}
                  style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={submit}
            disabled={outcome !== "playing" || (isMCQ ? picked === "" : sequence.length === 0)}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Submit
          </button>

          <button
            onClick={reset}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Reset
          </button>
        </div>
      </section>

      {outcome !== "playing" && (
        <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>
            Result: {outcome === "pass" ? "PASS ✅" : "FAIL ❌"}
          </h2>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            {outcome === "pass" ? world.passText : world.failText}
          </p>

          <div style={{ marginTop: 12 }}>
            <Link href="/careers" style={{ fontWeight: 900, textDecoration: "none" }}>
              ← Back to Career Hub
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
