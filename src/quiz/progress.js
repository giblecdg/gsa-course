// Trwały postęp ucznia: statystyki całkowite, lista błędów i ustawienia.
// Logika jest czysta; zapis/odczyt przyjmuje dowolny obiekt zgodny z Web Storage
// (w przeglądarce localStorage, w testach – atrapa w pamięci).

export const STORAGE_KEY = 'anatomia-quiz:v1';

export function emptyProgress() {
  return {
    version: 1,
    lifetime: { answered: 0, correct: 0, sessions: 0 },
    perQuestion: {}, // id -> { seen, correct }
    mistakes: [], // id pytań do powtórki (bez duplikatów, w kolejności dodania)
    settings: { regions: null, length: 10 } // regions: null = wszystkie okolice
  };
}

function sanitize(raw, validIds) {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object' || raw.version !== 1) return base;
  const num = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
  const known = (id) => !validIds || validIds.has(id);

  const lifetime = raw.lifetime || {};
  base.lifetime = { answered: num(lifetime.answered), correct: num(lifetime.correct), sessions: num(lifetime.sessions) };
  if (base.lifetime.correct > base.lifetime.answered) base.lifetime.correct = base.lifetime.answered;

  for (const [id, v] of Object.entries(raw.perQuestion || {})) {
    if (known(id) && v && typeof v === 'object') base.perQuestion[id] = { seen: num(v.seen), correct: Math.min(num(v.correct), num(v.seen)) };
  }
  if (Array.isArray(raw.mistakes)) base.mistakes = [...new Set(raw.mistakes.filter((id) => typeof id === 'string' && known(id)))];

  const s = raw.settings || {};
  if (Array.isArray(s.regions)) base.settings.regions = [...new Set(s.regions.filter((r) => typeof r === 'string'))];
  if (Number.isInteger(s.length) && s.length >= 0) base.settings.length = s.length;
  return base;
}

export function loadProgress(storage, validIds) {
  try {
    const text = storage && storage.getItem(STORAGE_KEY);
    return text ? sanitize(JSON.parse(text), validIds) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(storage, progress) {
  try {
    storage && storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false; // np. tryb prywatny lub przekroczony limit – aplikacja działa dalej
  }
}

export function clearProgress(storage) {
  try {
    storage && storage.removeItem(STORAGE_KEY);
  } catch {
    /* ignorujemy */
  }
  return emptyProgress();
}

/**
 * Rejestruje odpowiedź. Błędna – dodaje pytanie do listy powtórek.
 * Poprawna – usuwa je z listy (pytanie uznane za opanowane).
 */
export function recordAnswer(progress, questionId, correct) {
  const prev = progress.perQuestion[questionId] || { seen: 0, correct: 0 };
  const mistakes = correct
    ? progress.mistakes.filter((id) => id !== questionId)
    : progress.mistakes.includes(questionId)
      ? progress.mistakes.slice()
      : [...progress.mistakes, questionId];
  return {
    ...progress,
    lifetime: {
      ...progress.lifetime,
      answered: progress.lifetime.answered + 1,
      correct: progress.lifetime.correct + (correct ? 1 : 0)
    },
    perQuestion: { ...progress.perQuestion, [questionId]: { seen: prev.seen + 1, correct: prev.correct + (correct ? 1 : 0) } },
    mistakes
  };
}

export function recordSessionEnd(progress) {
  return { ...progress, lifetime: { ...progress.lifetime, sessions: progress.lifetime.sessions + 1 } };
}

export function clearMistakes(progress) {
  return { ...progress, mistakes: [] };
}

export function updateSettings(progress, settings) {
  return { ...progress, settings: { ...progress.settings, ...settings } };
}

export function lifetimeSummary(progress) {
  const { answered, correct, sessions } = progress.lifetime;
  return {
    answered,
    correct,
    sessions,
    percent: answered ? Math.round((correct / answered) * 100) : 0,
    mistakes: progress.mistakes.length,
    mastered: Object.values(progress.perQuestion).filter((v) => v.correct > 0).length
  };
}
