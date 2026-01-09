"use client";

import Link from "next/link";

export default function CareerPage({ params }: { params: { career: string } }) {
  return (
    <main style={{ minHeight: "100vh", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, marginBottom: 10 }}>Career World: {params.career}</h1>

      <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
        Scenario + skill challenge will live here. This is the dynamic route that loads different career worlds.
      </p>

      <div style={{ marginTop: 16 }}>
        <Link href="/careers" style={{ textDecoration: "none", fontWeight: 600 }}>
          ← Back to Career Hub
        </Link>
      </div>
    </main>
  );
}
