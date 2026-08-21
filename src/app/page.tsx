import Link from "next/link";
import { getTrip, getDays, getLodging, getTransport, formatDate } from "@/lib/trip";

export default function Home() {
  const trip = getTrip();
  const days = getDays();
  const lodging = getLodging();
  const transport = getTransport();

  return (
    <div>
      <h1 className="font-heading text-3xl uppercase tracking-wide mb-1">
        {trip.name}
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        {trip.destination} · {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
      </p>

      {trip.notes && (
        <p className="text-xs text-black/50 dark:text-white/50 mb-8 rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-2">
          {trip.notes}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="font-heading text-3xl text-[var(--accent)]">
            {days.length}
          </div>
          <div className="text-xs text-black/50 dark:text-white/50">Days planned</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="font-heading text-3xl text-[var(--accent)]">
            {lodging.length}
          </div>
          <div className="text-xs text-black/50 dark:text-white/50">Lodging stops</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="font-heading text-3xl text-[var(--accent)]">
            {transport.length}
          </div>
          <div className="text-xs text-black/50 dark:text-white/50">Transport legs</div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="text-sm font-semibold">
            {formatDate(trip.startDate)}
          </div>
          <div className="text-xs text-black/50 dark:text-white/50">Departure</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/itinerary"
          className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="font-heading text-sm uppercase tracking-wide text-[var(--accent)]">
            Itinerary
          </div>
          <div className="text-sm text-black/60 dark:text-white/60 mt-1">
            Day-by-day schedule
          </div>
        </Link>
        <Link
          href="/lodging"
          className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="font-heading text-sm uppercase tracking-wide text-[var(--accent)]">
            Lodging &amp; Transport
          </div>
          <div className="text-sm text-black/60 dark:text-white/60 mt-1">
            Flights, hotels, confirmations
          </div>
        </Link>
        <Link
          href="/map"
          className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="font-heading text-sm uppercase tracking-wide text-[var(--accent)]">
            Map
          </div>
          <div className="text-sm text-black/60 dark:text-white/60 mt-1">
            Places from the itinerary
          </div>
        </Link>
        <Link
          href="/packing"
          className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:border-[var(--accent)] transition-colors"
        >
          <div className="font-heading text-sm uppercase tracking-wide text-[var(--accent)]">
            Packing
          </div>
          <div className="text-sm text-black/60 dark:text-white/60 mt-1">
            Checklist
          </div>
        </Link>
      </div>

      <Link
        href="/ideas"
        className="inline-block mt-8 text-sm border border-[var(--accent)] text-[var(--accent)] rounded-md px-4 py-2 hover:bg-[var(--accent)] hover:text-white transition-colors font-medium"
      >
        Browse ideas / not yet planned →
      </Link>
    </div>
  );
}
