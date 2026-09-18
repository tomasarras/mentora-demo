import { Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function SeatsBadge({ seats, className = "" }) {
  const { t } = useLanguage();

  if (seats.isUnlimited) {
    return (
      <span className={`flex items-center gap-1 text-xs font-medium text-emerald-700 ${className}`}>
        <Users size={13} />
        {t("seats_unlimited")}
      </span>
    );
  }

  if (seats.isFull) {
    return (
      <span className={`flex items-center gap-1 text-xs font-medium text-rose-600 ${className}`}>
        <Users size={13} />
        {t("seats_full")}
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-1 text-xs font-medium text-slate-500 ${className}`}>
      <Users size={13} />
      {seats.remaining === 1 ? t("seats_left_one") : t("seats_left", seats.remaining)}
    </span>
  );
}
