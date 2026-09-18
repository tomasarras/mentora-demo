const LOCALES = { es: "es-AR", en: "en-US" };

export function formatPrice(usd, lang = "es") {
  if (usd === 0) return null;
  return new Intl.NumberFormat(LOCALES[lang] || LOCALES.es, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

export function formatDateShort(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
