import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trip Itinerary",
  description: "Day-by-day itinerary, lodging, and packing list for an upcoming trip.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="bg-[var(--ink)] text-[var(--paper)] border-b-2 border-[var(--accent)]">
          <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="font-heading font-bold text-lg tracking-wide uppercase">
                Trip Itinerary
              </span>
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-bold uppercase tracking-wider text-[var(--paper)]/60">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                Overview
              </Link>
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
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-[var(--line)] py-6 text-center text-xs font-bold uppercase tracking-wider text-[var(--ink)]/40">
          Have a great trip.
        </footer>
      </body>
    </html>
  );
}
