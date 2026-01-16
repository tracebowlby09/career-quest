import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorld } from "../../lib/worlds";

export default function CurriculumWorldPage({ params }: { params: { world: string } }) {
  const world = getWorld(params.world);
  if (!world) return notFound();

  // curriculum is string[] (first line = summary, rest = key points)
  const curriculum = Array.isArray(world.curriculum) ? world.curriculum : [];
  const summary = curriculum[0] ?? "Complete the questions to build expertise and unlock the simulator.";
  const points = curriculum.slice(1);

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 36, margin: 0 }}>{world.title}: Curriculum</h1>
          <p style={{ opacity: 0.85, marginTop: 6 }}>
            Learn the basics first, then jump into questions and the simulator.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/careers" style={{ fontWeight: 800, textDecoration: "none" }}>
            ← Careers
          </Link>
          <Link href={`/curriculum/${world.id}/questions`} style={{ fontWeight: 800, textDecoration: "none" }}>
            Start Questions →
          </Link>
        </div>
      </header>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Summary</h2>
        <p style={{ lineHeight: 1.6, opacity: 0.9, marginBottom: 14 }}>{summary}</p>

        <h3 style={{ marginTop: 0 }}>Key Points</h3>
        {points.length === 0 ? (
          <p style={{ opacity: 0.85, margin: 0 }}>No key points added yet.</p>
        ) : (
          <ul style={{ lineHeight: 1.8, marginTop: 8 }}>
            {points.map((p: string, i: number) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Flow</h2>
        <ol style={{ lineHeight: 1.9, margin: 0, paddingLeft: 18 }}>
          <li>Curriculum (you are here)</li>
          <li>Questions (earn expertise)</li>
          <li>Simulator (pass/fail)</li>
        </ol>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            href={`/curriculum/${world.id}/questions`}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            Start Questions
          </Link>
          <Link
            href={`/curriculum/${world.id}/simulator`}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ccc",
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            Go to Simulator
          </Link>
        </div>
      </section>
    </main>
  );
}
