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

const button: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  border: "1px solid #111827",
  borderRadius: 12,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 600,
};

export default function AboutPage() {
  return (
    <main style={container}>
      <section style={card}>
        <h1 style={{ fontSize: 28, marginTop: 0 }}>How to Play</h1>

        <p style={{ lineHeight: 1.6 }}>
          Each career world follows the same 3-step loop:
        </p>

        <ol style={{ lineHeight: 1.8 }}>
          <li>
            <strong>Step 1: Curriculum</strong> — Read short bullet points to learn key
            basics.
          </li>
          <li>
            <strong>Step 2: Questions</strong> — Answer a 3-question quiz. You need at
            least 2/3 correct to continue.
          </li>
          <li>
            <strong>Step 3: Simulator</strong> — Complete a short scenario. Pass to earn
            the world’s badge.
          </li>
        </ol>

        <div style={{ marginTop: 16 }}>
          <Link href="/careers" style={button}>
            Back to Career Hub
          </Link>
        </div>
      </section>
    </main>
  );
}