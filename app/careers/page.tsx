"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearBadges, getBadges } from "../lib/progress";

const careers = [
  { id: "software-developer", title: "Software Developer", tagline: "Debug and ship a fix.", icon: "💻" },
  { id: "nurse", title: "Nurse", tagline: "Prioritize care and communicate.", icon: "🩺" },
  { id: "electrician", title: "Electrician", tagline: "Diagnose safely and repair.", icon: "⚡" },
] as const;

export default function CareersHub() {
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    setBadges(getBadges());
  }, []);

  function reset() {
    clearBadges();
    setBadges([]);
  }

  const completedCount = badges.length;

  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <h1 className="h1" style={{ fontSize: 42, marginBottom: 6 }}>Career Hub</h1>
              <p className="p">Complete worlds to earn badges. Progress saves on this device.</p>
            </div>

            <div className="row">
              <button className="btn" onClick={reset} title="Clears saved badges">
                Reset Badges
              </button>
              <Link className="btn" href="/">Home</Link>
            </div>
          </div>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="badge">🏆 Badges earned: {completedCount} / {careers.length}</div>
                <div className="muted">Tip: finish a world to unlock its badge ✅</div>
              </div>
            </div>
          </div>

          <div className="spacer" />

          <ul className="list">
            {careers.map((c) => {
              const done = badges.includes(c.id);
              return (
                <li key={c.id}>
                  <Link href={`/careers/${c.id}`} style={{ fontWeight: 900 }}>
                    {c.icon} {c.title}
                  </Link>
                  <span className="muted"> — {c.tagline}</span>
                  {done && <span style={{ marginLeft: 10, fontWeight: 900 }}>✅</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="spacer" />
      <p className="muted" style={{ textAlign: "center" }}>
        Want more careers? We can add 10+ worlds next.
      </p>
    </div>
  );
}
