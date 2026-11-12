// Kuratorowana treść do nauki na podstawie „Skrypt Trener Personalny 2026 – GSA”.
// `page`/`pages` to numery stron PDF (numer drukowany + 1). `figures[].index` to
// 1-bazowy numer zdjęcia na danej stronie w work/gsa-figures.json.
// Notatki są pomocą do nauki – pełna treść skryptu jest dostępna w czytniku stron.
// Tam, gdzie skrypt podaje tylko tytuł i zdjęcie, opis wykonania i przypisanie
// mięśni są oznaczone jako opracowanie edukacyjne (nie cytat ze skryptu).

const f = (page, ...idx) => idx.map((index) => ({ page, index }));

// Mięśnie: [id z QUESTIONS lub null, nazwa polska]
const MU = {
  glMax: ['gluteus-maximus', 'Mięsień pośladkowy wielki'],
  glMed: ['gluteus-medius', 'Mięsień pośladkowy średni'],
  glMin: ['gluteus-minimus', 'Mięsień pośladkowy mały'],
  quad: ['quadriceps', 'Mięsień czworogłowy uda'],
  ham: ['biceps-femoris', 'Mięśnie kulszowo-goleniowe (m. dwugłowy uda, półścięgnisty, półbłoniasty)'],
  add: ['adductors', 'Mięśnie przywodziciele uda'],
  psoas: [null, 'Mięsień biodrowo-lędźwiowy'],
  rotH: [null, 'Głębokie rotatory zewnętrzne biodra (m.in. gruszkowaty)'],
  gast: ['gastrocnemius', 'Mięsień brzuchaty łydki'],
  sol: ['soleus', 'Mięsień płaszczkowaty'],
  tib: ['tibialis-anterior', 'Mięsień piszczelowy przedni'],
  per: ['peroneals', 'Mięśnie strzałkowe'],
  es: ['erector-spinae', 'Mięsień prostownik grzbietu'],
  ql: ['quadratus-lumborum', 'Mięsień czworoboczny lędźwi'],
  ra: ['rectus-abdominis', 'Mięsień prosty brzucha'],
  ta: ['transversus-abdominis', 'Mięsień poprzeczny brzucha'],
  eo: ['external-oblique', 'Mięsień skośny zewnętrzny brzucha'],
  io: ['internal-oblique', 'Mięsień skośny wewnętrzny brzucha'],
  lat: ['latissimus-dorsi', 'Mięsień najszerszy grzbietu'],
  tm: ['teres-major', 'Mięsień obły większy'],
  trap: ['trapezius', 'Mięsień czworoboczny grzbietu'],
  rh: ['rhomboids', 'Mięśnie równoległoboczne'],
  sa: ['serratus-anterior', 'Mięsień zębaty przedni'],
  pec: ['pectoralis-major', 'Mięsień piersiowy większy'],
  pecMin: ['pectoralis-minor', 'Mięsień piersiowy mniejszy'],
  dA: ['deltoid-anterior', 'Mięsień naramienny – część przednia'],
  dM: ['deltoid-middle', 'Mięsień naramienny – część środkowa'],
  dP: ['deltoid-posterior', 'Mięsień naramienny – część tylna'],
  inf: ['infraspinatus', 'Mięsień podgrzebieniowy'],
  tmin: ['teres-minor', 'Mięsień obły mniejszy'],
  sub: ['subscapularis', 'Mięsień podłopatkowy'],
  tri: ['triceps-brachii', 'Mięsień trójgłowy ramienia'],
  bic: ['biceps-brachii', 'Mięsień dwugłowy ramienia']
};
const ROLE = { g: 'główny', p: 'pomocniczy', s: 'stabilizacja', r: 'rozciągany' };
// mus('glMax:g', 'ham:p') → [{id, name, role}, …]
const mus = (...specs) =>
  specs.map((s) => {
    const [key, r] = s.split(':');
    const [id, name] = MU[key];
    return { id, name, role: ROLE[r] };
  });

const SCRIPT = (p) => ({ title: `Skrypt Trener Personalny 2026 – GSA, s. PDF ${p}`, url: `#strona/${p}` });
const FABER = {
  title: 'Hip Pain and Mobility Deficits – Hip Osteoarthritis: Clinical Practice Guidelines (JOSPT, PMC4399382)',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4399382/'
};
const THOMAS = {
  title: 'Validity of the modified Thomas test – kontrola pochylenia miednicy (PMC4991856)',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4991856/'
};

const MOB_NOTE =
  'Skrypt podaje dla tego ćwiczenia tylko nazwę i zdjęcia. Opis ustawienia, kroki i przypisanie mięśni to opracowanie edukacyjne na podstawie zdjęć i ogólnej anatomii – nie cytat ze skryptu. Zasady ze skryptu (s. 52–54): mobilizuj się tylko w poprawnej pozycji, testuj przed i po, a nowy zakres utrwal kilkunastoma powtórzeniami wzorca z mniejszym obciążeniem.';
const EDU = 'Przypisanie mięśni to opracowanie edukacyjne (ogólna anatomia funkcjonalna), skrypt nie wymienia ich dla tego wariantu.';
const CAUTION = 'Ruch ma być bez bólu – przy bólu, drętwieniu lub mrowieniu przerwij. Bez gwałtownego dociskania i samodzielnego „nastawiania” stawów.';

export const MODULES = [
  {
    id: 'm1',
    title: 'Moduł 1. Trening medyczny',
    overview:
      'Trening medyczny łączy trening personalny z fizjoterapią: oparty na wywiadzie i diagnostyce, łączy mobility & stretching, trening siłowy i funkcjonalny. Moduł omawia cele, postępowanie i planowanie oraz zalecenia dla stopy, kolana, biodra, odcinka lędźwiowo-krzyżowego, barku oraz głowy i szyi.'
  },
  {
    id: 'm2',
    title: 'Moduł 2. Diagnostyka funkcjonalna',
    overview:
      'Po co i jak testować: wywiad przed testami, łączenie kilku testów zamiast jednego, ocena postawy z przodu i z boku oraz 9 testów funkcjonalnych – od przysiadu z tyczką nad głową po rotację stawu ramiennego.'
  },
  {
    id: 'm3',
    title: 'Moduł 3. Mobility',
    overview:
      'Mobilność jako aktywny zakres ruchu we wzorcach. Wpływ siedzącego trybu życia, zespoły skrzyżowania dolnego i górnego, sekwencja napinania, sprzęt i systemy mobilizacyjne (torebka stawowa, powierzchnie ślizgowe, mięśnie, aktywacja), zasady planu oraz atlas 38 ćwiczeń mobility na staw skokowy, biodro, kręgosłup i bark.'
  },
  {
    id: 'm4',
    title: 'Moduł 4. Metodyka Treningu Funkcjonalnego',
    overview:
      'Funkcjonalność zależy od środowiska, człowieka i zadania ruchowego. Sprawność codzienna i sportowa, nabywanie umiejętności (progresje, regresje, rezyliencja, tranzycje), trzy poziomy pracy z klientem (medyczny, funkcjonalny, sportowy) i budowa jednostki treningowej.'
  },
  {
    id: 'm5',
    title: 'Moduł 5. Metodyka Treningu Siłowego',
    overview:
      'Cele i planowanie (jednostka, mikro-, mezo-, makrocykl), parametry treningowe, anatomia biodra, kolana i barku, wzorce ruchowe, nauczanie i oddychanie, rozgrzewka RAMP oraz technika, progresje i błędy 7 podstawowych ćwiczeń: przysiad, martwy ciąg, hip thrust, RDL, wyciskanie leżąc, OHP i wiosłowanie.'
  }
];

export const CHAPTER_NOTES = [
  // --- Moduł 1 -------------------------------------------------------------
  {
    page: 7,
    title: 'M1 · Rozdział 1. Czym jest trening medyczny?',
    summary: 'Połączenie treningu personalnego z fizjoterapią, nastawione na świadomość ciała i bezpieczny powrót do formy.',
    points: [
      'Cel to nie tylko podtrzymanie aktywności, ale budowanie świadomości własnego ciała popartej wiedzą.',
      'Dla sportowców i rekreacyjnie aktywnych – także po urazie lub operacji, ale już po okresie wstępnej rehabilitacji.',
      'Zadania dobiera się indywidualnie do dysfunkcji, ograniczeń, budowy ciała i przebytych kontuzji.',
      'Klucz powodzenia: odpowiednia diagnostyka oraz wywiad – na ich podstawie dobiera się ćwiczenia i plan.'
    ]
  },
  {
    page: 8,
    title: 'M1 · Rozdział 2. Kim jest trener medyczny?',
    summary: 'Trener z wiedzą z anatomii, biomechaniki oraz treningu siłowego i funkcjonalnego, który prowadzi diagnostykę ruchową i programuje terapię ruchową.',
    points: [
      'Diagnostyka ruchowa opiera się na rzetelnym wywiadzie uzupełnionym o testy.',
      'Cele: powrót do czynności dnia codziennego i do sportu sprzed kontuzji, zmniejszenie przeciążeń i ryzyka urazu.',
      'Dalsze cele: poprawa techniki w dyscyplinie, wzmocnienie ciała i utrwalenie właściwych wzorców motorycznych.',
      'Narzędzia: mobility & stretching, trening siłowy i trening funkcjonalny.'
    ]
  },
  {
    page: 9,
    title: 'M1 · Rozdział 3. Postępowanie w treningu medycznym',
    summary: 'Trzy etapy: diagnostyka funkcjonalna, poprawa zakresu ruchu i elastyczności tkanek, poprawa siły.',
    points: [
      'Wywiad: poziom i rodzaj aktywności, cele, doświadczenie, dyskomfort i ból, dotychczasowe kontuzje.',
      'Badanie wzorców ruchowych: jakość ruchu, poprawność ćwiczeń, zaburzone wzorce i ograniczenia.',
      'Zakres ruchu: mobilizacja tkanek (rolowanie, piłeczka), stretching dynamiczny i statyczny, masaż / terapia punktów spustowych.',
      'Siła: trening siłowy/hipertroficzny, ćwiczenia motoryki (szybkość, zwinność, skoczność, koordynacja) i stabilizacji „core”.'
    ]
  },
  {
    page: 10,
    title: 'M1 · Rozdział 4. Jak zaplanować trening medyczny?',
    summary: 'Dwa modele planowania – po urazie lub jako uzupełnienie bieżącej aktywności.',
    points: [
      'Model 1: powrót do zdrowia po kontuzji/operacji – powrót do aktywności i wzmocnienie lub rozluźnienie rejonu objętego urazem.',
      'Model 2: trening dodatkowy – szukamy zaburzeń ruchu, które mogą wpływać na ból, dyskomfort lub słabsze wyniki.',
      'W modelu 2 odpowiednie techniki dokłada się do istniejącego planu jako dodatek, a nie zamiennik.'
    ]
  },
  {
    page: 11,
    title: 'M1 · Rozdział 5. Postępowanie w poszczególnych rejonach ciała',
    summary: 'Dla stopy, kolana, biodra, odcinka lędźwiowo-krzyżowego, barku i szyi: czynniki funkcjonalne, typowe zaburzenia i postępowanie (mobility + stabilność/siła).',
    points: [
      'Stopa: 3 punkty podparcia (I i V kość śródstopia, pięta) i łuki podtrzymywane przez powięź podeszwową; napięcia stopy mogą wpływać na całą taśmę tylną.',
      'Kolano: częsta destabilizacja przyśrodkowa (koślawienie), m.in. przy osłabionym pośladkowym średnim; ważna równowaga czworogłowy – kulszowo-goleniowe.',
      'Biodro: zaburzenia rozwijają się powoli; wczesny ból bywa w pachwinie lub kolanie i początkowo pojawia się tylko w wysiłku.',
      'Odcinek lędźwiowy: krążki odżywiane są ruchem (kompresja–odciążenie); w postępowaniu m.in. nauka hip hinge, core i oddychania.',
      'Bark i szyja: praca nad rotacją zewnętrzną, mięśniami łopatki, stożkiem rotatorów i zębatym przednim; przy szyi – tor oddychania, izometria, pozycja głowy.'
    ]
  },
  // --- Moduł 2 -------------------------------------------------------------
  {
    page: 22,
    title: 'M2 · Rozdział 1. Czym jest diagnostyka funkcjonalna?',
    summary: 'Ocena stanu układu ruchu i możliwości podopiecznego jako podstawa planu i kontroli postępów.',
    points: [
      'Dla kogo: po urazach i rekonstrukcjach, przy przeciążeniach i nawracających kontuzjach, dla sportowców i osób zaczynających aktywność.',
      'Dobre testy: łatwe do wykonania i interpretacji, szybkie, praktyczne, rzetelne, bez dużej ilości sprzętu.',
      'Nigdy nie mamy 100% pewności – wynik wzmacniają epidemiologia i symptomy z wywiadu.',
      'Test to ostatni element ścieżki diagnostycznej; opieranie się na jednym teście to za mało – łącz kilka testów.'
    ]
  },
  {
    page: 24,
    title: 'M2 · Rozdział 2. Prawidłowa postawa ciała',
    summary: 'Ocena statyczna postawy z przodu i z boku oraz 9 testów funkcjonalnych (szczegóły w zakładce testów).',
    points: [
      'Z przodu na tej samej wysokości powinny być: linia barków, sutków, kolców biodrowych przednich górnych, kolan i kostek.',
      'Z boku linia referencyjna: tył płatka ucha, środek barku, dolny odcinek pleców, lekko za osią biodra, lekko przed osią kolana i kostki.',
      'Przysiad z tyczką nad głową to test przesiewowy wielu segmentów – wskazuje, gdzie zrobić testy szczegółowe.',
      'Wyniki testów oceniają też trenera: bez sprawdzania postępu nie ma podstaw do korekty programu.'
    ]
  },
  // --- Moduł 3 -------------------------------------------------------------
  {
    page: 37,
    title: 'M3 · Rozdział 1. Czym jest mobility?',
    summary: 'Aktywne zakresy ruchu we wszystkich stawach, wykorzystywane we wzorcach ruchowych – podstawa piramidy motoryki.',
    points: [
      'Korzyści: mniejsze ryzyko urazów, lepsze wzorce, szybsza regeneracja, mniej bólu i nieprawidłowych napięć, korekcja postawy.',
      'Trener pracuje tylko nad ograniczeniami z tkanek miękkich, nie nad zmianami strukturalnymi.',
      'Łańcuch skutków: błędna postawa → błędne wzorce → zmiany strukturalne → ryzyko kontuzji → ból.',
      'Normy zakresów (np. biodro: zgięcie 125°, rotacje 45°) to odnośnik – dopasuj do historii klienta, nie dąż za wszelką cenę do „ideału z książki”.'
    ]
  },
  {
    page: 39,
    title: 'M3 · Rozdział 2. Wpływ trybu życia na ograniczenie mobilności',
    summary: 'Mało aktywny, siedzący tryb życia osłabia mięśnie głębokie stabilizujące kręgosłup.',
    points: [
      'Wielogodzinne siedzenie w pracy i odpoczynek przed telewizorem osłabiają mięśnie głębokie.',
      'Skutkiem są częste przeciążenia i urazy kręgosłupa, najczęściej objawiające się bólem.',
      'Ból lędźwiowy dotyczy osób w każdym wieku; przyczyny: urazy, zwyrodnienia, przeciążenia, dyskopatie, otyłość, wady wrodzone, szybkie zmiany stylu życia.'
    ]
  },
  {
    page: 40,
    title: 'M3 · Rozdział 3. Wybrane wady postawy',
    summary: 'Zespoły skrzyżowania dolnego i górnego – układy mięśni skróconych i osłabionych.',
    points: [
      'Skrzyżowanie dolne: skrócone zginacze biodra, przeciążony prostownik lędźwiowy, dezaktywacja pośladków i core.',
      'Elementy napędzają się wzajemnie, więc korekcja wymaga pracy nad wszystkimi naraz.',
      'Kolejność: najpierw rozluźnianie skróconych/napiętych mięśni, potem wzmacnianie osłabionych.',
      'Skrzyżowanie górne: napięte mięśnie klatki, czworoboczny (część zstępująca) i dźwigacz łopatki; osłabione głębokie zginacze szyi i równoległoboczne.'
    ]
  },
  {
    page: 41,
    title: 'M3 · Rozdział 4. Od czego zacząć pracę z klientem?',
    summary: 'Kontrola mechaniki, sekwencja napinania, sprzęt, systemy i zasady mobilizacji oraz atlas ćwiczeń mobility.',
    points: [
      'Sekwencja napinania: ustawienie stóp → „wkręcanie pięt” (pośladki) → oddech → napięcie brzucha z oddechu → aktywizacja łopatki.',
      'Systemy: mobilizacja torebki stawowej (guma proksymalnie lub dystalnie), powierzchni ślizgowych, układu mięśniowego, aktywacja.',
      'Rolowanie pełne trwa wg skryptu min. 120 s i nie jest zalecane przed ciężkim treningiem; przerolowanie ok. 30 s może być w rozgrzewce.',
      'PIR wykonuje trener i nie bezpośrednio przed treningiem; Voodoo Floss zdejmujemy natychmiast przy silnym drętwieniu, mrowieniu lub duszności.',
      'Po poprawie zakresu wprowadź go do wzorca z mniejszym obciążeniem i kilkunastoma–kilkudziesięcioma powtórzeniami.'
    ]
  },
  // --- Moduł 4 -------------------------------------------------------------
  {
    page: 75,
    title: 'M4 · Rozdział 1. Czym jest Trening Funkcjonalny?',
    summary: '„Funkcjonalność” wymaga kontekstu – metody i ćwiczenia są narzędziami, nie celem.',
    points: [
      'Funkcjonalność warunkują: środowisko, człowiek i zadanie ruchowe.',
      'Informacje czerpiemy z narzędzi diagnostycznych i z obserwacji ruchu („głos, który nie używa słów”).',
      'Celem jest stałe podnoszenie sprawności względem wymogów środowiska danej osoby.',
      'Wymaga to indywidualizacji parametrów, ale przede wszystkim narzędzi i ćwiczeń.'
    ]
  },
  {
    page: 76,
    title: 'M4 · Rozdział 2. Sprawność fizyczna – teoria i praktyka',
    summary: 'Sprawność dzielimy na codzienną i sportową; umiejętność ruchowa to bezpieczeństwo, ekonomia i skuteczność.',
    points: [
      'Sprawność codzienna: wstawanie, przemieszczanie się, postawa, rotacje, sięganie, odporność na mikroobciążenia, prawidłowy oddech i brak bólu.',
      'Sprawność sportowa: brak bólu i skuteczność we wzorcach danej dyscypliny – zmiany kierunku, dynamika, skoki, rzuty.',
      'Umiejętności ruchowe oceniamy przez bezpieczeństwo, oszczędność energii i skuteczność.'
    ]
  },
  {
    page: 77,
    title: 'M4 · Rozdział 3. Wzorce ruchu, a wymogi środowiskowe',
    summary: 'Rozdział stawia pytania do dyskusji o tym, czy wzorce „siłowniane” pasują do naturalnego ruchu.',
    points: [
      'Analizuj wzorce w odniesieniu do naturalnego ruchu człowieka, a nie tylko do techniki ćwiczeń.',
      'Pytanie: czy istnieje „zła” pozycja pleców?',
      'Pytanie: czy koślawienie kolan zawsze jest błędem?',
      'Pytanie: czy każdy ruch możemy lub powinniśmy dociążać?'
    ]
  },
  {
    page: 78,
    title: 'M4 · Rozdział 4. Nabywanie umiejętności ruchowych – metody progresji i regresji',
    summary: 'Poza progresją/regresją i obciążeniem skrypt dodaje fazy budowania odporności umiejętności.',
    points: [
      'Kompetencja: poprawne wykonanie → tolerancja powtórzeń (serie, TUT) → obciążenie zewnętrzne → dynamika.',
      'Zmienne trudności: łańcuch otwarty/zamknięty, dźwignia krótka/długa, ruch bilateralny, unilateralny, kontrlateralny, ipsilateralny.',
      'Rezyliencja: odporność umiejętności na nieprzewidywalne środowisko, np. perturbacje.',
      'Tranzycja: przejście z jednego wzorca w inny – świadome lub samoorganizujące się (sport).',
      'Mięśnie tułowia stabilizują i przenoszą energię na kończyny; ćwicz je w wielu płaszczyznach i pozycjach środowiskowych.'
    ]
  },
  {
    page: 81,
    title: 'M4 · Rozdział 5. Elementy treningu personalnego w ujęciu poziomu sprawności',
    summary: 'Trzy poziomy pracy: medyczny, funkcjonalny i sportowy – z uwzględnieniem „dyspozycji dnia”.',
    points: [
      'Poziom medyczny: pozycje niskie, feedback wewnętrzny, przywracanie zakresu, torowanie ruchu, reedukacja oddechu, niska intensywność.',
      'Etap medyczny opuszczaj jak najszybciej – nie szukaj regresji na siłę, buduj u klienta przekonanie, że jest gotowy.',
      'Poziom funkcjonalny: pozycje wysokie, fundamentalne wzorce z progresjami, średnia intensywność, feedback wewnętrzny i zewnętrzny.',
      'Poziom sportowy: dynamika, wysoka intensywność, chaos środowiskowy, tranzycje i znajomość specyfiki sportu.'
    ]
  },
  {
    page: 84,
    title: 'M4 · Rozdział 6. Budowa jednostki treningu funkcjonalnego',
    summary: 'Pięć części jednostki: od przygotowania ruchowego do cooldownu.',
    points: [
      'Przygotowanie ruchowe: RAMP (model siłowy) lub globalny ruch środowiskowy (model funkcjonalny).',
      'Część główna – blok mocy: skoki, rzuty lub złożone wzorce siłowe o maksymalnej dla danej osoby intensywności.',
      'Część funkcjonalna: nauka wzorców i ich progresji/regresji; część akcesoryjna: słabe ogniwa i izolacja.',
      'Na koniec wydolność oraz cooldown – relaksacja, uzupełnienie diagnostyki i relacji trener–klient.'
    ]
  },
  // --- Moduł 5 -------------------------------------------------------------
  {
    page: 86,
    title: 'M5 · Rozdział 1. Czym jest Trening Siłowy?',
    summary: 'Trening z obciążeniem zewnętrznym lub masą ciała, z celami, które się nie wykluczają.',
    points: [
      'Obciążenia: sztangi, hantle, kettlebells, maszyny lub ciężar własnego ciała.',
      'Cele: hipertrofia, wzrost siły, wytrzymałość siłowa.',
      'Cele się nie wykluczają – praca nad hipertrofią może też zwiększyć siłę maksymalną.'
    ]
  },
  {
    page: 86,
    title: 'M5 · Rozdział 2. Planowanie w Treningu Siłowym',
    summary: 'Hierarchia okresów planowania od pojedynczego treningu do całego roku.',
    points: [
      'Jednostka treningowa – pojedynczy trening.',
      'Mikrocykl – kilka jednostek, np. tydzień.',
      'Mezocykl – kilka mikrocykli z jednym celem (np. objętość, siła); wg skryptu zwykle 12–16 tygodni.',
      'Makrocykl – kilka połączonych mezocykli, np. cały rok.'
    ]
  },
  {
    page: 87,
    title: 'M5 · Rozdział 3. Parametry treningowe',
    summary: 'Objętość, intensywność, przerwy, tempo, regeneracja i periodyzacja.',
    points: [
      'Objętość: liczba serii roboczych na grupę mięśniową w jednostce i w mikrocyklu.',
      'Intensywność: użyte obciążenie, wyrażane jako % 1RM albo w skali RIR lub RPE.',
      'Przerwy zależą od trudności ćwiczenia i obciążenia; tempo to czas każdej fazy ruchu zapisany liczbowo.',
      'Modele periodyzacji: liniowa, blokowa, falowa.'
    ]
  },
  {
    page: 88,
    title: 'M5 · Rozdział 4. Cele treningowe',
    summary: 'Podstawowym celem jest siła; pośrednio realizuje się też inne cele.',
    points: [
      'Cele pośrednie: hipertrofia, redukcja tkanki tłuszczowej, prewencja urazów i powrót do sprawności, poprawa kondycji.',
      'Przed planowaniem przeprowadź analizę potrzeb i specyficznych wymagań danej osoby.',
      'Trening siłowy nazywany jest też oporowym.'
    ]
  },
  {
    page: 89,
    title: 'M5 · Rozdział 5. Anatomia stawów',
    summary: 'Budowa i ruchomość stawu biodrowego, kolanowego oraz ramiennego.',
    points: [
      'Biodro: głowa kości udowej w panewce z kości biodrowej, kulszowej i łonowej; obrąbek pogłębia panewkę, więzadła wzmacniają torebkę.',
      'Kolano: staw zawiasowy; więzadła poboczne, torebki oraz krzyżowe przednie i tylne; czworogłowy to główny stabilizator, antagoniści to kulszowo-goleniowe.',
      'Bark: głowa kości ramiennej i wydrążenie stawowe łopatki pogłębione obrąbkiem; staw wieloosiowy z obwodzeniem.',
      'Zakresy kątowe podane w tym rozdziale różnią się od norm z modułu 3 – traktuj je orientacyjnie.'
    ]
  },
  {
    page: 95,
    title: 'M5 · Rozdział 6. Trening Siłowy, a wzorce ruchowe',
    summary: 'Klasyfikacja ćwiczeń złożonych według wzorców ruchowych.',
    points: [
      'Zawias biodrowy: martwy ciąg, RDL, dzień dobry, martwy ciąg jednonóż, hip thrust, swing/clean/snatch z kettlem.',
      'Dominacja kolana: przysiady (high bar, low bar, front, Zercher, goblet), przysiad dzielony i bułgarski, wykroki.',
      'Góra ciała: wypychanie horyzontalne/wertykalne oraz przyciąganie horyzontalne/wertykalne.',
      'Wzorce to uproszczenie bez sztywnych granic – np. low bar squat jest pośredni między kolanem a biodrem.'
    ]
  },
  {
    page: 97,
    title: 'M5 · Rozdział 7. Strategie nauczania wzorców ruchowych',
    summary: 'Metodyka nauczania i sposoby oddychania w ćwiczeniach siłowych.',
    points: [
      'Zacznij od pozycji wyjściowej, potem prezentacja całego ruchu; zakres dostosuj do możliwości ćwiczącego.',
      'Wolne tempo ekscentryczne pomaga torować ruch; dawaj 1, maks. 2 komendy naraz.',
      'Zasady ogólne: neutralne krzywizny kręgosłupa, kolano w osi stopy, rytm ramienno-łopatkowy.',
      'Oddech: zwykle wdech w ekscentryce i wydech w koncentryce; manewr Valsalvy przy dużych ciężarach, niezalecany początkującym i m.in. przy chorobach układu krążenia.'
    ]
  },
  {
    page: 98,
    title: 'M5 · Rozdział 8. Rozgrzewka',
    summary: 'Model RAMP oraz podział na rozgrzewkę ogólną i ukierunkowaną.',
    points: [
      'RAMP: Raise (temperatura, tętno), Activate (kluczowe mięśnie), Mobilise (aktywny stretching), Potentiate (nasilenie intensywności).',
      'Ogólna: elementy biegowe, airbike, wioślarz z rosnącą intensywnością; ukierunkowana wprowadza wzorce z części głównej.',
      'Przykłady: pies z głową w dół, WGS, rozciąganie przywodzicieli i pośladków, unoszenie bioder, Y-T-odwrócone V.',
      'Rozgrzewka ma też pozwolić wyłapać błędy i przeskalować ćwiczenia przed częścią właściwą.'
    ]
  },
  {
    page: 100,
    title: 'M5 · Rozdział 9. Trening Siłowy – ćwiczenia',
    summary: 'Siedem podstawowych ćwiczeń: pozycja startowa, tor ruchu, progresje i najczęstsze błędy z korekcją (szczegóły w atlasie ćwiczeń).',
    points: [
      'Przysiad: biodra poniżej linii kolan, kolana w linii stóp; progresja od TRX squat do OHS.',
      'Martwy ciąg: sztanga nad śródstopiem i blisko ciała; najczęstszy błąd to zaokrąglone plecy.',
      'Hip thrust: ławka na wysokości połowy łopatek, kąt prosty w kolanie w górze; skrypt nazywa je ćwiczeniem podwyższonego ryzyka.',
      'Wyciskanie leżąc i OHP: łokcie pod sztangą, proste nadgarstki; w OHP spięty brzuch chroni odcinek lędźwiowy.',
      'Wiosłowanie: ruch zaczyna łopatka; prostowanie tułowia skraca tor i przenosi pracę na czworoboczny.'
    ]
  }
];

export const TESTS = [
  {
    id: 'overhead-squat',
    title: 'Test głębokiego przysiadu z tyczką nad głową',
    aliases: ['Overhead squat', 'OHS test', 'przysiad z tyczką'],
    region: 'Całe ciało',
    pages: [25, 26, 27],
    figures: [...f(26, 1, 2)],
    goal: 'Przesiewowa ocena ruchomości i kontroli wielu segmentów naraz: stawów skokowych, kolan, bioder, odcinka piersiowego i obręczy barkowej. Wskazuje, gdzie wykonać testy szczegółowe.',
    equipment: ['Tyczka lub rurka PCV', 'Miejsce do obserwacji z 3 stron', 'Opcjonalnie telefon do nagrania'],
    setup: 'Podopieczny stoi boso lub w płaskim obuwiu, stopy mniej więcej na szerokość bioder. Tyczka trzymana szerokim chwytem, ramiona wyprostowane nad głową.',
    steps: [
      'Ustaw podopiecznego i zademonstruj ruch bez dodatkowych wskazówek technicznych, żeby zobaczyć jego naturalny wzorzec.',
      'Poproś o kilka powolnych przysiadów tak nisko, jak to możliwe bez bólu, z tyczką cały czas nad głową.',
      'Obserwuj od przodu: czy stopy się zapadają i czy kolana pozostają w linii stóp.',
      'Obserwuj od boku: głębokość, pochylenie tułowia w przód, „butt wink” (podwinięcie miednicy na dole), opadanie ramion w przód.',
      'Obserwuj od tyłu: przesunięcia boczne i przenoszenie ciężaru na jedną stronę.',
      'Zapisz lub nagraj obserwacje z każdej strony; porównuj do kolejnych pomiarów w tych samych warunkach.'
    ],
    observe: [
      'Ustawienie stóp i kolan względem stóp (widok z przodu)',
      'Głębokość przysiadu, kąt tułowia, pozycja miednicy na dole, położenie tyczki względem stóp (widok z boku)',
      'Symetria i ewentualny shift boczny (widok z tyłu)',
      'Czy podopieczny zgłasza ból lub dyskomfort i gdzie'
    ],
    errors: [
      'Podpowiadanie techniki w trakcie testu – maskuje naturalny wzorzec.',
      'Ocena tylko z jednej strony.',
      'Wyciąganie wniosku o „słabym mięśniu” wyłącznie z tego testu – to test przesiewowy.'
    ],
    interpretation: 'Skrypt łączy odchylenia z konkretnymi grupami: kolana do środka – m.in. mięśnie pośladkowe, VMO, przyśrodkowa głowa brzuchatego łydki; pochylenie tułowia, butt wink, opadające ramiona – m.in. pośladkowe, core, dolna część czworobocznego, równoległoboczne, prostowniki, piszczelowy przedni. Traktuj to jako hipotezy do sprawdzenia testami szczegółowymi, a nie gotową diagnozę.',
    stop: 'Przerwij przy bólu lub nowych objawach neurologicznych (drętwienie, mrowienie, promieniowanie). Jeden test nie daje diagnozy – przy utrzymującym się bólu skieruj do fizjoterapeuty lub lekarza.',
    sources: [SCRIPT(25)]
  },
  {
    id: 'rozciegno-podeszwowe',
    title: 'Określenie długości rozcięgna podeszwowego (wyprost palców przy ścianie)',
    aliases: ['Test rozcięgna podeszwowego', 'test wyprostu palców', 'toe extension wall test'],
    region: 'Stopa',
    pages: [27],
    figures: [...f(27, 1)],
    goal: 'Ocena wyprostu palców w stawach śródstopno-paliczkowych (miejscu zginania palców) jako wskaźnika elastyczności rozcięgna podeszwowego.',
    equipment: ['Ściana', 'Opcjonalnie goniometr lub zdjęcie z boku'],
    setup: 'Podopieczny bez obuwia stoi przodem do ściany. Palce jednej stopy opiera o ścianę.',
    steps: [
      'Poproś o wciśnięcie palców jednej stopy w ścianę, tak aby palce zgięły się do góry w stawach śródstopno-paliczkowych.',
      'Pięta i podeszwa pozostają przy podłożu; ruch ma być spokojny, bez bólu.',
      'Oceń z boku kąt wyprostu w stawach śródstopno-paliczkowych (szczególnie palucha).',
      'Powtórz dla drugiej stopy i zapisz wynik obu stron.'
    ],
    observe: [
      'Kąt wyprostu palców, zwłaszcza palucha (skrypt: orientacyjnie ok. 90°)',
      'Różnicę między stronami',
      'Odczucie ciągnięcia lub ból pod stopą'
    ],
    errors: [
      'Odrywanie pięty lub przechylanie stopy na bok.',
      'Dociskanie palców na siłę do bólu.'
    ],
    interpretation: 'Wartości ze skryptu są orientacyjne. Skrypt przy braku zakresu proponuje pracę manualną w okolicy ścięgna prostownika palucha i łączy ograniczenie z możliwymi przeciążeniami rozcięgna i słabszym wybiciem. Porównuj strony i ten sam pomiar w czasie.',
    stop: 'Przerwij przy ostrym bólu stopy lub pięty. Jeden test nie daje diagnozy; utrzymujący się ból podeszwy lub wyraźna asymetria to wskazanie do konsultacji specjalisty.',
    sources: [SCRIPT(27)]
  },
  {
    id: 'ankle-wall',
    title: 'Test ruchomości stawu skokowego – ankle wall',
    aliases: ['Knee to wall', 'test kolano do ściany', 'zgięcie grzbietowe stopy'],
    region: 'Staw skokowy',
    pages: [28],
    figures: [...f(28, 1, 2)],
    goal: 'Ocena zgięcia grzbietowego w stawie skokowym w obciążeniu.',
    equipment: ['Ściana', 'Opcjonalnie taśma miernicza'],
    setup: 'Podopieczny bez obuwia stoi twarzą do ściany. Odmierza od ściany odległość równą swojej zaciśniętej pięści z wystawionym kciukiem i tam stawia jedną stopę.',
    steps: [
      'Ustaw stopę we wskazanej odległości, palce na wprost.',
      'Podopieczny zgina kolano i próbuje dotknąć nim ściany.',
      'Pięta nie odrywa się od podłoża, stopa nie zapada się do środka (bez pronacji), a duży palec cały czas jest widoczny z góry.',
      'Zanotuj, czy kolano dotyka ściany; dla dokładniejszego porównania możesz zmierzyć maksymalną odległość stopy od ściany, przy której dotyk jest możliwy.',
      'Powtórz dla drugiej nogi w identycznych warunkach.'
    ],
    observe: [
      'Czy kolano dotyka ściany przy odmierzonej odległości',
      'Różnica między stronami',
      'Gdzie podopieczny czuje ograniczenie – łydka/Achilles czy przód stawu'
    ],
    errors: [
      'Odrywanie pięty.',
      'Zapadanie stopy i kolana do środka, by „dosięgnąć” ściany.',
      'Mierzenie stron w różnych odległościach lub w obuwiu.'
    ],
    interpretation: 'Wg skryptu przy braku dotyku warto rozważyć techniki manualne wzdłuż ścięgna Achillesa i przy górnym przyczepie mięśni strzałkowych, a następnie pracę nad łydką, dołem podkolanowym i dolną częścią tylnej grupy uda. Odległość „pięść z kciukiem” zależy od wielkości dłoni – najważniejsze jest porównanie stron i postęp w czasie.',
    stop: 'Przerwij przy bólu w stawie skokowym lub ścięgnie Achillesa. Nie wyciągaj diagnozy z jednego testu; przy utrzymującym się bólu lub asymetrii po urazie skieruj na konsultację.',
    sources: [SCRIPT(28)]
  },
  {
    id: 'aslr-3-pozycje',
    title: 'Zmodyfikowany test ASLR (Active Straight Leg Raise) w 3 pozycjach',
    aliases: ['ASLR', 'Active Straight Leg Raise', 'unoszenie prostej nogi'],
    region: 'Biodro i tył uda',
    pages: [29],
    figures: [...f(29, 1)],
    goal: 'Ocena gibkości tylnej i przyśrodkowej części kończyn dolnych przy aktywnym uniesieniu prostej nogi w trzech ustawieniach.',
    equipment: ['Mata', 'Opcjonalnie goniometr lub aplikacja do pomiaru kąta'],
    setup: 'Podopieczny leży na plecach na podłodze, obie nogi wyprostowane.',
    steps: [
      'Pozycja 1: podopieczny aktywnie unosi wyprostowaną nogę w płaszczyźnie strzałkowej, kolano w pełnym wyproście, bez spłaszczania odcinka lędźwiowego.',
      'Pozycja 2: to samo przy nodze odwiedzionej o ok. 45°.',
      'Pozycja 3: to samo w pełnym odwiedzeniu.',
      'W każdej pozycji odczytaj kąt zgięcia biodra w momencie, gdy kolano zaczyna się zginać lub miednica rusza.',
      'Powtórz drugą nogą; zapisz 6 wyników (3 pozycje × 2 strony).'
    ],
    observe: [
      'Kąt uniesienia w każdej z 3 pozycji',
      'Utrzymanie wyprostu kolana i pozycji miednicy/odcinka lędźwiowego',
      'Ruch drugiej nogi (unoszenie się uda leżącego na macie)',
      'Miejsce odczuwanego ciągnięcia'
    ],
    errors: [
      'Zginanie kolana pod koniec ruchu.',
      'Spłaszczanie lędźwi lub rotacja miednicy, które pozornie zwiększają zakres.',
      'Pomoc rękami lub wymachem.'
    ],
    interpretation: 'Wartości ze skryptu są orientacyjne (90° zgięcia we wszystkich pozycjach). Skrypt wiąże ograniczenie w pozycji 1 z grupą kulszowo-goleniową, w pozycji 45° – z mm. półścięgnistym i półbłoniastym, w pełnym odwiedzeniu – z przywodzicielem długim, wielkim i smukłym. Najwięcej mówi porównanie stron i pozycji.',
    stop: 'Przerwij przy bólu promieniującym w dół nogi, drętwieniu lub mrowieniu – to nie jest objaw „sztywnego mięśnia” do rozciągania. Nie diagnozuj na podstawie jednego testu; przy utrzymujących się objawach skieruj na konsultację.',
    sources: [SCRIPT(29)]
  },
  {
    id: 'thomas-zmodyfikowany',
    title: 'Zmodyfikowany test Thomasa',
    aliases: ['Modified Thomas test', 'test Thomasa'],
    region: 'Biodro – zginacze',
    pages: [30, 31],
    figures: [...f(30, 1)],
    goal: 'Ocena ruchomości mięśnia biodrowo-lędźwiowego, czworogłowego uda (prostego uda) i pasma biodrowo-piszczelowego.',
    equipment: ['Stabilny box, ławka lub stół do masażu', 'Asystent / trener', 'Opcjonalnie zdjęcie z boku i z góry'],
    setup: 'Podopieczny siada na samej krawędzi boxa/stołu, mocno przyciąga oba kolana do klatki piersiowej i kładzie się na plecach. Najlepiej z asekuracją trenera.',
    steps: [
      'Podopieczny trzyma jedno kolano mocno przy klatce (to ustawia miednicę i spłaszcza lędźwie), a drugą nogę opuszcza swobodnie poza krawędź.',
      'Sprawdź, czy miednica i odcinek lędźwiowy pozostają stabilne – jeśli lędźwie się odrywają, popraw przyciągnięcie kolana zanim cokolwiek ocenisz.',
      'Widok z boku: czy udo opada do linii poziomej (linia prosta między stawem biodrowym a rzepką), czy kolano zostaje wyżej.',
      'Widok z góry: czy udo zostaje w linii, czy odchodzi w bok (odwiedzenie).',
      'Widok z boku: czy podudzie zwisa pionowo (kostka pod rzepką), czy kostka jest wysunięta w przód.',
      'Bez dociskania nogi. Powtórz po drugiej stronie i zapisz trzy obserwacje dla każdej.'
    ],
    observe: [
      'Wysokość uda względem poziomu',
      'Odwiedzenie uda w widoku z góry',
      'Kąt w kolanie / pozycja kostki względem rzepki',
      'Stabilność miednicy (kontrola pochylenia)'
    ],
    errors: [
      'Brak kontroli miednicy – przodopochylenie zmienia wynik i może dać fałszywy obraz.',
      'Leżenie zbyt daleko od krawędzi, przez co udo nie może swobodnie opaść.',
      'Dociskanie uda lub podudzia przez trenera.'
    ],
    interpretation: 'Wg skryptu: kolano powyżej biodra – ograniczenie zginaczy biodra (biodrowo-lędźwiowy); udo odwiedzione – pasmo biodrowo-piszczelowe; kostka wysunięta w przód – czworogłowy (prosty uda). Wiarygodność testu zależy od kontroli pochylenia miednicy. Porównuj strony; wynik to wskazówka do dalszej pracy, nie diagnoza.',
    stop: 'Przerwij przy bólu w pachwinie, kolanie lub plecach albo przy objawach neurologicznych. Przy utrzymującym się bólu lub wyraźnej asymetrii skieruj na ocenę specjalisty.',
    sources: [SCRIPT(30), THOMAS]
  },
  {
    id: 'patrick-faber',
    title: 'Test Patricka (FABER)',
    aliases: ['Test Patrica (pisownia w skrypcie)', 'Patrick test', 'FABER', 'test czwórki', 'figure-4'],
    region: 'Biodro',
    pages: [31, 32],
    figures: [...f(31, 1)],
    goal: 'Ocena ruchomości biodra w zgięciu, odwiedzeniu i rotacji zewnętrznej oraz napięcia przywodzicieli. Skrypt wymienia też staw krzyżowo-biodrowy – test może prowokować objawy z tej okolicy, ale nie wskazuje ich źródła i nie służy do stwierdzania „zablokowania”.',
    equipment: ['Mata lub kozetka', 'Przeszkolony asystent / trener stabilizujący miednicę', 'Opcjonalnie miarka (odległość kolana od podłoża)'],
    setup: 'Podopieczny leży na plecach. Jedna noga wyprostowana, druga zgięta w kolanie; boczną kostkę zgiętej nogi kładzie na udzie nad rzepką nogi prostej (pozycja „czwórki”). Wykonuj z przeszkolonym asystentem.',
    steps: [
      'Ułóż nogę badaną w pozycji „czwórki”: kostka nad rzepką drugiej nogi.',
      'Trener stabilizuje miednicę po stronie nogi wyprostowanej (np. dłonią na kolcu biodrowym przednim górnym), aby ograniczyć współruchy.',
      'Pozwól kolanu zgiętej nogi swobodnie opaść w kierunku podłoża – bez dociskania i bez sprężynowania.',
      'Oceń końcową pozycję: czy udo zbliża się do równoległości z podłożem; możesz zmierzyć odległość bocznej części kolana od podłoża.',
      'Zapytaj, czy i gdzie pojawia się dyskomfort (pachwina, pośladek, okolica krzyżowa) – zapisz lokalizację, nie interpretuj jej jako diagnozy.',
      'Powtórz po drugiej stronie w tych samych warunkach i porównaj.'
    ],
    observe: [
      'Wysokość kolana / kąt uda względem podłoża',
      'Różnica między stronami',
      'Czy miednica się unosi lub rotuje mimo stabilizacji',
      'Lokalizacja ewentualnych objawów zgłaszanych przez podopiecznego'
    ],
    errors: [
      'Dociskanie kolana do podłoża lub „pchanie przez ból”.',
      'Brak stabilizacji miednicy – rotacja tułowia zawyża zakres.',
      'Kostka położona na kolanie zamiast nad rzepką, co zmienia ustawienie.',
      'Wnioskowanie o „zablokowanym” stawie krzyżowo-biodrowym na podstawie wyniku.'
    ],
    interpretation: 'Skrypt podaje jako wynik prawidłowy ułożenie zgiętej nogi równolegle do podłoża (wartość orientacyjna) i przy ograniczeniu proponuje mobilizację biodra oraz rozluźnianie przywodzicieli i smukłego. Objawy w teście FABER są niespecyficzne – mogą pochodzić z różnych struktur biodra, okolicy krzyżowo-biodrowej lub lędźwi – więc nie jest to samodzielne narzędzie diagnostyczne. Porównuj strony i zmiany w czasie.',
    stop: 'Przerwij przy bólu, ostrym dyskomforcie w pachwinie lub nowych objawach neurologicznych. Nie stawiaj diagnozy z jednego testu; ból lub asymetria utrzymujące się w kolejnych pomiarach to wskazanie do konsultacji z fizjoterapeutą lub lekarzem.',
    sources: [SCRIPT(31), FABER]
  },
  {
    id: 'test-kolcow',
    title: 'Test kolców',
    aliases: ['Gillet test', 'test bocianiego chodu', 'stork test', 'test kolców biodrowych tylnych górnych'],
    region: 'Miednica / okolica krzyżowo-biodrowa',
    pages: [32],
    figures: [...f(32, 1, 2)],
    goal: 'Obserwacja ruchu kolca biodrowego tylnego górnego (PSIS) względem kości krzyżowej podczas unoszenia nogi. Skrypt opisuje go jako ocenę funkcji stawu krzyżowo-biodrowego; wynik traktuj jako obserwację palpacyjną, nie jako stwierdzenie „zablokowania”.',
    equipment: ['Stabilne podparcie do asekuracji (ściana, drabinka)', 'Trener z doświadczeniem w palpacji'],
    setup: 'Trener stoi lub siedzi za podopiecznym. Podopieczny stoi stabilnie, może przytrzymać się ściany.',
    steps: [
      'Wymacaj kciukiem kolec biodrowy tylny górny po stronie badanej.',
      'Drugi kciuk połóż na tej samej wysokości na grzebieniu krzyżowym pośrodkowym (wyrostki kolczyste kości krzyżowej).',
      'Poproś o uniesienie nogi po stronie badanej i wypchnięcie kolana jak najdalej przed siebie (zgięcie biodra), utrzymując równowagę.',
      'Obserwuj, czy i jak kciuk na kolcu przemieszcza się względem kciuka na kości krzyżowej.',
      'Powtórz kilka razy i po drugiej stronie; zapisz obserwację dla każdej strony.'
    ],
    observe: [
      'Kierunek i przybliżona wielkość przesunięcia kolca względem kości krzyżowej',
      'Porównanie stron',
      'Kompensacje: przechylenie tułowia, utrata równowagi, rotacja miednicy'
    ],
    errors: [
      'Przesuwanie się kciuków po skórze zamiast śledzenia kości.',
      'Utrata równowagi i przechylanie tułowia, które zmieniają obraz ruchu.',
      'Stawianie diagnozy „zablokowania” na podstawie wyniku.'
    ],
    interpretation: 'Skrypt opisuje obserwację przesunięcia kolca w kierunku doogonowym przy zgięciu biodra. Zapisuj kierunek ruchu i różnicę między stronami, uwzględniając ruchy tułowia i miednicy oraz położenie palców. Brak lub asymetria ruchu to obserwacja do zestawienia z wywiadem i innymi testami; nie potwierdza sama w sobie żadnego rozpoznania.',
    stop: 'Przerwij przy bólu okolicy krzyżowej, pachwiny lub promieniującym do nogi. Nie diagnozuj z jednego testu; przy utrzymujących się dolegliwościach skieruj do fizjoterapeuty lub lekarza.',
    sources: [SCRIPT(32)]
  },
  {
    id: 'rotacja-piersiowa',
    title: 'Test rotacji odcinka piersiowego kręgosłupa',
    aliases: ['Seated thoracic rotation', 'rotacja TH w siadzie'],
    region: 'Kręgosłup piersiowy',
    pages: [33],
    figures: [...f(33, 1)],
    goal: 'Ocena zakresu rotacji odcinka piersiowego przy ustabilizowanej miednicy.',
    equipment: ['Krzesło lub box', 'Rurka PCV lub kij', 'Opcjonalnie goniometr / zdjęcie z góry'],
    setup: 'Podopieczny siedzi na krześle lub boxie, ręce skrzyżowane na klatce piersiowej, zaplecione na rurce PCV lub kiju opartym na klatce/barkach.',
    steps: [
      'Ustaw wyprostowany tułów, stopy na podłodze.',
      'Podopieczny obraca ramiona w prawo tak daleko, jak potrafi, utrzymując prosty kręgosłup.',
      'Biodra i pępek cały czas skierowane w przód, pośladki nie odrywają się od siedziska; głowa podąża za ruchem ramion.',
      'Oceń kąt rotacji (np. kąt kija względem linii bioder).',
      'Powtórz w lewo i zapisz oba wyniki.'
    ],
    observe: [
      'Kąt rotacji w każdą stronę',
      'Asymetria prawo–lewo',
      'Kompensacje: przesuwanie bioder, pochylanie lub zginanie bocznie tułowia'
    ],
    errors: [
      'Obracanie miednicy i odrywanie pośladka.',
      'Garbienie się lub boczne zgięcie zamiast czystej rotacji.',
      'Szarpanie na końcu ruchu.'
    ],
    interpretation: 'Skrypt podaje 60–70° w każdą stronę jako prawidłową rotację – wartości ze skryptu są orientacyjne. Wg skryptu niedobór rotacji piersiowej bywa kompensowany przez odcinek lędźwiowy i bark. Najcenniejsze jest porównanie stron i pomiar w czasie przy tym samym ustawieniu.',
    stop: 'Przerwij przy bólu pleców, klatki piersiowej lub objawach promieniujących. Nie diagnozuj z jednego testu; utrzymujący się ból to wskazanie do konsultacji.',
    sources: [SCRIPT(33)]
  },
  {
    id: 'rotacja-ramienia',
    title: 'Rotacja zewnętrzna i wewnętrzna stawu ramiennego',
    aliases: ['Shoulder ER/IR', 'rotacja barku w leżeniu', 'GH rotation 90/90'],
    region: 'Staw ramienny',
    pages: [34, 35],
    figures: [...f(34, 1), ...f(35, 1, 2)],
    goal: 'Ocena zakresu rotacji zewnętrznej i wewnętrznej ramienia przy odwiedzeniu 90°.',
    equipment: ['Mata', 'Opcjonalnie goniometr lub zdjęcie z boku', 'Asystent do stabilizacji barku (opcjonalnie)'],
    setup: 'Podopieczny leży na plecach. Ramię odwiedzone od tułowia o 90°, łokieć zgięty do 90°, przedramię pionowo.',
    steps: [
      'Rotacja zewnętrzna: podopieczny aktywnie obraca ramię na zewnątrz, kierując przedramię w stronę podłoża za głową.',
      'Pilnuj, by bark nie unosił się z podłoża, a lędźwie się nie wyginały; łokieć zostaje na wysokości barku.',
      'Odczytaj kąt przedramienia względem pionu i zapisz.',
      'Rotacja wewnętrzna: to samo ustawienie, ramię obraca się do wewnątrz (przedramię w stronę podłoża przy biodrze); obserwuj, czy przód barku nie unosi się z maty.',
      'Powtórz po drugiej stronie i porównaj sumę oraz każdą rotację osobno.'
    ],
    observe: [
      'Kąt rotacji zewnętrznej i wewnętrznej z każdej strony',
      'Asymetria między stronami',
      'Kompensacje: unoszenie barku, wyginanie lędźwi, zmiana kąta w łokciu lub odwiedzenia',
      'Ból lub uczucie „przeskakiwania” w barku'
    ],
    errors: [
      'Dopychanie przedramienia do podłoża.',
      'Unoszenie głowy kości ramiennej (barku) z maty przy rotacji wewnętrznej.',
      'Zmiana kąta odwiedzenia w trakcie pomiaru.'
    ],
    interpretation: 'Wartości ze skryptu są orientacyjne: rotacja zewnętrzna ok. 90° u osób rekreacyjnie aktywnych (skrypt podaje też szersze zakresy u zawodowych sportowców – nie jest to norma ani cel dla każdego), rotacja wewnętrzna 60–70°. Przy ograniczeniu skrypt wskazuje na pracę z piersiowym mniejszym, obojczykową częścią piersiowego większego i przednią częścią naramiennego (ER) oraz z nadgrzebieniowym i tylną częścią naramiennego (IR). Porównuj strony i zmiany w czasie, zamiast dążyć do konkretnej liczby.',
    stop: 'Przerwij przy bólu barku, uczuciu niestabilności lub mrowieniu w ręce. Nie diagnozuj z jednego testu; ból lub wyraźna asymetria to wskazanie do oceny specjalisty.',
    sources: [SCRIPT(34), SCRIPT(35)]
  }
];

// --- Atlas ćwiczeń ------------------------------------------------------------
// mob(): ćwiczenia mobility ze s. 54–73 (skrypt: tytuł + zdjęcia).
const mob = (id, title, region, pattern, page, index, muscles, setup, steps, mistakes, extra = '') => ({
  id, title, kind: 'mobility', region, pattern, pages: [page], figures: f(page, index), muscles, setup, steps, mistakes,
  note: extra ? `${extra} ${MOB_NOTE}` : MOB_NOTE
});
// v(): warianty / progresje ćwiczeń siłowych pokazane na zdjęciach.
const v = (id, title, pattern, pages, figures, muscles, setup, steps, mistakes, note) => ({
  id, title, kind: 'wariant', region: 'Dół ciała', pattern, pages, figures, muscles, setup, steps, mistakes,
  note: `${note} ${EDU}`
});

const SQ = 'Dominacja kolana (przysiad)';
const HH = 'Zawias biodrowy';
const SQ_RULES = 'Zasady jak w przysiadzie (s. 101–102): aktywna stopa z 3 punktami podparcia, kolana w linii stóp, wdech do przepony przed zejściem.';
const DL_RULES = 'Zasady jak w martwym ciągu (s. 110–111): aktywne stopy, neutralny kręgosłup, ciężar blisko ciała, wdech do przepony i spięty brzuch przed ruchem.';

const STRENGTH = [
  {
    id: 'back-squat',
    title: 'Przysiad ze sztangą na karku (back squat – high bar / low bar)',
    kind: 'siłowe',
    region: 'Dół ciała',
    pattern: SQ,
    pages: [100, 101, 102, 105, 108, 109],
    figures: [...f(101, 1), ...f(105, 1)],
    muscles: mus('quad:g', 'glMax:g', 'add:p', 'es:s', 'ta:s', 'ra:s'),
    setup: 'Sylwetka pionowa, stopy na szerokość bioder lub minimalnie szerzej (szerzej = zwykle więcej rotacji stóp na zewnątrz). Aktywna stopa z 3 punktami podparcia (mały i duży palec, pięta). Łopatki ściągnięte, brzuch napięty, klatka delikatnie wypięta, wzrok lekko przed siebie. High bar i low bar różnią się położeniem sztangi i sposobem wykonania.',
    steps: [
      'Weź wdech do przepony.',
      'Delikatnie wypchnij biodra w tył (hip hinge) i schodź w dół.',
      'Schodź do głębokości, którą kontrolujesz, utrzymując podparcie stopy i kolana w jej linii. Skrypt opisuje zejście biodrami poniżej kolan, ale zwraca też uwagę na indywidualną budowę i dobór regresji (PDF 109).',
      'Wstań tym samym torem, którym schodziłeś.',
      'Wydech dopiero po wykonaniu pełnego powtórzenia.'
    ],
    mistakes: [
      'Kolana zapadające się do środka (nieaktywna, płaska stopa) – korekta: sugestia rozpychania kolan, opór dłonią lub gumą do wewnątrz.',
      'Nadmierne pochylenie w przód (np. ograniczony staw skokowy) – korekta: mobilizacja stawu skokowego, podkładki pod pięty; przy innej budowie – inny wariant lub regresja.',
      'Rozluźnienie w trakcie (wdech do płuc zamiast do przepony) – korekta: praca nad oddechem i wzmacnianie tułowia.'
    ],
    note: 'Progresja ze skryptu: TRX squat → box squat → air squat → goblet → single arm KB squat → front rack KB squat → Zercher → front/back squat → OHS. Skrypt nie wymienia mięśni dla przysiadu – przypisanie mięśni to opracowanie edukacyjne.'
  },
  {
    id: 'deadlift',
    title: 'Martwy ciąg (deadlift – klasyczny i sumo)',
    kind: 'siłowe',
    region: 'Dół ciała',
    pattern: HH,
    pages: [109, 110, 111, 113, 115, 116],
    figures: [...f(110, 1), ...f(113, 2)],
    muscles: mus('glMax:g', 'ham:g', 'quad:p', 'es:s', 'lat:s', 'trap:s', 'ta:s'),
    setup: 'Aktywne stopy na szerokość bioder, palce zwykle na wprost, sztanga nad śródstopiem. Chwyt minimalnie szerzej niż barki. Łopatki wypuszczone (protrakcja), kręgosłup neutralny, wzrok w podłogę („podwójny podbródek”). Biodra poniżej linii głowy – wysokość zależy od budowy.',
    steps: [
      'Weź głęboki wdech do przepony i spnij brzuch.',
      'Jednocześnie ciągnij sztangę w górę i wpychaj stopy mocno w podłogę.',
      'Prowadź sztangę tak, by cały czas miała kontakt z ciałem.',
      'Zakończ w wyprostowanej pozycji, bez nadmiernego odchylania tułowia w tył.',
      'Opuszczanie: najpierw biodra w tył, sztanga przy ciele; kolana zginaj dopiero, gdy sztanga je minie.'
    ],
    mistakes: [
      'Kolana do środka (nieaktywna stopa, słabe pośladki) – korekta: sugestia rozpychania kolan, opór dłonią lub gumą.',
      'Zaokrąglone plecy – najczęstszy błąd (za duży ciężar, brak aktywności górnej części pleców, niespięty brzuch); korekta: sugestia, rurka PCV wzdłuż pleców, „ściskanie czegoś pod pachą” (najszerszy), mniejszy ciężar lub regresja.'
    ],
    note: 'Skrypt: ćwiczenie angażuje praktycznie całe ciało; cue „ściskaj pod pachą” aktywuje najszerszy grzbietu. Progresja: KB deadlift → rack pull → RDL → trap bar → sumo → deadlift → snatch deadlift. Szczegółowy podział ról mięśni to opracowanie edukacyjne.'
  },
  {
    id: 'hip-thrust',
    title: 'Hip Thrust',
    kind: 'siłowe',
    region: 'Dół ciała',
    pattern: HH,
    pages: [116, 117, 118, 119],
    figures: [...f(116, 1)],
    muscles: mus('glMax:g', 'ham:p', 'ra:s', 'ta:s'),
    setup: 'Usiądź przed ławką tak, by jej krawędź była na wysokości połowy łopatek. Sztanga na biodrach. Stopy w odległości, przy której w górnej pozycji kolano ma kąt prosty. Miednica neutralnie – ruch tylko w stawie biodrowym, cała stopa aktywnie pracuje.',
    steps: [
      'Rozpocznij pionowym ruchem bioder w górę.',
      'W połowie ruchu kieruj sztangę w stronę ławki, tak by kolana zostały nad kostkami.',
      'Zakończ w pełnym wyproście biodra ze spiętymi pośladkami.',
      'Przez cały ruch trzymaj mocno spięty brzuch i ustawioną miednicę.'
    ],
    mistakes: [
      'Złe ustawienie miednicy i rozluźniony brzuch – mocno obciąża odcinek lędźwiowy; korekta: sugestia, mniejszy ciężar, nauka bez ciężaru.',
      'Stopy za daleko lub za blisko – korekta: w siadzie środek zgiętej stopy na wysokości kolana drugiej nogi albo kąt prosty w kolanie w górnej pozycji.',
      'Wypychanie kolan w przód – czuć głównie tył uda; korekta: „biodra w stronę twarzy”, zablokowanie kolana dłonią.'
    ],
    note: 'Skrypt nazywa hip thrust ćwiczeniem podwyższonego ryzyka – zawsze pilnuj techniki. Progresja: glute bridge → glute bridge jednonóż → hip thrust.'
  },
  {
    id: 'romanian-deadlift',
    title: 'Rumuński martwy ciąg (RDL)',
    kind: 'siłowe',
    region: 'Dół ciała',
    pattern: HH,
    pages: [114, 119, 120, 121],
    figures: [...f(120, 1), ...f(114, 2)],
    muscles: mus('ham:g', 'glMax:g', 'es:s', 'ta:s'),
    setup: 'Stań wyprostowany ze sztangą na wyprostowanych ramionach. Łopatki swobodnie wypuszczone, głowa przedłużeniem kręgosłupa, nogi proste z odblokowanymi kolanami (bez przeprostu).',
    steps: [
      'Wypchnij biodra w tył, prowadząc sztangę wzdłuż ciała.',
      'Zejdź do kolan lub lekko poniżej (bardziej rozciągnięte osoby niżej).',
      'Kolana idą w tył razem z biodrami – kąt w kolanach się nie zmienia.',
      'Pilnuj prostych pleców i ściągniętych łopatek; wróć tym samym torem.'
    ],
    mistakes: [
      'Zaokrąglone plecy (za duży ciężar, brak spięcia brzucha lub górnej części pleców) – korekta: sugestia, rurka PCV, mniejszy ciężar.',
      'Zginanie kolan w trakcie – zmniejsza napięcie tylnej taśmy; korekta: „nie zginaj kolan”, „dotknij pośladkami ściany za sobą”.'
    ],
    note: 'Skrypt: wariant martwego ciągu z wyraźnie mniejszym obciążeniem, angażujący głównie prostownik, pośladki i mięśnie kulszowo-goleniowe.'
  },
  {
    id: 'bench-press',
    title: 'Wyciskanie sztangi na ławce (Bench Press)',
    kind: 'siłowe',
    region: 'Góra ciała',
    pattern: 'Wypychanie horyzontalne',
    pages: [121, 122, 123, 124],
    figures: [...f(122, 1)],
    muscles: mus('pec:g', 'tri:p', 'dA:p', 'lat:s', 'glMax:s'),
    setup: 'Leżenie na ławce z punktami podparcia: główne to stopy i łopatki; głowa i pośladki dotykają ławki, ale nie są głównym podparciem. Łopatki wypuszczone swobodnie, na starcie w relatywnej retrakcji. Chwyt ok. 1,5 szerokości barków, tak by przy dotknięciu klatki łokcie były zgięte pod kątem prostym. Nadgarstki proste.',
    steps: [
      'Weź głęboki wdech i spnij pośladki.',
      'Sztanga nad barkami – opuszczaj lekko po skosie do najwyższego punktu klatki.',
      'Łokcie cały czas pod sztangą.',
      'Wyciskaj tym samym torem do pozycji startowej.'
    ],
    mistakes: [
      'Łokcie za sztangą – zły tor, utrata siły, łopatki wychodzą z depresji; korekta: sugestia, dotknięcie najszerszego, „łamanie sztangi”, mniejszy ciężar.',
      'Za mały kąt łokci względem tułowia (wg skryptu poniżej ok. 30°) – przeciąża nadgarstki i łokcie; korekta: łokcie szerzej, mniejszy ciężar.',
      'Nadmiernie wygięte nadgarstki (sztanga na palcach) – korekta: wyprostowanie nadgarstków, ponowne ułożenie sztangi w dłoni.'
    ],
    note: 'Skrypt: główne ćwiczenie na klatkę; przy złej technice większość pracy przejmuje triceps i przednia część naramiennego. Progresja: elevated push up → push up → inverted push up → weighted push up → DB bench press → bench press.'
  },
  {
    id: 'overhead-press',
    title: 'Wyciskanie sztangi stojąc (OHP – Overhead Press)',
    kind: 'siłowe',
    region: 'Góra ciała',
    pattern: 'Wypychanie wertykalne',
    pages: [124, 125, 126],
    figures: [...f(124, 1)],
    muscles: mus('dA:g', 'dM:g', 'tri:p', 'trap:p', 'sa:p', 'ra:s', 'glMax:s'),
    setup: 'Stań wyprostowany, brzuch i pośladki spięte. Sztanga na barkach, łokcie pod sztangą, nadgarstki proste.',
    steps: [
      'Weź głęboki wdech do przepony i cofnij głowę.',
      'Wyciskaj sztangę pionowo w górę, jak najbliżej twarzy.',
      'Gdy sztanga jest nad głową, wypchnij głowę lekko w przód.',
      'Opuszczanie: ponownie cofnij głowę, łokcie lekko w przód, sztanga pionowo w dół poniżej linii brody.'
    ],
    mistakes: [
      'Brak spięcia brzucha – wypchnięcie bioder w przód i duże obciążenie odcinka lędźwiowego; korekta: sugestia, mniejszy ciężar, regresja.',
      'Wyciskanie w przód zamiast w górę (łokcie za sztangą) – dłuższy tor po łuku; korekta: łokcie w pozycji startowej, „celuj sztangą w nos”.',
      'Niewyprostowane nadgarstki – korekta: sugestia, poprawa pozycji startowej.'
    ],
    note: 'Skrypt: główną pracę wykonuje przedni i środkowy akton naramiennego; triceps, czworoboczny i zębaty przedni to opracowanie edukacyjne. Progresja: SA kneeling press → SA bottom-up KB press → standing DB press → OHP → push press.'
  },
  {
    id: 'bent-over-row',
    title: 'Wiosłowanie sztangą w opadzie (bent over barbell row)',
    kind: 'siłowe',
    region: 'Góra ciała',
    pattern: 'Przyciąganie horyzontalne',
    pages: [127, 128],
    figures: [...f(127, 1)],
    muscles: mus('lat:g', 'rh:g', 'trap:p', 'dP:p', 'bic:p', 'es:s', 'ham:s'),
    setup: 'Pochyl się do przodu – im bardziej poziomo, tym więcej pracy pleców. Kręgosłup neutralny, łopatki swobodnie wypuszczone, sztanga pewnym chwytem pod barkami, głowa przedłużeniem kręgosłupa.',
    steps: [
      'Zacznij ruch od mocnego ściągnięcia łopatek.',
      'Ręce dociągają sztangę dopiero w końcowej fazie – do górnej części brzucha lub do bioder (zależnie od chwytu).',
      'Opcjonalnie krótka pauza na górze.',
      'Opuść sztangę tą samą drogą.'
    ],
    mistakes: [
      'Brak pracy łopatki – pracę przejmuje biceps; korekta: sugestia ściągania łopatek, mniejszy ciężar, nauka ruchu łopatką bez ciężaru.',
      'Prostowanie się podczas przyciągania – krótszy tor, więcej pracy czworobocznego; korekta: „nie prostuj się”, mniejszy ciężar.'
    ],
    note: 'Skrypt: podchwyt mocniej angażuje najszersze, nachwyt – mięśnie położone wyżej na łopatkach; źle wykonane przenosi pracę na biceps. Progresja: chest supported row → knee supported row → tripod stance row → DB bent over row → bent over barbell row.'
  }
];

const VARIANTS = [
  v('trx-squat', 'TRX squat', SQ, [102], f(102, 1), mus('quad:g', 'glMax:g', 'ta:s'),
    'Stań przodem do punktu zaczepienia TRX, trzymając uchwyty na wyprostowanych lub lekko zgiętych rękach; taśmy napięte.',
    ['Weź wdech, wypchnij biodra w tył.', 'Zejdź do przysiadu, używając taśm tylko do zachowania równowagi.', 'Wstań tym samym torem.'],
    ['Ciągnięcie się rękami zamiast pracy nóg.', 'Kolana uciekające do środka.'],
    `Pierwszy stopień progresji przysiadu wg skryptu – podparcie ułatwia naukę głębokości. ${SQ_RULES}`),
  v('box-squat', 'Box squat', SQ, [103], f(103, 1), mus('quad:g', 'glMax:g', 'ta:s'),
    'Stań przed boxem na odległość krótkiego kroku, stopy jak w przysiadzie, ręce przed sobą.',
    ['Wypchnij biodra w tył i schodź kontrolowanie.', 'Dotknij boxa pośladkami bez „siadania z opadu”.', 'Wstań, wpychając stopy w podłogę.'],
    ['Opadanie na box i rozluźnienie tułowia.', 'Przenoszenie ciężaru na palce.'],
    `Box wyznacza głębokość i daje poczucie bezpieczeństwa. ${SQ_RULES}`),
  v('air-squat', 'Air squat (przysiad bez obciążenia)', SQ, [103], f(103, 2), mus('quad:g', 'glMax:g', 'ta:s'),
    'Pozycja startowa jak w przysiadzie: stopy na szerokość bioder lub minimalnie szerzej, ręce przed sobą dla przeciwwagi.',
    ['Wdech do przepony.', 'Biodra w tył i w dół, kolana w linii stóp.', 'Zejdź poniżej linii kolan, jeśli pozwala na to zakres.', 'Wstań tym samym torem.'],
    ['Zapadanie kolan.', 'Odrywanie pięt.', 'Utrata napięcia tułowia na dole.'],
    SQ_RULES),
  v('goblet-squat-podwyzszenie', 'Goblet squat na podwyższeniu (pięty na talerzach)', SQ, [104], f(104, 1), mus('quad:g', 'glMax:g', 'add:p', 'ta:s'),
    'Kettlebell lub hantla trzymana pionowo przy klatce, pięty uniesione na talerzach / klinie.',
    ['Wdech, napięcie brzucha.', 'Zejdź w dół, łokcie między kolanami.', 'Utrzymaj tułów bardziej pionowo niż bez podwyższenia.', 'Wstań, pchając całą stopą.'],
    ['Odsuwanie ciężaru od klatki.', 'Zaokrąglanie pleców na dole.'],
    `Podwyższenie pięt to korekta opisana w skrypcie przy nadmiernym pochyleniu w przód (np. ograniczony staw skokowy). ${SQ_RULES}`),
  v('goblet-squat', 'Goblet squat', SQ, [104], f(104, 2), mus('quad:g', 'glMax:g', 'add:p', 'ta:s', 'ra:s'),
    'Kettlebell lub hantla trzymana pionowo przy klatce piersiowej, stopy jak w przysiadzie.',
    ['Wdech do przepony.', 'Zejdź w dół, utrzymując ciężar przy klatce i tułów wyprostowany.', 'Kolana w linii stóp.', 'Wstań tym samym torem.'],
    ['Ciężar odjeżdżający od ciała.', 'Kolana do środka.'],
    SQ_RULES),
  v('front-squat', 'Front squat (przysiad ze sztangą z przodu)', SQ, [105], f(105, 2), mus('quad:g', 'glMax:g', 'es:s', 'ta:s', 'ra:s'),
    'Sztanga na przednich częściach barków, łokcie wysoko w przód, tułów pionowo.',
    ['Wdech i napięcie brzucha.', 'Zejdź w dół, utrzymując wysoko łokcie.', 'Wstań, prowadząc klatkę w górę.'],
    ['Opadanie łokci i zaokrąglanie górnej części pleców.', 'Przenoszenie ciężaru na palce.'],
    `W progresji skryptu na poziomie przysiadu ze sztangą (front/back). ${SQ_RULES}`),
  v('zercher-squat', 'Zercher squat', SQ, [106], f(106, 1, 2), mus('quad:g', 'glMax:g', 'bic:s', 'es:s', 'ta:s'),
    'Sztanga trzymana w zgięciach łokci przed tułowiem, ręce splecione lub dłonie skierowane w górę.',
    ['Wdech i mocne napięcie brzucha.', 'Zejdź do przysiadu z tułowiem możliwie pionowo.', 'Wstań tym samym torem.'],
    ['Opadanie łokci i zaokrąglanie pleców.', 'Zbyt duży ciężar, który powoduje ból w zgięciach łokci.'],
    SQ_RULES),
  v('frankenstein-squat', 'Frankenstein squat', SQ, [107], f(107, 1), mus('quad:g', 'glMax:g', 'ta:s', 'es:s'),
    'Sztanga oparta na przodzie barków bez trzymania dłońmi, ręce wyprostowane przed sobą.',
    ['Wdech i napięcie tułowia.', 'Zejdź w dół, utrzymując tułów pionowo – inaczej sztanga zsunie się z barków.', 'Wstań tym samym torem.'],
    ['Pochylenie tułowia.', 'Zbyt duży ciężar – ćwiczenie służy kontroli pozycji.'],
    `Pokazany w skrypcie wariant uczący pionowego tułowia jak we front squat. ${SQ_RULES}`),
  v('split-squat', 'Split squat (przysiad dzielony)', SQ, [107], f(107, 2), mus('quad:g', 'glMax:g', 'add:p', 'glMed:s'),
    'Ustawienie w rozkroku wykrocznym, ciężar (np. kettlebell przy klatce) lub bez ciężaru; obie stopy na podłodze.',
    ['Zejdź pionowo w dół, aż tylne kolano zbliży się do podłoża.', 'Przednie kolano w linii stopy.', 'Wróć, pchając przednią stopą.'],
    ['Zapadanie przedniego kolana.', 'Zbyt wąskie ustawienie stóp (utrata równowagi).'],
    'Skrypt wymienia przysiad dzielony we wzorcu dominacji kolana.'),
  v('bulgarian-split-squat', 'Bułgarski przysiad dzielony (Bulgarian split squat)', SQ, [108], f(108, 1), mus('quad:g', 'glMax:g', 'add:p', 'glMed:s', 'psoas:r'),
    'Tylna stopa oparta grzbietem na ławce, przednia stopa wysunięta; ciężar przy klatce lub w dłoniach.',
    ['Wdech, napięcie brzucha.', 'Zejdź w dół na przedniej nodze.', 'Przednie kolano w linii stopy.', 'Wróć, pchając przednią stopą.'],
    ['Przednia stopa za blisko ławki.', 'Zapadanie kolana do środka.'],
    'Skrypt wymienia bułgarski przysiad dzielony we wzorcu dominacji kolana.'),
  v('kettlebell-deadlift', 'Kettlebell deadlift', HH, [111], f(111, 1), mus('glMax:g', 'ham:g', 'quad:p', 'es:s'),
    'Kettlebell między stopami na wysokości śródstopia, stopy na szerokość bioder.',
    ['Wypchnij biodra w tył, chwyć kettlebell, plecy neutralne.', 'Wdech i napięcie brzucha.', 'Wstań, wpychając stopy w podłogę.', 'Odłóż, zaczynając od bioder w tył.'],
    ['Zaokrąglanie pleców.', 'Przysiadanie zamiast zawiasu biodrowego.'],
    `Pierwszy stopień progresji martwego ciągu wg skryptu. ${DL_RULES}`),
  v('rack-pull', 'Rack pull deadlift', HH, [112], f(112, 1), mus('glMax:g', 'ham:g', 'es:s', 'lat:s'),
    'Sztanga ustawiona na podporach lub podwyższeniu (np. na wysokości kolan) – skrócony zakres.',
    ['Ustaw się jak w martwym ciągu, biodra w tył.', 'Wdech i napięcie.', 'Wyprostuj biodra, prowadząc sztangę przy udach.', 'Odłóż kontrolowanie.'],
    ['Zaokrąglanie pleców.', 'Odchylanie się w tył na górze.'],
    `Skrócony zakres ułatwia naukę pozycji pleców. ${DL_RULES}`),
  v('trap-bar-deadlift', 'Trap bar deadlift', HH, [113], f(113, 1), mus('glMax:g', 'quad:g', 'ham:p', 'es:s', 'trap:s'),
    'Stań w środku sztangi heksagonalnej, uchwyty po bokach ciała.',
    ['Biodra w tył i w dół, chwyć uchwyty.', 'Wdech i napięcie brzucha.', 'Wstań, wpychając stopy w podłogę.', 'Opuść tym samym torem.'],
    ['Zaokrąglanie pleców.', 'Kolana do środka.'],
    DL_RULES),
  v('semi-sumo-deadlift', 'Martwy ciąg semi-sumo / sumo', HH, [110, 114], [...f(114, 1), ...f(110, 1)], mus('glMax:g', 'add:g', 'quad:p', 'ham:p', 'es:s'),
    'Stopy szerzej niż w klasycznym martwym ciągu, palce skierowane na zewnątrz, chwyt między kolanami.',
    ['Kolana rozpychane na zewnątrz w linii stóp.', 'Wdech i napięcie.', 'Wstań, prowadząc sztangę przy ciele.', 'Opuść tym samym torem.'],
    ['Kolana zapadające się do środka.', 'Biodra uciekające w górę przed sztangą.'],
    `Skrypt wymienia klasyczny i sumo jako dwa najpopularniejsze rodzaje martwego ciągu. ${DL_RULES}`),
  v('snatch-deadlift', 'Snatch deadlift (martwy ciąg chwytem rwaniowym)', HH, [115], f(115, 1), mus('glMax:g', 'ham:g', 'quad:p', 'trap:s', 'lat:s', 'es:s'),
    'Bardzo szeroki chwyt sztangi (rwaniowy), przez co pozycja startowa jest niższa.',
    ['Ustaw biodra niżej niż w klasycznym martwym ciągu.', 'Wdech i napięcie.', 'Wstań, sztanga blisko ciała.', 'Opuść kontrolowanie.'],
    ['Zaokrąglanie pleców przez niższą pozycję startową.', 'Zbyt duży ciężar.'],
    `Ostatni stopień progresji martwego ciągu w skrypcie. ${DL_RULES}`),
  v('glute-bridge', 'Glute bridge (unoszenie bioder)', HH, [117], f(117, 1), mus('glMax:g', 'ham:p', 'ra:s'),
    'Leżenie na plecach, kolana zgięte, stopy na podłodze, ręce wzdłuż tułowia.',
    ['Spnij brzuch, ustaw miednicę.', 'Unieś biodra do wyprostu w stawie biodrowym.', 'Spnij pośladki na górze.', 'Opuść kontrolowanie.'],
    ['Wyginanie lędźwi zamiast wyprostu biodra.', 'Pchanie tylko piętami.'],
    'Pierwszy stopień progresji hip thrust wg skryptu.'),
  v('glute-bridge-jednonoz', 'Glute bridge jednonóż', HH, [118], f(118, 1), mus('glMax:g', 'ham:p', 'glMed:s', 'ra:s'),
    'Jak glute bridge, ale jedna noga wyprostowana w górę lub uniesiona.',
    ['Spnij brzuch.', 'Unieś biodra na jednej nodze bez rotacji miednicy.', 'Opuść kontrolowanie; powtórz drugą stroną.'],
    ['Opadanie lub rotacja miednicy.', 'Kompensacja odcinkiem lędźwiowym.'],
    'Drugi stopień progresji hip thrust wg skryptu.')
];

const A = 'Staw skokowy';
const H = 'Staw biodrowy';
const S = 'Kręgosłup';
const B = 'Staw ramienny';

const MOBILITY = [
  // 4.9 Staw skokowy
  mob('trakcja-guma-kb', 'Trakcja z użyciem gumy i KB', A, 'Mobilność stawu skokowego', 54, 1, mus('sol:r', 'gast:r'),
    'Klęk jednonóż, przednia stopa płasko. Guma (power band) założona nisko wokół przedniego stawu skokowego i zaczepiona za tobą; kettlebell oparty na przednim kolanie jako lekkie dociążenie.',
    ['Ustaw napięcie gumy tak, by delikatnie odciągało staw – bez bólu.', 'Przenieś kolano w przód nad palcami, pięta zostaje na podłodze.', 'Wróć i powtórz spokojnie; zmień stronę.'],
    ['Odrywanie pięty.', 'Zapadanie kolana i stopy do środka.', 'Zbyt mocne napięcie gumy lub dociskanie kettlebellem.'],
    `Ostrożnie: ${CAUTION} Skrypt opisuje mobilizację torebki gumą (s. 45) i rozciąganie stawu jako trakcję (s. 52).`),
  mob('ankle-cars', "Ankle CARs (kontrolowane krążenia stawu skokowego)", A, 'Mobilność stawu skokowego', 55, 1, mus('tib:g', 'per:g', 'sol:p', 'gast:p'),
    'Siad, jedna noga założona na drugą; dłonie stabilizują podudzie, by ruch zachodził tylko w stawie skokowym.',
    ['Wykonuj powolne, możliwie największe krążenie stopą.', 'Na każdym etapie aktywnie „szukaj” końca zakresu.', 'Zmień kierunek, potem stronę.'],
    ['Szybkie, bezwładne kręcenie.', 'Ruch podudziem zamiast w stawie skokowym.']),
  mob('tibialis-aktywacja', 'Tibialis anterior – aktywacja', A, 'Mobilność stawu skokowego', 55, 2, mus('tib:g', 'gast:r'),
    'Stań plecami (pośladkami) opartymi o ścianę, stopy wysunięte nieco w przód.',
    ['Unieś przodostopie i palce w górę, pięty zostają na podłodze.', 'Opuść kontrolowanie.', 'Powtarzaj płynnie, czując pracę przodu goleni.'],
    ['Odchodzenie od ściany i balansowanie tułowiem.', 'Zbyt mały zakres.']),
  mob('rdl-dorsiflexion', 'RDL dorsiflexion (skłon RDL z przodostopiem na podwyższeniu)', A, 'Mobilność stawu skokowego / tylna taśma', 56, 1, mus('gast:r', 'ham:r', 'es:s'),
    'Przodostopia na niskim podwyższeniu (np. talerzach), pięty na podłodze; kij/tyczka trzymany w dłoniach lub wzdłuż pleców.',
    ['Odblokuj kolana, wypchnij biodra w tył jak w RDL.', 'Utrzymaj neutralne plecy.', 'Zatrzymaj się, gdy czujesz rozciąganie łydek i tyłu ud.', 'Wróć do wyprostu.'],
    ['Zaokrąglanie pleców, żeby zejść niżej.', 'Zbyt wysokie podwyższenie.']),
  // 4.10 Biodro – zginacze
  mob('couch-stretch', 'Couch stretch', H, 'Zginacze biodra', 56, 2, mus('quad:r', 'psoas:r', 'glMax:s', 'ra:s'),
    'Klęk jednonóż tyłem do ławki lub ściany: tylne kolano blisko krawędzi, grzbiet stopy oparty o ławkę, przednia stopa płasko przed sobą.',
    ['Spnij pośladek nogi tylnej i lekko podwiń miednicę.', 'Wyprostuj tułów, aż poczujesz rozciąganie z przodu uda i biodra.', 'Oddychaj spokojnie, następnie zmień stronę.'],
    ['Wyginanie lędźwi zamiast ustawienia miednicy.', 'Ból pod rzepką – zmniejsz zgięcie kolana (podkładka, dalej od ławki).']),
  mob('hip-flexors-ql', 'Hip flexors + QL stretch', H, 'Zginacze biodra', 57, 1, mus('psoas:r', 'ql:r', 'eo:r', 'glMax:s'),
    'Klęk jednonóż na macie, tułów wyprostowany.',
    ['Spnij pośladek nogi tylnej i przesuń biodra lekko w przód.', 'Unieś rękę po stronie tylnej nogi nad głowę.', 'Wykonaj skłon boczny w stronę przedniej nogi.', 'Wróć i powtórz; zmień stronę.'],
    ['Przeprost w lędźwiach.', 'Rotacja tułowia zamiast skłonu bocznego.']),
  mob('reverse-nordic-curl', 'Reverse Nordic curl', H, 'Zginacze biodra / przód uda', 57, 2, mus('quad:g', 'ra:s', 'glMax:s'),
    'Klęk obunóż na macie; opcjonalnie guma zaczepiona przed tobą trzymana w dłoniach jako asysta.',
    ['Spnij pośladki i brzuch – linia kolana–biodra–barki prosta.', 'Odchyl się w tył, zginając tylko kolana.', 'Wróć do pionu siłą przodu ud (z asystą gumy).'],
    ['Zginanie w biodrach („siadanie” na piętach).', 'Zbyt duży zakres na początku – ból kolan to sygnał do skrócenia ruchu.'],
    'Ćwiczenie ekscentrycznie obciąża przód uda w wydłużeniu – zaczynaj od małego zakresu i asysty.'),
  mob('seated-hip-flexor-raises', 'Seated hip flexor raises', H, 'Zginacze biodra (aktywacja)', 58, 1, mus('psoas:g', 'quad:g', 'ham:r'),
    'Siad prosty z wyprostowanymi nogami, tułów pionowo, ręce skrzyżowane na klatce lub podparte.',
    ['Utrzymaj wyprostowany tułów.', 'Unieś jedną wyprostowaną nogę nad podłogę.', 'Opuść kontrolowanie; zmieniaj nogi.'],
    ['Odchylanie tułowia w tył.', 'Zginanie kolana przy unoszeniu.']),
  // Kulszowo-goleniowe
  mob('active-hamstring-stretch', 'Active hamstring stretch', H, 'Mięśnie kulszowo-goleniowe', 58, 2, mus('ham:r', 'quad:g'),
    'Leżenie na plecach, jedna noga zgięta w biodrze ok. 90°, dłonie trzymają udo; druga noga prosta na macie.',
    ['Aktywnie prostuj kolano nogi uniesionej.', 'Zatrzymaj się na krótko w końcowym zakresie (bez pulsowania).', 'Ugnij i powtórz; zmień stronę.'],
    ['Odrywanie miednicy lub drugiej nogi.', 'Szarpanie w końcowym zakresie.'],
    'Skrypt w rozgrzewce wymienia „aktywne wyprosty kolana” jako rozciąganie grupy kulszowo-goleniowej (s. 99).'),
  mob('sprinter-stretch', 'Sprinter stretch – tylna taśma powierzchowna', H, 'Mięśnie kulszowo-goleniowe', 59, 1, mus('ham:r', 'gast:r'),
    'Wykrok z dłońmi na podłodze po obu stronach przedniej stopy, tylne kolano na macie.',
    ['Przenieś biodra w tył, prostując przednie kolano.', 'Palce przedniej stopy możesz unieść.', 'Wróć do wykroku; powtarzaj i zmień stronę.'],
    ['Mocne zaokrąglanie pleców.', 'Blokowanie kolana w przeproście.']),
  mob('hamstring-pir', 'Hamstring PIR (poizometryczna relaksacja)', H, 'Mięśnie kulszowo-goleniowe', 59, 2, mus('ham:r'),
    'Leżenie na plecach, wyprostowana noga oparta o słupek / framugę lub prowadzona przez trenera w końcowym zakresie; druga noga prosta na podłodze.',
    ['Ustaw nogę w lekkim, komfortowym rozciąganiu.', 'Delikatnie dociśnij piętę w oporze (ok. 8 s wg skryptu) bez ruchu.', 'Rozluźnij i z wydechem przejdź do nowego zakresu.', 'Powtórz kilka razy.'],
    ['Zbyt mocne napięcie – nacisk ma być niewielki.', 'Dociskanie nogi przez ból.'],
    `Skrypt (s. 50): PIR wykonuje trener i nie bezpośrednio przed treningiem. ${CAUTION}`),
  mob('jefferson-curl', 'Jefferson curl', S, 'Mięśnie kulszowo-goleniowe / kręgosłup', 60, 1, mus('es:r', 'ham:r'),
    'Stań na boxie z lekkim kettlebellem w dłoniach, nogi proste lub lekko odblokowane.',
    ['Zrób skłon, rolując kręgosłup kręg po kręgu od głowy w dół.', 'Pozwól ciężarowi zejść poniżej poziomu stóp tylko na tyle, na ile pozwala komfort.', 'Wróć powoli, rozwijając kręgosłup od dołu.'],
    ['Zbyt duży ciężar i szybkie tempo.', 'Wykonywanie przy bólu pleców lub promieniowaniu do nogi.'],
    `Ostrożnie: zaczynaj bez ciężaru lub z bardzo lekkim, w wolnym tempie. Osoby z dolegliwościami kręgosłupa powinny skonsultować to ćwiczenie ze specjalistą. ${CAUTION}`),
  // Przywodziciele
  mob('adductor-rock-back', 'Adductor rock back', H, 'Przywodziciele', 60, 2, mus('add:r'),
    'Klęk podparty, jedna noga wyprostowana w bok, stopa płasko na podłodze.',
    ['Utrzymaj neutralne plecy.', 'Przesuwaj biodra w tył w stronę pięt.', 'Wróć w przód; powtarzaj i zmień stronę.'],
    ['Zaokrąglanie lędźwi przy cofaniu bioder.', 'Odrywanie stopy nogi wyprostowanej.']),
  mob('frog-stretch', 'Frog stretch', H, 'Przywodziciele', 61, 1, mus('add:r'),
    'Podpór na przedramionach, kolana szeroko, podudzia równolegle, stopy zwrócone na zewnątrz.',
    ['Ustaw kolana na komfortowej szerokości.', 'Przesuwaj biodra w tył i w przód.', 'Oddychaj spokojnie, bez sprężynowania.'],
    ['Zbyt szerokie ustawienie kolan na start.', 'Zapadanie lędźwi.']),
  mob('cossack-squat', 'Cossack squat', H, 'Przywodziciele', 61, 2, mus('add:r', 'quad:g', 'glMax:g'),
    'Szeroki rozkrok, ciężar (kettlebell) przy klatce lub bez ciężaru.',
    ['Przenieś ciężar na jedną nogę, schodząc w przysiad.', 'Druga noga prostuje się, palce mogą unieść się w górę.', 'Wróć przez środek i przejdź na drugą stronę.'],
    ['Odrywanie pięty nogi zgiętej.', 'Zapadanie kolana do środka.']),
  // Rotacja zewnętrzna biodra
  mob('pigeon-stretch', 'Pigeon stretch (gołąb)', H, 'Rotacja zewnętrzna biodra', 62, 1, mus('glMax:r', 'rotH:r', 'psoas:r'),
    'Przednia noga zgięta, podudzie ułożone w poprzek przed tobą; tylna noga wyprostowana w tył.',
    ['Ustaw biodra prosto.', 'Pochyl tułów nad przednią nogą, podpierając się rękami.', 'Oddychaj spokojnie; zmień stronę.'],
    ['Przechylanie miednicy na bok przedniej nogi.', 'Ból w kolanie przedniej nogi – zmniejsz kąt podudzia lub podłóż podparcie.']),
  mob('90-90-er-rotation', '90/90 ER rotation', H, 'Rotacja zewnętrzna biodra', 62, 2, mus('glMax:r', 'glMed:r', 'rotH:r'),
    'Siad 90/90: przednia noga w rotacji zewnętrznej, tylna w wewnętrznej, oba kolana zgięte ok. 90°.',
    ['Wyprostuj tułów nad przednią nogą.', 'Pochyl się w przód nad przednim podudziem z prostymi plecami.', 'Wróć; zmień stronę.'],
    ['Zaokrąglanie pleców zamiast zgięcia w biodrze.', 'Odrywanie przedniego pośladka.']),
  // Rotacja wewnętrzna biodra
  mob('90-90-ir-lift-off', '90/90 internal hip rotation lift off', H, 'Rotacja wewnętrzna biodra', 63, 1, mus('glMed:g', 'glMin:g', 'rotH:r'),
    'Siad 90/90, tułów wyprostowany, dłonie lekko podpierają.',
    ['Unieś kolano / stopę tylnej nogi nad podłogę.', 'Utrzymaj krótko i opuść kontrolowanie.', 'Zmień stronę.'],
    ['Przechylanie tułowia, by unieść nogę.', 'Szarpanie zamiast kontrolowanego uniesienia.']),
  mob('seated-hip-ir-foam-roller', 'Seated hip IR foam roller', H, 'Rotacja wewnętrzna biodra', 63, 2, mus('glMed:g', 'glMin:g', 'add:s'),
    'Siad na boxie, wałek ustawiony pionowo między kolanami, stopy na podłodze.',
    ['Ściśnij wałek kolanami.', 'Odsuń stopy na zewnątrz (rotacja wewnętrzna bioder), kolana zostają przy wałku.', 'Wróć i powtórz.'],
    ['Ruch kolanami zamiast podudzi.', 'Przechylanie miednicy.']),
  mob('side-lying-hip-ir-miniband', 'Side lying hip IR + miniband', H, 'Rotacja wewnętrzna biodra', 64, 1, mus('glMed:g', 'glMin:g'),
    'Leżenie bokiem, kolana zgięte, miniband wokół ud lub stóp.',
    ['Utrzymaj kolana razem.', 'Unieś stopę górnej nogi w górę (rotacja wewnętrzna).', 'Opuść kontrolowanie.'],
    ['Rotowanie miednicy w tył.', 'Rozchylanie kolan.']),
  // Rotacja ZR + WR
  mob('90-90-to-bear-sit', '90/90 to bear sit transition', H, 'Rotacja zewnętrzna + wewnętrzna biodra', 64, 2, mus('glMed:g', 'glMin:g', 'psoas:p', 'ra:s'),
    'Siad 90/90, ręce wyciągnięte przed siebie lub na boki dla równowagi.',
    ['Przejdź płynnie z jednej pozycji 90/90 w drugą, obracając kolana.', 'Przenieś ciężar przez pozycję siadu z kolanami w górze.', 'Powtarzaj w obie strony.'],
    ['Pomaganie sobie rękami zamiast pracy bioder.', 'Szybkie, niekontrolowane przejścia.']),
  mob('90-90-rear-leg-er-ir', '90/90 rear leg hip ER to IR', H, 'Rotacja zewnętrzna + wewnętrzna biodra', 65, 1, mus('glMed:g', 'glMin:g', 'rotH:p'),
    'Siad z nogami ugiętymi przed sobą, dłonie podpierają z tyłu lub ręce wyciągnięte przed siebie.',
    ['Opuść oba kolana na jedną stronę (90/90).', 'Przenieś je przez środek na drugą stronę.', 'Kontroluj ruch tylnej nogi z rotacji zewnętrznej do wewnętrznej.'],
    ['Odrywanie stóp od podłogi.', 'Odchylanie tułowia zamiast pracy bioder.']),
  // Mobilizacja kręgosłupa
  mob('cat-camel', 'Cat-camel (zgięcie/wyprost)', S, 'Mobilizacja kręgosłupa', 65, 2, mus('es:g', 'ra:g'),
    'Klęk podparty, dłonie pod barkami, kolana pod biodrami.',
    ['Z wydechem zaokrąglij plecy w górę (zgięcie).', 'Z wdechem łagodnie wygnij plecy w dół (wyprost).', 'Ruch płynny, segment po segmencie.'],
    ['Ruch tylko głową lub tylko w lędźwiach.', 'Wymuszanie skrajnych pozycji.']),
  mob('ledzwiowy-zgiecie-wyprost', 'Odcinek lędźwiowy – zgięcie/wyprost', S, 'Mobilizacja kręgosłupa', 66, 1, mus('es:g', 'ra:g'),
    'Klęk z podparciem na przedramionach, biodra nad kolanami.',
    ['Podwijaj i odwijaj miednicę.', 'Ruch skupiony w odcinku lędźwiowym, górna część pleców spokojna.', 'Powtarzaj płynnie.'],
    ['Ruch całym tułowiem.', 'Wykonywanie przy bólu.']),
  mob('piersiowy-zgiecie-wyprost', 'Odcinek piersiowy – zgięcie/wyprost', S, 'Mobilizacja kręgosłupa', 66, 2, mus('es:g', 'sa:s', 'ra:s'),
    'Klęk podparty, biodra cofnięte nad pięty – to ogranicza ruch lędźwi.',
    ['Zaokrąglaj górną część pleców, odpychając się od podłoża.', 'Następnie unieś mostek w przód (wyprost piersiowy).', 'Lędźwie pozostają spokojne.'],
    ['Przenoszenie ruchu do lędźwi.', 'Zapadanie się między łopatkami bez kontroli.']),
  mob('mobilizacja-wyprost-th', 'Mobilizacja do wyprostu odcinka piersiowego (TH) na wałku', S, 'Mobilizacja kręgosłupa', 67, 1, mus('es:g', 'ra:s'),
    'Leżenie na plecach z wałkiem w poprzek pod odcinkiem piersiowym, kolana zgięte, dłonie podtrzymują głowę.',
    ['Napnij brzuch, żeby żebra nie unosiły się nadmiernie.', 'Odchyl górną część pleców nad wałkiem.', 'Przesuwaj wałek o kilka centymetrów i powtarzaj.'],
    ['Wałek pod odcinkiem lędźwiowym.', 'Ciągnięcie głowy rękami.'],
    `Ostrożnie: ${CAUTION}`),
  mob('open-book', 'Open book stretch – rotacja TH', S, 'Mobilizacja kręgosłupa (rotacja)', 67, 2, mus('eo:p', 'io:p', 'pec:r'),
    'Leżenie bokiem, kolana zgięte i złączone, ręce wyprostowane przed sobą.',
    ['Kolana zostają na podłodze.', 'Otwórz górną rękę łukiem na drugą stronę, obracając klatkę.', 'Wzrok podąża za dłonią; wróć i powtórz.'],
    ['Odrywanie kolan i rotacja miednicą.', 'Wymuszanie dotknięcia dłonią podłogi.']),
  mob('wall-th-rotation', 'Wall TH rotation', S, 'Mobilizacja kręgosłupa (rotacja)', 68, 1, mus('eo:g', 'io:g', 'pec:r', 'glMax:s'),
    'Klęk jednonóż bokiem do ściany, ręce wyprostowane przed sobą.',
    ['Spnij pośladek nogi klęczącej, biodra stabilne.', 'Obróć klatkę i otwórz rękę w stronę ściany.', 'Wróć; zmień stronę.'],
    ['Rotacja w biodrach zamiast w odcinku piersiowym.', 'Przeprost w lędźwiach.']),
  // 4.11 Bark – najszerszy grzbietu
  mob('banana-stretch', 'Banana stretch', B, 'Najszerszy grzbietu', 68, 2, mus('lat:r', 'ql:r', 'eo:r'),
    'Klęk podparty, następnie przejście w siad na piętach z wyciągniętymi rękami.',
    ['Przejdź dłońmi na jedną stronę, tworząc łuk tułowia („banan”).', 'Przenieś biodra w tył w przeciwną stronę.', 'Oddychaj w rozciągany bok; zmień stronę.'],
    ['Unoszenie bioder z pięt.', 'Rotacja tułowia zamiast bocznego wygięcia.']),
  mob('lat-stretch-powerband', 'Lat stretch powerband', B, 'Najszerszy grzbietu', 69, 1, mus('lat:r', 'tm:r'),
    'Power band zaczepiony przed tobą na wysokości barków, jedna dłoń w pętli; stopy w lekkim rozkroku.',
    ['Cofnij się, aż guma się napnie.', 'Wypchnij biodra w tył i opuść tułów między ramiona.', 'Odczuj rozciąganie boku tułowia pod pachą; zmień stronę.'],
    ['Zaokrąglanie pleców.', 'Szarpnięcia gumą – trakcja ma być łagodna.']),
  mob('pullover-shoulder', 'Pullover shoulder', B, 'Najszerszy grzbietu', 69, 2, mus('lat:r', 'tm:r', 'tri:r', 'ra:s'),
    'Leżenie na ławce, stopy na podłodze, lekka hantla / kettlebell trzymany oburącz nad klatką.',
    ['Napnij brzuch, żebra w dół.', 'Opuść ciężar łukiem za głowę w komfortowym zakresie.', 'Wróć nad klatkę.'],
    ['Wyginanie lędźwi, żeby zwiększyć zakres.', 'Zbyt duży ciężar.']),
  mob('prone-shoulder-raise', 'Prone shoulder raise', B, 'Najszerszy grzbietu (aktywny zakres)', 70, 1, mus('trap:g', 'dA:p', 'sa:p', 'lat:r'),
    'Leżenie przodem, ręce wyprostowane nad głową (opcjonalnie z kijem).',
    ['Napnij brzuch, czoło nad matą.', 'Unieś wyprostowane ręce nad podłogę.', 'Opuść kontrolowanie.'],
    ['Odrywanie klatki i wyginanie lędźwi.', 'Unoszenie barków do uszu.']),
  // Mięśnie piersiowe
  mob('pir-pec', 'PIR pec (poizometryczna relaksacja mięśni piersiowych)', B, 'Mięśnie piersiowe', 70, 2, mus('pec:r', 'pecMin:r', 'dA:r'),
    'Stanie bokiem przy ramie / framudze, ręka oparta przedramieniem lub dłonią o słupek w komfortowym odwiedzeniu.',
    ['Obróć tułów od ręki do lekkiego rozciągania.', 'Delikatnie dociśnij rękę do słupka (ok. 8 s wg skryptu) bez ruchu.', 'Rozluźnij i z wydechem przejdź odrobinę dalej.', 'Powtórz kilka razy.'],
    ['Zbyt mocny nacisk.', 'Uczucie „wypychania” przodu barku – zmniejsz zakres.'],
    `Skrypt (s. 50): PIR wykonuje trener i nie bezpośrednio przed treningiem. ${CAUTION}`),
  mob('db-plates-fly-stretch', 'DB/plates fly stretch', B, 'Mięśnie piersiowe', 71, 1, mus('pec:r', 'dA:r', 'bic:r'),
    'Leżenie na ławce, w dłoniach lekkie talerze lub hantle, ręce rozłożone na boki z lekko zgiętymi łokciami.',
    ['Opuszczaj ręce na boki do komfortowego rozciągania.', 'Pozostań chwilę, oddychając.', 'Unieś ręce nad klatkę.'],
    ['Zbyt duży ciężar.', 'Opuszczanie poniżej komfortowego zakresu barku.'],
    `Ostrożnie: ${CAUTION}`),
  // Rotacja zewnętrzna
  mob('passive-er-stretch-stick', 'Passive ER stretch stick', B, 'Rotacja zewnętrzna barku', 71, 2, mus('sub:r', 'pec:r'),
    'Stanie, łokieć przy tułowiu zgięty 90°, kij trzymany pionowo; druga ręka trzyma kij niżej.',
    ['Drugą ręką przesuwaj kij, obracając przedramię na zewnątrz.', 'Łokieć przyklejony do boku.', 'Zatrzymaj w komfortowym zakresie i wróć.'],
    ['Odsuwanie łokcia od tułowia.', 'Dopychanie przez ból z przodu barku.']),
  mob('prone-shoulder-er-lift-off', 'Prone shoulder ER – lift off', B, 'Rotacja zewnętrzna barku', 72, 1, mus('inf:g', 'tmin:g', 'dP:p'),
    'Leżenie przodem, czoło na dłoni lub podkładce; ramię ćwiczone ułożone przy tułowiu lub w odwiedzeniu z łokciem zgiętym.',
    ['Ściągnij łopatkę lekko w dół i do tyłu.', 'Unieś dłoń / przedramię nad podłogę ruchem rotacji zewnętrznej.', 'Opuść kontrolowanie; zmień stronę.'],
    ['Unoszenie barku zamiast rotacji.', 'Odrywanie klatki od podłogi.']),
  // Rotacja wewnętrzna
  mob('side-lying-shoulder-ir', 'Side lying shoulder IR', B, 'Rotacja wewnętrzna barku', 72, 2, mus('inf:r', 'tmin:r', 'dP:r'),
    'Leżenie na boku ćwiczonej ręki, ramię przed tułowiem, łokieć zgięty 90°, przedramię pionowo.',
    ['Drugą ręką łagodnie prowadź przedramię w stronę podłogi (rotacja wewnętrzna).', 'Zatrzymaj w komfortowym rozciąganiu tyłu barku.', 'Wróć.'],
    ['Mocne dociskanie przedramienia.', 'Ból lub „szczypanie” z przodu barku – zmniejsz zakres lub przerwij.'],
    `Ostrożnie: ${CAUTION}`),
  // Rotacja WR + ZR
  mob('prone-shoulder-swimmer', 'Prone shoulder swimmer', B, 'Rotacja wewnętrzna + zewnętrzna barku', 73, 1, mus('trap:g', 'rh:g', 'inf:g', 'dP:p', 'lat:p'),
    'Leżenie przodem, ręce wyprostowane nad głową tuż nad podłogą, czoło nad matą.',
    ['Prowadź ręce łukiem z pozycji nad głową do dłoni przy lędźwiach.', 'Przy dłoniach obróć ramiona (zmiana rotacji).', 'Wróć tym samym torem; dłonie nad podłogą.'],
    ['Odrywanie klatki i wyginanie lędźwi.', 'Szybkie wymachy bez kontroli łopatek.'])
];

export const EXERCISES = [...STRENGTH, ...VARIANTS, ...MOBILITY];
