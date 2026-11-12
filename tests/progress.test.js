import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEY,
  clearMistakes,
  clearProgress,
  emptyProgress,
  lifetimeSummary,
  loadProgress,
  recordAnswer,
  recordSessionEnd,
  saveProgress,
  updateSettings
} from '../src/quiz/progress.js';

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    dump: () => Object.fromEntries(data)
  };
}

describe('rejestrowanie odpowiedzi', () => {
  test('błędna odpowiedź trafia na listę powtórek, bez duplikatów', () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'soleus', false);
    p = recordAnswer(p, 'soleus', false);
    p = recordAnswer(p, 'anconeus', false);
    assert.deepEqual(p.mistakes, ['soleus', 'anconeus']);
    assert.deepEqual(p.lifetime, { answered: 3, correct: 0, sessions: 0 });
    assert.deepEqual(p.perQuestion.soleus, { seen: 2, correct: 0 });
  });

  test('poprawna odpowiedź usuwa opanowane pytanie z listy błędów', () => {
    let p = emptyProgress();
    p = recordAnswer(p, 'soleus', false);
    p = recordAnswer(p, 'anconeus', false);
    p = recordAnswer(p, 'soleus', true);
    assert.deepEqual(p.mistakes, ['anconeus']);
    assert.deepEqual(p.perQuestion.soleus, { seen: 2, correct: 1 });
    assert.equal(p.lifetime.correct, 1);
  });

  test('nie mutuje poprzedniego stanu', () => {
    const p = emptyProgress();
    const q = recordAnswer(p, 'x', false);
    assert.equal(p.lifetime.answered, 0);
    assert.deepEqual(p.mistakes, []);
    assert.equal(q.lifetime.answered, 1);
  });

  test('licznik sesji i czyszczenie listy błędów', () => {
    let p = recordAnswer(emptyProgress(), 'x', false);
    p = recordSessionEnd(p);
    assert.equal(p.lifetime.sessions, 1);
    p = clearMistakes(p);
    assert.deepEqual(p.mistakes, []);
    assert.equal(p.lifetime.answered, 1, 'czyszczenie błędów nie zeruje statystyk');
  });

  test('podsumowanie całkowite', () => {
    let p = emptyProgress();
    for (const [id, ok] of [['a', true], ['b', false], ['c', true], ['a', true]]) p = recordAnswer(p, id, ok);
    assert.deepEqual(lifetimeSummary(p), { answered: 4, correct: 3, sessions: 0, percent: 75, mistakes: 1, mastered: 2 });
    assert.equal(lifetimeSummary(emptyProgress()).percent, 0);
  });
});

describe('localStorage', () => {
  test('zapis i odczyt zachowują stan', () => {
    const storage = memoryStorage();
    let p = recordAnswer(emptyProgress(), 'soleus', false);
    p = updateSettings(p, { regions: ['nogi'], length: 5 });
    assert.equal(saveProgress(storage, p), true);
    assert.deepEqual(loadProgress(storage), p);
    assert.ok(storage.dump()[STORAGE_KEY].includes('soleus'));
  });

  test('uszkodzony JSON lub obca wersja dają pusty stan', () => {
    assert.deepEqual(loadProgress(memoryStorage({ [STORAGE_KEY]: '{nie-json' })), emptyProgress());
    assert.deepEqual(loadProgress(memoryStorage({ [STORAGE_KEY]: JSON.stringify({ version: 99 }) })), emptyProgress());
    assert.deepEqual(loadProgress(memoryStorage()), emptyProgress());
    assert.deepEqual(loadProgress(null), emptyProgress());
  });

  test('sanityzacja: nieznane pytania, ujemne liczby, duplikaty', () => {
    const raw = {
      version: 1,
      lifetime: { answered: 5, correct: 9, sessions: -2 },
      perQuestion: { soleus: { seen: 2, correct: 7 }, usuniete: { seen: 1, correct: 1 } },
      mistakes: ['soleus', 'soleus', 'usuniete', 42],
      settings: { regions: ['nogi', 'nogi', 3], length: -1 }
    };
    const p = loadProgress(memoryStorage({ [STORAGE_KEY]: JSON.stringify(raw) }), new Set(['soleus']));
    assert.deepEqual(p.lifetime, { answered: 5, correct: 5, sessions: 0 });
    assert.deepEqual(p.perQuestion, { soleus: { seen: 2, correct: 2 } });
    assert.deepEqual(p.mistakes, ['soleus']);
    assert.deepEqual(p.settings, { regions: ['nogi'], length: 10 });
  });

  test('błąd zapisu (np. limit pamięci) nie przerywa działania', () => {
    const broken = { getItem: () => null, setItem: () => { throw new Error('QuotaExceeded'); }, removeItem: () => {} };
    assert.equal(saveProgress(broken, emptyProgress()), false);
  });

  test('reset usuwa wpis i zwraca pusty stan', () => {
    const storage = memoryStorage();
    saveProgress(storage, recordAnswer(emptyProgress(), 'x', false));
    const p = clearProgress(storage);
    assert.deepEqual(p, emptyProgress());
    assert.equal(storage.getItem(STORAGE_KEY), null);
  });
});
