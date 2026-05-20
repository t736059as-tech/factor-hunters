export function readNumber(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  return Number(localStorage.getItem(key)) || fallback;
}

export function saveProgress({ xp, level, captured, streak }) {
  localStorage.setItem('fh_xp', xp);
  localStorage.setItem('fh_level', level);
  localStorage.setItem('fh_captured', captured);
  localStorage.setItem('fh_streak', streak);
}
