import { shuffle } from '../quiz/engine.js';
export const QUIZ_KEY='exercise-muscles-quiz:v1';
export const ROLES={ruch:['główny','pomocniczy'],pelny:['główny','pomocniczy','stabilizacja']};
export const muscleKey=m=>m.id||`name:${m.name}`;
export function requiredMuscles(exercise,scope='ruch'){
 const roles=[...(ROLES[scope]||ROLES.ruch),...(exercise.kind==='mobility'?['rozciągany']:[])];
 return [...new Map(exercise.muscles.filter(m=>roles.includes(m.role)).map(m=>[muscleKey(m),m])).values()];
}
export function eligibleExercises(exercises,category='all'){return exercises.filter(e=>(category==='all'||(category==='mobility'?e.kind==='mobility':e.kind!=='mobility'))&&requiredMuscles(e).length);}
export function musclePool(exercises){
 const pool=new Map();
 for(const e of eligibleExercises(exercises))for(const m of e.muscles){
  const key=muscleKey(m);const prev=pool.get(key);
  if(!prev||m.name.length>prev.name.length)pool.set(key,{key,name:m.name,id:m.id});
 }
 return [...pool.values()];
}
export function buildQuestion(exercise,exercises,scope='ruch',rng=Math.random){
 const pool=musclePool(exercises);const correct=requiredMuscles(exercise,scope).map(m=>muscleKey(m));
 const present=new Set(exercise.muscles.map(muscleKey));
 // Stabilizatory nie są fałszywymi odpowiedziami w trybie „główne i pomocnicze”.
 const wrong=shuffle(pool.filter(m=>!present.has(m.key)),rng).slice(0,Math.max(3,8-correct.length));
 const options=shuffle([...pool.filter(m=>correct.includes(m.key)),...wrong],rng);
 return {exerciseId:exercise.id,correct,options};
}
export function createExerciseSession(exercises,{scope='ruch',length=10,region='',onlyOwn=false,category='all',onlyIds=null,rng=Math.random}={}){
 const safeScope=ROLES[scope]?scope:'ruch';
 const pool=eligibleExercises(exercises,category).filter(e=>(!region||e.region===region)&&(!onlyOwn||e.origin==='twoje')&&(!onlyIds||onlyIds.includes(e.id)));
 const shuffled=shuffle(pool,rng);const picked=length>0?shuffled.slice(0,length):shuffled;
 return {scope:safeScope,items:picked.map(e=>buildQuestion(e,exercises,safeScope,rng)),index:0,answers:picked.map(()=>null),finished:picked.length===0};
}
export function gradeSelection(question,selected){
 const chosen=[...new Set(selected)];const actual=new Set(question.correct);
 const hits=chosen.filter(k=>actual.has(k));const extra=chosen.filter(k=>!actual.has(k));const missed=question.correct.filter(k=>!chosen.includes(k));
 return {selected:chosen,hits,extra,missed,perfect:extra.length===0&&missed.length===0,percent:Math.round(100*hits.length/(actual.size+extra.length))};
}
export function submitSelection(session,selected){
 const q=session.items[session.index];if(!q||session.finished||session.answers[session.index]||!Array.isArray(selected)||!selected.length||selected.some(k=>!q.options.some(o=>o.key===k)))return {session,accepted:false};
 const result=gradeSelection(q,selected);const answers=session.answers.slice();answers[session.index]=result;
 return {session:{...session,answers},accepted:true,result};
}
export function advanceExercise(session){
 if(session.finished||!session.answers[session.index])return session;
 return session.index+1===session.items.length?{...session,finished:true}:{...session,index:session.index+1};
}
export function exerciseScore(session){const answered=session.answers.filter(Boolean);return {answered:answered.length,total:session.items.length,perfect:answered.filter(a=>a.perfect).length,percent:answered.length?Math.round(answered.reduce((n,a)=>n+a.percent,0)/answered.length):0};}
export function emptyExerciseProgress(){return {version:1,answered:0,perfect:0,mistakes:{ruch:[],pelny:[]}};}
export function loadExerciseProgress(storage,validIds){
 try{const p=JSON.parse(storage?.getItem(QUIZ_KEY)||'null');if(p?.version!==1)return emptyExerciseProgress();const num=x=>Number.isFinite(x)&&x>=0?Math.floor(x):0;const answered=num(p.answered);return {version:1,answered,perfect:Math.min(answered,num(p.perfect)),mistakes:Object.fromEntries(Object.keys(ROLES).map(s=>[s,Array.isArray(p.mistakes?.[s])?[...new Set(p.mistakes[s].filter(id=>typeof id==='string'&&(!validIds||validIds.has(id))))]:[]]))};}catch{return emptyExerciseProgress();}
}
export function recordExerciseAnswer(progress,id,scope,result){
 const old=progress.mistakes[scope]||[];const ids=result.perfect?old.filter(x=>x!==id):old.includes(id)?old:[...old,id];
 return {...progress,answered:progress.answered+1,perfect:progress.perfect+(result.perfect?1:0),mistakes:{...progress.mistakes,[scope]:ids}};
}
export function saveExerciseProgress(storage,progress){try{if(!storage)return false;storage.setItem(QUIZ_KEY,JSON.stringify(progress));return true;}catch{return false;}}
