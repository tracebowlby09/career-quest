"use client";

import { useEffect, useState } from "react";
import { clearBadges, getBadges } from "../lib/progress";
import { Card, CardTitle, Container, Header, Pill, Row, TextLink, Button } from "../components/ui";

const careers = [
  { id: "software-developer", title: "Software Developer", tagline: "Debug, ship, and think logically.", icon: "💻" },
  { id: "nurse", title: "Nurse", tagline: "Assess, prioritize, and communicate.", icon: "🩺" },
  { id: "electrician", title: "Electrician", tagline: "Safety first. Diagnose and repair.", icon: "⚡" },
] as const;

export default function CareersPage() {
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => setBadges(getBadges()), []);

  function resetProgress() {
    clearBadges();
    setBadges([]);
  }

  return (
    <Container>
      <Header
        title="Career Hub"
        subtitle="Choose a world. Pass the simulator to earn a badge."
        right={
          <Row>
            <TextLink href="/">← Title</TextLink>
            <Button onClick={resetProgress}>Reset Badges</Button>
          </Row>
        }
      />

      <Card>
        <CardTitle>Your Badges</CardTitle>
        {badges.length === 0 ? (
          <div style={{ opacity: 0.8 }}>No badges yet — pass a world to earn one.</div>
        ) : (
          <Row>
            {badges.map((b) => (
              <Pill key={b}>🏅 {b}</Pill>
            ))}
          </Row>
        )}
      </Card>

      <div style={{ height: 14 }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {careers.map((c) => {
          const complete = badges.includes(c.id);
          return (
            <Card key={c.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>{c.icon} {c.title}</div>
                  <div style={{ marginTop: 6, opacity: 0.75, lineHeight: 1.5 }}>{c.tagline}</div>
                </div>
                {complete && <Pill>✅ Complete</Pill>}
              </div>

              <div style={{ height: 12 }} />

              <TextLink href={`/careers/${c.id}`}>Enter World →</TextLink>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
