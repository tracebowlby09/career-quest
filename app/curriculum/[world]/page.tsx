"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { WORLDS, WorldId } from "../../lib/worlds";

export default function CurriculumWorldPage() {
  const params = useParams<{ world?: string }>();
  const slug = useMemo(() => {
    const raw = params?.world;
    if (!raw) return "";
    const v = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(v).trim().toLowerCase();
  }, [params]);

  const world = (WORLDS as Record<string, any>)[slug] as (typeof WORLDS)[WorldId] | undefined;

  if (!world) {
    return (
      <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28 }}>World not found</h1>
        <p>Requested: <b>{slug || "(empty)"}</b></p>
        <Link href="/curriculum" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Curriculum
        </Link>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>{world.icon} {world.title} Curriculum</h1>
        <Link href="/curriculum" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Curriculum Hub
        </Link>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Summary</h2>
        <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{world.curriculum.summary}</p>

        <h3>Key Points</h3>
        <ul style={{ lineHeight: 1.8 }}>
          {world.curriculum.keyPoints.map((k) => <li key={k}>{k}</li>)}
        </ul>

        <h3>Mini Example</h3>
        <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{world.curriculum.miniExample}</p>
      </section>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <Link href={`/curriculum/${world.id}/questions`} style={{ fontWeight: 900, textDecoration: "none", border: "1px solid #ccc", borderRadius: 12, padding: "10px 14px" }}>
          Start Questions →
        </Link>
        <Link href="/careers" style={{ fontWeight: 900, textDecoration: "none", border: "1px solid #ccc", borderRadius: 12, padding: "10px 14px" }}>
          Back to Career Hub
        </Link>
      </div>
    </main>
  );
}
