import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {EXERCISES,EXTRA_EXERCISES} from '../src/data/exercises.js';
import {QUESTIONS} from '../src/data/muscles.js';
import {QUIZ_KEY,eligibleExercises,requiredMuscles,createExerciseSession,buildQuestion,gradeSelection,submitSelection,advanceExercise,exerciseScore,emptyExerciseProgress,recordExerciseAnswer,loadExerciseProgress,saveExerciseProgress} from '../src/exercise-quiz/engine.js';
const ids=new Set(QUESTIONS.map(q=>q.id));
test('cztery ćwiczenia użytkownika mają schematy, instrukcje i istniejące mięśnie',()=>{
 assert.deepEqual(EXTRA_EXERCISES.map(e=>e.id),['seated-cable-row','dumbbell-fly','pull-up-overhand','leg-press-45']);
 assert.equal(EXERCISES.length,66);assert.equal(eligibleExercises(EXERCISES).length,66);
 for(const e of EXTRA_EXERCISES){assert(existsSync(new URL('../'+e.image,import.meta.url)));assert(e.steps.length>=3);assert(e.sources.length);assert(e.muscles.every(m=>ids.has(m.id)&&m.name));assert.equal(e.origin,'twoje');}
});
test('quiz obejmuje mobility, a rozciąganie rozróżnia od pracy siłowej',()=>{
 const items=createExerciseSession(EXERCISES,{length:0}).items;assert.equal(items.length,66);assert(items.some(q=>EXERCISES.find(e=>e.id===q.exerciseId).kind==='mobility'));
 const stretch=EXERCISES.find(e=>e.id==='hamstring-pir');assert.equal(requiredMuscles(stretch).length,1);assert.equal(requiredMuscles(stretch)[0].role,'rozciągany');
 assert.equal(eligibleExercises(EXERCISES,'strength').length,28);assert.equal(eligibleExercises(EXERCISES,'mobility').length,38);
 const bulgarian=EXERCISES.find(e=>e.id==='bulgarian-split-squat');assert(requiredMuscles(bulgarian,'pelny').every(m=>m.role!=='rozciągany'));
});
test('pytania: poprawne nazwy bez duplikatów, trzy dystraktory, rola stabilizacyjna nie jest błędem w prostym zakresie',()=>{
 for(const e of eligibleExercises(EXERCISES))for(const scope of ['ruch','pelny']){
  const q=buildQuestion(e,EXERCISES,scope);assert.equal(new Set(q.options.map(m=>m.key)).size,q.options.length);assert(q.options.length-q.correct.length>=3);
  assert(q.correct.every(id=>q.options.some(o=>o.key===id)));
  for(const m of e.muscles.filter(m=>m.role==='stabilizacja'))if(scope==='ruch')assert(!q.options.some(o=>o.key===m.id));
 }
});
test('losowanie i filtry dają sesję bez powtórzeń, także dla własnych ćwiczeń i pustego zestawu',()=>{
 const full=createExerciseSession(EXERCISES,{length:0});assert.equal(new Set(full.items.map(q=>q.exerciseId)).size,66);
 const own=createExerciseSession(EXERCISES,{onlyOwn:true,length:10});assert.equal(own.items.length,4);assert(own.items.every(q=>EXTRA_EXERCISES.some(e=>e.id===q.exerciseId)));
 const lower=createExerciseSession(EXERCISES,{onlyOwn:true,region:'Dół ciała'});assert.equal(lower.items.length,1);assert.equal(lower.items[0].exerciseId,'leg-press-45');
 assert.equal(createExerciseSession(EXERCISES,{onlyIds:[]}).finished,true);
});
test('ocena wielokrotnego wyboru odróżnia trafienia, pominięcia i nadmiar; zaznaczenie wszystkiego nie daje pełnego wyniku',()=>{
 const q={correct:['a','b'],options:[{key:'a'},{key:'b'},{key:'c'}]};
 assert.equal(gradeSelection(q,['b','a','a']).perfect,true);
 const missed=gradeSelection(q,['a']);assert.deepEqual(missed.missed,['b']);assert.equal(missed.percent,50);
 const over=gradeSelection(q,['a','b','c']);assert.deepEqual(over.extra,['c']);assert.equal(over.percent,67);assert.equal(over.perfect,false);
});
test('odpowiedź jest zapisana raz, brak odpowiedzi i obce wartości są odrzucane',()=>{
 const s=createExerciseSession(EXERCISES,{length:1});assert.equal(submitSelection(s,[]).accepted,false);assert.equal(submitSelection(s,['invalid']).accepted,false);assert.equal(advanceExercise(s),s);
 const result=submitSelection(s,s.items[0].correct);assert(result.accepted);assert.equal(submitSelection(result.session,s.items[0].correct).accepted,false);assert.equal(s.answers[0],null);
 const end=advanceExercise(result.session);assert(end.finished);assert.deepEqual(exerciseScore(end),{answered:1,total:1,perfect:1,percent:100});
});
test('powtórka błędów jest osobna dla zakresów; poprawny zestaw usuwa tylko swój błąd',()=>{
 let p=emptyExerciseProgress();p=recordExerciseAnswer(p,'deadlift','ruch',{perfect:false});p=recordExerciseAnswer(p,'deadlift','pelny',{perfect:false});p=recordExerciseAnswer(p,'deadlift','ruch',{perfect:false});assert.equal(p.mistakes.ruch.length,1);
 p=recordExerciseAnswer(p,'deadlift','ruch',{perfect:true});assert.deepEqual(p.mistakes.ruch,[]);assert.deepEqual(p.mistakes.pelny,['deadlift']);assert.equal(p.answered,4);assert.equal(p.perfect,1);
});
test('zapis nowego quizu nie zmienia starego quizu ani notatek; uszkodzony zapis nie zatrzymuje aplikacji',()=>{
 const data=new Map([['anatomia-quiz:v1','quiz'],['trener-study:v1','notes']]);const store={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
 const p=recordExerciseAnswer(emptyExerciseProgress(),'deadlift','ruch',{perfect:false});assert(saveExerciseProgress(store,p));assert.equal(data.get('anatomia-quiz:v1'),'quiz');assert.equal(data.get('trener-study:v1'),'notes');assert.deepEqual(loadExerciseProgress(store,new Set(['deadlift'])),p);
 assert(data.has(QUIZ_KEY));assert.equal(saveExerciseProgress(null,p),false);assert.deepEqual(loadExerciseProgress({getItem:()=>'{bad'}),emptyExerciseProgress());
 const clean=loadExerciseProgress({getItem:()=>JSON.stringify({...p,answered:-5,perfect:99,mistakes:{ruch:['deadlift','deadlift','old']}})},new Set(['deadlift']));assert.equal(clean.answered,0);assert.equal(clean.perfect,0);assert.deepEqual(clean.mistakes.ruch,['deadlift']);assert.deepEqual(clean.mistakes.pelny,[]);
});

 test('pełna sesja mobility rozpoznaje także mięśnie bez osobnego identyfikatora ryciny',()=>{
  let s=createExerciseSession(EXERCISES,{category:'mobility',length:0});assert.equal(s.items.length,38);
  assert(s.items.some(q=>q.correct.some(k=>k.startsWith('name:'))));
  for(let i=0;i<38;i++){const q=s.items[s.index];const r=submitSelection(s,q.correct);assert(r.accepted);assert(r.result.perfect);s=advanceExercise(r.session);}
  assert(s.finished);assert.equal(exerciseScore(s).perfect,38);
 });
