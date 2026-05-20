export function normalize(text) {
  return String(text)
    .replace(/\s/g, '')
    .replace(/[−ー－]/g, '-')
    .replace(/[＋]/g, '+')
    .replace(/[＊×]/g, '*')
    .replace(/[（]/g, '(')
    .replace(/[）]/g, ')')
    .replace(/[ｘＸX]/g, 'x')
    .replace(/²/g, '^2')
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
    .toLowerCase();
}

export function splitFactors(text) {
  const normalized = normalize(text);
  const parts = normalized.match(/\([^()]+\)|[^()]+(?=\(|$)/g);
  if (!parts) return [normalized];
  return parts.map((part) => part.replace(/[()]/g, '')).filter(Boolean).sort();
}

export function sameFactorization(userAnswer, acceptedAnswers) {
  const user = normalize(userAnswer);
  return acceptedAnswers.some((correctAnswer) => {
    const correct = normalize(correctAnswer);
    if (user === correct) return true;
    return JSON.stringify(splitFactors(user)) === JSON.stringify(splitFactors(correct));
  });
}
