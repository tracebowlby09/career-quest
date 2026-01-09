import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 760, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 50, marginBottom: 8 }}>Career Quest</h1>
        <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 22, lineHeight: 1.6 }}>
          Explore careers through short scenarios + skill challenges. Earn badges as you complete worlds.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/careers"
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              border: "1px solid #ccc",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Start
          </Link>

          <Link
            href="/about"
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              border: "1px solid #ccc",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            How to Play
          </Link>
        </div>
      </div>
    </main>
  );
}
