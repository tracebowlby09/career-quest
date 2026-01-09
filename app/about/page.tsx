import Link from "next/link";

export default function About() {
  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner">
          <h1 className="h1" style={{ fontSize: 42 }}>How to Play</h1>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <h2 className="h2">1) Pick a career world</h2>
              <p className="p">Go to the Career Hub and choose a world to enter.</p>

              <div className="spacer" />

              <h2 className="h2">2) Read the scenario</h2>
              <p className="p">Each career gives you a short situation you’d face on the job.</p>

              <div className="spacer" />

              <h2 className="h2">3) Beat the skill challenge</h2>
              <p className="p">Type the correct response. If you succeed, you earn a badge.</p>
            </div>
          </div>

          <div className="spacer" />

          <div className="row">
            <Link className="btn btnPrimary" href="/careers">Go to Career Hub</Link>
            <Link className="btn" href="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
