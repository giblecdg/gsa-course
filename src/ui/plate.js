// Obsługa lewej kolumny: tablica anatomiczna, podpis i opis dostępności.

import { renderPlate, viewCaption } from '../anatomy/render.js';

let renderCount = 0;

/**
 * @param {object} els  elementy DOM tablicy
 * @param {object} opts
 * @param {object|null} opts.question  pytanie (null = tablica poglądowa)
 * @param {boolean} opts.revealed      czy pokazać nazwę (po odpowiedzi)
 * @param {string} opts.number         numer tablicy, np. „3 / 10”
 */
export function showPlate(els, { question, revealed = false, number = '—' }) {
  const viewId = question ? question.view : 'front';
  const svg = renderPlate({
    viewId,
    targets: question ? question.targets : [],
    crop: question ? question.crop : undefined,
    idPrefix: `pl${++renderCount}`
  });
  const caption = viewCaption(viewId);

  els.svg.innerHTML = svg;
  els.number.textContent = `Tab. ${number}`;
  els.view.textContent = caption.label;
  els.layer.textContent = capitalize(caption.layer);

  if (!question) {
    els.svg.setAttribute('aria-label', 'Tablica poglądowa: sylwetka człowieka w widoku przednim z zaznaczonymi mięśniami powierzchownymi, bez wyróżnienia.');
    els.answer.hidden = true;
    els.answer.textContent = '';
    return;
  }

  if (revealed) {
    els.svg.setAttribute('aria-label', `${question.alt} Podświetlony mięsień to: ${question.name} (${question.latin}).`);
    els.answer.hidden = false;
    els.answer.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = question.name;
    const latin = document.createElement('span');
    latin.className = 'plate__latin';
    latin.textContent = question.latin;
    els.answer.append('Podświetlono: ', strong, ' ', latin);
  } else {
    els.svg.setAttribute('aria-label', question.alt);
    els.answer.hidden = true;
    els.answer.textContent = '';
  }
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}
