import type { WorldId } from "./worlds";

export type BadgeId = WorldId;

const BADGES_KEY = "careerQuest.badges.v3";
const STATS_KEY = "careerQuest.stats.v1";

export type Stats = {
  attempts: number;
  wins: number;
};

export function getBadges(): BadgeId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BADGES_KEY);
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
  const current = new Set(getBadges());
  current.add(id);
  window.localStorage.setItem(BADGES_KEY, JSON.stringify(Array.from(current)));
}

export function clearBadges() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(BADGES_KEY);
}

export function getStats(): Stats {
  if (typeof window === "undefined") return { attempts: 0, wins: 0 };
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return { attempts: 0, wins: 0 };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { attempts: 0, wins: 0 };
    return {
      attempts: Number(parsed.attempts || 0),
      wins: Number(parsed.wins || 0),
    };
  } catch {
    return { attempts: 0, wins: 0 };
  }
}

export function addAttempt() {
  if (typeof window === "undefined") return;
  const s = getStats();
  const next = { attempts: s.attempts + 1, wins: s.wins };
  window.localStorage.setItem(STATS_KEY, JSON.stringify(next));
}

export function addWin() {
  if (typeof window === "undefined") return;
  const s = getStats();
  const next = { attempts: s.attempts, wins: s.wins + 1 };
  window.localStorage.setItem(STATS_KEY, JSON.stringify(next));
}

export function resetStats() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STATS_KEY);
}
