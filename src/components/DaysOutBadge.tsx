"use client";

import { useSyncExternalStore } from "react";
import { daysUntil } from "@/lib/trip";

function subscribe() {
  return () => {};
}

function labelFor(startDate: string): string {
  const days = daysUntil(startDate);
  if (days > 1) return `${days} DAYS OUT`;
  if (days === 1) return "1 DAY OUT";
  if (days === 0) return "TODAY";
  return "UNDERWAY";
}

export default function DaysOutBadge({ startDate }: { startDate: string }) {
  const label = useSyncExternalStore(
    subscribe,
    () => labelFor(startDate),
    () => null
  );

  if (!label) return null;

  return (
    <span className="inline-block bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5">
      {label}
    </span>
  );
}
