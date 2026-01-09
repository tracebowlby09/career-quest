export type WorldId = "software-developer" | "nurse" | "electrician";

export type World =
  | {
      id: WorldId;
      title: string;
      icon: string;
      scenario: string;
      type: "mcq";
      prompt: string;
      options: { id: string; label: string }[];
      correctOptionId: string;
      success: string;
      retry: string;
    }
  | {
      id: WorldId;
      title: string;
      icon: string;
      scenario: string;
      type: "sequence";
      prompt: string;
      options: { id: string; label: string }[];
      correctSequence: string[]; // array of option ids in correct order
      success: string;
      retry: string;
    };

export const WORLDS: Record<WorldId, World> = {
  "software-developer": {
    id: "software-developer",
    title: "Software Developer",
    icon: "💻",
    scenario:
      "Right before launch, the Start button does nothing. You inspect the click handler and need to choose the correct fix.",
    type: "mcq",
    prompt: "Which line correctly navigates to the Career Hub when the Start button is clicked?",
    options: [
      { id: "a", label: 'router.push("/careers")' },
      { id: "b", label: 'router.route("/careers")' },
      { id: "c", label: 'router.go("/careers")' },
      { id: "d", label: 'window.open("/careers")' },
    ],
    correctOptionId: "a",
    success: "Nice. You shipped a clean fix and the button works. Badge earned!",
    retry: "Not quite. Think: what is the standard Next.js router navigation call?",
  },

  nurse: {
    id: "nurse",
    title: "Nurse",
    icon: "🩺",
    scenario:
      "Three patients arrive at once. You must triage who gets attention first based on risk to life.",
    type: "mcq",
    prompt: "Who should be seen FIRST?",
    options: [
      { id: "a", label: "Patient with a mild headache and stable vitals" },
      { id: "b", label: "Patient with shortness of breath and low oxygen (SpO₂ 86%)" },
      { id: "c", label: "Patient with a sprained ankle, pain 6/10" },
      { id: "d", label: "Patient asking for a refill, no symptoms" },
    ],
    correctOptionId: "b",
    success: "Correct. Airway/breathing problems come first. Badge earned!",
    retry: "Try again. Prioritize life-threatening airway/breathing/circulation issues.",
  },

  electrician: {
    id: "electrician",
    title: "Electrician",
    icon: "⚡",
    scenario:
      "A homeowner reports flickering lights. Before you diagnose, you must follow safe procedure.",
    type: "sequence",
    prompt: "Put the FIRST THREE safety steps in the correct order:",
    options: [
      { id: "a", label: "Turn off power at the breaker" },
      { id: "b", label: "Verify power is off with a tester" },
      { id: "c", label: "Put on PPE (gloves/eye protection)" },
      { id: "d", label: "Start replacing parts immediately" },
    ],
    correctSequence: ["c", "a", "b"],
    success: "Perfect. PPE → power off → verify. Badge earned!",
    retry: "Not quite. Safety is about PPE, de-energizing, and verifying before touching anything.",
  },
};
