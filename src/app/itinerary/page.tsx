import Link from "next/link";
import { getDays, formatDate } from "@/lib/trip";

export default function ItineraryPage() {
  const days = getDays();

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase tracking-wide mb-1">
        Itinerary
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Day-by-day schedule for the trip.
      </p>

      <div className="space-y-3">
        {days.map((day) => (
          <Link
            key={day.date}
            href={`/itinerary/${day.date}`}
            className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-[var(--accent)] transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="font-heading text-sm uppercase tracking-wide text-[var(--accent)]">
                  {day.title}
                </div>
                <div className="text-xs text-black/50 dark:text-white/50 mt-0.5">
                  {formatDate(day.date)}
                </div>
              </div>
              <div className="text-xs text-black/40 dark:text-white/40">
                {day.items.length} item{day.items.length === 1 ? "" : "s"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
