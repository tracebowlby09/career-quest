import { Card, CardTitle, Container, Header, TextLink, Pill } from "../components/ui";

export default function Page() {
  return (
    <Container>
      <Header
        title="How to Play"
        subtitle="Each world is a short learning loop that ends in a simulator."
        right={<TextLink href="/careers">← Career Hub</TextLink>}
      />

      <Card>
        <CardTitle>Flow</CardTitle>
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, opacity: 0.88 }}>
          <li><b>Curriculum</b> — learn the basics for that career.</li>
          <li><b>Questions</b> — quick checks for understanding.</li>
          <li><b>Simulator</b> — one short “real-life” decision.</li>
          <li><b>Pass / Fail</b> — pass earns a badge. Fail lets you retry.</li>
        </ol>

        <div style={{ height: 14 }} />

        <CardTitle>Controls</CardTitle>
        <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
          Keyboard-friendly: <Pill>Tab</Pill> to move, <Pill>Enter</Pill> to activate buttons/links.
        </div>
      </Card>
    </Container>
  );
}
