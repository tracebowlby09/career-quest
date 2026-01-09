import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner" style={{ textAlign: "center" }}>
          <div className="badge" style={{ justifyContent: "center", margin: "0 auto 12px" }}>
            🎮 <span>Scenario + Skill Challenge</span>
          </div>

          <h1 className="h1">Career Quest</h1>
          <p className="p" style={{ maxWidth: 720, margin: "0 auto" }}>
            Explore careers through short scenarios and quick challenges.
            Win a badge for each world you complete.
          </p>

          <div className="spacer" />

          <div className="row" style={{ justifyContent: "center" }}>
            <Link className="btn btnPrimary" href="/careers">Start</Link>
            <Link className="btn" href="/about">How to Play</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
