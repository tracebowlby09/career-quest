import Link from "next/link";
import { WORLDS, worldIds } from "../lib/worlds";

export default function CurriculumHub() {
  const ids = worldIds();

  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>Curriculum</h1>
        <Link href="/careers" style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Career Hub
        </Link>
      </header>

      <p style={{ opacity: 0.85, marginTop: 10 }}>
        Pick a world to learn the basics, answer questions, then try the simulator.
      </p>

      <ul style={{ marginTop: 16, paddingLeft: 18, lineHeight: 2 }}>
        {ids.map((id) => {
          const w = WORLDS[id];
          return (
            <li key={id}>
              <Link href={`/curriculum/${id}`} style={{ fontWeight: 900, textDecoration: "none" }}>
                {w.icon} {w.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
