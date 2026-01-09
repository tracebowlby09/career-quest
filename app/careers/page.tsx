"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearBadges, getBadges } from "../lib/progress";

const careers = [
  { id: "software-developer", title: "Software Developer", tagline: "Debug and ship a fix." },
  { id: "nurse", title: "Nurse", tagline: "Prioritize care and communicate." },
  { id: "electrician", title: "Electrician", tagline: "Diagnose safely and repair." },
] as const;

export default function CareersPage() {
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    setBadges(getBadges());
  }, []);

  function resetProgress() {
    clearBadges();
    setBadges([]);
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 34, marginBottom: 8 }}>Career Hub</h1>
          <p style={{ opacity: 0.85 }}>Pick a career world. Complete the challenge to earn a badge.</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ fontWeight: 800, textDecoration: "none" }}>
            ← Title Screen
          </Link>
          <button
            onClick={resetProgress}
            style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ccc", fontWeight: 800, cursor: "pointer" }}
            title="Clears badges saved on this device"
          >
            Reset Badges
          </button>
        </div>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 14 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Your Badges</h2>
        {badges.length === 0 ? (
          <p style={{ opacity: 0.85, margin: 0 }}>No badges yet. Complete a world to earn one.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            {badges.map((b) => (
              <li key={b} style={{ fontWeight: 700 }}>{b}</li>
            ))}
          </ul>
        )}
      </section>

      <ul style={{ marginTop: 18, paddingLeft: 18, lineHeight: 2 }}>
        {careers.map((c) => {
          const complete = badges.includes(c.id);
          return (
            <li key={c.id}>
              <Link href={`/careers/${encodeURIComponent(c.id)}`} style={{ fontWeight: 900, textDecoration: "none" }}>
                {c.title}
              </Link>
              <span style={{ marginLeft: 8, opacity: 0.8 }}>— {c.tagline}</span>
              {complete && <span style={{ marginLeft: 10, fontWeight: 900 }}>✅</span>}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
