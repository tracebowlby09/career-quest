import Link from "next/link";

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, marginBottom: 12 }}>How to Play</h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 16 }}>
        Choose a career world, read the scenario, then complete a short skill challenge.
        Your choices create different outcomes—retry, pass, or unlock an advanced path.
      </p>

      <ul style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
        <li><b>Keyboard-friendly:</b> use Tab and Enter to navigate.</li>
        <li><b>Clear instructions:</b> each world explains what to do.</li>
        <li><b>Multiple outcomes:</b> success and retry paths are part of gameplay.</li>
      </ul>

      <Link href="/careers" style={{ textDecoration: "none", fontWeight: 700 }}>
        ← Back to Career Hub
      </Link>
    </main>
  );
}
