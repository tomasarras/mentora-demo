import { Star } from "lucide-react";
import { formatDateShort } from "@/lib/format";
import { useLanguage } from "@/components/LanguageProvider";

export default function ReviewCard({ review }) {
  const { lang } = useLanguage();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">{review.reviewerName}</p>
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
            />
          ))}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
      <p className="mt-2 text-xs text-slate-400">{formatDateShort(review.date, lang)}</p>
    </div>
  );
}
