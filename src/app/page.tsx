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
import RouteMap from "@/components/RouteMap";
import CitySection from "@/components/CitySection";
import DaysOutBadge from "@/components/DaysOutBadge";
import AddToCalendarButton from "@/components/AddToCalendarButton";

export default function Home() {
  const trip = getTrip();
  const cities = getCities();
  const days = getDays();
  const heroPhoto = getPhoto("sanSebastian");

  return (
    <div>
      <div className="border-2 border-[var(--ink)] mb-14">
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
          <p className="text-base text-[var(--paper)]/85 max-w-md">{trip.tagline}</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-3 border border-[var(--ink)]/25 divide-x divide-[var(--ink)]/25 mb-6">
            {cities.map((city) => {
              const lodging = getLodgingById(city.lodgingId);
              const nights = lodging ? nightsBetween(lodging.checkIn, lodging.checkOut) : 0;
              return (
                <div key={city.id} className="p-3 sm:p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/50">
                    {city.shortName}
                  </div>
                  <div className="font-heading font-black text-lg sm:text-xl mt-0.5">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-[var(--ink)]/70 mb-6 max-w-md">{trip.summary}</p>

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

      <div className="mb-14">
        <RouteMap />
      </div>

      {cities.map((city) => (
        <CitySection key={city.id} city={city} />
      ))}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/lodging"
          className="inline-block text-sm font-bold uppercase tracking-wider border-2 border-[var(--ink)] px-4 py-2.5 hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
        >
          Lodging &amp; transport details →
        </Link>
      </div>
    </div>
  );
}
