import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner">
          <h1 className="h1" style={{ fontSize: 40 }}>404 — Not Found</h1>
          <p className="p">
            That page doesn’t exist. Head back to the hub and pick a career world.
          </p>
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
