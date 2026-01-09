import { Card, Container, Header, Row, TextLink, Pill } from "./components/ui";

export default function Home() {
  return (
    <Container>
      <Header
        title="Career Quest"
        subtitle="Three career worlds. Learn → practice → simulate. Earn badges as you pass."
        right={<Pill>Regionals ready mode</Pill>}
      />

      <Card>
        <div style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.85 }}>
          Pick a world, read the curriculum, answer a few questions, then take a short simulator to pass or fail.
        </div>

        <div style={{ height: 14 }} />

        <Row>
          <TextLink href="/careers">▶ Start</TextLink>
          <TextLink href="/about">ℹ How to Play</TextLink>
        </Row>
      </Card>

      <div style={{ marginTop: 14, opacity: 0.7, fontSize: 13 }}>
        Tip: Badges save on this device (localStorage).
      </div>
    </Container>
  );
}
