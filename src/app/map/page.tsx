import { getDays, getLodging, getIdeas, formatDateShort, mapsSearchUrl } from "@/lib/trip";

export default function MapPage() {
  const days = getDays();
  const lodging = getLodging();
  const ideas = getIdeas();

  const itineraryPlaces = days.flatMap((day) =>
    day.items
      .filter((item) => item.location)
      .map((item) => ({
        name: item.location,
        subtitle: `${item.title} · ${formatDateShort(day.date)}`,
      }))
  );

  const lodgingPlaces = lodging
    .filter((stay) => stay.address)
    .map((stay) => ({ name: stay.address, subtitle: stay.name }));

  const ideaPlaces = ideas.map((idea) => ({
    name: idea.name,
    subtitle: idea.category,
  }));

  const groups = [
    { title: "Itinerary stops", places: itineraryPlaces },
    { title: "Lodging", places: lodgingPlaces },
    { title: "Ideas", places: ideaPlaces },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase tracking-wide mb-1">
        Map
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Places from the itinerary, lodging, and ideas. Each one opens in
        Google Maps.
      </p>

      {groups.map((group) => (
        <section key={group.title} className="mb-8">
          <h2 className="font-heading text-sm uppercase tracking-wide text-[var(--accent)] mb-3 pb-1 border-b-2 border-[var(--accent)]/25">
            {group.title}
          </h2>
          {group.places.length > 0 ? (
            <div className="space-y-2">
              {group.places.map((place, idx) => (
                <a
                  key={idx}
                  href={mapsSearchUrl(place.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-black/10 dark:border-white/15 p-3 hover:border-[var(--accent)] transition-colors"
                >
                  <div>
                    <div className="font-medium">{place.name}</div>
                    <div className="text-xs text-black/50 dark:text-white/50">
                      {place.subtitle}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--accent)]">
                    View on map →
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-black/50 dark:text-white/50">
              Nothing here yet.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
