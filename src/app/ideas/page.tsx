import { getIdeas } from "@/lib/trip";

const CATEGORY_LABEL: Record<string, string> = {
  restaurant: "Restaurant",
  activity: "Activity",
  other: "Other",
};

export default function IdeasPage() {
  const ideas = getIdeas();

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase tracking-wide mb-1">
        Ideas
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Suggested restaurants and activities that aren&apos;t on the schedule
        yet.
      </p>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="rounded-lg border border-black/10 dark:border-white/15 p-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-medium">{idea.name}</div>
              <span className="text-xs uppercase tracking-wide text-[var(--accent)]">
                {CATEGORY_LABEL[idea.category] ?? idea.category}
              </span>
            </div>
            {idea.notes && (
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                {idea.notes}
              </p>
            )}
          </div>
        ))}
        {ideas.length === 0 && (
          <p className="text-sm text-black/50 dark:text-white/50">
            No ideas yet.
          </p>
        )}
      </div>
    </div>
  );
}
