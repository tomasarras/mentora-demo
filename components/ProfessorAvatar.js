"use client";

import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";

export default function ProfessorAvatar({ professor, size = 36 }) {
  const [loaded, setLoaded] = useState(false);
  const src = `/images/professors/${professor.id}.jpg`;

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setLoaded(false);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!loaded) {
    return <Avatar name={professor.name} color={professor.color} size={size} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={professor.name}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
