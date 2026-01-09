"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addAttempt, addBadge, addWin } from "../../lib/progress";
import { WORLDS, type WorldId } from "../../lib/worlds";

type Outcome = "intro" | "success" | "retry";

export default function CareerWorld({ params }: { params: { career: string } }) {
  const world = useMemo(() => WORLDS[params.career as WorldId], [params.career]);

  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [picked, setPicked] = useState<string | null>(null);

  // For sequence world
  const [seq, setSeq] = useState<string[]>([]);

  if (!world) {
    return (
      <div style={{ padding: "28px 0" }}>
        <div className="card">
          <div className="cardInner">
            <h1 className="h1" style={{ fontSize: 40 }}>Career not found</h1>
            <p className="p">That world doesn’t exist yet.</p>
            <div className="spacer" />
            <Link className="btn btnPrimary" href="/careers">Back to Hub</Link>
          </div>
        </div>
      </div>
    );
  }

  function submitMCQ() {
    addAttempt();
    const ok = picked === world.correctOptionId;
    setOutcome(ok ? "success" : "retry");
    if (ok) {
      addBadge(world.id);
      addWin();
    }
  }

  function toggleSeq(id: string) {
    setSeq((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // only first 3 steps
      return [...prev, id];
    });
  }

  function submitSequence() {
    addAttempt();
    const ok =
      seq.length === 3 &&
      seq[0] === world.correctSequence[0] &&
      seq[1] === world.correctSequence[1] &&
      seq[2] === world.correctSequence[2];

    setOutcome(ok ? "success" : "retry");
    if (ok) {
      addBadge(world.id);
      addWin();
    }
  }

  function reset() {
    setOutcome("intro");
    setPicked(null);
    setSeq([]);
  }

  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h1 className="h1" style={{ fontSize: 42, marginBottom: 0 }}>
              {world.icon} {world.title} World
            </h1>
            <div className="row">
              <Link className="btn" href="/careers">Career Hub</Link>
              <button className="btn" onClick={reset}>Reset</button>
            </div>
          </div>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <h2 className="h2">Scenario</h2>
              <p className="p">{world.scenario}</p>
            </div>
          </div>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <h2 className="h2">Challenge</h2>
              <p className="p" style={{ marginBottom: 14 }}>{world.prompt}</p>

              {world.type === "mcq" ? (
                <>
                  <div className="row" style={{ flexDirection: "column", alignItems: "stretch", gap: 10 }}>
                    {world.options.map((o) => (
                      <button
                        key={o.id}
                        className="btn"
                        onClick={() => setPicked(o.id)}
                        style={{
                          justifyContent: "flex-start",
                          background: picked === o.id ? "rgba(96,165,250,.22)" : undefined,
                          borderColor: picked === o.id ? "rgba(96,165,250,.55)" : undefined
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>

                  <div className="spacer" />
                  <button className="btn btnPrimary" onClick={submitMCQ} disabled={!picked} style={{ opacity: picked ? 1 : 0.6 }}>
                    Submit Answer
                  </button>
                </>
              ) : (
                <>
                  <p className="muted" style={{ marginBottom: 10 }}>
                    Choose exactly 3 steps. Click again to unselect.
                  </p>

                  <div className="row" style={{ flexDirection: "column", alignItems: "stretch", gap: 10 }}>
                    {world.options.map((o) => {
                      const active = seq.includes(o.id);
                      const index = seq.indexOf(o.id);
                      return (
                        <button
                          key={o.id}
                          className="btn"
                          onClick={() => toggleSeq(o.id)}
                          style={{
                            justifyContent: "flex-start",
                            background: active ? "rgba(34,197,94,.18)" : undefined,
                            borderColor: active ? "rgba(34,197,94,.45)" : undefined
                          }}
                        >
                          {active ? `Step ${index + 1}: ` : ""}{o.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="spacer" />
                  <div className="row">
                    <button className="btn btnPrimary" onClick={submitSequence} disabled={seq.length !== 3} style={{ opacity: seq.length === 3 ? 1 : 0.6 }}>
                      Submit Steps
                    </button>
                    <span className="muted">Selected: {seq.length}/3</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {outcome !== "intro" && (
            <>
              <div className="spacer" />
              <div className="card" style={{ background: "var(--panel2)" }}>
                <div className="cardInner">
                  <h2 className="h2">Result: {outcome === "success" ? "Success ✅" : "Try Again"}</h2>
                  <p className="p">{outcome === "success" ? world.success : world.retry}</p>
                  {outcome === "success" && (
                    <div className="spacer" />
                  )}
                  <div className="row">
                    <Link className="btn btnPrimary" href="/careers">Back to Hub</Link>
                    <button className="btn" onClick={reset}>Try Again</button>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
