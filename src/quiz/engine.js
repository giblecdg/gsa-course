// Czysta logika quizu – bez DOM i bez localStorage, w pełni testowalna w Node.
// Wszystkie funkcje zwracają nowe obiekty (sesja jest niemutowalna).

export const OPTION_COUNT = 4;
export const SESSION_LENGTHS = [5, 10, 15, 20, 0]; // 0 = wszystkie dostępne pytania

/** Tasowanie Fishera–Yatesa; zwraca nową tablicę. `rng` zwraca liczbę z [0, 1). */
export function shuffle(items, rng = Math.random) {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Pytania z wybranych regionów (pusta lista regionów = wszystkie). */
export function filterByRegions(questions, regions) {
  if (!regions || regions.length === 0) return questions.slice();
  const set = new Set(regions);
  return questions.filter((q) => set.has(q.region));
}

/**
 * Cztery różne odpowiedzi: poprawna + 3 dystraktory, potasowane.
 * Dystraktory pochodzą z listy pytania; gdy jest ich za mało, uzupełnia je
 * nazwami innych mięśni z tego samego regionu, a w ostateczności z całej bazy.
 */
export function buildOptions(question, allQuestions, rng = Math.random) {
  const chosen = [];
  const seen = new Set([question.name]);
  const take = (names) => {
    for (const n of shuffle(names, rng)) {
      if (chosen.length >= OPTION_COUNT - 1) return;
      if (!seen.has(n)) {
        seen.add(n);
        chosen.push(n);
      }
    }
  };
  take(question.distractors || []);
  take(allQuestions.filter((q) => q.region === question.region).map((q) => q.name));
  take(allQuestions.map((q) => q.name));
  if (chosen.length < OPTION_COUNT - 1) throw new Error(`Za mało odpowiedzi dla pytania ${question.id}`);

  const options = shuffle([question.name, ...chosen], rng);
  return { options, correctIndex: options.indexOf(question.name) };
}

/**
 * Tworzy sesję. Kolejność losowa, bez powtórzeń.
 * @param {object[]} questions  pełna baza pytań
 * @param {object} cfg
 * @param {string[]} [cfg.regions]  filtr regionów
 * @param {number}  [cfg.length]    liczba pytań (0 lub brak = wszystkie)
 * @param {string[]} [cfg.onlyIds]  ograniczenie do konkretnych pytań (powtórka błędów)
 * @param {'normal'|'mistakes'} [cfg.mode]
 * @param {Function} [cfg.rng]
 */
export function createSession(questions, { regions = [], length = 10, onlyIds = null, mode = 'normal', rng = Math.random } = {}) {
  let pool = filterByRegions(questions, regions);
  if (onlyIds) {
    const ids = new Set(onlyIds);
    pool = pool.filter((q) => ids.has(q.id));
  }
  const order = shuffle(pool, rng);
  const picked = length > 0 ? order.slice(0, length) : order;
  const items = picked.map((q) => ({ questionId: q.id, ...buildOptions(q, questions, rng) }));
  return {
    mode,
    items,
    index: 0,
    answers: items.map(() => null), // null | { choice, correct }
    finished: items.length === 0
  };
}

export function currentItem(session) {
  return session.items[session.index] || null;
}

export function isAnswered(session) {
  return session.answers[session.index] != null;
}

/**
 * Zapisuje odpowiedź na bieżące pytanie. Druga odpowiedź na to samo pytanie
 * jest ignorowana (`accepted: false`) – blokada podwójnego kliknięcia/klawisza.
 */
export function answerCurrent(session, choice) {
  const item = currentItem(session);
  if (!item || session.finished || isAnswered(session)) return { session, accepted: false, correct: false };
  if (!Number.isInteger(choice) || choice < 0 || choice >= item.options.length) {
    return { session, accepted: false, correct: false };
  }
  const correct = choice === item.correctIndex;
  const answers = session.answers.slice();
  answers[session.index] = { choice, correct };
  return { session: { ...session, answers }, accepted: true, correct };
}

/** Przejście dalej – możliwe tylko po udzieleniu odpowiedzi. */
export function advance(session) {
  if (session.finished || !isAnswered(session)) return session;
  const next = session.index + 1;
  if (next >= session.items.length) return { ...session, finished: true };
  return { ...session, index: next };
}

export function sessionScore(session) {
  const answered = session.answers.filter(Boolean);
  const correct = answered.filter((a) => a.correct).length;
  return {
    total: session.items.length,
    answered: answered.length,
    correct,
    wrong: answered.length - correct,
    percent: answered.length ? Math.round((correct / answered.length) * 100) : 0
  };
}

/** Lista błędnych odpowiedzi w sesji (do podsumowania). */
export function sessionMistakes(session, questionsById) {
  return session.items
    .map((item, i) => ({ item, answer: session.answers[i] }))
    .filter(({ answer }) => answer && !answer.correct)
    .map(({ item, answer }) => ({
      question: questionsById.get(item.questionId),
      chosen: item.options[answer.choice]
    }));
}

export function indexById(questions) {
  return new Map(questions.map((q) => [q.id, q]));
}

/** Ocena słowna wyniku procentowego. */
export function verdict(percent) {
  if (percent >= 90) return 'Znakomicie – anatomia w małym palcu.';
  if (percent >= 70) return 'Bardzo dobrze – jeszcze kilka szczegółów do utrwalenia.';
  if (percent >= 50) return 'Nieźle – warto powtórzyć błędne odpowiedzi.';
  return 'Dobry start – powtórka błędów pomoże utrwalić materiał.';
}
