import Link from "next/link";
import { page, shell, card, h1, p, btn, btnPrimary, tag } from "./ui/styles";

export default function Home() {
  return (
    <main style={page}>
      <div style={shell}>
        <div style={{ ...card, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span style={tag}>🎮 Career Quest</span>
            <span style={{ ...tag, opacity: 0.8 }}>3 Worlds • Badges</span>
          </div>

          <h1 style={{ ...h1, marginTop: 14 }}>Train for the real world.</h1>
          <p style={{ ...p, marginTop: 10, fontSize: 18, maxWidth: 780 }}>
            Pick a career world → learn the basics → answer questions → enter the simulator → pass or fail.
            Earn badges as proof you finished each world.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <Link href="/careers" style={btnPrimary}>
              Start
            </Link>
            <Link href="/about" style={btn}>
              How to Play
            </Link>
          </div>

          <div style={{ marginTop: 18, opacity: 0.75, fontSize: 13, lineHeight: 1.5 }}>
            Tip: Badges save on this device. Use Career Hub → Reset if you want a fresh run.
          </div>
        </div>
      </div>
    </main>
  );
}
