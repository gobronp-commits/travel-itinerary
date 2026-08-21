"use client";

import { useSyncExternalStore } from "react";
import type { PackingCategory } from "@/lib/trip";

const STORAGE_KEY = "travel-itinerary:packing-checked";
const emptySnapshot: Record<string, boolean> = {};

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : emptySnapshot;
  } catch {
    return emptySnapshot;
  }
}

function getServerSnapshot(): Record<string, boolean> {
  return emptySnapshot;
}

export default function PackingList({
  categories,
}: {
  categories: PackingCategory[];
}) {
  const checked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    window.dispatchEvent(new StorageEvent("storage"));
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <div key={cat.category}>
          <h2 className="font-heading text-sm uppercase tracking-wide text-[var(--accent)] mb-3 pb-1 border-b-2 border-[var(--accent)]/25">
            {cat.category}
          </h2>
          <ul className="space-y-2">
            {cat.items.map((item) => {
              const id = `${slug(cat.category)}:${slug(item)}`;
              return (
                <li key={id}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checked[id]}
                      onChange={() => toggle(id)}
                      className="accent-[var(--accent)]"
                    />
                    <span
                      className={
                        checked[id]
                          ? "line-through text-black/40 dark:text-white/40"
                          : ""
                      }
                    >
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
