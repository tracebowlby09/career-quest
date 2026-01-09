export type BadgeId = "software-developer" | "nurse" | "electrician";

const KEY = "careerQuest.badges.v1";

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

export function hasBadge(id: BadgeId): boolean {
  return getBadges().includes(id);
}

export function addBadge(id: BadgeId) {
  if (typeof window === "undefined") return;
  const current = new Set(getBadges());
  current.add(id);
  window.localStorage.setItem(KEY, JSON.stringify(Array.from(current)));
}

export function clearBadges() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
