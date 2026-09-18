import { AREAS } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";

export default function AreaFilter({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("")}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          value === ""
            ? "bg-amber-600 text-white"
            : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
        }`}
      >
        {t("filter_all_areas")}
      </button>
      {AREAS.map((area) => (
        <button
          key={area}
          type="button"
          onClick={() => onChange(area)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            value === area
              ? "bg-amber-600 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          }`}
        >
          {t(`area_${area}`)}
        </button>
      ))}
    </div>
  );
}
