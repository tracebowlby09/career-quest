"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addBadge } from "../../lib/progress";

type Outcome = "intro" | "success" | "retry";

const careerData: Record<
  string,
  {
    id: "software-developer" | "nurse" | "electrician";
    title: string;
    icon: string;
    scenario: string;
    challengePrompt: string;
    correctAnswer: string;
    successText: string;
    retryText: string;
  }
> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario:
      "A feature is failing right before release. You need to confirm the correct UI label and ship the fix.",
    challengePrompt: "Type the word: start",
    correctAnswer: "start",
    successText: "You shipped the fix. Badge unlocked!",
    retryText: "Close — debugging takes iteration. Try again.",
  },
  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario:
      "Two patients need attention. You must prioritize, assess symptoms, and communicate clearly.",
    challengePrompt: "Type the word: assess",
    correctAnswer: "assess",
    successText: "You made the safest call. Badge unlocked!",
    retryText: "Try again — focus on the safest first step.",
  },
  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario:
      "A room’s lights flicker. Diagnose the issue while following safety procedures.",
    challengePrompt: "Type the phrase: power off",
    correctAnswer: "power off",
    successText: "Safety first. Badge unlocked!",
    retryText: "Try again — always start with safety.",
  },
};

export default function CareerWorld({ params }: { params: { career: string } }) {
  const data = useMemo(() => careerData[params.career], [params.career]);
  const [outcome, setOutcome] = useState<Outcome>("intro");
  const [answer, setAnswer] = useState("");

  if (!data) {
    return (
      <div style={{ padding: "28px 0" }}>
        <div className="card">
          <div className="cardInner">
            <h1 className="h1" style={{ fontSize: 40 }}>Career not found</h1>
            <p className="p">That world doesn’t exist yet.</p>
            <div className="spacer" />
            <Link className="btn btnPrimary" href="/careers">Back to Career Hub</Link>
          </div>
        </div>
      </div>
    );
  }

  function submit() {
    const normalized = answer.trim().toLowerCase();
    const target = data.correctAnswer.trim().toLowerCase();
    const ok = normalized === target;
    setOutcome(ok ? "success" : "retry");
    if (ok) addBadge(data.id);
  }

  return (
    <div style={{ padding: "28px 0" }}>
      <div className="card">
        <div className="cardInner">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h1 className="h1" style={{ fontSize: 42, marginBottom: 0 }}>
              {data.icon} {data.title} World
            </h1>
            <Link className="btn" href="/careers">Career Hub</Link>
          </div>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <h2 className="h2">Scenario</h2>
              <p className="p">{data.scenario}</p>
            </div>
          </div>

          <div className="spacer" />

          <div className="card" style={{ background: "var(--panel2)" }}>
            <div className="cardInner">
              <h2 className="h2">Skill Challenge</h2>
              <p className="p" style={{ marginBottom: 12 }}>{data.challengePrompt}</p>

              <label style={{ display: "block", fontWeight: 900, marginBottom: 8 }} htmlFor="answer">
                Your answer
              </label>

              <input
                id="answer"
                className="input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type here…"
              />

              <div className="spacer" />

              <div className="row">
                <button className="btn btnPrimary" onClick={submit}>Submit</button>
                <button
                  className="btn"
                  onClick={() => {
                    setAnswer("");
                    setOutcome("intro");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {outcome !== "intro" && (
            <>
              <div className="spacer" />
              <div className="card" style={{ background: "var(--panel2)" }}>
                <div className="cardInner">
                  <h2 className="h2">
                    Outcome: {outcome === "success" ? "Success ✅" : "Try Again"}
                  </h2>
                  <p className="p">
                    {outcome === "success" ? data.successText : data.retryText}
                  </p>
                  {outcome === "success" && (
                    <p className="muted" style={{ marginTop: 12 }}>
                      Go back to the Career Hub to see your badge.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
