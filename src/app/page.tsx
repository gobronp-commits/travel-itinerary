import Link from "next/link";
import { getTrip, getCities, formatDate } from "@/lib/trip";
import RouteMap from "@/components/RouteMap";
import CitySection from "@/components/CitySection";

export default function Home() {
  const trip = getTrip();
  const cities = getCities();

  return (
    <div>
      <h1 className="font-heading text-3xl uppercase tracking-wide mb-1">{trip.name}</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
      </p>

      {trip.notes && (
        <p className="text-xs text-black/50 dark:text-white/50 mb-8 rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-2">
          {trip.notes}
        </p>
      )}

      <div className="mb-14">
        <RouteMap />
      </div>

      {cities.map((city) => (
        <CitySection key={city.id} city={city} />
      ))}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/itinerary"
          className="inline-block text-sm border border-[var(--accent)] text-[var(--accent)] rounded-md px-4 py-2 hover:bg-[var(--accent)] hover:text-white transition-colors font-medium"
        >
          Full day-by-day itinerary →
        </Link>
        <Link
          href="/lodging"
          className="inline-block text-sm border border-black/15 dark:border-white/20 rounded-md px-4 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-medium"
        >
          Lodging & transport details →
        </Link>
      </div>
    </div>
  );
}
