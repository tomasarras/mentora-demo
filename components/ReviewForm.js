"use client";

import { useState } from "react";
import StarRatingInput from "@/components/StarRatingInput";
import { useLanguage } from "@/components/LanguageProvider";

export default function ReviewForm({ onSubmit, onCancel }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !rating || !comment.trim()) {
      setError(t("review_error_fields"));
      return;
    }
    onSubmit({ reviewerName: name.trim(), rating, comment: comment.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-3">
      <p className="text-sm font-semibold text-slate-800">{t("review_form_title")}</p>

      <div>
        <label className="mb-1 block text-xs font-medium text-slate-500">{t("review_rating_label")}</label>
        <StarRatingInput value={rating} onChange={setRating} />
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t("review_name_placeholder")}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />

      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("review_comment_placeholder")}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />

      {error && <p className="text-xs text-rose-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-white"
        >
          {t("cancel")}
        </button>
        <button
          type="submit"
          className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700"
        >
          {t("submit_review_button")}
        </button>
      </div>
    </form>
  );
}
