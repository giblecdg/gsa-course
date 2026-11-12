// Kontroler aplikacji: łączy dane, logikę quizu, postęp i widoki.

import { QUESTIONS, REGIONS } from './data/muscles.js';
import {
  advance,
  answerCurrent,
  createSession,
  currentItem,
  filterByRegions,
  indexById,
  isAnswered,
  sessionMistakes,
  sessionScore,
  verdict
} from './quiz/engine.js';
import {
  clearMistakes,
  clearProgress,
  lifetimeSummary,
  loadProgress,
  recordAnswer,
  recordSessionEnd,
  saveProgress,
  updateSettings
} from './quiz/progress.js';
import { showPlate } from './ui/plate.js';
import { plural, questionScreen, setupScreen, summaryScreen } from './ui/templates.js';

const byId = indexById(QUESTIONS);
const storage = safeStorage();

const state = {
  screen: 'setup', // 'setup' | 'quiz' | 'summary'
  progress: loadProgress(storage, new Set(byId.keys())),
  session: null,
  notice: '',
  confirmReset: null // { action, timer }
};

const els = {
  panel: document.getElementById('panel'),
  topStats: document.getElementById('topbar-stats'),
  plate: {
    svg: document.getElementById('plate-svg'),
    number: document.getElementById('plate-number'),
    view: document.getElementById('plate-view'),
    layer: document.getElementById('plate-layer'),
    answer: document.getElementById('plate-answer')
  }
};

function safeStorage() {
  try {
    const s = window.localStorage;
    const probe = '__anatomia_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null; // brak localStorage – postęp tylko w pamięci
  }
}

function persist() {
  saveProgress(storage, state.progress);
}

function selectedRegions() {
  const r = state.progress.settings.regions;
  return Array.isArray(r) ? r.filter((id) => REGIONS.some((x) => x.id === id)) : REGIONS.map((x) => x.id);
}

function regionCounts() {
  const counts = {};
  for (const q of QUESTIONS) counts[q.region] = (counts[q.region] || 0) + 1;
  return counts;
}

// --- Renderowanie ------------------------------------------------------------

function render({ focus } = {}) {
  const stats = lifetimeSummary(state.progress);
  els.topStats.textContent = stats.answered
    ? `${stats.percent}% skuteczności · ${stats.answered} ${plural(stats.answered, 'odpowiedź', 'odpowiedzi', 'odpowiedzi')}`
    : 'Brak zapisanych wyników';

  if (state.screen === 'setup') renderSetup(stats);
  else if (state.screen === 'quiz') renderQuiz();
  else renderSummary(stats);

  if (focus) {
    const target = els.panel.querySelector(focus);
    if (target) target.focus({ preventScroll: false });
  }
}

function renderSetup(stats) {
  const selected = selectedRegions();
  const available = selected.length ? filterByRegions(QUESTIONS, selected).length : 0;
  els.panel.innerHTML = setupScreen({
    selected,
    length: state.progress.settings.length,
    counts: regionCounts(),
    available,
    stats,
    notice: state.notice
  });
  showPlate(els.plate, { question: null, number: '—' });
  applyConfirmState();
}

function renderQuiz() {
  const { session } = state;
  const item = currentItem(session);
  const question = byId.get(item.questionId);
  const answer = session.answers[session.index];
  els.panel.innerHTML = questionScreen({ session, question, item, answer, score: sessionScore(session) });
  showPlate(els.plate, {
    question,
    revealed: answer != null,
    number: `${session.index + 1} / ${session.items.length}`
  });
}

function renderSummary(stats) {
  const { session } = state;
  const score = sessionScore(session);
  els.panel.innerHTML = summaryScreen({
    session,
    score,
    verdictText: verdict(score.percent),
    mistakes: sessionMistakes(session, byId),
    stats
  });
  applyConfirmState();
}

// --- Akcje -------------------------------------------------------------------

function startSession(mode) {
  state.notice = '';
  const cfg =
    mode === 'mistakes'
      ? { mode, onlyIds: state.progress.mistakes, length: 0 }
      : { mode, regions: selectedRegions(), length: state.progress.settings.length };

  if (mode === 'normal' && cfg.regions.length === 0) return;
  const session = createSession(QUESTIONS, cfg);
  if (session.items.length === 0) {
    state.notice = mode === 'mistakes' ? 'Brak błędów do powtórki – świetna robota!' : 'Brak pytań dla wybranych ustawień.';
    state.screen = 'setup';
    render({ focus: '.notice' });
    return;
  }
  state.session = session;
  state.screen = 'quiz';
  render({ focus: '#question-title' });
}

function choose(index) {
  if (state.screen !== 'quiz') return;
  const result = answerCurrent(state.session, index);
  if (!result.accepted) return; // pytanie już zablokowane – brak podwójnej odpowiedzi
  state.session = result.session;
  const item = currentItem(state.session);
  state.progress = recordAnswer(state.progress, item.questionId, result.correct);
  persist();
  render({ focus: '[data-action="next"]' });
}

function next() {
  if (state.screen !== 'quiz' || !isAnswered(state.session)) return;
  state.session = advance(state.session);
  if (state.session.finished) {
    state.progress = recordSessionEnd(state.progress);
    persist();
    state.screen = 'summary';
    render({ focus: '.display' });
  } else {
    render({ focus: '#question-title' });
  }
}

function quit() {
  const s = state.session;
  const hadAnswers = Boolean(s && s.answers.some(Boolean));
  if (hadAnswers) {
    state.progress = recordSessionEnd(state.progress);
    persist();
  }
  state.session = null;
  state.screen = 'setup';
  state.notice = hadAnswers ? 'Sesja przerwana. Udzielone odpowiedzi zostały zapisane w statystykach.' : 'Sesja przerwana.';
  render({ focus: '.notice' });
}

// Akcje nieodwracalne wymagają drugiego kliknięcia w ciągu 4 sekund.
function confirmThen(action, fn) {
  if (state.confirmReset && state.confirmReset.action === action) {
    clearTimeout(state.confirmReset.timer);
    state.confirmReset = null;
    fn();
    return;
  }
  if (state.confirmReset) clearTimeout(state.confirmReset.timer);
  state.confirmReset = {
    action,
    timer: setTimeout(() => {
      state.confirmReset = null;
      render();
    }, 4000)
  };
  applyConfirmState();
}

function applyConfirmState() {
  const pending = state.confirmReset && state.confirmReset.action;
  for (const btn of els.panel.querySelectorAll('[data-action="clear-mistakes"], [data-action="reset-all"]')) {
    const isPending = btn.dataset.action === pending;
    btn.classList.toggle('is-confirming', isPending);
    if (isPending) btn.textContent = 'Kliknij ponownie, aby potwierdzić';
  }
}

function setRegions(regions) {
  state.progress = updateSettings(state.progress, { regions });
  persist();
  render();
}

// --- Zdarzenia ---------------------------------------------------------------

els.panel.addEventListener('click', (e) => {
  const opt = e.target.closest('[data-option]');
  if (opt) {
    choose(Number(opt.dataset.option));
    return;
  }
  const btn = e.target.closest('[data-action]');
  if (!btn || btn.disabled) return;
  switch (btn.dataset.action) {
    case 'next':
      next();
      break;
    case 'quit':
      quit();
      break;
    case 'retry-mistakes':
      startSession('mistakes');
      break;
    case 'restart':
      startSession('normal');
      break;
    case 'settings':
      state.screen = 'setup';
      state.notice = '';
      render({ focus: '.display' });
      break;
    case 'regions-all':
      setRegions(REGIONS.map((r) => r.id));
      break;
    case 'regions-none':
      setRegions([]);
      break;
    case 'clear-mistakes':
      confirmThen('clear-mistakes', () => {
        state.progress = clearMistakes(state.progress);
        persist();
        state.notice = 'Lista błędów została wyczyszczona.';
        render();
      });
      break;
    case 'reset-all':
      confirmThen('reset-all', () => {
        const settings = state.progress.settings;
        state.progress = updateSettings(clearProgress(storage), settings);
        persist();
        state.notice = 'Statystyki i lista błędów zostały zresetowane.';
        render();
      });
      break;
  }
});

els.panel.addEventListener('change', (e) => {
  const input = e.target;
  if (input.name === 'region') {
    const checked = [...els.panel.querySelectorAll('input[name="region"]:checked')].map((x) => x.value);
    state.progress = updateSettings(state.progress, { regions: checked });
    persist();
    render({ focus: `input[name="region"][value="${input.value}"]` });
  } else if (input.name === 'length') {
    state.progress = updateSettings(state.progress, { length: Number(input.value) });
    persist();
    render({ focus: `input[name="length"][value="${input.value}"]` });
  }
});

els.panel.addEventListener('submit', (e) => {
  e.preventDefault();
  startSession('normal');
});

document.addEventListener('keydown', (e) => {
  if (document.body.dataset.section !== 'quiz') return;
  if (state.screen !== 'quiz' || e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if (/^[1-4]$/.test(e.key)) {
    e.preventDefault();
    choose(Number(e.key) - 1);
    return;
  }
  if (e.key === 'Enter') {
    // Enter na przycisku/łączu obsłuży natywne kliknięcie – nie dublujemy akcji.
    if (tag === 'BUTTON' || tag === 'A') return;
    if (isAnswered(state.session)) {
      e.preventDefault();
      next();
    }
  }
});

render();
