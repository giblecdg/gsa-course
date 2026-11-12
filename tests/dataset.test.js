import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, REGIONS } from '../src/data/muscles.js';
import { CROPS, VIEWS } from '../src/anatomy/figures.js';
import { PALETTE, renderPlate } from '../src/anatomy/render.js';

const ATLAS_PAGES = 57;
const REQUIRED_REGIONS = ['klatka', 'barki', 'grzbiet', 'ramiona', 'brzuch', 'posladki', 'nogi'];
// Słowa ogólne, które mogą pojawić się w opisie położenia bez zdradzania odpowiedzi.
const GENERIC = new Set(['mięsień', 'mięśnie', 'część', 'ramienia', 'brzucha', 'nadgarstka', 'palców', 'łydki', 'uda', 'grzbietu', 'lędźwi']);

describe('zbiór pytań', () => {
  test('co najmniej 24 pytania o unikalnych id i nazwach', () => {
    assert.ok(QUESTIONS.length >= 24, `jest ${QUESTIONS.length}`);
    assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length);
    assert.equal(new Set(QUESTIONS.map((q) => q.name)).size, QUESTIONS.length);
  });

  test('pokrywa wszystkie wymagane okolice ciała (min. 3 pytania każda)', () => {
    assert.deepEqual(REGIONS.map((r) => r.id).sort(), [...REQUIRED_REGIONS].sort());
    for (const id of REQUIRED_REGIONS) {
      const n = QUESTIONS.filter((q) => q.region === id).length;
      assert.ok(n >= 3, `okolica ${id}: ${n} pytań`);
    }
  });

  for (const q of QUESTIONS) {
    describe(q.id, () => {
      test('pola tekstowe i odniesienia do atlasu', () => {
        for (const key of ['name', 'latin', 'alt', 'fn']) assert.ok(typeof q[key] === 'string' && q[key].trim().length > 3, key);
        assert.ok(q.fn.length >= 60, 'wyjaśnienie funkcji jest zbyt krótkie');
        assert.ok(Array.isArray(q.pages) && q.pages.length > 0);
        for (const p of q.pages) assert.ok(Number.isInteger(p) && p >= 1 && p <= ATLAS_PAGES, `strona ${p}`);
        assert.deepEqual(q.pages, [...new Set(q.pages)].sort((a, b) => a - b), 'strony rosnąco, bez powtórzeń');
      });

      test('co najmniej 3 różne dystraktory, inne niż poprawna odpowiedź', () => {
        assert.ok(q.distractors.length >= 3);
        assert.equal(new Set(q.distractors).size, q.distractors.length);
        assert.ok(!q.distractors.includes(q.name));
      });

      test('cele istnieją w widoku i są mięśniami; kadr jest poprawny', () => {
        const view = VIEWS[q.view];
        assert.ok(view, `widok ${q.view}`);
        assert.ok(q.targets.length > 0);
        for (const t of q.targets) {
          const part = view.parts.find((p) => p.key === t);
          assert.ok(part, `brak elementu ${t} w widoku ${q.view}`);
          assert.equal(part.kind, 'muscle');
        }
        if (q.crop) assert.ok(CROPS[q.crop], `kadr ${q.crop}`);
      });

      test('opis alternatywny nie zdradza nazwy mięśnia', () => {
        // Prefiks „Widok przedni/tylny…:” opisuje widok, a nie mięsień – pomijamy go.
        const alt = q.alt.toLowerCase().replace(/^[^:]*:/, '');
        const words = q.name
          .toLowerCase()
          .split(/[\s–-]+/)
          .filter((w) => w.length > 3 && !GENERIC.has(w));
        assert.ok(words.length > 0);
        for (const w of words) assert.ok(!alt.includes(w), `alt zawiera słowo „${w}”`);
        assert.ok(!alt.includes(q.latin.toLowerCase()));
      });

      test('tablica: cel na koralowo, kontekst niebiesko-szary, bez tekstu', () => {
        const svg = renderPlate({ viewId: q.view, targets: q.targets, crop: q.crop });
        const targetCount = (svg.match(/muscle--target/g) || []).length;
        const contextCount = (svg.match(/muscle--context/g) || []).length;
        assert.ok(targetCount > 0, 'brak podświetlenia');
        assert.ok(contextCount > targetCount, 'za mało mięśni kontekstowych');
        assert.ok(svg.includes(`fill="${PALETTE.target}"`));
        assert.ok(svg.includes(`fill="${PALETTE.context}"`));
        assert.ok(!/<text|<title|<desc/.test(svg), 'tablica nie może zawierać podpisów');
        assert.ok(!svg.toLowerCase().includes(q.name.toLowerCase()));
      });
    });
  }
});

describe('ryciny', () => {
  test('każdy widok ma unikalne klucze i niepuste ścieżki', () => {
    for (const [id, view] of Object.entries(VIEWS)) {
      const keys = view.parts.map((p) => p.key);
      assert.equal(new Set(keys).size, keys.length, `duplikat klucza w ${id}`);
      for (const part of view.parts) {
        assert.ok(['muscle', 'bone', 'ghost'].includes(part.kind));
        assert.ok(part.paths.length > 0);
        for (const p of part.paths) assert.match(p.d, /^M /, `${id}/${part.key}`);
      }
    }
  });

  test('różne pytania w tym samym widoku podświetlają różne obszary', () => {
    const seen = new Map();
    for (const q of QUESTIONS) {
      const key = `${q.view}:${[...q.targets].sort().join(',')}`;
      assert.ok(!seen.has(key), `${q.id} i ${seen.get(key)} mają identyczne podświetlenie`);
      seen.set(key, q.id);
    }
  });

  test('nieznany widok zgłasza błąd', () => {
    assert.throws(() => renderPlate({ viewId: 'nie-ma' }));
  });

  test('tablica bez celu nie zawiera koloru podświetlenia', () => {
    const svg = renderPlate({ viewId: 'front' });
    assert.ok(!svg.includes('muscle--target'));
  });

  test('identyfikatory wzorów są unikalne dla prefiksu (wiele tablic na stronie)', () => {
    const a = renderPlate({ viewId: 'back', targets: ['trapezius'], idPrefix: 'a' });
    const b = renderPlate({ viewId: 'back', targets: ['trapezius'], idPrefix: 'b' });
    const ids = (s) => [...s.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(ids(a).length > 0);
    assert.ok(ids(a).every((id) => !ids(b).includes(id)));
  });
});
