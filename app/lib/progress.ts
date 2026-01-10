export type BadgeId = "software-developer" | "nurse" | "electrician";

const KEY = "careerQuest.badges.v2";

export function getBadges(): BadgeId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch {
    return [];
  }
}

export function addBadge(id: BadgeId) {
  if (typeof window === "undefined") return;
  const set = new Set(getBadges());
  set.add(id);
  window.localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
}

export function clearBadges() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
