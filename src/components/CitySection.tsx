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
      <div className="relative overflow-hidden h-56 sm:h-72 border-2 border-[var(--ink)]">
        {cityPhoto ? (
          <Photo photo={cityPhoto} className="w-full h-full" />
        ) : (
          <div className="w-full h-full bg-[var(--ink)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-6">
          <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none">
            {city.name}
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mt-2">
            {city.dateRange}
          </p>
        </div>
      </div>

      {lodging && (
        <div className="mt-4 flex flex-col sm:flex-row border-2 border-[var(--ink)] overflow-hidden">
          {hotelPhoto && (
            <Photo photo={hotelPhoto} className="w-full sm:w-56 h-40 sm:h-auto shrink-0" />
          )}
          <div className="p-4 sm:py-4 sm:pr-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Where we&apos;re staying
            </div>
            <div className="font-bold mt-1">{lodging.name}</div>
            <a
              href={mapsSearchUrl(lodging.address)}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--ink)]/60 hover:text-[var(--accent)] hover:underline underline-offset-2"
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
              <div key={h.title} className="border-2 border-[var(--ink)] overflow-hidden">
                {photo && <Photo photo={photo} className="w-full h-36" />}
                <div className="p-4">
                  <div className="font-bold">{h.title}</div>
                  <p className="text-sm text-[var(--ink)]/60 mt-1">{h.blurb}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
