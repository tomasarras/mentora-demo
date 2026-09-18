import Link from "next/link";
import { Clock } from "lucide-react";
import CourseThumb from "@/components/CourseThumb";
import StarRating from "@/components/StarRating";
import SeatsBadge from "@/components/SeatsBadge";
import ProfessorAvatar from "@/components/ProfessorAvatar";
import { useLanguage } from "@/components/LanguageProvider";
import { formatPrice } from "@/lib/format";

export default function CourseCard({ course, professor, rating, seats }) {
  const { t, lang } = useLanguage();
  const price = formatPrice(course.price, lang);

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-amber-300 hover:shadow-md"
    >
      <CourseThumb area={course.area} className="h-32 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold text-amber-700">{t(`area_${course.area}`)}</span>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-700">
          {course.title}
        </h3>
        {professor && (
          <div className="flex items-center gap-1.5">
            <ProfessorAvatar professor={professor} size={18} />
            <p className="text-xs text-slate-500">{professor.name}</p>
          </div>
        )}

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
