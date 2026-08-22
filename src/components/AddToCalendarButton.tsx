"use client";

import type { Trip, ItineraryDay } from "@/lib/trip";
import { buildTripICS, downloadICS } from "@/lib/ics";

export default function AddToCalendarButton({
  trip,
  days,
}: {
  trip: Trip;
  days: ItineraryDay[];
}) {
  function handleClick() {
    const ics = buildTripICS(trip, days);
    downloadICS(`${trip.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`, ics);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full border-2 border-[var(--ink)] text-[var(--ink)] text-sm font-bold uppercase tracking-wider py-3 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
    >
      Save to my calendar
    </button>
  );
}
