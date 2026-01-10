"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clearBadges, getBadges } from "../lib/progress";
import { page, shell, card, topbar, h1, p, btn, btnPrimary, tag, grid2, col12, col6 } from "../ui/styles";

const WORLDS = [
  { id: "software-developer", title: "Software Developer", icon: "💻", tagline: "Debug and ship a fix." },
  { id: "nurse", title: "Nurse", icon: "🩺", tagline: "Prioritize care and communicate." },
  { id: "electrician", title: "Electrician", icon: "⚡", tagline: "Diagnose safely and repair." },
] as const;

type WorldId = (typeof WORLDS)[number]["id"];

export default function CareersPage() {
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    setBadges(getBadges());
  }, []);

  const completeCount = useMemo(() => badges.length, [badges]);

  function resetProgress() {
    clearBadges();
    setBadges([]);
  }

  return (
    <main style={page}>
      <div style={shell}>
        <div style={topbar}>
          <div>
            <h1 style={h1}>Career Hub</h1>
            <p style={{ ...p, marginTop: 6 }}>Choose a world. Earn badges by passing the simulator.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/" style={btn}>← Title</Link>
            <button onClick={resetProgress} style={btn} title="Clears badges saved on this device">
              Reset Badges
            </button>
          </div>
        </div>

        <div style={{ ...card, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <span style={tag}>🏅 Badges: {completeCount}/3</span>
            <span style={{ ...tag, opacity: 0.85 }}>
              {badges.includes("software-developer") ? "💻" : "▫️"}
              {badges.includes("nurse") ? "🩺" : "▫️"}
              {badges.includes("electrician") ? "⚡" : "▫️"}
            </span>
          </div>
          <p style={{ ...p, marginTop: 10 }}>
            Your badges show completion. If a world says “not found”, it means the route id doesn’t match.
          </p>
        </div>

        <div style={grid2}>
          {WORLDS.map((w) => {
            const done = badges.includes(w.id);
            return (
              <div key={w.id} style={{ ...card, ...(col6 as any) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 28 }}>{w.icon}</div>
                    <h2 style={{ fontSize: 20, margin: "6px 0 0 0" }}>{w.title}</h2>
                    <p style={{ ...p, marginTop: 6 }}>{w.tagline}</p>
                  </div>
                  <span style={tag}>{done ? "✅ Completed" : "⏳ Not yet"}</span>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <Link href={`/careers/${w.id}`} style={btnPrimary}>
                    Enter World →
                  </Link>
                </div>
              </div>
            );
          })}

          <div style={{ ...card, ...(col12 as any) }}>
            <p style={p}>
              Next: we’ll add “Curriculum → Questions → Simulator” pages per world. For now, each world page is the simulator entry.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
