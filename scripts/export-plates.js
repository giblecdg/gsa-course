// Eksportuje tablice SVG do katalogu (podgląd poza przeglądarką).
// Użycie: node scripts/export-plates.js <katalog> [--no-textures] [widok:cel1,cel2[:kadr]] ...
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { renderPlate } from '../src/anatomy/render.js';
import { VIEWS } from '../src/anatomy/figures.js';

const args = process.argv.slice(2);
const textures = !args.includes('--no-textures');
const [outDir = 'plates', ...specs] = args.filter((a) => a !== '--no-textures');
mkdirSync(outDir, { recursive: true });
const jobs = specs.length ? specs : Object.keys(VIEWS).map((v) => `${v}:`);
for (const spec of jobs) {
  const [viewId, targets = '', crop] = spec.split(':');
  const svg = renderPlate({ viewId, targets: targets ? targets.split(',') : [], crop, textures });
  const name = `${viewId}${targets ? '-' + targets.split(',')[0] : ''}${crop ? '-' + crop : ''}.svg`;
  writeFileSync(join(outDir, name), svg);
  console.log(join(outDir, name));
}
