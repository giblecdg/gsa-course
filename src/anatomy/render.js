// Renderer tablic anatomicznych: zamienia opis widoku na łańcuch SVG.
// Nie korzysta z DOM, dzięki czemu działa również w testach Node.

import { BODY_SILHOUETTE, BODY_UNDERLAY, CROPS, getView } from './figures.js';

export const PALETTE = {
  ink: '#18384a',
  target: '#e56f59',
  targetStroke: '#a8432f',
  context: '#b7c7d1',
  contextStroke: '#7f98a7',
  bone: '#f4f1ea',
  boneStroke: '#a9b4ba',
  skin: '#ffffff',
  underlay: '#dfe7ec'
};

const MIRROR = 'matrix(-1 0 0 1 400 0)';

function fiberPatternId(prefix, angle) {
  return `${prefix}-fib-${String(angle).replace('-', 'm')}`;
}

function collectFiberAngles(parts) {
  const angles = new Set();
  for (const part of parts) {
    if (part.kind !== 'muscle') continue;
    for (const p of part.paths) if (typeof p.fiber === 'number') angles.add(p.fiber);
  }
  return [...angles];
}

function renderDefs(prefix, angles) {
  const patterns = angles
    .map(
      (a) =>
        `<pattern id="${fiberPatternId(prefix, a)}" patternUnits="userSpaceOnUse" width="3.2" height="3.2" patternTransform="rotate(${a})">` +
        `<line x1="0" y1="0" x2="3.2" y2="0" stroke="#ffffff" stroke-opacity="0.32" stroke-width="0.7"/></pattern>`
    )
    .join('');
  return `<defs>${patterns}</defs>`;
}

function renderSilhouette() {
  const { head, neck, half } = BODY_SILHOUETTE;
  const shapes = (attrs) =>
    `<ellipse cx="${head.cx}" cy="${head.cy}" rx="${head.rx}" ry="${head.ry}" ${attrs}/>` +
    `<path d="${neck}" ${attrs}/>` +
    half.map((d) => `<path d="${d}" ${attrs}/><path d="${d}" transform="${MIRROR}" ${attrs}/>`).join('');
  // Dwa przebiegi: najpierw gruby kontur, potem białe wypełnienie – daje to obrys sumy kształtów.
  return (
    `<g class="silhouette" aria-hidden="true">` +
    `<g fill="${PALETTE.ink}" stroke="${PALETTE.ink}" stroke-width="2.4" stroke-linejoin="round" opacity="0.55">${shapes('')}</g>` +
    `<g fill="${PALETTE.skin}">${shapes('')}</g>` +
    `<g fill="${PALETTE.underlay}">${BODY_UNDERLAY.map((d) => `<path d="${d}"/><path d="${d}" transform="${MIRROR}"/>`).join('')}</g>` +
    `</g>`
  );
}

function renderPartShape(part, isTarget, prefix, textures) {
  if (part.kind === 'ghost') {
    return part.paths
      .map((p) => `<path d="${p.d}" fill="none" stroke="${PALETTE.ink}" stroke-opacity="0.45" stroke-width="0.8" stroke-dasharray="3 2.5"/>`)
      .join('');
  }
  if (part.kind === 'bone') {
    if (part.stroke) {
      return part.paths
        .map((p) => `<path d="${p.d}" fill="none" stroke="${PALETTE.boneStroke}" stroke-width="2.2" stroke-linecap="round"/>`)
        .join('');
    }
    return part.paths
      .map((p) => `<path d="${p.d}" fill="${PALETTE.bone}" stroke="${PALETTE.boneStroke}" stroke-width="0.8"/>`)
      .join('');
  }
  const fill = isTarget ? PALETTE.target : PALETTE.context;
  const stroke = isTarget ? PALETTE.targetStroke : PALETTE.contextStroke;
  const cls = isTarget ? 'muscle muscle--target' : 'muscle muscle--context';
  const body = part.paths
    .map((p) => {
      const base = `<path class="${cls}" d="${p.d}" fill="${fill}" stroke="${stroke}" stroke-width="${isTarget ? 1.1 : 0.7}" stroke-linejoin="round"/>`;
      const texture =
        textures && typeof p.fiber === 'number'
          ? `<path d="${p.d}" fill="url(#${fiberPatternId(prefix, p.fiber)})" stroke="none" pointer-events="none"/>`
          : '';
      return base + texture;
    })
    .join('');
  const details = (part.details || [])
    .map((d) => `<path d="${d}" fill="none" stroke="#ffffff" stroke-opacity="${isTarget ? 0.7 : 0.55}" stroke-width="0.9" stroke-linecap="round"/>`)
    .join('');
  return body + details;
}

/**
 * Buduje kompletną tablicę SVG.
 * @param {object} opts
 * @param {string} opts.viewId    identyfikator widoku z figures.js
 * @param {string[]} opts.targets klucze elementów do podświetlenia na koralowo
 * @param {string} [opts.crop]    nazwa kadru z CROPS
 * @param {string} [opts.idPrefix] prefiks identyfikatorów (unikalny na stronie)
 * @param {boolean} [opts.textures] faktura włókien (wzory SVG); domyślnie włączona
 */
export function renderPlate({ viewId, targets = [], crop, idPrefix = 'plate', textures = true }) {
  const view = getView(viewId);
  const targetSet = new Set(targets);
  const viewBox = (crop && CROPS[crop]) || view.viewBox;
  const angles = collectFiberAngles(view.parts);

  const layers = view.parts
    .map((part) => {
      const shape = renderPartShape(part, targetSet.has(part.key), idPrefix, textures);
      const side = part.side || 'both';
      let out = '';
      if (side !== 'right') out += `<g>${shape}</g>`;
      if (side !== 'left') out += `<g transform="${MIRROR}">${shape}</g>`;
      return out;
    })
    .join('');

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">` +
    (textures ? renderDefs(idPrefix, angles) : '') +
    (view.silhouette ? renderSilhouette() : '') +
    `<g class="anatomy">${layers}</g>` +
    `</svg>`
  );
}

export function viewCaption(viewId) {
  const view = getView(viewId);
  return { label: view.label, layer: view.layer };
}
