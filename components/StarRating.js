import { Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function StarRating({ avg, count, size = 14, showCount = true }) {
  const { t } = useLanguage();

  if (avg === null || avg === undefined) {
    return <span className="text-xs text-slate-400">{t("rating_no_reviews")}</span>;
  }

  const rounded = Math.round(avg);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rounded ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
          />
        ))}
      </span>
      <span className="text-xs font-semibold text-slate-700">{avg.toFixed(1)}</span>
      {showCount && <span className="text-xs text-slate-400">({t("reviews_count", count)})</span>}
    </span>
  );
}
