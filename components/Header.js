"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-600 text-white">
            <GraduationCap size={18} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">{t("brand_name")}</p>
            <p className="hidden text-xs text-slate-400 sm:block">{t("brand_tagline")}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-0.5 text-xs font-medium sm:gap-1 sm:text-sm">
          <Link
            href="/"
            className={`rounded-lg px-2 py-1.5 transition sm:px-3 ${
              pathname === "/" ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t("nav_catalog")}
          </Link>
          <Link
            href="/my-courses"
            className={`rounded-lg px-2 py-1.5 transition sm:px-3 ${
              pathname === "/my-courses" ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t("nav_my_courses")}
          </Link>
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}
