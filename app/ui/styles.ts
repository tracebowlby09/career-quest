export const page = {
  minHeight: "100vh",
  padding: 24,
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(180deg, #0b1220 0%, #0a0f1a 100%)",
  color: "#eef2ff",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
} as const;

export const shell = {
  width: "100%",
  maxWidth: 980,
} as const;

export const topbar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 16,
} as const;

export const card = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  backdropFilter: "blur(8px)",
} as const;

export const h1 = { fontSize: 44, margin: 0, letterSpacing: -0.5 } as const;
export const h2 = { fontSize: 18, margin: 0, opacity: 0.95 } as const;
export const p = { margin: 0, opacity: 0.88, lineHeight: 1.6 } as const;

export const btn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "#eef2ff",
  textDecoration: "none",
  fontWeight: 900,
  cursor: "pointer",
  userSelect: "none",
} as const;

export const btnPrimary = {
  ...btn,
  background: "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.8))",
  border: "1px solid rgba(255,255,255,0.22)",
} as const;

export const tag = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.06)",
  fontWeight: 800,
  fontSize: 12,
  opacity: 0.95,
} as const;

export const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  gap: 12,
} as const;

export const col6 = { gridColumn: "span 6" } as const;
export const col12 = { gridColumn: "span 12" } as const;

export const input = {
  width: "100%",
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(0,0,0,0.25)",
  color: "#eef2ff",
  outline: "none",
} as const;
