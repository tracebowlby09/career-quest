import Link from "next/link";

const careers = [
  { id: "software-developer", title: "Software Developer", tagline: "Debug and ship a fix." },
  { id: "nurse", title: "Nurse", tagline: "Prioritize care and communicate." },
  { id: "electrician", title: "Electrician", tagline: "Diagnose safely and repair." },
];

export default function CareersPage() {
  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 34, marginBottom: 8 }}>Career Hub</h1>
          <p style={{ opacity: 0.85 }}>
            Pick a career world to experience a scenario and complete a skill challenge.
          </p>
        </div>
        <Link href="/" style={{ alignSelf: "center", fontWeight: 600, textDecoration: "none" }}>
          ← Title Screen
        </Link>
      </header>

      <ul style={{ marginTop: 18, paddingLeft: 18, lineHeight: 2 }}>
        {careers.map((c) => (
          <li key={c.id}>
            <Link href={`/careers/${c.id}`} style={{ fontWeight: 700, textDecoration: "none" }}>
              {c.title}
            </Link>
            <span style={{ marginLeft: 8, opacity: 0.8 }}>— {c.tagline}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
