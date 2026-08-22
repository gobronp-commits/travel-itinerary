import Link from "next/link";
import { getDays, getCities, formatDate } from "@/lib/trip";
import CitySection from "@/components/CitySection";
import RealMap from "@/components/RealMapClient";

export default function ItineraryPage() {
  const days = getDays();
  const cities = getCities();

  return (
    <div>
      <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-1">
        The Whole Plan
      </h1>
      <p className="text-sm text-[var(--ink)]/60 mb-6">
        Madrid, San Sebastián &amp; Bilbao — Aug 29 to Sep 6.
      </p>

      <div className="mb-14">
        <RealMap />
      </div>

      {cities.map((city) => (
        <CitySection key={city.id} city={city} />
      ))}

      <h2 className="font-heading font-black text-2xl uppercase tracking-tight mb-1">
        Day by Day
      </h2>
      <p className="text-sm text-[var(--ink)]/60 mb-6">Full schedule, one day at a time.</p>

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
