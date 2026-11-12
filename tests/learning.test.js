import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {buildCourse,chapterForPage,searchPages,loadStudy,saveStudy,STUDY_KEY,filterEntries} from '../src/learning/model.js';
const source=JSON.parse(readFileSync(new URL('../src/data/gsa-source.json',import.meta.url)));
const root=new URL('../',import.meta.url);
test('cały skrypt: 131 ciągłych stron, oryginalne podglądy i 109 ilustracji',()=>{
 assert.equal(source.pageCount,131);assert.equal(source.pages.length,131);
 let figures=0;
 for(const [i,p] of source.pages.entries()){
  assert.equal(p.page,i+1);assert.equal(p.printedPage,i<2?null:i);assert.equal(typeof p.text,'string');
  assert(existsSync(new URL(p.image,root)),p.image);
  for(const f of p.figures){assert(existsSync(new URL(f.src,root)),f.src);figures++;}
 }
 assert.equal(figures,109);
});
test('wszystkie 5 modułów, 26 rozdziałów i podrozdziały zachowane w kolejności',()=>{
 const c=buildCourse(source);assert.equal(c.modules.length,5);assert.equal(c.chapters.length,26);
 assert.equal(c.chapters.flatMap(c=>c.sections).length,source.toc.filter(t=>t.level>2).length);
 assert.deepEqual(c.chapters.map(c=>c.title),source.toc.filter(t=>t.level===2).map(t=>t.title));
 assert.deepEqual(c.modules.map(m=>m.chapters.length),[5,2,4,6,9]);
 assert.equal(new Set(c.chapters.map(c=>c.id)).size,26);
 for(const chapter of c.chapters){assert(chapter.end>=chapter.page);assert(chapter.end<=131);}
 for(let p=7;p<=131;p++){const chapter=chapterForPage(c.chapters,p);assert(chapter.page<=p);assert(chapter.end>=p);}
});
test('wyszukiwanie pełnej treści i polskich znaków, nie tylko spisu',()=>{
 assert(searchPages(source,'Patrica').some(p=>p.page===31));
 assert(searchPages(source,'rozgrzewka').some(p=>p.page>=98));
 assert.equal(searchPages(source,'').length,0);
 const m=buildCourse(source).modules[1];assert(searchPages(source,'staw',m).every(p=>p.page>=22&&p.page<=36));
});
test('notatki i postęp nie naruszają klucza poprzedniego quizu',()=>{
 const values=new Map([['anatomia-quiz:v1','original quiz data']]);const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 const p=loadStudy(storage);p.completed=['1'];p.notes['1']='Własna notatka';p.favorites=['rdl'];assert(saveStudy(storage,p));
 assert.deepEqual(loadStudy(storage),p);assert.equal(values.get('anatomia-quiz:v1'),'original quiz data');assert(values.has(STUDY_KEY));
});
test('uszkodzony lub niedostępny zapis nie zatrzymuje biblioteki',()=>{
 assert.deepEqual(loadStudy({getItem:()=>'{bad json'}).completed,[]);
 assert.equal(saveStudy(null,loadStudy(null)),false);
 assert.equal(saveStudy({setItem(){throw Error('Quota');}},{}),false);
 const p=loadStudy({getItem:()=>JSON.stringify({version:1,notes:['bad'],completed:['1','1',3],favorites:[]})});assert.deepEqual(p.completed,['1']);assert.deepEqual(p.notes,{});
});
test('filtry nazwy, mięśnia, regionu i zapisanych ćwiczeń łączą się',()=>{
 const entries=[{id:'a',title:'Przysiad',kind:'siłowe',region:'nogi',muscles:[{id:'quad',name:'Czworogłowy uda'}]},{id:'b',title:'Pompka',kind:'siłowe',region:'klatka',muscles:[]}];
 assert.deepEqual(filterEntries(entries,{search:'czworoglowy',region:'nogi',muscle:'quad',favorites:['a']}).map(e=>e.id),['a']);
 assert.equal(filterEntries(entries,{favorites:[]}).length,0);
 assert.equal(filterEntries(entries,{region:'nogi',kind:'mobility'}).length,0);
});
