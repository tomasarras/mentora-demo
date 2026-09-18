"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import AreaFilter from "@/components/AreaFilter";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";
import { randomDelay } from "@/lib/delay";
import { PROFESSORS, courseRating, generateCatalog, seatsInfo } from "@/lib/data";
import { loadState, saveState } from "@/lib/storage";

const SORTS = ["relevance", "rating", "price_asc", "price_desc"];

export default function HomePage() {
  const { t } = useLanguage();
  const [catalog, setCatalog] = useState(null);
  const [userState, setUserState] = useState(null);

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [sort, setSort] = useState("relevance");

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

  const filtered = useMemo(() => {
    if (!catalog) return [];
    const q = search.trim().toLowerCase();

    let list = catalog.courses.filter((course) => {
      const prof = professorsById[course.professorId];
      if (area && course.area !== area) return false;
      if (
        q &&
        !course.title.toLowerCase().includes(q) &&
        !prof?.name.toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    if (sort === "rating") {
      list = [...list].sort((a, b) => {
        const ra = courseRating(a.id, allReviews).avg ?? -1;
        const rb = courseRating(b.id, allReviews).avg ?? -1;
        return rb - ra;
      });
    } else if (sort === "price_asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [catalog, search, area, sort, professorsById, allReviews]);

  const loading = !catalog || !userState;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t("home_title")}</h1>
        <p className="mt-2 text-sm text-slate-500">{t("home_subtitle")}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search_placeholder")}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-amber-500 focus:outline-none sm:ml-auto"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {t(`sort_${s}`)}
              </option>
            ))}
          </select>
        </div>

        <AreaFilter value={area} onChange={setArea} />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full" />
            ))}
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-500">{t("results_count", filtered.length)}</p>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <p className="text-sm text-slate-500">{t("no_results")}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setArea("");
                  }}
                  className="mt-3 text-sm font-semibold text-amber-700 hover:underline"
                >
                  {t("clear_filters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    professor={professorsById[course.professorId]}
                    rating={courseRating(course.id, allReviews)}
                    seats={seatsInfo(course, userState.enrolledCourseIds.includes(course.id))}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
