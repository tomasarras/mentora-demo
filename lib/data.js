import { createRng, pick, randInt } from "./prng";

// Everything below is fictional seed content for a portfolio demo — no
// backend, no real people or courses. Areas/levels are fixed UI enums
// (translated via i18n); course/professor content stays as authored.

export const AREAS = [
  "ingles",
  "espanol",
  "programacion",
  "diseno",
  "negocios",
  "marketing",
  "fotografia",
  "musica",
  "bienestar",
];

export const LEVELS = ["beginner", "intermediate", "advanced"];

const AREA_COLORS = {
  ingles: "#2563eb",
  espanol: "#dc2626",
  programacion: "#7c3aed",
  diseno: "#db2777",
  negocios: "#0f766e",
  marketing: "#ea580c",
  fotografia: "#0891b2",
  musica: "#9333ea",
  bienestar: "#16a34a",
};

export function areaColor(area) {
  return AREA_COLORS[area] || "#d97706";
}

export const PROFESSORS = [
  {
    id: "prof_elena",
    name: "Elena Vidal",
    color: "#2563eb",
    areas: ["ingles"],
    bio: "Profesora de inglés con 12 años de experiencia enseñando a hispanohablantes en todos los niveles.",
  },
  {
    id: "prof_julieta",
    name: "Julieta Fernández",
    color: "#dc2626",
    areas: ["espanol"],
    bio: "Profesora de español como lengua extranjera (ELE), especializada en conversación y fluidez.",
  },
  {
    id: "prof_marcos",
    name: "Marcos Ibáñez",
    color: "#7c3aed",
    areas: ["programacion"],
    bio: "Desarrollador full-stack. Enseña React y Node.js desde 2018, con foco en proyectos reales.",
  },
  {
    id: "prof_simon",
    name: "Simón Castro",
    color: "#7c3aed",
    areas: ["programacion"],
    bio: "Ingeniero de datos. Enseña Python y análisis de datos desde cero, sin dar nada por sabido.",
  },
  {
    id: "prof_renata",
    name: "Renata Suárez",
    color: "#db2777",
    areas: ["diseno"],
    bio: "Diseñadora UX/UI. Apasionada por enseñar diseño centrado en el usuario con casos reales.",
  },
  {
    id: "prof_tomas",
    name: "Tomás Herrera",
    color: "#0f766e",
    areas: ["negocios"],
    bio: "Consultor de negocios. Ayuda a emprendedores a validar y escalar sus ideas paso a paso.",
  },
  {
    id: "prof_valentina",
    name: "Valentina Campos",
    color: "#ea580c",
    areas: ["marketing"],
    bio: "Especialista en marketing digital y growth, con experiencia en agencias internacionales.",
  },
  {
    id: "prof_bruno",
    name: "Bruno Reyes",
    color: "#0891b2",
    areas: ["fotografia"],
    bio: "Fotógrafo profesional especializado en retrato y luz natural. Enseña con un enfoque práctico.",
  },
  {
    id: "prof_agustina",
    name: "Agustina Molina",
    color: "#9333ea",
    areas: ["musica"],
    bio: "Pianista y profesora de teoría musical, con formación de conservatorio.",
  },
  {
    id: "prof_ivan",
    name: "Iván Navarro",
    color: "#16a34a",
    areas: ["bienestar"],
    bio: "Instructor de yoga y meditación certificado. Enseña mindfulness aplicado a la vida diaria.",
  },
];

const COURSE_SEEDS = [
  { area: "ingles", professorId: "prof_elena", title: "Inglés conversacional para principiantes", level: "beginner" },
  { area: "ingles", professorId: "prof_elena", title: "Inglés de negocios (Business English)", level: "intermediate" },
  { area: "ingles", professorId: "prof_elena", title: "Preparación para el First Certificate (FCE)", level: "advanced" },
  { area: "espanol", professorId: "prof_julieta", title: "Español para extranjeros — Nivel inicial", level: "beginner" },
  { area: "espanol", professorId: "prof_julieta", title: "Conversación en español intermedio", level: "intermediate" },
  { area: "espanol", professorId: "prof_julieta", title: "Español para el mundo del trabajo", level: "advanced" },
  { area: "programacion", professorId: "prof_marcos", title: "Introducción a JavaScript moderno", level: "beginner" },
  { area: "programacion", professorId: "prof_marcos", title: "Desarrollo web con React desde cero", level: "intermediate" },
  { area: "programacion", professorId: "prof_marcos", title: "Node.js y APIs REST", level: "advanced" },
  { area: "programacion", professorId: "prof_simon", title: "Python para análisis de datos", level: "beginner" },
  { area: "diseno", professorId: "prof_renata", title: "Fundamentos de UX/UI Design", level: "beginner" },
  { area: "diseno", professorId: "prof_renata", title: "Diseño de interfaces con Figma", level: "intermediate" },
  { area: "diseno", professorId: "prof_renata", title: "Diseño gráfico para redes sociales", level: "beginner" },
  { area: "negocios", professorId: "prof_tomas", title: "Cómo validar tu idea de negocio", level: "beginner" },
  { area: "negocios", professorId: "prof_tomas", title: "Finanzas para emprendedores", level: "intermediate" },
  { area: "negocios", professorId: "prof_tomas", title: "Estrategia con el Business Model Canvas", level: "advanced" },
  { area: "marketing", professorId: "prof_valentina", title: "Marketing digital de cero a experto", level: "beginner" },
  { area: "marketing", professorId: "prof_valentina", title: "Publicidad en redes sociales (Meta Ads)", level: "intermediate" },
  { area: "marketing", professorId: "prof_valentina", title: "SEO y contenido para atraer clientes", level: "advanced" },
  { area: "fotografia", professorId: "prof_bruno", title: "Fotografía para principiantes", level: "beginner" },
  { area: "fotografia", professorId: "prof_bruno", title: "Retrato con luz natural", level: "intermediate" },
  { area: "fotografia", professorId: "prof_bruno", title: "Edición de fotos con Lightroom", level: "beginner" },
  { area: "musica", professorId: "prof_agustina", title: "Piano para principiantes", level: "beginner" },
  { area: "musica", professorId: "prof_agustina", title: "Teoría musical desde cero", level: "beginner" },
  { area: "musica", professorId: "prof_agustina", title: "Canto y técnica vocal", level: "intermediate" },
  { area: "bienestar", professorId: "prof_ivan", title: "Yoga para principiantes", level: "beginner" },
  { area: "bienestar", professorId: "prof_ivan", title: "Meditación y mindfulness", level: "beginner" },
  { area: "bienestar", professorId: "prof_ivan", title: "Yoga para el estrés y la ansiedad", level: "intermediate" },
];

const AREA_DESCRIPTIONS = {
  ingles:
    "Curso práctico pensado para ganar fluidez real, con mucha conversación y ejercicios aplicados a situaciones cotidianas.",
  espanol:
    "Curso orientado a la práctica oral, con actividades pensadas para perder el miedo a hablar desde la primera clase.",
  programacion:
    "Curso hands-on: cada clase incluye ejercicios de código y un proyecto final para aplicar lo aprendido.",
  diseno:
    "Curso centrado en casos reales, con feedback personalizado sobre los trabajos que vas entregando.",
  negocios:
    "Curso práctico con ejercicios aplicados a tu propio proyecto o idea de negocio, clase a clase.",
  marketing:
    "Curso actualizado con las herramientas y plataformas que se usan hoy, con ejemplos reales de campañas.",
  fotografia:
    "Curso práctico pensado para salir a sacar fotos desde la primera semana, con devoluciones sobre tu propio trabajo.",
  musica:
    "Curso pensado para tocar desde el primer día, combinando práctica con fundamentos de teoría musical.",
  bienestar:
    "Curso guiado con prácticas semanales, pensado para sostener el hábito más allá del curso.",
};

const AREA_SYLLABUS = {
  ingles: ["Vocabulario y gramática esencial", "Práctica de conversación en cada clase", "Simulacros de situaciones reales", "Feedback de pronunciación"],
  espanol: ["Vocabulario y expresiones cotidianas", "Rondas de conversación guiada", "Ejercicios de escucha y comprensión", "Corrección personalizada"],
  programacion: ["Fundamentos y buenas prácticas", "Ejercicios de código en cada clase", "Proyecto final aplicado", "Revisión de código en vivo"],
  diseno: ["Principios de diseño y usabilidad", "Ejercicios prácticos con herramientas reales", "Crítica de diseño grupal", "Proyecto final para portfolio"],
  negocios: ["Diagnóstico de tu idea o proyecto", "Herramientas de validación", "Planificación financiera básica", "Plan de acción final"],
  marketing: ["Fundamentos de marketing digital", "Configuración de campañas reales", "Métricas y analítica", "Estrategia de contenido"],
  fotografia: ["Manejo de cámara y composición", "Trabajo con luz natural", "Salidas fotográficas prácticas", "Edición básica de imágenes"],
  musica: ["Postura y técnica básica", "Lectura musical progresiva", "Práctica guiada de repertorio", "Fundamentos de teoría musical"],
  bienestar: ["Fundamentos de respiración y postura", "Secuencias guiadas progresivas", "Prácticas de mindfulness", "Rutina para sostener en casa"],
};

const REVIEW_COMMENTS = [
  "Superó mis expectativas, {prof} explica todo con muchísima claridad.",
  "Aprendí muchísimo en pocas semanas, lo recomiendo sin dudas.",
  "Las clases son muy prácticas, nada de teoría aburrida.",
  "{prof} siempre responde las dudas con paciencia.",
  "El contenido está muy bien organizado y actualizado.",
  "Me costó al principio pero el ritmo del curso ayuda mucho.",
  "Muy buena relación precio-calidad, volvería a tomar otro curso.",
  "Esperaba un poco más de contenido avanzado, pero está bueno para arrancar.",
  "La dinámica de las clases mantiene la atención todo el tiempo.",
  "Excelente curso, {prof} tiene mucha experiencia y se nota.",
];

const REVIEWER_FIRST = ["Sofía", "Mateo", "Lucía", "Nicolás", "Valentina", "Iván", "Renata", "Bruno", "Carla", "Franco", "Emma", "Diego", "Paula", "Simón", "Agustina"];
const REVIEWER_LAST = ["Gómez", "Rodríguez", "Silva", "Torres", "Romero", "Castro", "Molina", "Ortiz", "Herrera", "Navarro"];

function toISODateOffset(days) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function generateCatalog() {
  const rng = createRng("mentora-catalog-v1");

  const courses = COURSE_SEEDS.map((seed, i) => {
    const id = `course_${i}`;
    const isUnlimited = rng() < 0.25;
    const capacity = isUnlimited ? null : randInt(rng, 12, 40);
    let baseEnrolled = 0;
    if (!isUnlimited) {
      const fillRatio = pick(rng, [0.2, 0.4, 0.6, 0.8, 0.95, 1]);
      baseEnrolled = Math.min(capacity, Math.round(capacity * fillRatio));
    } else {
      baseEnrolled = randInt(rng, 20, 400);
    }

    return {
      id,
      title: seed.title,
      professorId: seed.professorId,
      area: seed.area,
      level: seed.level,
      price: rng() < 0.08 ? 0 : randInt(rng, 18, 149),
      durationWeeks: randInt(rng, 4, 12),
      capacity,
      baseEnrolled,
      description: AREA_DESCRIPTIONS[seed.area],
      syllabus: AREA_SYLLABUS[seed.area],
    };
  });

  const reviews = [];
  let reviewCounter = 0;
  for (const course of courses) {
    const n = randInt(rng, 2, 6);
    for (let i = 0; i < n; i++) {
      const name = `${pick(rng, REVIEWER_FIRST)} ${pick(rng, REVIEWER_LAST)}`;
      const rating = pick(rng, [3, 4, 4, 4, 5, 5, 5, 5, 2]);
      const prof = PROFESSORS.find((p) => p.id === course.professorId);
      const comment = pick(rng, REVIEW_COMMENTS).replace("{prof}", prof.name.split(" ")[0]);
      reviews.push({
        id: `review_${reviewCounter++}`,
        courseId: course.id,
        reviewerName: name,
        rating,
        comment,
        date: toISODateOffset(-randInt(rng, 2, 300)),
      });
    }
  }

  return { courses, reviews };
}

export function courseRating(courseId, allReviews) {
  const list = allReviews.filter((r) => r.courseId === courseId);
  if (list.length === 0) return { avg: null, count: 0 };
  const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return { avg, count: list.length };
}

export function professorRating(professorId, courses, allReviews) {
  const courseIds = courses.filter((c) => c.professorId === professorId).map((c) => c.id);
  const list = allReviews.filter((r) => courseIds.includes(r.courseId));
  if (list.length === 0) return { avg: null, count: 0 };
  const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return { avg, count: list.length };
}

export function seatsInfo(course, isEnrolledByUser) {
  if (course.capacity === null) {
    return { isUnlimited: true, isFull: false, enrolledCount: course.baseEnrolled + (isEnrolledByUser ? 1 : 0), remaining: null };
  }
  const enrolledCount = Math.min(course.capacity, course.baseEnrolled + (isEnrolledByUser ? 1 : 0));
  const remaining = Math.max(0, course.capacity - enrolledCount);
  return { isUnlimited: false, isFull: remaining === 0, enrolledCount, remaining };
}

export function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
