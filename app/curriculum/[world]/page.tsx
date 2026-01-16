import Link from "next/link";
import { getWorld } from "../../lib/worlds";

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

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 16,
};

const button: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  border: "1px solid #111827",
  borderRadius: 12,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 600,
};

export default function CurriculumWorldPage({
  params,
}: {
  params: { world: string };
}) {
  const world = getWorld(params.world);

  if (!world) {
    return (
      <main style={container}>
        <section style={card}>
          <h1 style={{ marginTop: 0, fontSize: 28 }}>World not found</h1>
          <p style={{ lineHeight: 1.6 }}>
            We couldn’t find that career world. Please return to the Career Hub and
            choose one of the available worlds.
          </p>
          <Link href="/careers" style={button}>
            Back to Career Hub
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={container}>
      <section style={card}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <h1 style={{ marginTop: 0, fontSize: 28 }}>
            {world.icon} {world.title}
          </h1>
          <span style={{ opacity: 0.75 }}>Step 1: Curriculum</span>
        </div>

        <ul style={{ lineHeight: 1.9, marginTop: 10 }}>
          {world.curriculum.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>

        <div style={buttonRow}>
          <Link href={`/curriculum/${world.id}/questions`} style={button}>
            Start Questions
          </Link>
          <Link href="/careers" style={button}>
            Back to Hub
          </Link>
        </div>
      </section>
    </main>
  );
}