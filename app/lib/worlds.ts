export type WorldId = "software-developer" | "nurse" | "electrician";

export type Question =
  | { id: string; type: "mcq"; prompt: string; options: { id: string; label: string }[]; answerId: string; explain: string }
  | { id: string; type: "tf"; prompt: string; answer: boolean; explain: string }
  | { id: string; type: "short"; prompt: string; answer: string; explain: string };

export type SimulatorStep = { id: string; label: string };

export type World = {
  id: WorldId;
  title: string;
  icon: string;

  curriculum: {
    summary: string;
    keyPoints: string[];
    miniExample: string;
  };

  quiz: {
    passPercent: number; // e.g. 70 means need >=70%
    questions: Question[];
  };

  simulator: {
    prompt: string;
    type: "sequence" | "mcq";
    steps?: SimulatorStep[];
    correctSequence?: string[];
    options?: { id: string; label: string }[];
    correctOptionId?: string;
    passText: string;
    failText: string;
  };
};

export const WORLDS: Record<WorldId, World> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    curriculum: {
      summary:
        "You’ll learn how to read a bug report, identify the likely cause, and pick the safest fix before shipping.",
      keyPoints: [
        "Reproduce the bug first (what steps cause it?)",
        "Read error messages carefully—they usually point to the cause",
        "Make the smallest safe fix, then test again",
      ],
      miniExample:
        "Example: If a button crashes only when the input is empty, add a guard/check before using the value.",
    },
    quiz: {
      passPercent: 70,
      questions: [
        {
          id: "sd1",
          type: "mcq",
          prompt: "What is the BEST first step when you get a bug report?",
          options: [
            { id: "a", label: "Rewrite the feature from scratch" },
            { id: "b", label: "Reproduce the bug using the reported steps" },
            { id: "c", label: "Guess the fix and deploy immediately" },
          ],
          answerId: "b",
          explain: "Reproducing confirms the bug is real and helps you narrow down the cause.",
        },
        {
          id: "sd2",
          type: "tf",
          prompt: "True/False: Error messages are usually useless and should be ignored.",
          answer: false,
          explain: "Error messages often point directly to what failed and where.",
        },
        {
          id: "sd3",
          type: "short",
          prompt: "Fill in the blank: Make the _____ safe fix, then test again.",
          answer: "smallest",
          explain: "Smaller fixes reduce risk and make it easier to verify what changed.",
        },
        {
          id: "sd4",
          type: "mcq",
          prompt: "A bug happens only when a value is missing. What’s a safe fix?",
          options: [
            { id: "a", label: "Add a check/guard for missing values" },
            { id: "b", label: "Delete the whole form" },
            { id: "c", label: "Change random CSS" },
          ],
          answerId: "a",
          explain: "Input validation/guards prevent crashes when values are empty or undefined.",
        },
      ],
    },
    simulator: {
      prompt: "Order the steps for a safe bug-fix workflow:",
      type: "sequence",
      steps: [
        { id: "repro", label: "Reproduce the bug" },
        { id: "fix", label: "Make a small safe fix" },
        { id: "test", label: "Test again and confirm it’s solved" },
      ],
      correctSequence: ["repro", "fix", "test"],
      passText: "You followed a safe workflow and shipped the fix.",
      failText: "Try again—safe fixes start with reproducing, then fix, then test.",
    },
  },

  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    curriculum: {
      summary:
        "You’ll practice prioritizing patients, communicating clearly, and choosing the safest first action.",
      keyPoints: [
        "Airway/Breathing/Circulation (ABC) is priority",
        "Assess before acting—get key information fast",
        "Communicate calmly and clearly (what, who, when)",
      ],
      miniExample:
        "Example: Shortness of breath is more urgent than a minor cut because it can be life-threatening.",
    },
    quiz: {
      passPercent: 70,
      questions: [
        {
          id: "n1",
          type: "mcq",
          prompt: "Which patient should be prioritized first?",
          options: [
            { id: "a", label: "Stable patient with a small cut" },
            { id: "b", label: "Patient with trouble breathing" },
            { id: "c", label: "Patient asking for water" },
          ],
          answerId: "b",
          explain: "Breathing issues can become life-threatening quickly.",
        },
        {
          id: "n2",
          type: "tf",
          prompt: "True/False: Clear communication helps prevent mistakes.",
          answer: true,
          explain: "Clear communication reduces confusion and improves safety.",
        },
        {
          id: "n3",
          type: "short",
          prompt: "Fill in the blank: ABC stands for Airway, _____, Circulation.",
          answer: "breathing",
          explain: "ABC prioritizes life-threatening problems first.",
        },
        {
          id: "n4",
          type: "mcq",
          prompt: "What is a safe first step when a patient is short of breath?",
          options: [
            { id: "a", label: "Ignore and do paperwork" },
            { id: "b", label: "Assess breathing and vital signs" },
            { id: "c", label: "Tell them to wait quietly" },
          ],
          answerId: "b",
          explain: "Assessment identifies how urgent the situation is and guides next steps.",
        },
      ],
    },
    simulator: {
      prompt: "Choose the best first action in this scenario:",
      type: "mcq",
      options: [
        { id: "assess", label: "Assess breathing and call for help if worsening" },
        { id: "paper", label: "Finish paperwork first" },
        { id: "wait", label: "Wait for someone else to handle it" },
      ],
      correctOptionId: "assess",
      passText: "You chose a safe first action and prioritized correctly.",
      failText: "Try again—safe care starts with assessment and prioritizing risk.",
    },
  },

  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    curriculum: {
      summary:
        "You’ll learn basic electrical safety: cut power, verify it’s off, then inspect and troubleshoot.",
      keyPoints: [
        "Power off FIRST (breaker) before touching wiring",
        "Verify the circuit is de-energized (test)",
        "Only then inspect connections for damage/loose wires",
      ],
      miniExample:
        "Example: If lights flicker, it can be a loose connection—still shut off power before inspection.",
    },
    quiz: {
      passPercent: 70,
      questions: [
        {
          id: "e1",
          type: "mcq",
          prompt: "What’s the FIRST step before working on a circuit?",
          options: [
            { id: "a", label: "Touch the wires to see what’s wrong" },
            { id: "b", label: "Turn off power at the breaker" },
            { id: "c", label: "Wiggle the light switch repeatedly" },
          ],
          answerId: "b",
          explain: "Safety first: remove power before inspection or repair.",
        },
        {
          id: "e2",
          type: "tf",
          prompt: "True/False: You should verify power is off before touching wiring.",
          answer: true,
          explain: "Breakers can be mislabeled; always test to confirm de-energized.",
        },
        {
          id: "e3",
          type: "short",
          prompt: "Fill in the blank: Turn off power, _____ it’s off, then inspect.",
          answer: "verify",
          explain: "Verification prevents dangerous mistakes.",
        },
        {
          id: "e4",
          type: "mcq",
          prompt: "Flickering lights can be caused by:",
          options: [
            { id: "a", label: "Loose connection" },
            { id: "b", label: "Too many pillows" },
            { id: "c", label: "A louder TV volume" },
          ],
          answerId: "a",
          explain: "Loose connections can cause intermittent power and flickering.",
        },
      ],
    },
    simulator: {
      prompt: "Put these steps in the safest order:",
      type: "sequence",
      steps: [
        { id: "breaker", label: "Turn off power at the breaker" },
        { id: "test", label: "Verify the circuit is de-energized (test)" },
        { id: "inspect", label: "Inspect wiring/fixture connections" },
      ],
      correctSequence: ["breaker", "test", "inspect"],
      passText: "Correct—safe procedure followed.",
      failText: "Try again—power off, verify, then inspect.",
    },
  },
};

export function worldIds(): WorldId[] {
  return Object.keys(WORLDS) as WorldId[];
}
