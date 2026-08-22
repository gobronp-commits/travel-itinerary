import Link from "next/link";
import { getDays, formatDate } from "@/lib/trip";

export default function ItineraryPage() {
  const days = getDays();

  return (
    <div>
      <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-1">
        Itinerary
      </h1>
      <p className="text-sm text-[var(--ink)]/60 mb-6">
        Day-by-day schedule for the trip.
      </p>

      <div className="space-y-3">
        {days.map((day) => (
          <Link
            key={day.date}
            href={`/itinerary/${day.date}`}
            className="block border border-[var(--ink)]/15 p-4 hover:border-[var(--accent)] transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  {day.title}
                </div>
                <div className="text-xs text-[var(--ink)]/50 mt-0.5">
                  {formatDate(day.date)}
                </div>
              </div>
              <div className="text-xs text-[var(--ink)]/40">
                {day.items.length} item{day.items.length === 1 ? "" : "s"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
