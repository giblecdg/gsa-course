// Szablony HTML prawej kolumny (ustawienia, pytanie, podsumowanie).
// Każdy tekst z danych przechodzi przez esc().

import { REGIONS, regionLabel } from '../data/muscles.js';
import { SESSION_LENGTHS } from '../quiz/engine.js';

export function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function pagesLabel(pages) {
  return `s. ${pages.join(', ')}`;
}

const lengthLabel = (n) => (n === 0 ? 'Wszystkie' : String(n));

function statsBlock(stats) {
  return `
    <section class="stats" aria-labelledby="stats-title">
      <h2 class="section-title" id="stats-title">Twoje statystyki</h2>
      <dl class="stats__grid">
        <div><dt>Odpowiedzi</dt><dd>${stats.answered}</dd></div>
        <div><dt>Skuteczność</dt><dd>${stats.answered ? `${stats.percent}%` : '—'}</dd></div>
        <div><dt>Sesje</dt><dd>${stats.sessions}</dd></div>
        <div><dt>Do powtórki</dt><dd>${stats.mistakes}</dd></div>
      </dl>
      <div class="stats__actions">
        <button type="button" class="btn btn--quiet" data-action="clear-mistakes" ${stats.mistakes ? '' : 'disabled'}>Wyczyść listę błędów</button>
        <button type="button" class="btn btn--quiet btn--danger" data-action="reset-all" ${stats.answered || stats.mistakes ? '' : 'disabled'}>Resetuj wszystkie statystyki</button>
      </div>
    </section>`;
}

export function setupScreen({ selected, length, counts, available, stats, notice }) {
  const regionChips = REGIONS.map(
    (r) => `
      <label class="chip">
        <input type="checkbox" name="region" value="${esc(r.id)}" ${selected.includes(r.id) ? 'checked' : ''} />
        <span>${esc(r.label)} <small>${counts[r.id] || 0}</small></span>
      </label>`
  ).join('');

  const lengthOptions = SESSION_LENGTHS.map(
    (n) => `
      <label class="seg">
        <input type="radio" name="length" value="${n}" ${n === length ? 'checked' : ''} />
        <span>${lengthLabel(n)}</span>
      </label>`
  ).join('');

  const planned = length === 0 ? available : Math.min(length, available);
  const empty = available === 0;

  return `
    <div class="card">
      <p class="eyebrow">Anatomia w praktyce trenera</p>
      <h1 class="display">Rozpoznaj mięsień</h1>
      <p class="lead">Na tablicy po lewej jeden mięsień zostanie wyróżniony na <span class="ink-coral">koralowo</span>. Wybierz jego nazwę spośród czterech odpowiedzi. Po każdej odpowiedzi zobaczysz funkcję mięśnia i strony atlasu, na których jest opisany.</p>

      ${notice ? `<p class="notice" role="status">${esc(notice)}</p>` : ''}

      <form class="setup" id="setup-form" novalidate>
        <fieldset class="field">
          <legend class="section-title">Okolice ciała</legend>
          <div class="chips">${regionChips}</div>
          <div class="field__tools">
            <button type="button" class="link-btn" data-action="regions-all">Zaznacz wszystkie</button>
            <button type="button" class="link-btn" data-action="regions-none">Odznacz wszystkie</button>
          </div>
        </fieldset>

        <fieldset class="field">
          <legend class="section-title">Długość sesji</legend>
          <div class="segmented">${lengthOptions}</div>
        </fieldset>

        ${
          empty
            ? `<div class="empty" role="status">
                 <p class="empty__title">Brak pytań do wyświetlenia</p>
                 <p>Zaznacz co najmniej jedną okolicę ciała, aby rozpocząć sesję.</p>
               </div>`
            : `<p class="summary-line" role="status">Sesja: <strong>${planned}</strong> ${plural(planned, 'pytanie', 'pytania', 'pytań')} z ${available} dostępnych, w losowej kolejności.</p>`
        }

        <div class="actions">
          <button type="submit" class="btn btn--primary" ${empty ? 'disabled' : ''}>Rozpocznij sesję</button>
          <button type="button" class="btn btn--secondary" data-action="retry-mistakes" ${stats.mistakes ? '' : 'disabled'}>Powtórz błędy (${stats.mistakes})</button>
        </div>
        ${stats.mistakes ? '' : '<p class="hint">Lista błędów jest pusta – pomylone mięśnie trafią tu automatycznie.</p>'}
      </form>
    </div>
    ${statsBlock(stats)}
    <p class="kbd-hint">Skróty: <kbd>1</kbd>–<kbd>4</kbd> wybór odpowiedzi, <kbd>Enter</kbd> następne pytanie.</p>`;
}

export function questionScreen({ session, question, item, answer, score }) {
  const n = session.index + 1;
  const total = session.items.length;
  const answered = answer != null;
  const isLast = n === total;

  const options = item.options
    .map((opt, i) => {
      let state = '';
      if (answered) {
        if (i === item.correctIndex) state = 'is-correct';
        else if (i === answer.choice) state = 'is-wrong';
        else state = 'is-dimmed';
      }
      const mark = answered && i === item.correctIndex ? '<span class="option__mark" aria-hidden="true">✓</span>' : answered && i === answer.choice ? '<span class="option__mark" aria-hidden="true">✕</span>' : '';
      const srState = answered && i === item.correctIndex ? ' (poprawna odpowiedź)' : answered && i === answer.choice ? ' (twoja odpowiedź)' : '';
      return `
        <li>
          <button type="button" class="option ${state}" data-option="${i}" ${answered ? 'disabled aria-disabled="true"' : ''}>
            <kbd class="option__key">${i + 1}</kbd>
            <span class="option__label">${esc(opt)}<span class="sr-only">${srState}</span></span>
            ${mark}
          </button>
        </li>`;
    })
    .join('');

  const feedback = answered
    ? `
      <div class="feedback ${answer.correct ? 'feedback--ok' : 'feedback--bad'}">
        <p class="feedback__status">${answer.correct ? 'Dobrze!' : 'Niestety, to nie ten mięsień.'}</p>
        <p class="feedback__name"><strong>${esc(question.name)}</strong> <span class="latin">${esc(question.latin)}</span></p>
        <p class="feedback__fn">${esc(question.fn)}</p>
        <p class="feedback__src">Atlas, ${esc(pagesLabel(question.pages))}</p>
      </div>`
    : '';

  return `
    <div class="card card--quiz">
      <div class="quiz-meta">
        <span>Pytanie <strong>${n}</strong> z ${total}${session.mode === 'mistakes' ? ' · powtórka błędów' : ''}</span>
        <span>Poprawne: <strong>${score.correct}</strong></span>
      </div>
      <div class="progress" role="progressbar" aria-label="Postęp sesji" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${score.answered}">
        <span style="width:${(score.answered / total) * 100}%"></span>
      </div>
      <p class="tag">${esc(regionLabel(question.region))}</p>
      <h2 class="question" id="question-title" tabindex="-1">Który mięsień zaznaczono na koralowo?</h2>
      <ol class="options" aria-labelledby="question-title">${options}</ol>
      <div class="feedback-slot" role="status" aria-live="polite">${feedback}</div>
      <div class="actions actions--split">
        <button type="button" class="link-btn" data-action="quit">Przerwij sesję</button>
        ${answered ? `<button type="button" class="btn btn--primary" data-action="next">${isLast ? 'Zobacz podsumowanie' : 'Następne pytanie'} <kbd class="kbd-inline">Enter</kbd></button>` : '<span class="hint hint--inline">Wybierz odpowiedź (klawisze 1–4)</span>'}
      </div>
    </div>`;
}

export function summaryScreen({ session, score, verdictText, mistakes, stats }) {
  const list = mistakes.length
    ? `<ol class="mistakes">${mistakes
        .map(
          ({ question, chosen }) => `
          <li>
            <p><strong>${esc(question.name)}</strong> <span class="latin">${esc(question.latin)}</span></p>
            <p class="mistakes__chosen">Twoja odpowiedź: ${esc(chosen)}</p>
            <p class="mistakes__src">${esc(regionLabel(question.region))} · Atlas, ${esc(pagesLabel(question.pages))}</p>
          </li>`
        )
        .join('')}</ol>`
    : '<p class="empty__title">Bez błędów w tej sesji.</p>';

  return `
    <div class="card">
      <p class="eyebrow">${session.mode === 'mistakes' ? 'Powtórka błędów zakończona' : 'Sesja zakończona'}</p>
      <h2 class="display">Podsumowanie</h2>
      <div class="score">
        <p class="score__big"><span>${score.correct}</span><small>/ ${score.total}</small></p>
        <p class="score__pct">${score.percent}% poprawnych odpowiedzi</p>
      </div>
      <p class="lead">${esc(verdictText)}</p>
      <h3 class="section-title">Do powtórki z tej sesji</h3>
      ${list}
      <div class="actions">
        <button type="button" class="btn btn--primary" data-action="restart">Nowa sesja</button>
        <button type="button" class="btn btn--secondary" data-action="retry-mistakes" ${stats.mistakes ? '' : 'disabled'}>Powtórz błędy (${stats.mistakes})</button>
        <button type="button" class="link-btn" data-action="settings">Zmień ustawienia</button>
      </div>
    </div>
    ${statsBlock(stats)}`;
}

export function plural(n, one, few, many) {
  if (n === 1) return one;
  const d = n % 10;
  const dd = n % 100;
  return d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? few : many;
}
