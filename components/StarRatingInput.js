"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n} star`}
            className="p-0.5"
          >
            <Star
              size={22}
              className={n <= display ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
            />
          </button>
        );
      })}
    </div>
  );
}
