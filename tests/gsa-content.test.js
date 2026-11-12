import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { MODULES, CHAPTER_NOTES, EXERCISES, TESTS } from '../src/data/gsa-content.js';
import { QUESTIONS } from '../src/data/muscles.js';

const root = new URL('../', import.meta.url);
const figPath = ({ page, index }) =>
  new URL(`assets/gsa/figures/p${String(page).padStart(3, '0')}-${String(index).padStart(2, '0')}.webp`, root);
const isStr = (s) => typeof s === 'string' && s.trim().length > 0;
const ids = new Set(QUESTIONS.map((q) => q.id));

// Strony PDF rozdziałów 2. poziomu ze spisu treści (work/gsa-toc.json).
const CHAPTER_PAGES = [7, 8, 9, 10, 11, 22, 24, 37, 39, 40, 41, 75, 76, 77, 78, 81, 84, 86, 86, 87, 88, 89, 95, 97, 98, 100];

test('MODULES: 5 modułów m1..m5', () => {
  assert.deepEqual(MODULES.map((m) => m.id), ['m1', 'm2', 'm3', 'm4', 'm5']);
  for (const m of MODULES) assert.ok(isStr(m.title) && isStr(m.overview));
});

test('CHAPTER_NOTES: 26 notatek, po jednej na rozdział, 3–5 punktów', () => {
  assert.equal(CHAPTER_NOTES.length, 26);
  assert.deepEqual(CHAPTER_NOTES.map((n) => n.page), CHAPTER_PAGES);
  for (const n of CHAPTER_NOTES) {
    assert.ok(isStr(n.title) && isStr(n.summary), n.title);
    assert.ok(n.points.length >= 3 && n.points.length <= 5, n.title);
    n.points.forEach((p) => assert.ok(isStr(p)));
  }
});

test('EXERCISES: schemat, unikalne id, mięśnie i zdjęcia', () => {
  const seen = new Set();
  for (const e of EXERCISES) {
    assert.match(e.id, /^[a-z0-9-]+$/);
    assert.ok(!seen.has(e.id), `duplikat ${e.id}`);
    seen.add(e.id);
    assert.ok(['siłowe', 'mobility', 'wariant'].includes(e.kind), e.id);
    for (const k of ['title', 'region', 'pattern', 'setup', 'note']) assert.ok(isStr(e[k]), `${e.id}.${k}`);
    assert.ok(e.pages.length > 0 && e.pages.every(Number.isInteger), e.id);
    assert.ok(e.steps.length >= 2 && e.mistakes.length >= 1, e.id);
    assert.ok(e.figures.length >= 1, `${e.id} bez zdjęcia`);
    for (const fig of e.figures) assert.ok(existsSync(figPath(fig)), `${e.id}: brak ${figPath(fig).pathname}`);
    assert.ok(e.muscles.length >= 1, e.id);
    for (const m of e.muscles) {
      assert.ok(m.id === null || ids.has(m.id), `${e.id}: nieznane id ${m.id}`);
      assert.ok(isStr(m.name));
      assert.ok(['główny', 'pomocniczy', 'stabilizacja', 'rozciągany'].includes(m.role));
    }
  }
});

test('EXERCISES: 7 ćwiczeń siłowych i wszystkie 38 ćwiczeń mobility ze s. 54–73', () => {
  assert.equal(EXERCISES.filter((e) => e.kind === 'siłowe').length, 7);
  const mob = EXERCISES.filter((e) => e.kind === 'mobility');
  assert.equal(mob.length, 38);
  assert.ok(mob.every((e) => e.pages[0] >= 54 && e.pages[0] <= 73));
  const figs = new Set(mob.flatMap((e) => e.figures.map((f) => `${f.page}-${f.index}`)));
  assert.equal(figs.size, 38, 'każde zdjęcie mobility użyte dokładnie raz');
});

test('TESTS: 9 testów z kompletem pól, Patrick/FABER i źródła', () => {
  assert.equal(TESTS.length, 9);
  for (const t of TESTS) {
    for (const k of ['id', 'title', 'region', 'goal', 'setup', 'interpretation', 'stop']) assert.ok(isStr(t[k]), `${t.id}.${k}`);
    for (const k of ['aliases', 'equipment', 'steps', 'observe', 'errors']) assert.ok(t[k].length >= 1, `${t.id}.${k}`);
    assert.ok(t.steps.length >= 3, t.id);
    assert.ok(t.figures.length >= 1 && t.figures.every((f) => existsSync(figPath(f))), t.id);
    assert.ok(t.sources.length >= 1 && t.sources.every((s) => isStr(s.title) && isStr(s.url)), t.id);
    assert.doesNotMatch(t.interpretation, /zablokowan/i, `${t.id}: brak diagnozy „zablokowania”`);
  }
  const patrick = TESTS.find((t) => t.id === 'patrick-faber');
  assert.ok(patrick.aliases.some((a) => /FABER/.test(a)) && /Patricka/.test(patrick.title));
  assert.ok(patrick.sources.some((s) => s.url.includes('PMC4399382')));
  assert.ok(TESTS.find((t) => t.id === 'thomas-zmodyfikowany').sources.some((s) => s.url.includes('PMC4991856')));
  assert.ok(TESTS.find((t) => t.id === 'rotacja-ramienia').pages.includes(35));
});
