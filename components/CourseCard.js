import Link from "next/link";
import { Clock } from "lucide-react";
import StarRating from "@/components/StarRating";
import SeatsBadge from "@/components/SeatsBadge";
import ProfessorAvatar from "@/components/ProfessorAvatar";
import { useLanguage } from "@/components/LanguageProvider";
import { areaColor } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default function CourseCard({ course, professor, rating, seats }) {
  const { t, lang } = useLanguage();
  const price = formatPrice(course.price, lang);
  const color = areaColor(course.area);

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-amber-300 hover:shadow-md"
    >
      <div
        className="h-14 w-full"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
      />

      {professor && (
        <div className="-mt-9 flex flex-col items-center px-4">
          <ProfessorAvatar
            professor={professor}
            size={72}
            className="ring-4 ring-white shadow-sm"
          />
          <p className="mt-2 text-sm font-semibold text-slate-800">{professor.name}</p>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        <span className="text-xs font-semibold text-amber-700">{t(`area_${course.area}`)}</span>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-700">
          {course.title}
        </h3>

        <StarRating avg={rating.avg} count={rating.count} />

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {t("weeks_count", course.durationWeeks)}
          </span>
          <span className="text-sm font-bold text-slate-900">{price || t("free_price")}</span>
        </div>
        <SeatsBadge seats={seats} />
      </div>
    </Link>
  );
}
