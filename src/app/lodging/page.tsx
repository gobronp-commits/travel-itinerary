import { getLodging, getTransport, formatDate, mapsSearchUrl } from "@/lib/trip";

export default function LodgingPage() {
  const lodging = getLodging();
  const transport = getTransport();

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase tracking-wide mb-1">
        Lodging &amp; Transport
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Flights, hotels, and confirmation details.
      </p>

      <section className="mb-10">
        <h2 className="font-heading text-sm uppercase tracking-wide text-[var(--accent)] mb-3 pb-1 border-b-2 border-[var(--accent)]/25">
          Transport
        </h2>
        <div className="space-y-3">
          {transport.map((leg) => (
            <div
              key={leg.id}
              className="rounded-lg border border-black/10 dark:border-white/15 p-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-medium">{leg.label}</div>
                <div className="text-xs text-black/50 dark:text-white/50">
                  {formatDate(leg.date)} · {leg.time}
                </div>
              </div>
              <div className="text-sm text-black/60 dark:text-white/60 mt-1">
                {leg.details}
              </div>
              {leg.confirmation && (
                <div className="text-xs text-black/40 dark:text-white/40 mt-1">
                  Confirmation: {leg.confirmation}
                </div>
              )}
            </div>
          ))}
          {transport.length === 0 && (
            <p className="text-sm text-black/50 dark:text-white/50">
              No transport booked yet.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-sm uppercase tracking-wide text-[var(--accent)] mb-3 pb-1 border-b-2 border-[var(--accent)]/25">
          Lodging
        </h2>
        <div className="space-y-3">
          {lodging.map((stay) => (
            <div
              key={stay.id}
              className="rounded-lg border border-black/10 dark:border-white/15 p-4"
            >
              <div className="font-medium">{stay.name}</div>
              <div className="text-sm text-black/60 dark:text-white/60 mt-1">
                {formatDate(stay.checkIn)} – {formatDate(stay.checkOut)}
              </div>
              {stay.address && (
                <a
                  href={mapsSearchUrl(stay.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-black/60 dark:text-white/60 hover:text-[var(--accent)] hover:underline underline-offset-2 block mt-1"
                >
                  {stay.address}
                </a>
              )}
              {stay.confirmation && (
                <div className="text-xs text-black/40 dark:text-white/40 mt-1">
                  Confirmation: {stay.confirmation}
                </div>
              )}
            </div>
          ))}
          {lodging.length === 0 && (
            <p className="text-sm text-black/50 dark:text-white/50">
              No lodging booked yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
