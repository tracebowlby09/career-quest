import Link from "next/link";

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

export default function HomePage() {
  return (
    <main style={container}>
      <section style={card}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>Career Quest</h1>
          <span style={{ fontSize: 18, opacity: 0.7 }}>Web Game</span>
        </div>

        <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>
          Explore careers by learning quick essentials, passing a quiz, and completing a
          short simulator scenario. Earn a badge for each world you complete.
        </p>

        <div style={buttonRow}>
          <Link href="/careers" style={button}>
            Start
          </Link>
          <Link href="/about" style={button}>
            How to Play
          </Link>
        </div>
      </section>
    </main>
  );
}