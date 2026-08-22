import raw from "../../data/trip.json";

export type Trip = {
  name: string;
  destination: string;
  travelers: string;
  tagline: string;
  summary: string;
  startDate: string;
  endDate: string;
  notes: string;
};

export type TransportLeg = {
  id: string;
  type: "flight" | "train" | "car" | "other";
  label: string;
  date: string;
  time: string;
  details: string;
  confirmation: string;
};

export type Lodging = {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  address: string;
  confirmation: string;
  photoKey: string;
};

export type ItineraryItem = {
  time: string;
  title: string;
  location: string;
  notes: string;
};

export type ItineraryDay = {
  date: string;
  title: string;
  items: ItineraryItem[];
};

export type PackingCategory = {
  category: string;
  items: string[];
};

export type Idea = {
  id: string;
  name: string;
  category: "restaurant" | "activity" | "other";
  notes: string;
};

export type CityHighlight = {
  title: string;
  blurb: string;
  photoKey: string;
};

export type City = {
  id: string;
  name: string;
  shortName: string;
  dateRange: string;
  lodgingId: string;
  photoKey: string;
  highlights: CityHighlight[];
};

export type TripData = {
  trip: Trip;
  transport: TransportLeg[];
  lodging: Lodging[];
  days: ItineraryDay[];
  cities: City[];
  packing: PackingCategory[];
  ideas: Idea[];
};

const data = raw as TripData;

export function getTrip(): Trip {
  return data.trip;
}

export function getTransport(): TransportLeg[] {
  return data.transport;
}

export function getLodging(): Lodging[] {
  return data.lodging;
}

export function getLodgingById(id: string): Lodging | undefined {
  return data.lodging.find((l) => l.id === id);
}

export function getCities(): City[] {
  return data.cities;
}

export function getDays(): ItineraryDay[] {
  return data.days;
}

export function getDayByDate(date: string): ItineraryDay | undefined {
  return data.days.find((d) => d.date === date);
}

export function getPacking(): PackingCategory[] {
  return data.packing;
}

export function getIdeas(): Idea[] {
  return data.ideas;
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysUntil(dateIso: string, from: Date = new Date()): number {
  const [y, m, d] = dateIso.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((target.getTime() - fromMidnight.getTime()) / 86_400_000);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const [y1, m1, d1] = checkIn.split("-").map(Number);
  const [y2, m2, d2] = checkOut.split("-").map(Number);
  const a = new Date(y1, m1 - 1, d1);
  const b = new Date(y2, m2 - 1, d2);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}
