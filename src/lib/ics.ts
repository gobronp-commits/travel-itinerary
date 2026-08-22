import type { ItineraryDay, Trip } from "./trip";

function parseTime12h(time: string): { hour: number; minute: number } | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

function toICSDateTime(dateIso: string, time: string): string | null {
  const parsed = parseTime12h(time);
  if (!parsed) return null;
  const [y, m, d] = dateIso.split("-");
  const hh = String(parsed.hour).padStart(2, "0");
  const mm = String(parsed.minute).padStart(2, "0");
  return `${y}${m}${d}T${hh}${mm}00`;
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function foldLine(line: string): string {
  // ICS lines should be folded at 75 octets; keep it simple for ASCII content.
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    chunks.push(rest.slice(0, 75));
    rest = " " + rest.slice(75);
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

export function buildTripICS(trip: Trip, days: ItineraryDay[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Trip Itinerary//EN",
    "CALSCALE:GREGORIAN",
  ];

  let uidCounter = 0;
  for (const day of days) {
    for (const item of day.items) {
      const start = toICSDateTime(day.date, item.time);
      if (!start) continue;
      uidCounter += 1;
      lines.push(
        "BEGIN:VEVENT",
        `UID:${day.date}-${uidCounter}@trip-itinerary`,
        `DTSTART:${start}`,
        foldLine(`SUMMARY:${escapeICS(item.title)}`),
        ...(item.location ? [foldLine(`LOCATION:${escapeICS(item.location)}`)] : []),
        ...(item.notes ? [foldLine(`DESCRIPTION:${escapeICS(item.notes)}`)] : []),
        "END:VEVENT"
      );
    }
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
