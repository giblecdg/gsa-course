// Model kursu i niezależny od quizu zapis nauki.
export const STUDY_KEY = 'trener-study:v1';
export const normalizeSearch = value => String(value).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/ł/g,'l').toLowerCase();
export function buildCourse(source, notes = [], moduleNotes = []) {
  const modules = []; const chapters = [];
  let mod, chapter;
  for (const entry of source.toc) {
    if (entry.level === 1) {
      mod = { ...entry, id: `m${modules.length + 1}`, chapters: [], overview: moduleNotes[modules.length]?.overview || '' };
      modules.push(mod); chapter = null;
    } else if (entry.level === 2 && mod) {
      chapter = { ...entry, id: String(chapters.length + 1), moduleId: mod.id, sections: [], note: notes[chapters.length] || null };
      chapters.push(chapter); mod.chapters.push(chapter);
    } else if (chapter && entry.level > 2) chapter.sections.push(entry);
  }
  modules.forEach((m,i) => { m.end = modules[i+1] ? modules[i+1].page-1 : source.pageCount; });
  chapters.forEach((c,i) => { c.end = Math.max(c.page, chapters[i+1] ? chapters[i+1].page-1 : source.pageCount); });
  return {modules, chapters};
}
export function chapterForPage(chapters, page) {
  return [...chapters].reverse().find(c=>c.page<=page) || chapters[0];
}
export function searchPages(source, term, module = null) {
  const query = normalizeSearch(term).trim(); if (!query) return [];
  return source.pages.filter(p=>(!module || (p.page>=module.page && p.page<=module.end)) && normalizeSearch(p.text).includes(query));
}
export function defaultStudy() { return {version:1,completed:[],notes:{},favorites:[]}; }
export function loadStudy(storage) {
  try {
    const data = JSON.parse(storage?.getItem(STUDY_KEY) || 'null');
    if(data?.version!==1) return defaultStudy();
    return {version:1, completed:Array.isArray(data.completed)?[...new Set(data.completed.filter(x=>typeof x==='string'))]:[], notes:data.notes && typeof data.notes==='object' && !Array.isArray(data.notes)?Object.fromEntries(Object.entries(data.notes).filter(([k,v])=>typeof v==='string')):{}, favorites:Array.isArray(data.favorites)?[...new Set(data.favorites.filter(x=>typeof x==='string'))]:[]};
  } catch { return defaultStudy(); }
}
export function saveStudy(storage, data) { try {if(!storage)return false;storage.setItem(STUDY_KEY,JSON.stringify(data));return true;} catch {return false;} }
export function filterEntries(entries, {search='',region='',kind='',muscle='',favorites=null}={}) {
  const term=normalizeSearch(search).trim();
  return entries.filter(e=>(!term || normalizeSearch([e.title,...(e.aliases||[]),e.pattern,e.region,...(e.muscles||[]).map(m=>m.name)].join(' ')).includes(term)) && (!region || e.region===region) && (!kind || e.kind===kind) && (!muscle || e.muscles?.some(m=>m.id===muscle)) && (!favorites || favorites.includes(e.id)));
}
