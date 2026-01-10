import type { WorldId } from "./worlds";

const KEY = "careerQuest.badges.v2";

export function getBadges(): WorldId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as WorldId[];
  } catch {
    return [];
  }
}

export function addBadge(id: WorldId) {
  if (typeof window === "undefined") return;
  const current = new Set(getBadges());
  current.add(id);
  window.localStorage.setItem(KEY, JSON.stringify(Array.from(current)));
}

export function clearBadges() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
