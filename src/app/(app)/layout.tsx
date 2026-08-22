import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="bg-[var(--ink)] text-[var(--paper)] border-b-2 border-[var(--accent)]">
        <div className="mx-auto max-w-2xl px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-heading font-bold text-lg tracking-wide uppercase">
              Trip Itinerary
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-bold uppercase tracking-wider text-[var(--paper)]/60">
            <Link href="/itinerary" className="hover:text-[var(--accent)] transition-colors">
              Itinerary
            </Link>
            <Link href="/lodging" className="hover:text-[var(--accent)] transition-colors">
              Lodging &amp; Transport
            </Link>
            <Link href="/map" className="hover:text-[var(--accent)] transition-colors">
              Map
            </Link>
            <Link href="/packing" className="hover:text-[var(--accent)] transition-colors">
              Packing
            </Link>
            <Link href="/ideas" className="hover:text-[var(--accent)] transition-colors">
              Ideas
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-8">{children}</main>
      <footer className="border-t border-[var(--line)] py-6 text-center text-xs font-bold uppercase tracking-wider text-[var(--ink)]/40">
        Have a great trip.
      </footer>
    </div>
  );
}
