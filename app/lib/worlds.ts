export type WorldId = "software-developer" | "nurse" | "electrician";

export type MCQSimulator = {
  type: "mcq";
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
};

export type SequenceSimulator = {
  type: "sequence";
  prompt: string;
  steps: { id: string; label: string }[];
  correctSequence: string[];
};

export type Simulator = MCQSimulator | SequenceSimulator;

export type World = {
  id: WorldId;
  title: string;
  icon: string;
  scenario: string;
  simulator: Simulator;
  passText: string;
  failText: string;
};

export const WORLDS: World[] = [
  {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario: "A release is in 30 minutes. The button label is wrong and users are confused. Pick the correct fix to ship safely.",
    simulator: {
      type: "mcq",
      prompt: "Which change is the best fix?",
      options: [
        { id: "a", label: "Hardcode a new label everywhere in the UI" },
        { id: "b", label: "Fix the label at the source and add a quick check/test" },
        { id: "c", label: "Ignore it and ship — it’s not a crash" },
      ],
      correctOptionId: "b",
    },
    passText: "Nice. You shipped the correct fix and prevented repeat bugs. Badge earned!",
    failText: "Not quite. Try the safest fix that prevents the issue from coming back.",
  },
  {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario: "Two patients need attention. You must prioritize safely and communicate clearly. Choose the best first action.",
    simulator: {
      type: "mcq",
      prompt: "What should you do first?",
      options: [
        { id: "a", label: "Ignore vitals and go by who complains loudest" },
        { id: "b", label: "Quickly assess ABCs / vitals and identify who is unstable" },
        { id: "c", label: "Wait for another nurse to tell you what to do" },
      ],
      correctOptionId: "b",
    },
    passText: "Good call. Safety first — you prioritized correctly and acted fast. Badge earned!",
    failText: "Try again. The safest first step is the one that finds who is unstable.",
  },
  {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario: "Lights are flickering in a room. You need to follow safety procedure before diagnosing.",
    simulator: {
      type: "sequence",
      prompt: "Put the steps in the safest order:",
      steps: [
        { id: "lockout", label: "Lockout/Tagout (or ensure power cannot be re-energized)" },
        { id: "poweroff", label: "Turn off breaker / disconnect power" },
        { id: "verify", label: "Verify power is off (test for voltage)" },
        { id: "inspect", label: "Inspect wiring/fixture for loose connection or damage" },
      ],
      correctSequence: ["poweroff", "lockout", "verify", "inspect"],
    },
    passText: "Perfect. You followed safety protocol and diagnosed responsibly. Badge earned!",
    failText: "Close — safety order matters. Power off, secure it, verify, then inspect.",
  },
];

export function getWorld(id: string | undefined) {
  if (!id) return undefined;
  return WORLDS.find((w) => w.id === id);
}
