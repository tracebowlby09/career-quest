"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WORLDS, worldIds, type WorldId } from "../lib/worlds";
import { clearBadges, getBadges, type BadgeId } from "../lib/progress";

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

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
  marginTop: 12,
};

const tile: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 14,
  textDecoration: "none",
  color: "#111827",
  display: "block",
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

function tagline(id: WorldId): string {
  switch (id) {
    case "electrician":
      return "Work safe and solve power problems.";
    case "programmer":
      return "Debug code and match the spec.";
    case "nurse":
      return "Prioritize care and assess symptoms.";
    default: {
      const _exhaustive: never = id;
      return String(_exhaustive);
    }
  }
}

export default function CareersPage() {
  const [badges, setBadges] = useState<BadgeId[]>([]);

  useEffect(() => {
    setBadges(getBadges());
  }, []);

  const ids = useMemo(() => worldIds(), []);

  function onReset() {
    clearBadges();
    setBadges([]);
  }

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
            <h1 style={{ fontSize: 28, marginTop: 0, marginBottom: 6 }}>
              Career Hub
            </h1>
            <div style={{ opacity: 0.75 }}>
              Choose a world. Earn badges by completing curriculum, questions, and the
              simulator.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/" style={button}>
              Home
            </Link>
            <Link href="/about" style={button}>
              How to Play
            </Link>
          </div>
        </div>

        <div style={grid}>
          {ids.map((id) => {
            const world = WORLDS[id];
            const completed = badges.includes(id);
            return (
              <Link key={id} href={`/curriculum/${id}`} style={tile}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 800 }}>
                    <span style={{ marginRight: 8 }}>{world.icon}</span>
                    {world.title}
                  </div>
                  <div style={{ fontSize: 16 }}>{completed ? "✅" : ""}</div>
                </div>
                <div style={{ marginTop: 8, opacity: 0.8 }}>{tagline(id)}</div>
              </Link>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 18,
            borderTop: "1px solid #e5e7eb",
            paddingTop: 16,
          }}
        >
          <h2 style={{ fontSize: 18, margin: 0 }}>Your Badges</h2>

          {badges.length === 0 ? (
            <p style={{ marginTop: 8, opacity: 0.75 }}>
              No badges yet. Complete a world to earn your first badge.
            </p>
          ) : (
            <ul style={{ marginTop: 8, lineHeight: 1.8 }}>
              {badges.map((id) => (
                <li key={id}>
                  <strong>{WORLDS[id].icon}</strong> {WORLDS[id].title}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={onReset} style={button}>
              Reset Badges
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}