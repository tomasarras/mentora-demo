// Lightweight client-side i18n: flat dictionary, `es`/`en` per key (or a
// function for pluralized/interpolated strings). No routing involved — see
// LanguageProvider. Course titles/descriptions/reviews are fictional seed
// content and stay untranslated, like the other portfolio demos.
export const dict = {
  brand_name: { es: "Mentora", en: "Mentora" },
  brand_tagline: {
    es: "Cursos online ficticios · demo de portfolio",
    en: "Fictional online courses · portfolio demo",
  },
  banner_text: {
    es: "Proyecto de portfolio: los cursos, profesores y reseñas son ficticios. No hay backend ni pagos reales.",
    en: "Portfolio project: courses, professors and reviews are fictional. No backend or real payments.",
  },

  nav_catalog: { es: "Catálogo", en: "Catalog" },
  nav_my_courses: { es: "Mis cursos", en: "My courses" },

  home_title: { es: "Encontrá tu próximo curso", en: "Find your next course" },
  home_subtitle: {
    es: "Catálogo ficticio de cursos online con profesores, reseñas y cupos, armado como pieza de portfolio.",
    en: "A fictional online-course catalog with professors, reviews and seats, built as a portfolio piece.",
  },
  search_placeholder: { es: "Buscar cursos o profesores…", en: "Search courses or professors…" },
  filter_all_areas: { es: "Todas las áreas", en: "All areas" },
  sort_label: { es: "Ordenar por", en: "Sort by" },
  sort_relevance: { es: "Relevancia", en: "Relevance" },
  sort_rating: { es: "Mejor calificados", en: "Top rated" },
  sort_price_asc: { es: "Precio: menor a mayor", en: "Price: low to high" },
  sort_price_desc: { es: "Precio: mayor a menor", en: "Price: high to low" },
  results_count: {
    es: (n) => `${n} curso${n === 1 ? "" : "s"}`,
    en: (n) => `${n} course${n === 1 ? "" : "s"}`,
  },
  no_results: { es: "No hay cursos que coincidan con tu búsqueda.", en: "No courses match your search." },
  clear_filters: { es: "Limpiar filtros", en: "Clear filters" },

  area_ingles: { es: "Inglés", en: "English" },
  area_espanol: { es: "Español", en: "Spanish" },
  area_programacion: { es: "Programación", en: "Programming" },
  area_diseno: { es: "Diseño", en: "Design" },
  area_negocios: { es: "Negocios", en: "Business" },
  area_marketing: { es: "Marketing", en: "Marketing" },
  area_fotografia: { es: "Fotografía", en: "Photography" },
  area_musica: { es: "Música", en: "Music" },
  area_bienestar: { es: "Bienestar", en: "Wellness" },

  level_beginner: { es: "Principiante", en: "Beginner" },
  level_intermediate: { es: "Intermedio", en: "Intermediate" },
  level_advanced: { es: "Avanzado", en: "Advanced" },

  free_price: { es: "Gratis", en: "Free" },
  weeks_count: { es: (n) => `${n} semanas`, en: (n) => `${n} weeks` },

  seats_unlimited: { es: "Cupo ilimitado", en: "Unlimited seats" },
  seats_left: { es: (n) => `${n} cupos disponibles`, en: (n) => `${n} seats left` },
  seats_left_one: { es: "1 cupo disponible", en: "1 seat left" },
  seats_full: { es: "Cupo completo", en: "Seats full" },
  students_count: {
    es: (n) => `${n} estudiante${n === 1 ? "" : "s"}`,
    en: (n) => `${n} student${n === 1 ? "" : "s"}`,
  },

  rating_no_reviews: { es: "Sin reseñas todavía", en: "No reviews yet" },
  reviews_count: {
    es: (n) => `${n} reseña${n === 1 ? "" : "s"}`,
    en: (n) => `${n} review${n === 1 ? "" : "s"}`,
  },

  back_to_catalog: { es: "Volver al catálogo", en: "Back to catalog" },
  taught_by: { es: "Dictado por", en: "Taught by" },
  view_professor_profile: { es: "Ver perfil del profesor", en: "View professor profile" },
  about_course: { es: "Sobre el curso", en: "About this course" },
  syllabus_title: { es: "Contenido del curso", en: "Course content" },

  enroll_button: { es: "Inscribirme", en: "Enroll" },
  enrolling_button: { es: "Inscribiendo…", en: "Enrolling…" },
  enrolled_badge: { es: "Ya estás inscripto", en: "You're enrolled" },
  go_to_my_courses: { es: "Ver en Mis cursos", en: "View in My courses" },
  price_label: { es: "Precio", en: "Price" },
  duration_label: { es: "Duración", en: "Duration" },
  level_label: { es: "Nivel", en: "Level" },
  seats_label: { es: "Cupos", en: "Seats" },

  reviews_title: { es: "Reseñas de estudiantes", en: "Student reviews" },
  write_review_button: { es: "Escribir una reseña", en: "Write a review" },
  review_form_title: { es: "Tu reseña", en: "Your review" },
  review_name_placeholder: { es: "Tu nombre", en: "Your name" },
  review_comment_placeholder: { es: "Contá tu experiencia con el curso…", en: "Share your experience with the course…" },
  review_rating_label: { es: "Tu calificación", en: "Your rating" },
  submit_review_button: { es: "Publicar reseña", en: "Post review" },
  cancel: { es: "Cancelar", en: "Cancel" },
  review_error_fields: {
    es: "Completá tu nombre, una calificación y un comentario.",
    en: "Fill in your name, a rating and a comment.",
  },
  no_reviews_yet: { es: "Todavía no hay reseñas para este curso.", en: "No reviews for this course yet." },

  professor_courses_title: { es: "Cursos de este profesor", en: "Courses by this professor" },
  professor_not_found: { es: "No encontramos este profesor.", en: "We couldn't find this professor." },
  course_not_found: { es: "No encontramos este curso.", en: "We couldn't find this course." },

  my_courses_title: { es: "Mis cursos", en: "My courses" },
  my_courses_subtitle: {
    es: "Cursos en los que te inscribiste. Se guardan solo en este navegador.",
    en: "Courses you've enrolled in. Saved only in this browser.",
  },
  my_courses_empty: { es: "Todavía no te inscribiste en ningún curso.", en: "You haven't enrolled in any course yet." },
  browse_catalog_button: { es: "Explorar catálogo", en: "Browse catalog" },

  footer_disclaimer_title: {
    es: "Mentora es un proyecto de portfolio, no una plataforma real de cursos.",
    en: "Mentora is a portfolio project, not a real course platform.",
  },
  footer_disclaimer_body: {
    es: "Cursos, profesores y reseñas son ficticios. Las inscripciones y reseñas que agregues se guardan solo en tu navegador.",
    en: "Courses, professors and reviews are fictional. Enrollments and reviews you add are saved only in your browser.",
  },
  footer_made_by: { es: "Hecho por", en: "Made by" },
  footer_code_at: { es: "código en", en: "code on" },
};
