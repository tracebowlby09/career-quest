import Link from "next/link";
import { notFound } from "next/navigation";

type World = {
  id: string;
  title: string;
  scenario: string;
  nextHref: string; // where this career goes next
};

const WORLDS: Record<string, World> = {
  developer: {
    id: "developer",
    title: "Software Developer",
    scenario: "Your app crashes on launch. You need to diagnose the issue fast.",
    nextHref: "/curriculum/developer/simulator",
  },
  nurse: {
    id: "nurse",
    title: "Nurse",
    scenario: "A patient is dizzy and weak. You must prioritize safe first steps.",
    nextHref: "/curriculum/nurse/simulator",
  },
  electrician: {
    id: "electrician",
    title: "Electrician",
    scenario: "A light flickers. You need to troubleshoot safely.",
    nextHref: "/curriculum/electrician/simulator",
  },
};

export default function CareerPage({ params }: { params: { career: string } }) {
  const world = WORLDS[params.career];

  if (!world) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>{world.title} World</h1>
        <Link href="/careers" style={{ alignSelf: "center", fontWeight: 800, textDecoration: "none" }}>
          ← Career Hub
        </Link>
      </header>

      <section style={{ marginTop: 16, border: "1px solid #ddd", borderRadius: 14, padding: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Scenario</h2>
        <p style={{ lineHeight: 1.6, opacity: 0.9, margin: 0 }}>{world.scenario}</p>
      </section>

      <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link
          href={world.nextHref}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #ccc",
            textDecoration: "none",
            fontWeight: 900,
          }}
        >
          Start Curriculum →
        </Link>

        <Link href="/careers" style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #ccc", textDecoration: "none", fontWeight: 900 }}>
          Back
        </Link>
      </div>
    </main>
  );
}
