const KEY = "mentora_state_v1";

function defaultState() {
  return { enrolledCourseIds: [], extraReviews: [] };
}

export function loadState() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {
      enrolledCourseIds: Array.isArray(parsed.enrolledCourseIds) ? parsed.enrolledCourseIds : [],
      extraReviews: Array.isArray(parsed.extraReviews) ? parsed.extraReviews : [],
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}
