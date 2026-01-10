"use client";

import Link from "next/link";
import { useState } from "react";
import { addBadge } from "../../../lib/progress";
import { getWorld } from "../../../lib/worlds";

type Outcome = "playing" | "pass" | "fail";

export default function SimulatorPage({ params }: { params: { world?: string } }) {
  // ✅ NO useMemo (avoids TS “possibly undefined” capture issues)
  const world = getWorld(params.world);

  if (!world) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>World not found</h1>
        <p style={{ opacity: 0.85, marginTop: 0 }}>
          Requested: {params.world ? params.world : "(empty)"}
        </p>
        <Link href="/careers" style={{ fontWeight: 900, textDecoration: "none" }}>
          ← Back to Career Hub
        </Link>
      </main>
    );
  }

  // ✅ world is guaranteed defined below this line
  const sim = world.simulator;

  const [outcome, setOutcome] = useState<Outcome>("playing");
  const [picked, setPicked] = useState<string>("");
  const [sequence, setSequence] = useState<string[]>([]);

  function reset() {
    setOutcome("playing");
    setPicked("");
    setSequence([]);
  }

  function submit() {
    if (sim.type === "mcq") {
      const ok = picked === sim.correctOptionId;
      setOutcome(ok ? "pass" : "fail");
      if (ok) addBadge(world.id);
      return;
    }

    const ok = sequence.join("|") === sim.correctSequence.join("|");
    setOutcome(ok ? "pass" : "fail");
    if (ok) addBadge(world.id);
  }

  function pickStep(stepId: string) {
    if (sim.type !== "sequence") return;
    if (outcome !== "playing") return;
    setSequence((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]));
  }

  const canSubmit =
    outcome === "playing" &&
    (sim.type === "mcq" ? picked !== "" : sequence.length > 0);

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>
          {world.icon} {world.title} — Simulator
        </h1>
        <Link href="/careers" style={{ fontWeight: 900, textDecoration: "none" }}>
          ← Career Hub
        </Link>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Scenario</h2>
        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>{world.scenario}</p>
      </section>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Simulator Challenge</h2>
        <p style={{ marginTop: 0, marginBottom: 12, fontWeight: 800 }}>{sim.prompt}</p>

        {sim.type === "mcq" && (
          <div style={{ display: "grid", gap: 10 }}>
            {sim.options.map((o) => (
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
                <span style={{ fontWeight: 800 }}>{o.label}</span>
              </label>
            ))}
          </div>
        )}

        {sim.type === "sequence" && (
          <div style={{ display: "grid", gap: 10 }}>
            {sim.steps.map((s) => {
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
                    fontWeight: 900,
                    cursor: outcome === "playing" && !chosen ? "pointer" : "not-allowed",
                    opacity: chosen ? 0.65 : 1,
                  }}
                >
                  {chosen ? "✅ " : ""}{s.label}
                </button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={submit}
            disabled={!canSubmit}
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
