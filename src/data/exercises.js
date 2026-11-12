import { EXERCISES as GSA_EXERCISES } from './gsa-content.js';
import { QUESTIONS } from './muscles.js';
const names=new Map(QUESTIONS.map(q=>[q.id,q.name]));
const muscle=(id,role)=>({id,name:names.get(id),role});
const own=(id,title,pattern,muscles,setup,steps,mistakes,sources)=>({id,title,kind:'siłowe',region:id==='leg-press-45'?'Dół ciała':'Góra ciała',pattern,muscles,setup,steps,mistakes,sources,origin:'twoje',pages:[],figures:[],image:`assets/exercises/${id}.svg`,imageAlt:`Schemat dwóch pozycji ćwiczenia: ${title}. Bez oznaczeń mięśni.`,note:'Ćwiczenie dodane na Twoją prośbę. Schemat pokazuje przybliżony tor ruchu. Klucz mięśni jest opracowaniem edukacyjnym dla podanego wariantu, a nie pełną listą wszystkich aktywnych tkanek.'});
export const EXTRA_EXERCISES=[
 own('seated-cable-row','Seated cable row — chwyt neutralny','Przyciąganie poziome na wyciągu',[
  muscle('latissimus-dorsi','główny'),muscle('rhomboids','główny'),muscle('trapezius','pomocniczy'),muscle('deltoid-posterior','pomocniczy'),muscle('biceps-brachii','pomocniczy'),muscle('brachialis','pomocniczy'),muscle('erector-spinae','stabilizacja'),muscle('transversus-abdominis','stabilizacja')
 ],'Usiądź przed dolnym wyciągiem. Stopy oprzyj stabilnie, kolana pozostaw lekko ugięte. Chwyć wąski uchwyt neutralnie, ustaw tułów pionowo i zachowaj naturalną pozycję kręgosłupa.',[
 'Przyciągaj uchwyt w stronę brzucha, prowadząc łokcie blisko tułowia i pozwalając łopatkom kontrolowanie zbliżyć się do kręgosłupa.',
 'Zakończ ruch bez odchylania tułowia w tył i bez unoszenia barków do uszu.',
 'Oddaj uchwyt płynnie, prostując łokcie i kontrolując ruch łopatek. Powtarzaj z nieruchomym, stabilnym tułowiem.'
 ],['Kołysanie tułowiem i szarpanie ciężaru.','Zadzieranie barków lub odginanie lędźwi.','Zginanie nadgarstków zamiast prowadzenia uchwytu przedramionami.'],[{title:'ACE: Seated Row — wyciąg i wąski uchwyt',url:'https://www.acefitness.org/resources/everyone/exercise-library/48/seated-row/'},{title:'NASM: biblioteka ćwiczeń — seated row',url:'https://www.nasm.org/workout-exercise-guidance'}]),
 own('dumbbell-fly','Rozpiętki z hantlami — ławka pozioma','Przywodzenie poziome ramion',[
 muscle('pectoralis-major','główny'),muscle('deltoid-anterior','pomocniczy'),muscle('biceps-brachii','stabilizacja')
 ],'Połóż się na ławce poziomej, stopy stabilnie na podłożu. Trzymaj hantle nad klatką, dłonie skierowane do siebie. Łokcie są lekko ugięte i zachowują podobny kąt podczas całego ruchu.',[
 'Rozkładaj ramiona na boki po łuku, kontrolując hantle i stabilne ułożenie barków.',
 'Zatrzymaj opuszczanie w zakresie, w którym kontrolujesz barki bez bólu i nadmiernego rozciągania; nie szukaj maksymalnej głębokości.',
 'Zbliż ramiona nad klatką tym samym łukiem. Zachowaj lekko ugięte łokcie — ruch nie jest wyciskaniem.'
 ],['Zbyt duży ciężar i schodzenie poza kontrolowany zakres barku.','Zmiana ćwiczenia w wyciskanie przez duże zginanie łokci.','Odbijanie hantli w dolnej pozycji.'],[{title:'Badanie pierwotne: aktywacja mięśni barku podczas dumbbell fly (JEPonline, 2017)',url:'https://www.asep.org/asep/asep/JEPonlineDECEMBER2017_Reiser.pdf'}]),
 own('pull-up-overhand','Podciąganie nachwytem','Przyciąganie pionowe — chwyt na szerokość barków lub nieco szerszy',[
 muscle('latissimus-dorsi','główny'),muscle('teres-major','pomocniczy'),muscle('biceps-brachii','pomocniczy'),muscle('brachialis','pomocniczy'),muscle('rhomboids','pomocniczy'),muscle('trapezius','pomocniczy'),muscle('deltoid-posterior','pomocniczy'),muscle('rectus-abdominis','stabilizacja')
 ],'Chwyć drążek nachwytem, mniej więcej na szerokość barków lub nieco szerzej. Zawieś się w kontrolowanej, wygodnej pozycji barków i ustabilizuj tułów.',[
 'Podciągaj ciało, prowadząc łokcie w dół i zginając je bez zamachu nogami.',
 'Zbliż górną część klatki do drążka; nie zastępuj ruchu samym wysuwaniem brody.',
 'Opuść się kontrolowanie do wyprostu łokci w tolerowanym zakresie. Zachowaj kontrolę barków i powtórz bez bujania.'
 ],['Kipping lub wymach nóg w wariancie ścisłym.','Wysuwanie głowy, aby sztucznie minąć drążek brodą.','Opadanie bez kontroli i szarpnięcie barkami na dole.'],[{title:'ACE: Pull-ups',url:'https://www.acefitness.org/resources/everyone/exercise-library/191/pull-ups/'},{title:'NASM: Pull-Up',url:'https://www.nasm.org/resource-center/exercise-library/pull-up'}]),
 own('leg-press-45','Suwnica 45° — leg press','Wyprost kolana i biodra — stopy na szerokość bioder/barków',[
 muscle('quadriceps','główny'),muscle('gluteus-maximus','główny'),muscle('adductors','pomocniczy'),muscle('biceps-femoris','pomocniczy'),muscle('gastrocnemius','pomocniczy'),muscle('transversus-abdominis','stabilizacja')
 ],'Oprzyj plecy i miednicę o oparcie suwnicy. Ustaw całe stopy na platformie, mniej więcej na szerokość bioder lub barków. Ustaw ograniczniki zgodnie z instrukcją maszyny.',[
 'Zwolnij blokadę i kontrolowanie uginaj biodra oraz kolana. Kolana poruszają się w kierunku palców stóp.',
 'Zatrzymaj opuszczanie zanim miednica zacznie odrywać się lub podwijać na oparciu; pięty pozostają na platformie.',
 'Wypchnij platformę, prostując biodra i kolana bez gwałtownego blokowania ich w przeproście. Po serii ponownie zabezpiecz suwnicę.'
 ],['Odrywanie miednicy i zaokrąglanie lędźwi przy zbyt głębokim opuszczaniu.','Zapadanie kolan i odrywanie pięt.','Gwałtowne blokowanie kolan albo brak zabezpieczenia maszyny.'],[{title:'NASM: Leg Press',url:'https://www.nasm.org/resource-center/exercise-library/leg-press'},{title:'Mayo Clinic: Leg press — mięśnie i wykonanie',url:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/leg-press/vid-20084684'}])
];
// W suwnicy nazwę grupy tylnej uda zachowujemy zgodną z jej zakresem w quizie.
EXTRA_EXERCISES.find(e=>e.id==='leg-press-45').muscles.find(m=>m.id==='biceps-femoris').name='Mięśnie kulszowo-goleniowe (m. dwugłowy uda, półścięgnisty, półbłoniasty)';
export const EXERCISES=[...GSA_EXERCISES,...EXTRA_EXERCISES];
