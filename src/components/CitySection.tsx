import type { City } from "@/lib/trip";
import { getLodgingById, mapsSearchUrl } from "@/lib/trip";
import { getPhoto, getLodgingPhoto } from "@/lib/photos";
import Photo from "./Photo";

export default function CitySection({ city }: { city: City }) {
  const lodging = getLodgingById(city.lodgingId);
  const cityPhoto = getPhoto(city.photoKey);
  const hotelPhoto = lodging ? getLodgingPhoto(lodging.photoKey) : undefined;

  return (
    <section className="mb-14">
      <div className="relative rounded-xl overflow-hidden h-56 sm:h-72">
        {cityPhoto ? (
          <Photo photo={cityPhoto} className="w-full h-full" />
        ) : (
          <div className="w-full h-full bg-[var(--navy)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-6">
          <h2 className="font-heading text-2xl sm:text-3xl uppercase tracking-wide text-white">
            {city.name}
          </h2>
          <p className="text-sm text-white/80 mt-0.5">{city.dateRange}</p>
        </div>
      </div>

      {lodging && (
        <div className="mt-4 flex flex-col sm:flex-row gap-4 rounded-xl border border-black/10 dark:border-white/15 overflow-hidden">
          {hotelPhoto && (
            <Photo photo={hotelPhoto} className="w-full sm:w-56 h-40 sm:h-auto shrink-0" />
          )}
          <div className="p-4 sm:py-4 sm:pr-4">
            <div className="text-xs uppercase tracking-wide text-[var(--accent)] font-heading">
              Where we're staying
            </div>
            <div className="font-medium mt-1">{lodging.name}</div>
            <a
              href={mapsSearchUrl(lodging.address)}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-black/60 dark:text-white/60 hover:text-[var(--accent)] hover:underline underline-offset-2"
            >
              {lodging.address}
            </a>
          </div>
        </div>
      )}

      {city.highlights.length > 0 && (
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {city.highlights.map((h) => {
            const photo = getPhoto(h.photoKey);
            return (
              <div
                key={h.title}
                className="rounded-xl border border-black/10 dark:border-white/15 overflow-hidden"
              >
                {photo && <Photo photo={photo} className="w-full h-36" />}
                <div className="p-4">
                  <div className="font-medium">{h.title}</div>
                  <p className="text-sm text-black/60 dark:text-white/60 mt-1">{h.blurb}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
