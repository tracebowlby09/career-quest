import Link from "next/link";
import { page, shell, card, h1, p, btn } from "../ui/styles";

export default function AboutPage() {
  return (
    <main style={page}>
      <div style={shell}>
        <div style={card}>
          <h1 style={h1}>How to Play</h1>
          <p style={{ ...p, marginTop: 10, fontSize: 18 }}>
            Each world has a short learning section, a quick quiz, then a simulator challenge. Pass to earn a badge.
          </p>

          <ul style={{ marginTop: 14, paddingLeft: 18, lineHeight: 1.9, opacity: 0.9 }}>
            <li><b>Learn:</b> read the curriculum for the job.</li>
            <li><b>Questions:</b> answer a few checks for understanding.</li>
            <li><b>Simulator:</b> complete the scenario challenge.</li>
            <li><b>Badges:</b> earn one per world.</li>
          </ul>

          <div style={{ marginTop: 16 }}>
            <Link href="/careers" style={btn}>← Back to Career Hub</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
