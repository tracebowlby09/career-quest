"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

      param($m)
      $inside = $m.Groups[1].Value.Trim()
      if ($inside -match '\bnotFound\b') { $m.Value } else { "import { $inside, notFound } from `"next/navigation`";" }
    
import { WORLDS, WorldId, World } from "../../../lib/worlds";
import { addBadge } from "../../../lib/progress";

type Outcome = "intro" | "pass" | "fail";

export default function SimulatorPage() {
  const params = useParams<{ world?: string }>();

  const slug = useMemo(() => {
    const raw = params?.world;
    if (!raw) return "";
    const v = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(v).trim().toLowerCase();
  }, [params]);

  // IMPORTANT: Make a stable local variable that TS can trust after the guard.
  const world = (WORLDS as Record<string, World>)[slug];

  if (!world) notFound();
  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [picked, setPicked] = useState<string>("");
  const [sequence, setSequence] = useState<string[]>([]);

  if (!world) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1>World not found</h1>
        <p>
          Requested: <b>{slug || "(empty)"}</b>
        </p>
        <Link href="/curriculum" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Curriculum
        </Link>
      </main>
    );
  }

  function resetAll() {
    setOutcome("intro");
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

    const seq = world.simulator.correctSequence ?? [];
    const ok = sequence.length === seq.length && sequence.every((v, i) => v === seq[i]);
    setOutcome(ok ? "pass" : "fail");
    if (ok) addBadge(world.id);
  }

  function pickStep(id: string) {
    setSequence((s) => (s.includes(id) ? s : [...s, id]));
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>
          {world.icon} {world.title} Simulator
        </h1>
        <Link href={`/curriculum/${world.id}/questions`} style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Questions
        </Link>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Scenario Simulator</h2>
        <p style={{ marginTop: 0 }}>{world.simulator.prompt}</p>

        {world.simulator.type === "mcq" ? (
          <div style={{ display: "grid", gap: 10 }}>
            {(world.simulator.options ?? []).map((o) => (
              <label key={o.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input type="radio" name="sim" checked={picked === o.id} onChange={() => setPicked(o.id)} />
                <span style={{ fontWeight: 700 }}>{o.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ padding: 10, borderRadius: 12, border: "1px solid #ccc" }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>Your order</div>
              <div style={{ opacity: 0.9 }}>{sequence.length ? sequence.join(" → ") : "(click steps below)"}</div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {(world.simulator.steps ?? []).map((s) => (
                <button
                  key={s.id}
                  onClick={() => pickStep(s.id)}
                  disabled={sequence.includes(s.id)}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid #ccc",
                    fontWeight: 900,
                    cursor: sequence.includes(s.id) ? "not-allowed" : "pointer",
                    opacity: sequence.includes(s.id) ? 0.6 : 1,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button
            onClick={submit}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Submit
          </button>

          <button
            onClick={resetAll}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, cursor: "pointer" }}
          >
            Reset
          </button>

          <Link
            href="/careers"
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 900, textDecoration: "none" }}
          >
            Career Hub
          </Link>
        </div>
      </section>

      {outcome !== "intro" && (
        <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>{outcome === "pass" ? "PASS ✅" : "FAIL ❌"}</h2>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            {outcome === "pass" ? world.simulator.passText : world.simulator.failText}
          </p>
          {outcome === "pass" && (
            <p style={{ marginTop: 10, opacity: 0.85 }}>
              Badge earned: <b>{world.id}</b> (check Career Hub)
            </p>
          )}
        </section>
      )}
    </main>
  );
}

