import Link from "next/link";
import {
  getTrip,
  getCities,
  getLodgingById,
  getDays,
  formatDateShort,
  nightsBetween,
} from "@/lib/trip";
import { getPhoto } from "@/lib/photos";
import Photo from "@/components/Photo";
import DaysOutBadge from "@/components/DaysOutBadge";
import AddToCalendarButton from "@/components/AddToCalendarButton";

export default function Home() {
  const trip = getTrip();
  const cities = getCities();
  const days = getDays();
  const heroPhoto = getPhoto("sanSebastian");

  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-md border-2 border-[var(--ink)]">
        <div className="bg-[var(--ink)] text-[var(--paper)] p-4 sm:p-6">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[var(--paper)]/70 mb-6">
            <span>{trip.travelers}</span>
            <span>
              {formatDateShort(trip.startDate)} — {formatDateShort(trip.endDate)}
            </span>
          </div>

          <div className="relative -mx-4 sm:-mx-6 h-56 sm:h-72 mb-6">
            {heroPhoto && <Photo photo={heroPhoto} className="w-full h-full" />}
            <div className="absolute top-4 left-4">
              <DaysOutBadge startDate={trip.startDate} />
            </div>
          </div>

          <h1 className="font-heading font-black text-5xl sm:text-6xl uppercase tracking-tight leading-[0.95] mb-4">
            {trip.name}
          </h1>
          <p className="text-base text-[var(--paper)]/85">{trip.tagline}</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-3 border border-[var(--ink)]/25 divide-x divide-[var(--ink)]/25 mb-6">
            {cities.map((city) => {
              const lodging = getLodgingById(city.lodgingId);
              const nights = lodging ? nightsBetween(lodging.checkIn, lodging.checkOut) : 0;
              return (
                <div key={city.id} className="p-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/50">
                    {city.shortName}
                  </div>
                  <div className="font-heading font-black text-lg mt-0.5">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-[var(--ink)]/70 mb-6">{trip.summary}</p>

          <div className="flex flex-col gap-3">
            <Link
              href="/itinerary"
              className="text-center bg-[var(--accent)] text-white text-sm font-bold uppercase tracking-wider py-3 hover:opacity-90 transition-opacity"
            >
              See the whole plan →
            </Link>
            <AddToCalendarButton trip={trip} days={days} />
          </div>
        </div>
      </div>
    </div>
  );
}
