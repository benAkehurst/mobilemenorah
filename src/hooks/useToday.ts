"use client";

import { useSyncExternalStore } from "react";
import { localToday, type IsoDate } from "@/lib/hanukkah";

function subscribe(onChange: () => void) {
  // Re-check the date when the tab becomes visible again (e.g. the next evening).
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/**
 * The visitor's local calendar date. Returns `null` during server rendering
 * and hydration, so date-dependent UI never causes a hydration mismatch.
 */
export function useToday(): IsoDate | null {
  return useSyncExternalStore(subscribe, () => localToday(), () => null);
}
