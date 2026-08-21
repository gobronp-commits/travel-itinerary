import { getPacking } from "@/lib/trip";
import PackingList from "@/components/PackingList";

export default function PackingPage() {
  const categories = getPacking();

  return (
    <div>
      <h1 className="font-heading text-2xl uppercase tracking-wide mb-1">
        Packing
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        Checklist. Checked items are saved in this browser.
      </p>

      <PackingList categories={categories} />
    </div>
  );
}
