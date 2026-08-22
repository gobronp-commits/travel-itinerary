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
      <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-1">
        Ideas
      </h1>
      <p className="text-sm text-[var(--ink)]/60 mb-6">
        Suggested restaurants and activities that aren&apos;t on the schedule
        yet.
      </p>

      <div className="space-y-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="border border-[var(--ink)]/15 p-4">
            <div className="flex items-baseline justify-between gap-4">
              <div className="font-bold">{idea.name}</div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                {CATEGORY_LABEL[idea.category] ?? idea.category}
              </span>
            </div>
            {idea.notes && (
              <p className="text-sm text-[var(--ink)]/60 mt-1">{idea.notes}</p>
            )}
          </div>
        ))}
        {ideas.length === 0 && (
          <p className="text-sm text-[var(--ink)]/50">No ideas yet.</p>
        )}
      </div>
    </div>
  );
}
