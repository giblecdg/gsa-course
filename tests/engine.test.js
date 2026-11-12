import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  OPTION_COUNT,
  advance,
  answerCurrent,
  buildOptions,
  createSession,
  currentItem,
  filterByRegions,
  indexById,
  isAnswered,
  sessionMistakes,
  sessionScore,
  shuffle,
  verdict
} from '../src/quiz/engine.js';
import { QUESTIONS } from '../src/data/muscles.js';

// Deterministyczny generator (mulberry32) – powtarzalne testy losowości.
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('shuffle (Fisher–Yates)', () => {
  test('zwraca permutację i nie modyfikuje wejścia', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8];
    const copy = input.slice();
    const out = shuffle(input, seeded(1));
    assert.deepEqual(input, copy);
    assert.notEqual(out, input);
    assert.deepEqual(out.slice().sort((a, b) => a - b), copy);
  });

  test('jest deterministyczne przy tym samym ziarnie', () => {
    assert.deepEqual(shuffle([...'abcdefgh'], seeded(42)), shuffle([...'abcdefgh'], seeded(42)));
  });

  test('wykonuje zamiany zgodnie z algorytmem (rng = 0 przesuwa elementy cyklicznie)', () => {
    // Przy rng() = 0 zawsze j = 0: [a,b,c,d] -> zamiana(3,0) -> zamiana(2,0) -> zamiana(1,0)
    assert.deepEqual(shuffle(['a', 'b', 'c', 'd'], () => 0), ['b', 'c', 'd', 'a']);
    // Przy rng() bliskim 1 zawsze j = i: brak zmian
    assert.deepEqual(shuffle(['a', 'b', 'c', 'd'], () => 0.999999), ['a', 'b', 'c', 'd']);
  });

  test('rozkład permutacji jest w przybliżeniu jednostajny', () => {
    const rng = seeded(7);
    const counts = new Map();
    const runs = 60000;
    for (let i = 0; i < runs; i++) {
      const key = shuffle(['a', 'b', 'c'], rng).join('');
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    assert.equal(counts.size, 6);
    for (const n of counts.values()) assert.ok(Math.abs(n - runs / 6) < runs * 0.01, `nierówny rozkład: ${n}`);
  });

  test('obsługuje tablice puste i jednoelementowe', () => {
    assert.deepEqual(shuffle([]), []);
    assert.deepEqual(shuffle(['x']), ['x']);
  });
});

describe('filterByRegions', () => {
  test('pusta lista regionów zwraca całą bazę', () => {
    assert.equal(filterByRegions(QUESTIONS, []).length, QUESTIONS.length);
  });
  test('filtruje po regionie', () => {
    const out = filterByRegions(QUESTIONS, ['nogi']);
    assert.ok(out.length > 0);
    assert.ok(out.every((q) => q.region === 'nogi'));
  });
});

describe('buildOptions', () => {
  test('daje 4 różne odpowiedzi z poprawną pod correctIndex – dla każdego pytania', () => {
    const rng = seeded(3);
    for (const q of QUESTIONS) {
      for (let k = 0; k < 20; k++) {
        const { options, correctIndex } = buildOptions(q, QUESTIONS, rng);
        assert.equal(options.length, OPTION_COUNT);
        assert.equal(new Set(options).size, OPTION_COUNT, `powtórzona odpowiedź w ${q.id}`);
        assert.equal(options[correctIndex], q.name);
        assert.equal(options.filter((o) => o === q.name).length, 1);
      }
    }
  });

  test('poprawna odpowiedź trafia na każdą z 4 pozycji (tasowanie odpowiedzi)', () => {
    const rng = seeded(11);
    const positions = new Set();
    for (let i = 0; i < 200; i++) positions.add(buildOptions(QUESTIONS[0], QUESTIONS, rng).correctIndex);
    assert.deepEqual([...positions].sort(), [0, 1, 2, 3]);
  });

  test('uzupełnia brakujące dystraktory nazwami z tego samego regionu', () => {
    const q = { id: 'x', region: 'nogi', name: 'Mięsień testowy', distractors: ['Mięsień krawiecki'] };
    const pool = [q, ...QUESTIONS];
    const { options } = buildOptions(q, pool, seeded(5));
    assert.equal(new Set(options).size, 4);
    const legNames = new Set(QUESTIONS.filter((x) => x.region === 'nogi').map((x) => x.name));
    for (const o of options) if (o !== q.name && o !== 'Mięsień krawiecki') assert.ok(legNames.has(o));
  });

  test('ignoruje dystraktor równy poprawnej odpowiedzi i duplikaty', () => {
    const q = { id: 'y', region: 'brzuch', name: 'A', distractors: ['A', 'B', 'B', 'C', 'D'] };
    const { options } = buildOptions(q, [q], seeded(9));
    assert.deepEqual(options.slice().sort(), ['A', 'B', 'C', 'D']);
  });

  test('zgłasza błąd, gdy nie da się zbudować 4 odpowiedzi', () => {
    const q = { id: 'z', region: 'r', name: 'A', distractors: ['B'] };
    assert.throws(() => buildOptions(q, [q], seeded(1)));
  });
});

describe('createSession', () => {
  test('losowa kolejność bez powtórzeń, długość zgodna z ustawieniem', () => {
    const s = createSession(QUESTIONS, { length: 10, rng: seeded(1) });
    assert.equal(s.items.length, 10);
    const ids = s.items.map((i) => i.questionId);
    assert.equal(new Set(ids).size, ids.length);
    assert.equal(s.index, 0);
    assert.equal(s.finished, false);
  });

  test('długość 0 = wszystkie pytania, każde dokładnie raz', () => {
    const s = createSession(QUESTIONS, { length: 0, rng: seeded(2) });
    assert.equal(s.items.length, QUESTIONS.length);
    assert.deepEqual(new Set(s.items.map((i) => i.questionId)), new Set(QUESTIONS.map((q) => q.id)));
  });

  test('długość większa niż pula jest przycinana', () => {
    const s = createSession(QUESTIONS, { regions: ['klatka'], length: 20, rng: seeded(3) });
    assert.equal(s.items.length, QUESTIONS.filter((q) => q.region === 'klatka').length);
  });

  test('różne ziarna dają różną kolejność', () => {
    const a = createSession(QUESTIONS, { length: 0, rng: seeded(10) }).items.map((i) => i.questionId);
    const b = createSession(QUESTIONS, { length: 0, rng: seeded(11) }).items.map((i) => i.questionId);
    assert.notDeepEqual(a, b);
  });

  test('tryb powtórki ogranicza się do wskazanych pytań', () => {
    const only = ['soleus', 'anconeus', 'pyramidalis'];
    const s = createSession(QUESTIONS, { onlyIds: only, length: 0, mode: 'mistakes', rng: seeded(4) });
    assert.equal(s.mode, 'mistakes');
    assert.deepEqual(new Set(s.items.map((i) => i.questionId)), new Set(only));
  });

  test('pusta pula daje zakończoną, pustą sesję', () => {
    const s = createSession(QUESTIONS, { onlyIds: [], length: 0 });
    assert.equal(s.items.length, 0);
    assert.equal(s.finished, true);
    assert.equal(currentItem(s), null);
  });
});

describe('przebieg sesji', () => {
  const fresh = () => createSession(QUESTIONS, { length: 3, rng: seeded(21) });

  test('odpowiedź jest blokowana – druga próba jest ignorowana', () => {
    let s = fresh();
    const item = currentItem(s);
    const wrong = (item.correctIndex + 1) % 4;
    const first = answerCurrent(s, wrong);
    assert.equal(first.accepted, true);
    assert.equal(first.correct, false);
    s = first.session;
    const second = answerCurrent(s, item.correctIndex);
    assert.equal(second.accepted, false);
    assert.equal(second.session, s, 'stan nie może się zmienić');
    assert.deepEqual(s.answers[0], { choice: wrong, correct: false });
  });

  test('nie modyfikuje poprzedniego stanu (niemutowalność)', () => {
    const s = fresh();
    const { session } = answerCurrent(s, 0);
    assert.equal(s.answers[0], null);
    assert.notEqual(session, s);
  });

  test('odrzuca nieprawidłowy indeks odpowiedzi', () => {
    const s = fresh();
    for (const bad of [-1, 4, 1.5, NaN, '1', undefined]) assert.equal(answerCurrent(s, bad).accepted, false);
  });

  test('przejście dalej wymaga odpowiedzi; po ostatnim pytaniu sesja się kończy', () => {
    let s = fresh();
    assert.equal(advance(s), s, 'bez odpowiedzi nie przechodzimy dalej');
    for (let i = 0; i < 3; i++) {
      assert.equal(isAnswered(s), false);
      s = answerCurrent(s, currentItem(s).correctIndex).session;
      assert.equal(isAnswered(s), true);
      s = advance(s);
    }
    assert.equal(s.finished, true);
    assert.equal(advance(s), s);
    assert.equal(answerCurrent(s, 0).accepted, false);
  });

  test('wynik i lista błędów sesji', () => {
    let s = fresh();
    const chosen = [];
    for (let i = 0; i < 3; i++) {
      const it = currentItem(s);
      const choice = i === 1 ? (it.correctIndex + 2) % 4 : it.correctIndex;
      chosen.push(it.options[choice]);
      s = advance(answerCurrent(s, choice).session);
    }
    assert.deepEqual(sessionScore(s), { total: 3, answered: 3, correct: 2, wrong: 1, percent: 67 });
    const mistakes = sessionMistakes(s, indexById(QUESTIONS));
    assert.equal(mistakes.length, 1);
    assert.equal(mistakes[0].question.id, s.items[1].questionId);
    assert.equal(mistakes[0].chosen, chosen[1]);
  });

  test('wynik pustej sesji nie dzieli przez zero', () => {
    const s = createSession(QUESTIONS, { onlyIds: [] });
    assert.deepEqual(sessionScore(s), { total: 0, answered: 0, correct: 0, wrong: 0, percent: 0 });
  });
});

test('verdict zwraca ocenę słowną dla progów', () => {
  const texts = [100, 90, 75, 55, 10].map(verdict);
  assert.ok(texts.every((t) => typeof t === 'string' && t.length > 10));
  assert.notEqual(verdict(95), verdict(20));
});
