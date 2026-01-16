export type WorldId = "electrician" | "programmer" | "nurse";

export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  difficulty: Difficulty;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
};

export type SimulatorMCQ = {
  type: "mcq";
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  passText: string;
  failText: string;
};

export type SimulatorSequence = {
  type: "sequence";
  prompt: string;
  steps: { id: string; label: string }[];
  correctSequence: string[]; // step ids in correct order
  passText: string;
  failText: string;
};

export type Simulator = SimulatorMCQ | SimulatorSequence;

export type World = {
  id: WorldId;
  title: string;
  icon: string;
  curriculum: string[];
  questions: Question[];
  simulator: Simulator;
};

export const WORLDS: Record<WorldId, World> = {
  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    curriculum: [
      "Safety first: turn power off at the breaker before touching wiring.",
      "Basic wire roles: hot delivers power, neutral returns, ground is the safety path.",
      "Common outage causes: a tripped breaker, a loose connection, or a failed switch/outlet.",
    ],
    questions: [
      {
        id: "e1",
        difficulty: "easy",
        prompt: "What is the FIRST safety step before working on electrical wiring?",
        options: [
          { id: "a", label: "Put on headphones to focus" },
          { id: "b", label: "Turn off power at the breaker" },
          { id: "c", label: "Touch the wire to see if it sparks" },
          { id: "d", label: "Replace the outlet immediately" },
        ],
        correctOptionId: "b",
        explanation:
          "Always shut off power at the breaker first. Then verify it’s off using a tester.",
      },
      {
        id: "e2",
        difficulty: "medium",
        prompt: "Which wire provides the safety path for electricity during a fault?",
        options: [
          { id: "a", label: "Hot" },
          { id: "b", label: "Neutral" },
          { id: "c", label: "Ground" },
          { id: "d", label: "Extension cord" },
        ],
        correctOptionId: "c",
        explanation:
          "Ground is the safety path that helps protect people and equipment if something goes wrong.",
      },
      {
        id: "e3",
        difficulty: "hard",
        prompt:
          "A single room is dead (no lights/outlets). What is the BEST first thing to check?",
        options: [
          { id: "a", label: "Replace every outlet in the room" },
          { id: "b", label: "Check the breaker for a trip" },
          { id: "c", label: "Paint the wall a new color" },
          { id: "d", label: "Buy a new lamp" },
        ],
        correctOptionId: "b",
        explanation:
          "A tripped breaker is one of the most common causes of a dead room—check it first before deeper troubleshooting.",
      },
    ],
    simulator: {
      type: "sequence",
      prompt: "Choose the safest order to troubleshoot a dead room.",
      steps: [
        { id: "s1", label: "Turn off breaker" },
        { id: "s2", label: "Verify off with tester" },
        { id: "s3", label: "Inspect for loose connections/damage" },
        { id: "s4", label: "Restore power and re-test" },
      ],
      correctSequence: ["s1", "s2", "s3", "s4"],
      passText:
        "Nice work. You followed a safe troubleshooting flow: power off, verify, inspect, then restore and test.",
      failText:
        "Not quite. For safety, you should: turn off the breaker, verify it’s off, inspect, then restore power and re-test.",
    },
  },

  programmer: {
    id: "programmer",
    title: "Computer Programmer",
    icon: "💻",
    curriculum: [
      "Debugging basics: reproduce the issue, isolate the cause, then fix and verify.",
      "Syntax matters: missing quotes/brackets can break builds instantly.",
      "Logic matters too: conditions, edge cases, and assumptions can cause bugs.",
    ],
    questions: [
      {
        id: "p1",
        difficulty: "easy",
        prompt: "Which is a common syntax error that can break a build?",
        options: [
          { id: "a", label: "Choosing a fun variable name" },
          { id: "b", label: "Using comments in code" },
          { id: "c", label: "Missing closing bracket" },
          { id: "d", label: "Restarting your computer" },
        ],
        correctOptionId: "c",
        explanation:
          "A missing closing bracket/brace/parenthesis is a classic syntax error that can prevent code from compiling.",
      },
      {
        id: "p2",
        difficulty: "medium",
        prompt: "What is the best FIRST step when fixing a bug?",
        options: [
          { id: "a", label: "Rewrite the entire project" },
          { id: "b", label: "Reproduce the bug consistently" },
          { id: "c", label: "Delete the feature" },
          { id: "d", label: "Only test on one device forever" },
        ],
        correctOptionId: "b",
        explanation:
          "If you can reproduce it reliably, you can test changes and confirm you actually fixed the real issue.",
      },
      {
        id: "p3",
        difficulty: "hard",
        prompt:
          "An error happens only sometimes (intermittent). What helps most to diagnose it?",
        options: [
          { id: "a", label: "Ignore it until users complain louder" },
          { id: "b", label: "Add logging and check inputs/edge cases" },
          { id: "c", label: "Rename every file randomly" },
          { id: "d", label: "Turn off the monitor" },
        ],
        correctOptionId: "b",
        explanation:
          "Intermittent issues often depend on state or inputs—logging and input checks help you see what changes when it fails.",
      },
    ],
    simulator: {
      type: "mcq",
      prompt:
        'A button label must match the spec exactly. The UI label must be “Start”. Which option is correct?',
      options: [
        { id: "a", label: "Begin" },
        { id: "b", label: "Launch" },
        { id: "c", label: "Start" },
        { id: "d", label: "Go!" },
      ],
      correctOptionId: "c",
      passText:
        "Correct. Matching exact UI copy prevents confusion and avoids failing requirements checks.",
      failText:
        'Not quite. The spec is strict here—the button text must be exactly “Start”.',
    },
  },

  nurse: {
    id: "nurse",
    title: "Nursing",
    icon: "🩺",
    curriculum: [
      "Prioritize safety using ABCs: airway, breathing, circulation.",
      "Ask clear questions and gather symptoms before acting.",
      "Use basic checks: temperature, pulse, and breathing rate.",
    ],
    questions: [
      {
        id: "n1",
        difficulty: "easy",
        prompt:
          "If a patient is struggling to breathe, what is the top priority?",
        options: [
          { id: "a", label: "Ask about their favorite foods" },
          { id: "b", label: "Airway and breathing" },
          { id: "c", label: "Schedule a follow-up next month" },
          { id: "d", label: "Discuss their weekend plans" },
        ],
        correctOptionId: "b",
        explanation:
          "ABCs come first. If breathing is compromised, address airway/breathing immediately.",
      },
      {
        id: "n2",
        difficulty: "medium",
        prompt: "What is the best tool for measuring a patient’s temperature?",
        options: [
          { id: "a", label: "Thermometer" },
          { id: "b", label: "Flashlight" },
          { id: "c", label: "Stethoscope (only)" },
          { id: "d", label: "Ruler" },
        ],
        correctOptionId: "a",
        explanation:
          "A thermometer is designed to measure temperature accurately.",
      },
      {
        id: "n3",
        difficulty: "hard",
        prompt:
          "A patient says they feel dizzy and unsteady. What is the safest FIRST action?",
        options: [
          { id: "a", label: "Tell them to stand up quickly" },
          { id: "b", label: "Assess vitals and help them sit/lie down safely" },
          { id: "c", label: "Ask them to walk across the room immediately" },
          { id: "d", label: "Ignore it if they look fine" },
        ],
        correctOptionId: "b",
        explanation:
          "Prevent falls first and assess vitals to understand what’s happening before further steps.",
      },
    ],
    simulator: {
      type: "mcq",
      prompt: "A patient reports fever + sore throat. What’s a good next step?",
      options: [
        { id: "a", label: "Tell them to run a marathon" },
        { id: "b", label: "Ask symptoms + check temperature" },
        { id: "c", label: "Skip questions and guess the diagnosis" },
        { id: "d", label: "Only check blood pressure and send them home" },
      ],
      correctOptionId: "b",
      passText:
        "Good choice. Gather symptoms and measure temperature to guide safe next steps.",
      failText:
        "Try again. A safe next step is to ask clear symptom questions and check temperature.",
    },
  },
};

export function worldIds(): WorldId[] {
  return Object.keys(WORLDS) as WorldId[];
}

export function getWorld(id: string) {
  return (WORLDS as Record<string, World | undefined>)[id];
}