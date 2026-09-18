"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";
import { randomDelay } from "@/lib/delay";
import { PROFESSORS, courseRating, generateCatalog, seatsInfo } from "@/lib/data";
import { loadState, saveState } from "@/lib/storage";

export default function MyCoursesPage() {
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

  const professorsById = useMemo(() => {
    const map = {};
    for (const p of PROFESSORS) map[p.id] = p;
    return map;
  }, []);

  const allReviews = useMemo(() => {
    if (!catalog) return [];
    return [...catalog.reviews, ...(userState?.extraReviews || [])];
  }, [catalog, userState]);

  const enrolledCourses = useMemo(() => {
    if (!catalog || !userState) return [];
    return catalog.courses.filter((c) => userState.enrolledCourseIds.includes(c.id));
  }, [catalog, userState]);

  const loading = !catalog || !userState;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("my_courses_title")}</h1>
      <p className="mt-1 text-sm text-slate-500">{t("my_courses_subtitle")}</p>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full" />
            ))}
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <GraduationCap className="mx-auto text-slate-300" size={32} />
            <p className="mt-3 text-sm text-slate-500">{t("my_courses_empty")}</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              {t("browse_catalog_button")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                professor={professorsById[course.professorId]}
                rating={courseRating(course.id, allReviews)}
                seats={seatsInfo(course, true)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
