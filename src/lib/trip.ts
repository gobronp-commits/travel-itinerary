import raw from "../../data/trip.json";

export type Trip = {
  name: string;
  destination: string;
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

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}
