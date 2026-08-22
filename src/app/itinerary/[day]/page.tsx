import { notFound } from "next/navigation";
import Link from "next/link";
import { getDays, getDayByDate, formatDate, mapsSearchUrl } from "@/lib/trip";

export function generateStaticParams() {
  return getDays().map((d) => ({ day: d.date }));
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day: date } = await params;
  const day = getDayByDate(date);
  if (!day) notFound();

  return (
    <div>
      <Link
        href="/itinerary"
        className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/50 hover:text-[var(--accent)]"
      >
        ← Itinerary
      </Link>

      <h1 className="font-heading font-black text-3xl uppercase tracking-tight mt-2">
        {day.title}
      </h1>
      <p className="text-sm text-[var(--ink)]/60 mt-1">{formatDate(day.date)}</p>

      <div className="mt-8 space-y-4">
        {day.items.map((item, idx) => (
          <div key={idx} className="flex gap-4 border border-[var(--ink)]/15 p-4">
            <div className="font-heading font-bold text-sm text-[var(--accent)] w-20 shrink-0">
              {item.time}
            </div>
            <div>
              <div className="font-bold">{item.title}</div>
              {item.location && (
                <a
                  href={mapsSearchUrl(item.location)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--ink)]/60 hover:text-[var(--accent)] hover:underline underline-offset-2"
                >
                  {item.location}
                </a>
              )}
              {item.notes && (
                <p className="text-sm text-[var(--ink)]/50 mt-1">{item.notes}</p>
              )}
            </div>
          </div>
        ))}
        {day.items.length === 0 && (
          <p className="text-sm text-[var(--ink)]/50">Nothing scheduled yet.</p>
        )}
      </div>
    </div>
  );
}
