import type { WorldId } from "./worlds";

export type BadgeId = WorldId;

const STORAGE_KEY = "careerQuest.badges.v1";

function safeParseBadges(raw: string | null): BadgeId[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is BadgeId => typeof x === "string") as BadgeId[];
  } catch {
    return [];
  }
}

function safeRead(): BadgeId[] {
  if (typeof window === "undefined") return [];
  try {
    return safeParseBadges(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

function safeWrite(badges: BadgeId[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(badges));
  } catch {
    // ignore write failures
  }
}

export function getBadges(): BadgeId[] {
  return safeRead();
}

export function hasBadge(id: BadgeId): boolean {
  const badges = safeRead();
  return badges.includes(id);
}

export function addBadge(id: BadgeId): void {
  const badges = safeRead();
  if (badges.includes(id)) return;
  safeWrite([...badges, id]);
}

export function clearBadges(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}