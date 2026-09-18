// Fakes network latency for demo interactions (loading the catalog,
// enrolling, submitting a review) so the app doesn't feel static.
export function randomDelay(maxMs = 900, minMs = 150) {
  const ms = minMs + Math.random() * (maxMs - minMs);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
