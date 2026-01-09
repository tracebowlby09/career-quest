"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clearBadges, getBadges, getStats, resetStats } from "../lib/progress";
import { WORLDS } from "../lib/worlds";

export default function CareersHub() {
  const [badges, setBadges] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [wins, setWins] = useState(0);

  const worlds = useMemo(() => Object.values(WORLDS), []);

  useEffect(() => {
    setBadges(getBadges());
    const s = getStats();
    setAttempts(s.attempts);
    setWins(s.wins);
  }, []);

  function resetAll() {
    clearBadges();
    resetStats();
    setBadges([]);
    setAttempts(0);
    setWins(0);
  }

  const completeCount = badges.length;

  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <h1 className="h1" style={{ fontSize: 42, marginBottom: 6 }}>Career Hub</h1>
              <p className="p">Three worlds. Real challenges. Earn badges and show progress.</p>
            </div>

            <div className="row">
              <button className="btn" onClick={resetAll} title="Clears saved progress on this device">
                Reset Progress
              </button>
              <Link className="btn" href="/">Home</Link>
            </div>
          </div>

          <div className="spacer" />

          <div className="row">
            <div className="badge">🏆 Badges: {completeCount} / {worlds.length}</div>
            <div className="badge">🎯 Wins: {wins}</div>
            <div className="badge">🧪 Attempts: {attempts}</div>
          </div>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <h2 className="h2">Worlds</h2>
              <ul className="list">
                {worlds.map((w) => {
                  const done = badges.includes(w.id);
                  return (
                    <li key={w.id}>
                      <Link href={`/careers/${w.id}`} style={{ fontWeight: 900 }}>
                        {w.icon} {w.title}
                      </Link>
                      <span className="muted"> — {w.type === "mcq" ? "Multiple Choice" : "Safety Sequence"}</span>
                      {done && <span style={{ marginLeft: 10, fontWeight: 900 }}>✅</span>}
                    </li>
                  );
                })}
              </ul>

              <div className="spacer" />
              <p className="muted">
                Goal for regionals: finish all 3 worlds and earn 3 badges.
              </p>
            </div>
          </div>

          <div className="spacer" />
          <Link className="btn btnPrimary" href={`/careers/${worlds[0].id}`}>Start First World</Link>
        </div>
      </div>
    </div>
  );
}
