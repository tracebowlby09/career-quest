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
  correctSequence: string[]; // array of step ids
  passText: string;
  failText: string;
};

export type Simulator = SimulatorMCQ | SimulatorSequence;

export type World = {
  id: WorldId;
  title: string;
  icon: string;
  curriculum: string[];
  questions: Question[]; // must be passed to unlock simulator
  simulator: Simulator;
};

export const WORLDS: Record<WorldId, World> = {
  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    curriculum: [
      "Safety first: power off before touching wiring.",
      "Basic wire roles: hot delivers power, neutral returns, ground is safety.",
      "Common outage causes: tripped breaker, loose connection, failed switch/outlet."
    ],
    questions: [
      {
        id: "e1",
        difficulty: "easy",
        prompt: "What is the FIRST safety step before working on a circuit?",
        options: [
          { id: "a", label: "Turn off power at the breaker" },
          { id: "b", label: "Touch wires to see if they’re warm" },
          { id: "c", label: "Replace the light bulb" },
          { id: "d", label: "Wrap wires with tape" }
        ],
        correctOptionId: "a",
        explanation: "Always de-energize the circuit first to avoid shock."
      },
      {
        id: "e2",
        difficulty: "medium",
        prompt: "Which wire is primarily a safety path to prevent shock?",
        options: [
          { id: "a", label: "Hot" },
          { id: "b", label: "Neutral" },
          { id: "c", label: "Ground" },
          { id: "d", label: "Load" }
        ],
        correctOptionId: "c",
        explanation: "Ground provides a safe path for fault current."
      },
      {
        id: "e3",
        difficulty: "hard",
        prompt: "A room has no power. What is the BEST first check?",
        options: [
          { id: "a", label: "Replace all outlets" },
          { id: "b", label: "Check if a breaker is tripped" },
          { id: "c", label: "Cut the hot wire" },
          { id: "d", label: "Ignore it—it will return" }
        ],
        correctOptionId: "b",
        explanation: "Tripped breakers are a common and quick-to-check cause."
      }
    ],
    simulator: {
      type: "sequence",
      prompt: "Simulator: Put the steps in the safest order to troubleshoot a dead room.",
      steps: [
        { id: "s1", label: "Turn off the breaker for the circuit" },
        { id: "s2", label: "Verify the circuit is off (tester)" },
        { id: "s3", label: "Inspect for loose connections / damage" },
        { id: "s4", label: "Restore power and re-test the room" }
      ],
      correctSequence: ["s1", "s2", "s3", "s4"],
      passText: "Pass! You followed a safe troubleshooting sequence.",
      failText: "Fail. Safety order matters—try again."
    }
  },

  programmer: {
    id: "programmer",
    title: "Computer Programmer",
    icon: "💻",
    curriculum: [
      "Debugging: reproduce the problem, isolate the cause, apply a fix.",
      "Syntax matters: missing quotes/brackets can break builds.",
      "Logic matters: check conditions and edge cases."
    ],
    questions: [
      {
        id: "p1",
        difficulty: "easy",
        prompt: "Which is a common syntax error?",
        options: [
          { id: "a", label: "Missing a closing bracket }" },
          { id: "b", label: "Writing comments" },
          { id: "c", label: "Using variables" },
          { id: "d", label: "Naming a function" }
        ],
        correctOptionId: "a",
        explanation: "Unclosed brackets/parentheses are frequent syntax issues."
      },
      {
        id: "p2",
        difficulty: "medium",
        prompt: "What is the BEST first step when fixing a bug?",
        options: [
          { id: "a", label: "Guess and change random lines" },
          { id: "b", label: "Reproduce the bug consistently" },
          { id: "c", label: "Delete the file" },
          { id: "d", label: "Push to production immediately" }
        ],
        correctOptionId: "b",
        explanation: "Reproducing reliably lets you verify the fix."
      },
      {
        id: "p3",
        difficulty: "hard",
        prompt: "A feature fails only sometimes. What helps MOST?",
        options: [
          { id: "a", label: "Add logging / check inputs" },
          { id: "b", label: "Restart computer forever" },
          { id: "c", label: "Ignore the report" },
          { id: "d", label: "Remove TypeScript" }
        ],
        correctOptionId: "a",
        explanation: "Logs and inputs reveal conditions that trigger intermittent bugs."
      }
    ],
    simulator: {
      type: "mcq",
      prompt: "Simulator: The UI button label must be 'Start'. What should the label be?",
      options: [
        { id: "a", label: "Begin" },
        { id: "b", label: "START" },
        { id: "c", label: "Start" },
        { id: "d", label: "Go" }
      ],
      correctOptionId: "c",
      passText: "Pass! You shipped the correct UI label.",
      failText: "Fail. Exact label matters for UX consistency."
    }
  },

  nurse: {
    id: "nurse",
    title: "Nursing",
    icon: "🩺",
    curriculum: [
      "Prioritize patient safety (airway/breathing/circulation).",
      "Ask clear questions and gather symptoms.",
      "Choose the right basic checks: temperature, pulse, breathing."
    ],
    questions: [
      {
        id: "n1",
        difficulty: "easy",
        prompt: "A patient is struggling to breathe. What is the priority?",
        options: [
          { id: "a", label: "Airway and breathing" },
          { id: "b", label: "Ask about their favorite food" },
          { id: "c", label: "Schedule a follow-up next month" },
          { id: "d", label: "Ignore it" }
        ],
        correctOptionId: "a",
        explanation: "Breathing issues are urgent—prioritize airway/breathing."
      },
      {
        id: "n2",
        difficulty: "medium",
        prompt: "Which tool best checks body temperature?",
        options: [
          { id: "a", label: "Stethoscope" },
          { id: "b", label: "Thermometer" },
          { id: "c", label: "Flashlight" },
          { id: "d", label: "Bandage" }
        ],
        correctOptionId: "b",
        explanation: "Thermometers measure temperature."
      },
      {
        id: "n3",
        difficulty: "hard",
        prompt: "What is the safest first action with a dizzy patient?",
        options: [
          { id: "a", label: "Have them stand up quickly" },
          { id: "b", label: "Assess vitals and help them sit/lie safely" },
          { id: "c", label: "Give them candy immediately" },
          { id: "d", label: "Send them home instantly" }
        ],
        correctOptionId: "b",
        explanation: "Prevent falls and assess vitals before decisions."
      }
    ],
    simulator: {
      type: "mcq",
      prompt: "Simulator: A patient has a fever and sore throat. What is a good next step?",
      options: [
        { id: "a", label: "Ask symptoms and check temperature" },
        { id: "b", label: "Ignore symptoms" },
        { id: "c", label: "Tell them to run a marathon" },
        { id: "d", label: "Do nothing" }
      ],
      correctOptionId: "a",
      passText: "Pass! You gathered info and used the right check.",
      failText: "Fail. You need to assess symptoms and vitals first."
    }
  }
};

export function worldIds(): WorldId[] {
  return Object.keys(WORLDS) as WorldId[];
}

export function getWorld(id: string) {
  return (WORLDS as Record<string, World | undefined>)[id];
}
