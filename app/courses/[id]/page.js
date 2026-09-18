"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarClock, CheckCircle2, ChevronLeft, Clock, Layers } from "lucide-react";
import CourseThumb from "@/components/CourseThumb";
import StarRating from "@/components/StarRating";
import SeatsBadge from "@/components/SeatsBadge";
import ProfessorAvatar from "@/components/ProfessorAvatar";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";
import { randomDelay } from "@/lib/delay";
import { PROFESSORS, courseRating, generateCatalog, makeId, seatsInfo } from "@/lib/data";
import { loadState, saveState } from "@/lib/storage";
import { formatPrice } from "@/lib/format";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const [catalog, setCatalog] = useState(null);
  const [userState, setUserState] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    randomDelay().then(() => {
      setCatalog(generateCatalog());
      setUserState(loadState());
    });
  }, []);

  useEffect(() => {
    if (userState) saveState(userState);
  }, [userState]);

  const course = useMemo(
    () => catalog?.courses.find((c) => c.id === id) || null,
    [catalog, id]
  );
  const professor = course ? PROFESSORS.find((p) => p.id === course.professorId) : null;

  const allReviews = useMemo(() => {
    if (!catalog) return [];
    return [...catalog.reviews, ...(userState?.extraReviews || [])];
  }, [catalog, userState]);

  const courseReviews = useMemo(
    () => allReviews.filter((r) => r.courseId === id).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [allReviews, id]
  );

  if (!catalog || !userState) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-4 h-40 w-full" />
        <Skeleton className="mt-4 h-24 w-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="text-slate-500">{t("course_not_found")}</p>
        <Link href="/" className="mt-3 inline-block text-sm font-semibold text-amber-700 hover:underline">
          {t("back_to_catalog")}
        </Link>
      </div>
    );
  }

  const isEnrolled = userState.enrolledCourseIds.includes(course.id);
  const seats = seatsInfo(course, isEnrolled);
  const rating = courseRating(course.id, allReviews);
  const price = formatPrice(course.price, lang);

  async function handleEnroll() {
    if (isEnrolled || seats.isFull) return;
    setEnrolling(true);
    await randomDelay();
    setUserState((prev) => ({
      ...prev,
      enrolledCourseIds: [...prev.enrolledCourseIds, course.id],
    }));
    setEnrolling(false);
  }

  function handleSubmitReview(data) {
    const review = {
      id: makeId("review"),
      courseId: course.id,
      reviewerName: data.reviewerName,
      rating: data.rating,
      comment: data.comment,
      date: new Date().toISOString().slice(0, 10),
    };
    setUserState((prev) => ({ ...prev, extraReviews: [review, ...prev.extraReviews] }));
    setShowReviewForm(false);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700">
        <ChevronLeft size={16} />
        {t("back_to_catalog")}
      </Link>

      <CourseThumb area={course.area} className="mt-4 h-48 w-full rounded-2xl" />

      <div className="mt-5 flex flex-col gap-6 sm:flex-row">
        <div className="flex-1">
          <span className="text-xs font-semibold text-amber-700">{t(`area_${course.area}`)}</span>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{course.title}</h1>

          <div className="mt-2">
            <StarRating avg={rating.avg} count={rating.count} />
          </div>

          <Link
            href={`/professors/${professor.id}`}
            className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-amber-300"
          >
            <ProfessorAvatar professor={professor} />
            <div>
              <p className="text-xs text-slate-400">{t("taught_by")}</p>
              <p className="text-sm font-semibold text-slate-800">{professor.name}</p>
            </div>
          </Link>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-900">{t("about_course")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{course.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-900">{t("syllabus_title")}</h2>
            <ul className="mt-2 space-y-2">
              {course.syllabus.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-amber-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">{t("reviews_title")}</h2>
              {!showReviewForm && (
                <button
                  type="button"
                  onClick={() => setShowReviewForm(true)}
                  className="text-xs font-semibold text-amber-700 hover:underline"
                >
                  {t("write_review_button")}
                </button>
              )}
            </div>

            {showReviewForm && (
              <div className="mt-3">
                <ReviewForm onSubmit={handleSubmitReview} onCancel={() => setShowReviewForm(false)} />
              </div>
            )}

            <div className="mt-4 space-y-3">
              {courseReviews.length === 0 ? (
                <p className="text-sm text-slate-400">{t("no_reviews_yet")}</p>
              ) : (
                courseReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              )}
            </div>
          </div>
        </div>

        <aside className="w-full shrink-0 sm:w-64">
          <div className="sticky top-4 space-y-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-2xl font-bold text-slate-900">{price || t("free_price")}</p>

            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-slate-500">
                  <Clock size={14} />
                  {t("duration_label")}
                </dt>
                <dd className="font-medium text-slate-800">{t("weeks_count", course.durationWeeks)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-slate-500">
                  <Layers size={14} />
                  {t("level_label")}
                </dt>
                <dd className="font-medium text-slate-800">{t(`level_${course.level}`)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-slate-500">
                  <CalendarClock size={14} />
                  {t("seats_label")}
                </dt>
                <dd className="font-medium text-slate-800">
                  <SeatsBadge seats={seats} className="!text-slate-800" />
                </dd>
              </div>
            </dl>

            {isEnrolled ? (
              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-700">
                {t("enrolled_badge")}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnroll}
                disabled={enrolling || seats.isFull}
                className="w-full rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enrolling ? t("enrolling_button") : seats.isFull ? t("seats_full") : t("enroll_button")}
              </button>
            )}

            {isEnrolled && (
              <Link
                href="/my-courses"
                className="block text-center text-xs font-semibold text-amber-700 hover:underline"
              >
                {t("go_to_my_courses")}
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
