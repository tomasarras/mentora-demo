"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Avatar from "@/components/Avatar";
import StarRating from "@/components/StarRating";
import CourseCard from "@/components/CourseCard";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";
import { randomDelay } from "@/lib/delay";
import {
  PROFESSORS,
  courseRating,
  generateCatalog,
  professorRating,
  seatsInfo,
} from "@/lib/data";
import { loadState, saveState } from "@/lib/storage";

export default function ProfessorDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [catalog, setCatalog] = useState(null);
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    randomDelay().then(() => {
      setCatalog(generateCatalog());
      setUserState(loadState());
    });
  }, []);

  useEffect(() => {
    if (userState) saveState(userState);
  }, [userState]);

  const professor = PROFESSORS.find((p) => p.id === id) || null;

  const allReviews = useMemo(() => {
    if (!catalog) return [];
    return [...catalog.reviews, ...(userState?.extraReviews || [])];
  }, [catalog, userState]);

  const professorCourses = useMemo(
    () => (catalog ? catalog.courses.filter((c) => c.professorId === id) : []),
    [catalog, id]
  );

  if (!catalog || !userState) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Skeleton className="h-24 w-full" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!professor) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="text-slate-500">{t("professor_not_found")}</p>
        <Link href="/" className="mt-3 inline-block text-sm font-semibold text-amber-700 hover:underline">
          {t("back_to_catalog")}
        </Link>
      </div>
    );
  }

  const rating = professorRating(professor.id, catalog.courses, allReviews);
  const totalStudents = professorCourses.reduce(
    (sum, c) => sum + seatsInfo(c, userState.enrolledCourseIds.includes(c.id)).enrolledCount,
    0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700">
        <ChevronLeft size={16} />
        {t("back_to_catalog")}
      </Link>

      <div className="mt-4 flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <Avatar name={professor.name} color={professor.color} size={64} />
        <div>
          <h1 className="text-xl font-bold text-slate-900">{professor.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{professor.bio}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <StarRating avg={rating.avg} count={rating.count} />
            <span className="text-xs text-slate-400">{t("students_count", totalStudents)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900">{t("professor_courses_title")}</h2>
        <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {professorCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              professor={professor}
              rating={courseRating(course.id, allReviews)}
              seats={seatsInfo(course, userState.enrolledCourseIds.includes(course.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
