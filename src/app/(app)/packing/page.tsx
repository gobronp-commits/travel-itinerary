import { getPacking } from "@/lib/trip";
import PackingList from "@/components/PackingList";

export default function PackingPage() {
  const categories = getPacking();

  return (
    <div>
      <h1 className="font-heading font-black text-3xl uppercase tracking-tight mb-1">
        Packing
      </h1>
      <p className="text-sm text-[var(--ink)]/60 mb-6">
        Checklist. Checked items are saved in this browser.
      </p>

      <PackingList categories={categories} />
    </div>
  );
}
