import {
  Briefcase,
  Camera,
  Code2,
  Globe,
  HeartPulse,
  Languages,
  Megaphone,
  Music,
  Palette,
} from "lucide-react";
import { areaColor } from "@/lib/data";

const AREA_ICONS = {
  ingles: Languages,
  espanol: Languages,
  programacion: Code2,
  diseno: Palette,
  negocios: Briefcase,
  marketing: Megaphone,
  fotografia: Camera,
  musica: Music,
  bienestar: HeartPulse,
};

export default function CourseThumb({ area, className = "" }) {
  const Icon = AREA_ICONS[area] || Globe;
  const color = areaColor(area);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}99)`,
      }}
    >
      <Icon size={36} className="text-white/90" strokeWidth={1.6} />
    </div>
  );
}
