// Zbiór pytań quizu. Źródło merytoryczne: „Atlas anatomii funkcjonalnej.
// Anatomia w praktyce trenera” (work/atlas.pdf). `pages` to numery stron PDF.
//
// Pola:
//   id          stały identyfikator (klucz w localStorage)
//   region      klucz z REGIONS
//   name        poprawna odpowiedź (polska nazwa)
//   latin       nazwa łacińska / angielska podana w atlasie lub standardowa
//   view, targets, crop   – co i gdzie podświetlić (src/anatomy/figures.js)
//   alt         opis położenia BEZ nazwy mięśnia (dla czytników ekranu przed odpowiedzią)
//   fn          krótkie wyjaśnienie funkcji na podstawie tekstu atlasu
//   pages       strony atlasu (PDF), na których mięsień jest opisany
//   distractors wiarygodne błędne odpowiedzi (min. 3, z tej samej okolicy ciała)

export const REGIONS = [
  { id: 'klatka', label: 'Klatka piersiowa' },
  { id: 'barki', label: 'Barki i stożek rotatorów' },
  { id: 'grzbiet', label: 'Grzbiet' },
  { id: 'ramiona', label: 'Ramię i przedramię' },
  { id: 'brzuch', label: 'Brzuch' },
  { id: 'posladki', label: 'Pośladki' },
  { id: 'nogi', label: 'Uda i łydki' }
];

export const QUESTIONS = [
  // --- KLATKA PIERSIOWA ---------------------------------------------------
  {
    id: 'pectoralis-major',
    region: 'klatka',
    name: 'Mięsień piersiowy większy',
    latin: 'm. pectoralis major',
    view: 'front',
    targets: ['pectoralis-major'],
    crop: 'torso',
    alt: 'Widok przedni: podświetlony obszerny, wachlarzowaty mięsień na przedniej ścianie klatki piersiowej, biegnący od obojczyka i mostka do kości ramiennej.',
    fn: 'Części obojczykowa, mostkowo-żebrowa i brzuszna zbiegają się w ścięgnie kończącym się na grzebieniu guzka większego kości ramiennej. Część obojczykowa zgina ramię (np. wyciskanie na ławce skośnej), część mostkowo-żebrowa przywodzi poziomo i pionowo, prostuje i rotuje ramię do wewnątrz.',
    pages: [4, 5, 6],
    distractors: ['Mięsień piersiowy mniejszy', 'Mięsień zębaty przedni', 'Mięsień naramienny – część przednia', 'Mięsień kruczo-ramienny']
  },
  {
    id: 'pectoralis-minor',
    region: 'klatka',
    name: 'Mięsień piersiowy mniejszy',
    latin: 'm. pectoralis minor',
    view: 'front-deep',
    targets: ['pectoralis-minor'],
    alt: 'Widok przedni, warstwa głęboka: podświetlony mały trójkątny mięsień pod największym mięśniem klatki, od żeber III–V do wyrostka kruczego łopatki.',
    fn: 'Rozpoczyna się na żebrach III–V i kończy na wyrostku kruczym łopatki. Odpowiada za protrakcję, depresję i rotację przednią łopatki; stabilizuje ją podczas pompek i w dolnej fazie dipsów.',
    pages: [4],
    distractors: ['Mięsień piersiowy większy', 'Mięsień zębaty przedni', 'Mięsień kruczo-ramienny', 'Mięsień podłopatkowy']
  },
  {
    id: 'serratus-anterior',
    region: 'klatka',
    name: 'Mięsień zębaty przedni',
    latin: 'm. serratus anterior',
    view: 'front-deep',
    targets: ['serratus-anterior'],
    alt: 'Widok przedni, warstwa głęboka: podświetlony cienki płat na bocznej ścianie klatki piersiowej, z palczastymi przyczepami na kolejnych żebrach.',
    fn: 'Cienki płat od żeber I–VIII do przyśrodkowego brzegu łopatki. Wysuwa łopatkę do przodu (protrakcja) – tzw. „mięsień bokserski”; stabilizuje łopatkę przy unoszeniu ramienia (np. scapular push-ups).',
    pages: [4, 9, 25],
    distractors: ['Mięsień skośny zewnętrzny brzucha', 'Mięsień piersiowy mniejszy', 'Mięsień najszerszy grzbietu', 'Mięśnie międzyżebrowe']
  },

  // --- BARKI I STOŻEK ROTATORÓW ---------------------------------------------
  {
    id: 'deltoid-anterior',
    region: 'barki',
    name: 'Mięsień naramienny – część przednia',
    latin: 'm. deltoideus, pars clavicularis',
    view: 'front',
    targets: ['deltoid-anterior'],
    crop: 'shoulders',
    alt: 'Widok przedni: podświetlony fragment zaokrąglonego konturu barku zwrócony ku klatce piersiowej, od bocznej jednej trzeciej obojczyka w dół do bocznej powierzchni kości ramiennej.',
    fn: 'Akton obojczykowy: rozpoczyna się na bocznej 1/3 obojczyka. Zgina ramię, przywodzi je i rotuje do wewnątrz; mocno pracuje np. przy wyciskaniu nad głowę.',
    pages: [14, 15],
    distractors: ['Mięsień naramienny – część środkowa', 'Mięsień piersiowy większy', 'Mięsień kruczo-ramienny', 'Mięsień dwugłowy ramienia']
  },
  {
    id: 'deltoid-middle',
    region: 'barki',
    name: 'Mięsień naramienny – część środkowa',
    latin: 'm. deltoideus, pars acromialis',
    view: 'front',
    targets: ['deltoid-middle'],
    crop: 'shoulders',
    alt: 'Widok przedni: podświetlony boczny, najbardziej wypukły fragment barku, od wyrostka barkowego łopatki do guzowatości na kości ramiennej.',
    fn: 'Akton barkowy rozpoczyna się na wyrostku barkowym łopatki. Odwodzi ramię w płaszczyźnie czołowej – najsilniej angażuje go unoszenie ramienia bokiem (lateral raise).',
    pages: [14, 17],
    distractors: ['Mięsień naramienny – część przednia', 'Mięsień naramienny – część tylna', 'Mięsień nadgrzebieniowy', 'Mięsień czworoboczny']
  },
  {
    id: 'deltoid-posterior',
    region: 'barki',
    name: 'Mięsień naramienny – część tylna',
    latin: 'm. deltoideus, pars spinalis',
    view: 'back',
    targets: ['deltoid-posterior'],
    crop: 'shoulders',
    alt: 'Widok tylny: podświetlony fragment konturu barku zwrócony ku plecom, od grzebienia łopatki w dół i bocznie do kości ramiennej.',
    fn: 'Akton grzebieniowy zaczyna się na grzebieniu łopatki. Prostuje ramię, odwodzi je (także horyzontalnie) i rotuje na zewnątrz – np. rear delt fly, face pull.',
    pages: [14, 19, 20],
    distractors: ['Mięsień podgrzebieniowy', 'Mięsień naramienny – część środkowa', 'Mięsień obły mniejszy', 'Mięsień czworoboczny']
  },
  {
    id: 'supraspinatus',
    region: 'barki',
    name: 'Mięsień nadgrzebieniowy',
    latin: 'm. supraspinatus',
    view: 'back-deep',
    targets: ['supraspinatus'],
    crop: 'shoulders',
    alt: 'Widok tylny, warstwa głęboka: podświetlony mięsień wypełniający dół łopatki powyżej jej grzebienia, przechodzący pod wyrostkiem barkowym do guzka większego kości ramiennej.',
    fn: 'Od dołu nadgrzebieniowego łopatki do guzka większego kości ramiennej. Inicjuje odwodzenie ramienia (pierwsze ok. 15°) i stabilizuje staw ramienny; należy do stożka rotatorów.',
    pages: [22],
    distractors: ['Mięsień podgrzebieniowy', 'Mięsień czworoboczny', 'Mięśnie równoległoboczne', 'Mięsień obły mniejszy']
  },
  {
    id: 'infraspinatus',
    region: 'barki',
    name: 'Mięsień podgrzebieniowy',
    latin: 'm. infraspinatus',
    view: 'back-deep',
    targets: ['infraspinatus'],
    crop: 'shoulders',
    alt: 'Widok tylny, warstwa głęboka: podświetlony szeroki mięsień wypełniający tylną powierzchnię łopatki poniżej jej grzebienia, biegnący do guzka większego kości ramiennej.',
    fn: 'Od dołu podgrzebieniowego łopatki do środkowej części guzka większego. Główny rotator zewnętrzny ramienia i stabilizator stawu ramiennego (np. rotacja zewnętrzna z gumą, Powell raise).',
    pages: [21, 22, 23],
    distractors: ['Mięsień nadgrzebieniowy', 'Mięsień obły mniejszy', 'Mięsień obły większy', 'Mięsień podłopatkowy']
  },
  {
    id: 'teres-minor',
    region: 'barki',
    name: 'Mięsień obły mniejszy',
    latin: 'm. teres minor',
    view: 'back-deep',
    targets: ['teres-minor'],
    crop: 'shoulders',
    alt: 'Widok tylny, warstwa głęboka: podświetlony wąski, wydłużony mięsień wzdłuż bocznego brzegu łopatki, kończący się na dolnej części guzka większego kości ramiennej.',
    fn: 'Od bocznego brzegu łopatki do dolnej części guzka większego. Rotuje ramię na zewnątrz, przywodzi je i stabilizuje staw ramienny; należy do stożka rotatorów.',
    pages: [22, 23],
    distractors: ['Mięsień obły większy', 'Mięsień podgrzebieniowy', 'Mięsień najszerszy grzbietu', 'Mięsień trójgłowy ramienia']
  },
  {
    id: 'subscapularis',
    region: 'barki',
    name: 'Mięsień podłopatkowy',
    latin: 'm. subscapularis',
    view: 'scapula-anterior',
    targets: ['subscapularis'],
    alt: 'Przednia (żebrowa) powierzchnia łopatki: podświetlony mięsień wypełniający cały dół na przedniej stronie łopatki, zbiegający się ścięgnem do guzka mniejszego kości ramiennej.',
    fn: 'Od dołu podłopatkowego do guzka mniejszego kości ramiennej. Jedyny rotator wewnętrzny w stożku rotatorów; stabilizuje głowę kości ramiennej w panewce.',
    pages: [22],
    distractors: ['Mięsień zębaty przedni', 'Mięsień piersiowy mniejszy', 'Mięsień nadgrzebieniowy', 'Mięsień podgrzebieniowy']
  },

  // --- GRZBIET -------------------------------------------------------------
  {
    id: 'trapezius',
    region: 'grzbiet',
    name: 'Mięsień czworoboczny',
    latin: 'm. trapezius',
    view: 'back',
    targets: ['trapezius'],
    crop: 'torso',
    alt: 'Widok tylny: podświetlony płaski mięsień w kształcie rombu, od podstawy czaszki wzdłuż kręgosłupa szyjnego i piersiowego do barków i grzebieni łopatek.',
    fn: 'Rozległy mięsień powierzchowny karku i grzbietu. Porusza łopatką (unoszenie, opuszczanie, przyciąganie do kręgosłupa) i wspiera ruchy głowy.',
    pages: [25, 28],
    distractors: ['Mięśnie równoległoboczne', 'Mięsień najszerszy grzbietu', 'Mięsień nadgrzebieniowy', 'Mięsień naramienny – część tylna']
  },
  {
    id: 'latissimus-dorsi',
    region: 'grzbiet',
    name: 'Mięsień najszerszy grzbietu',
    latin: 'm. latissimus dorsi',
    view: 'back',
    targets: ['latissimus'],
    crop: 'torso',
    alt: 'Widok tylny: podświetlony bardzo szeroki, płaski mięsień dolnej i bocznej części pleców, od dolnego odcinka kręgosłupa i miednicy ku górze do dołu pachowego i kości ramiennej.',
    fn: 'Zaczyna się na dolnych odcinkach kręgosłupa i miednicy, kończy na kości ramiennej. Przywodzi, prostuje i rotuje ramię do wewnątrz – główny mięsień np. w lat pulldown i wiosłowaniu.',
    pages: [25, 26, 27, 32],
    distractors: ['Mięsień obły większy', 'Mięsień czworoboczny', 'Mięsień zębaty przedni', 'Mięsień skośny zewnętrzny brzucha']
  },
  {
    id: 'rhomboids',
    region: 'grzbiet',
    name: 'Mięśnie równoległoboczne',
    latin: 'mm. rhomboidei',
    view: 'back-deep',
    targets: ['rhomboids'],
    crop: 'shoulders',
    alt: 'Widok tylny, warstwa głęboka: podświetlone skośne pasma między kręgosłupem a przyśrodkowymi brzegami łopatek, ukryte zwykle pod największym płaskim mięśniem karku.',
    fn: 'Leżą między łopatkami. Ściągają łopatki do siebie (retrakcja) i stabilizują górną część pleców – pracują m.in. w face pull, Y raise i wiosłowaniu.',
    pages: [20, 25, 28],
    distractors: ['Mięsień czworoboczny', 'Mięsień nadgrzebieniowy', 'Mięsień podgrzebieniowy', 'Mięsień prostownik grzbietu']
  },
  {
    id: 'erector-spinae',
    region: 'grzbiet',
    name: 'Mięsień prostownik grzbietu',
    latin: 'm. erector spinae',
    view: 'back-deep',
    targets: ['erector-spinae'],
    crop: 'torso',
    alt: 'Widok tylny, warstwa głęboka (lewa połowa ryciny): podświetlony długi, wielopasmowy mięsień biegnący tuż obok wyrostków kolczystych, od kości krzyżowej ku górze wzdłuż całego kręgosłupa.',
    fn: 'Biegnie wzdłuż kręgosłupa od kości krzyżowej do czaszki; części: biodrowo-żebrowa (boczna), najdłuższa (środkowa) i kolcowa (przy kręgosłupie). Prostuje kręgosłup i utrzymuje postawę.',
    pages: [25],
    distractors: ['Mięsień czworoboczny lędźwi', 'Mięsień najszerszy grzbietu', 'Mięśnie równoległoboczne', 'Mięsień wielodzielny']
  },
  {
    id: 'teres-major',
    region: 'grzbiet',
    name: 'Mięsień obły większy',
    latin: 'm. teres major',
    view: 'back',
    targets: ['teres-major'],
    crop: 'shoulders',
    alt: 'Widok tylny: podświetlony gruby, prostokątny mięsień od dolnego kąta łopatki skośnie ku górze i bocznie do kości ramiennej, tuż nad górnym brzegiem najszerszego płata pleców.',
    fn: 'Wspomaga przywodzenie ramienia; współpracuje z mięśniem najszerszym grzbietu w ćwiczeniach ciągnących (gorilla row, landmine row, wiosłowanie sztangą, lat pulldown).',
    pages: [27, 29, 30, 32],
    distractors: ['Mięsień obły mniejszy', 'Mięsień najszerszy grzbietu', 'Mięsień podgrzebieniowy', 'Mięsień trójgłowy ramienia']
  },

  // --- RAMIĘ I PRZEDRAMIĘ ---------------------------------------------------
  {
    id: 'biceps-brachii',
    region: 'ramiona',
    name: 'Mięsień dwugłowy ramienia',
    latin: 'm. biceps brachii',
    view: 'front',
    targets: ['biceps'],
    crop: 'arm',
    alt: 'Widok przedni: podświetlony wrzecionowaty mięsień na przedniej powierzchni ramienia, od okolicy stawu ramiennego do zgięcia łokciowego.',
    fn: 'Głowa długa przechodzi przez staw ramienny, krótka zaczyna się na łopatce. Zgina łokieć, supinuje przedramię i wspomaga unoszenie ramienia.',
    pages: [33, 35, 36],
    distractors: ['Mięsień ramienny', 'Mięsień kruczo-ramienny', 'Mięsień ramienno-promieniowy', 'Mięsień naramienny – część przednia']
  },
  {
    id: 'brachialis',
    region: 'ramiona',
    name: 'Mięsień ramienny',
    latin: 'm. brachialis',
    view: 'front-deep',
    targets: ['brachialis'],
    alt: 'Widok przedni, warstwa głęboka: podświetlony szeroki mięsień dolnej połowy przedniej powierzchni ramienia, leżący pod zarysem najbardziej powierzchownego zginacza łokcia.',
    fn: 'Leży pod bicepsem i jest istotnym zginaczem łokcia niezależnie od ustawienia przedramienia (w supinacji i pronacji) – mocno pracuje np. w hammer curls.',
    pages: [33, 36],
    distractors: ['Mięsień dwugłowy ramienia', 'Mięsień kruczo-ramienny', 'Mięsień ramienno-promieniowy', 'Mięsień trójgłowy ramienia']
  },
  {
    id: 'coracobrachialis',
    region: 'ramiona',
    name: 'Mięsień kruczo-ramienny',
    latin: 'm. coracobrachialis',
    view: 'front-deep',
    targets: ['coracobrachialis'],
    alt: 'Widok przedni, warstwa głęboka: podświetlony wąski mięsień przyśrodkowej części górnego ramienia, od wyrostka kruczego łopatki w dół do połowy kości ramiennej.',
    fn: 'Najmniejszy z przednich mięśni ramienia, położony blisko stawu ramiennego. Przywodzi i zgina ramię; w rozpiętkach pomaga utrzymać położenie ramion.',
    pages: [6, 33],
    distractors: ['Mięsień piersiowy mniejszy', 'Mięsień dwugłowy ramienia', 'Mięsień ramienny', 'Mięsień podłopatkowy']
  },
  {
    id: 'triceps-brachii',
    region: 'ramiona',
    name: 'Mięsień trójgłowy ramienia',
    latin: 'm. triceps brachii',
    view: 'back',
    targets: ['triceps'],
    crop: 'arm',
    alt: 'Widok tylny: podświetlony duży mięsień całej tylnej powierzchni ramienia, od łopatki i kości ramiennej do wyrostka łokciowego.',
    fn: 'Trzy głowy: długa (od łopatki, prostuje także ramię), boczna (przy dużej sile) i przyśrodkowa (głęboka, precyzyjny wyprost). Prostuje staw łokciowy – skull crusher, prostowanie na wyciągu, dipsy.',
    pages: [33, 36, 37],
    distractors: ['Mięsień łokciowy', 'Mięsień naramienny – część tylna', 'Mięsień obły większy', 'Mięsień ramienny']
  },
  {
    id: 'anconeus',
    region: 'ramiona',
    name: 'Mięsień łokciowy',
    latin: 'm. anconeus',
    view: 'back',
    targets: ['anconeus'],
    crop: 'forearm',
    alt: 'Widok tylny: podświetlony mały, trójkątny mięsień tuż poniżej wyrostka łokciowego, po bocznej stronie tylnej powierzchni łokcia.',
    fn: 'Mały mięsień w okolicy łokcia; wspomaga triceps w prostowaniu łokcia i stabilizuje staw łokciowy podczas ruchów przedramienia.',
    pages: [33],
    distractors: ['Mięsień trójgłowy ramienia', 'Mięsień prostownik palców', 'Mięsień prostownik promieniowy długi nadgarstka', 'Mięsień zginacz łokciowy nadgarstka']
  },
  {
    id: 'flexor-carpi-radialis',
    region: 'ramiona',
    name: 'Mięsień zginacz promieniowy nadgarstka',
    latin: 'm. flexor carpi radialis',
    view: 'front',
    targets: ['fcr'],
    crop: 'forearm',
    alt: 'Widok przedni: podświetlony smukły mięsień przedniej strony przedramienia, biegnący skośnie od przyśrodkowej okolicy łokcia ku nadgarstkowi po stronie kciuka.',
    fn: 'Zgina nadgarstek i odwodzi go w stronę kciuka; stabilizuje nadgarstek w ćwiczeniach siłowych, np. przy wyciskaniu.',
    pages: [34],
    distractors: ['Mięsień zginacz łokciowy nadgarstka', 'Mięsień ramienno-promieniowy', 'Mięsień zginacz głęboki palców', 'Mięsień prostownik promieniowy długi nadgarstka']
  },
  {
    id: 'flexor-carpi-ulnaris',
    region: 'ramiona',
    name: 'Mięsień zginacz łokciowy nadgarstka',
    latin: 'm. flexor carpi ulnaris',
    view: 'front',
    targets: ['fcu'],
    crop: 'forearm',
    alt: 'Widok przedni: podświetlony mięsień wzdłuż przyśrodkowego brzegu przedramienia, od okolicy łokcia do nadgarstka po stronie małego palca.',
    fn: 'Zgina nadgarstek i przywodzi go w stronę małego palca; ważny przy mocnym chwycie i stabilizacji nadgarstka.',
    pages: [34],
    distractors: ['Mięsień zginacz promieniowy nadgarstka', 'Mięsień zginacz długi kciuka', 'Mięsień ramienno-promieniowy', 'Mięsień prostownik palców']
  },
  {
    id: 'extensor-digitorum',
    region: 'ramiona',
    name: 'Mięsień prostownik palców',
    latin: 'm. extensor digitorum',
    view: 'back',
    targets: ['extensor-digitorum'],
    crop: 'forearm',
    alt: 'Widok tylny: podświetlony mięsień środkowej części tylnej strony przedramienia, od bocznej okolicy łokcia do grzbietu ręki.',
    fn: 'Prostuje palce; jako antagonista zginaczy jest ważny dla siły i kontroli chwytu.',
    pages: [34],
    distractors: ['Mięsień prostownik promieniowy długi nadgarstka', 'Mięsień odwodziciel długi kciuka', 'Mięsień łokciowy', 'Mięsień zginacz łokciowy nadgarstka']
  },

  // --- BRZUCH --------------------------------------------------------------
  {
    id: 'rectus-abdominis',
    region: 'brzuch',
    name: 'Mięsień prosty brzucha',
    latin: 'm. rectus abdominis',
    view: 'front',
    targets: ['rectus-abdominis'],
    crop: 'abdomen',
    alt: 'Widok przedni: podświetlone dwa pionowe pasma po obu stronach linii środkowej brzucha, od mostka i żeber do spojenia łonowego, poprzecinane smugami ścięgnistymi.',
    fn: 'Biegnie od mostka do spojenia łonowego, dwa pasma rozdziela kresa biała. Zgina tułów w przód, stabilizuje miednicę i pomaga w wydechu.',
    pages: [38, 41],
    distractors: ['Mięsień skośny zewnętrzny brzucha', 'Mięsień poprzeczny brzucha', 'Mięsień piramidowy', 'Mięsień skośny wewnętrzny brzucha']
  },
  {
    id: 'external-oblique',
    region: 'brzuch',
    name: 'Mięsień skośny zewnętrzny brzucha',
    latin: 'm. obliquus externus abdominis',
    view: 'front',
    targets: ['external-oblique'],
    crop: 'abdomen',
    alt: 'Widok przedni: podświetlona najbardziej zewnętrzna warstwa mięśni po bokach brzucha, od dolnych żeber skośnie w dół i przyśrodkowo do miednicy.',
    fn: 'Zewnętrzna warstwa boku brzucha, od dolnych żeber do miednicy. Zgina tułów w bok, rotuje go w stronę przeciwną i stabilizuje ciało (np. landmine twist).',
    pages: [38, 40],
    distractors: ['Mięsień skośny wewnętrzny brzucha', 'Mięsień zębaty przedni', 'Mięsień poprzeczny brzucha', 'Mięsień najszerszy grzbietu']
  },
  {
    id: 'internal-oblique',
    region: 'brzuch',
    name: 'Mięsień skośny wewnętrzny brzucha',
    latin: 'm. obliquus internus abdominis',
    view: 'front-deep',
    targets: ['internal-oblique'],
    crop: 'abdomen',
    alt: 'Widok przedni, warstwa pośrednia (lewa połowa ryciny): podświetlony płaski mięsień boku brzucha, którego włókna biegną od miednicy wachlarzowato w górę i przyśrodkowo – pod zarysem warstwy zewnętrznej.',
    fn: 'Leży pod mięśniem skośnym zewnętrznym. Zgina tułów w bok, rotuje go w tę samą stronę i stabilizuje kręgosłup oraz miednicę.',
    pages: [38, 40],
    distractors: ['Mięsień skośny zewnętrzny brzucha', 'Mięsień poprzeczny brzucha', 'Mięsień prosty brzucha', 'Mięsień czworoboczny lędźwi']
  },
  {
    id: 'transversus-abdominis',
    region: 'brzuch',
    name: 'Mięsień poprzeczny brzucha',
    latin: 'm. transversus abdominis',
    view: 'front-deep',
    targets: ['transversus-abdominis'],
    crop: 'abdomen',
    alt: 'Widok przedni, warstwa najgłębsza (prawa połowa ryciny): podświetlony płaski mięsień boku brzucha o włóknach biegnących poziomo, jak pas od żeber do miednicy.',
    fn: 'Najgłębszy mięsień brzucha, otacza tułów jak pas. Stabilizuje kręgosłup i utrzymuje ciśnienie w jamie brzusznej (oddychanie); pracuje m.in. w dead bug i pallof press.',
    pages: [38, 42, 44],
    distractors: ['Mięsień skośny wewnętrzny brzucha', 'Mięsień skośny zewnętrzny brzucha', 'Mięsień prosty brzucha', 'Mięsień piramidowy']
  },
  {
    id: 'pyramidalis',
    region: 'brzuch',
    name: 'Mięsień piramidowy',
    latin: 'm. pyramidalis',
    view: 'front',
    targets: ['pyramidalis'],
    crop: 'pelvis',
    alt: 'Widok przedni: podświetlony bardzo mały trójkątny mięsień tuż nad spojeniem łonowym, przy linii środkowej, na dolnym końcu pionowych pasm brzucha.',
    fn: 'Mały mięsień w dolnej części przedniej ściany brzucha. Napina kresę białą w dolnej części przedniej ściany brzucha. Ok. 20% ludzi go nie ma.',
    pages: [38, 39],
    distractors: ['Mięsień prosty brzucha', 'Mięsień poprzeczny brzucha', 'Mięsień grzebieniowy', 'Mięsień skośny wewnętrzny brzucha']
  },
  {
    id: 'quadratus-lumborum',
    region: 'brzuch',
    name: 'Mięsień czworoboczny lędźwi',
    latin: 'm. quadratus lumborum',
    view: 'back-deep',
    targets: ['quadratus-lumborum'],
    crop: 'abdomen',
    alt: 'Widok tylny, warstwa najgłębsza (prawa połowa ryciny): podświetlony prostokątny mięsień w okolicy lędźwiowej, między dolnym żebrem a grzebieniem biodrowym, obok kręgosłupa.',
    fn: 'Tylny mięsień brzucha między dolnymi żebrami a grzebieniem biodrowym. Stabilizuje dolny odcinek kręgosłupa, odpowiada za skłony boczne tułowia.',
    pages: [39, 40],
    distractors: ['Mięsień prostownik grzbietu', 'Mięsień najszerszy grzbietu', 'Mięsień skośny wewnętrzny brzucha', 'Mięsień pośladkowy średni']
  },

  // --- POŚLADKI ------------------------------------------------------------
  {
    id: 'gluteus-maximus',
    region: 'posladki',
    name: 'Mięsień pośladkowy wielki',
    latin: 'm. gluteus maximus',
    view: 'back',
    targets: ['gluteus-maximus'],
    crop: 'pelvis',
    alt: 'Widok tylny: podświetlony największy, czworoboczny mięsień tylnej części miednicy, od kości krzyżowej i talerza biodrowego skośnie w dół do boku uda.',
    fn: 'Od talerza biodrowego, powięzi piersiowo-lędźwiowej i kości krzyżowej do pasma biodrowo-piszczelowego i kości udowej. Prostuje i rotuje na zewnątrz staw biodrowy, utrzymuje pionową postawę (hip thrust).',
    pages: [45, 46],
    distractors: ['Mięsień pośladkowy średni', 'Mięsień pośladkowy mały', 'Mięsień dwugłowy uda', 'Mięsień naprężacz powięzi szerokiej']
  },
  {
    id: 'gluteus-medius',
    region: 'posladki',
    name: 'Mięsień pośladkowy średni',
    latin: 'm. gluteus medius',
    view: 'back',
    targets: ['gluteus-medius'],
    crop: 'pelvis',
    alt: 'Widok tylny: podświetlony wachlarzowaty mięsień na zewnętrznej, górnej części miednicy, widoczny powyżej i bocznie od największego mięśnia pośladka, kończący się na krętarzu większym.',
    fn: 'Od zewnętrznej powierzchni talerza biodrowego do krętarza większego. Najsilniejszy odwodziciel biodra; stabilizuje miednicę w chodzie i biegu (band side walk).',
    pages: [45, 48],
    distractors: ['Mięsień pośladkowy wielki', 'Mięsień pośladkowy mały', 'Mięsień naprężacz powięzi szerokiej', 'Mięsień czworoboczny lędźwi']
  },
  {
    id: 'gluteus-minimus',
    region: 'posladki',
    name: 'Mięsień pośladkowy mały',
    latin: 'm. gluteus minimus',
    view: 'back-deep',
    targets: ['gluteus-minimus'],
    crop: 'pelvis',
    alt: 'Widok tylny, warstwa najgłębsza (prawa połowa ryciny): podświetlony niewielki wachlarzowaty mięsień na talerzu biodrowym, położony pod dwoma większymi mięśniami pośladka.',
    fn: 'Najmniejszy z mięśni pośladkowych, leży pod pośladkowym średnim; od talerza biodrowego do krętarza większego. Działa podobnie jak pośladkowy średni (odwodzenie, stabilizacja miednicy), lecz słabiej.',
    pages: [45, 48],
    distractors: ['Mięsień pośladkowy średni', 'Mięsień pośladkowy wielki', 'Mięsień naprężacz powięzi szerokiej', 'Mięsień biodrowo-lędźwiowy']
  },

  // --- UDA I ŁYDKI ---------------------------------------------------------
  {
    id: 'quadriceps',
    region: 'nogi',
    name: 'Mięsień czworogłowy uda',
    latin: 'm. quadriceps femoris',
    view: 'front',
    targets: ['rectus-femoris', 'vastus-lateralis', 'vastus-medialis'],
    crop: 'thigh',
    alt: 'Widok przedni: podświetlona grupa mięśni przedniej i bocznej powierzchni uda (część środkowa, boczna i przyśrodkowa nad kolanem), zbiegająca się do rzepki.',
    fn: 'Cztery części: prosty uda, obszerny przyśrodkowy, boczny i pośredni (głęboki, niewidoczny). Główny prostownik kolana; prosty uda dodatkowo zgina biodro (przysiady, cossack squat).',
    pages: [49, 52, 54],
    distractors: ['Mięsień krawiecki', 'Mięśnie przywodziciele uda', 'Mięsień naprężacz powięzi szerokiej', 'Mięsień biodrowo-lędźwiowy']
  },
  {
    id: 'sartorius',
    region: 'nogi',
    name: 'Mięsień krawiecki',
    latin: 'm. sartorius',
    view: 'front',
    targets: ['sartorius'],
    crop: 'thigh',
    alt: 'Widok przedni: podświetlony długi, taśmowaty mięsień biegnący skośnie przez przednią powierzchnię uda – od kolca biodrowego do przyśrodkowej strony kolana.',
    fn: 'Najdłuższy mięsień ciała. Zgina, odwodzi i rotuje na zewnątrz udo w stawie biodrowym oraz zgina staw kolanowy.',
    pages: [49],
    distractors: ['Mięsień prosty uda', 'Mięsień smukły', 'Mięsień przywodziciel długi', 'Mięsień naprężacz powięzi szerokiej']
  },
  {
    id: 'adductors',
    region: 'nogi',
    name: 'Mięśnie przywodziciele uda',
    latin: 'mm. adductores',
    view: 'front',
    targets: ['pectineus', 'adductor-longus', 'adductor-magnus-front', 'gracilis'],
    crop: 'thigh',
    alt: 'Widok przedni: podświetlona grupa mięśni przyśrodkowej (wewnętrznej) strony uda, od kości łonowej w dół wzdłuż wewnętrznej powierzchni uda.',
    fn: 'Przywodziciel długi, krótki i wielki oraz smukły i grzebieniowy. Przywodzą udo, czyli zbliżają nogę do linii środkowej ciała (cossack squat, przysiad bułgarski).',
    pages: [49, 52],
    distractors: ['Mięsień krawiecki', 'Mięsień czworogłowy uda', 'Mięsień biodrowo-lędźwiowy', 'Mięsień naprężacz powięzi szerokiej']
  },
  {
    id: 'biceps-femoris',
    region: 'nogi',
    name: 'Mięsień dwugłowy uda',
    latin: 'm. biceps femoris',
    view: 'back',
    targets: ['biceps-femoris'],
    crop: 'thigh',
    alt: 'Widok tylny: podświetlony mięsień bocznej części tylnej powierzchni uda, od guza kulszowego w dół i bocznie do okolicy głowy strzałki; ma głowę długą i krótką.',
    fn: 'Należy do mięśni kulszowo-goleniowych; głowa długa i krótka. Zgina staw kolanowy i prostuje biodro (RDL, martwy ciąg na prostych nogach, leg curl na piłce).',
    pages: [49, 50, 51],
    distractors: ['Mięsień półścięgnisty', 'Mięsień smukły', 'Mięsień pośladkowy wielki', 'Mięsień brzuchaty łydki']
  },
  {
    id: 'gastrocnemius',
    region: 'nogi',
    name: 'Mięsień brzuchaty łydki',
    latin: 'm. gastrocnemius',
    view: 'back',
    targets: ['gastrocnemius'],
    crop: 'calf',
    alt: 'Widok tylny: podświetlony powierzchowny, dwubrzuścowy mięsień górnej części łydki, którego głowy łączą się w ścięgno piętowe.',
    fn: 'Część mięśnia trójgłowego łydki. Zgina podeszwowo stopę (wspięcia na palce), stabilizuje staw skokowy i uczestniczy w zginaniu kolana; najaktywniejszy przy wyprostowanym kolanie.',
    pages: [49, 55],
    distractors: ['Mięsień płaszczkowaty', 'Mięsień dwugłowy uda', 'Mięśnie strzałkowe', 'Mięsień piszczelowy przedni']
  },
  {
    id: 'soleus',
    region: 'nogi',
    name: 'Mięsień płaszczkowaty',
    latin: 'm. soleus',
    view: 'back-deep',
    targets: ['soleus'],
    crop: 'calf',
    alt: 'Widok tylny, warstwa głęboka: podświetlony szeroki, płaski mięsień łydki leżący pod zarysem dwugłowego mięśnia powierzchownego, przechodzący w ścięgno piętowe.',
    fn: 'Leży pod brzuchatym łydki; zgina podeszwowo stopę i stabilizuje staw skokowy, szczególnie przy zgiętym kolanie (wspięcia na palce siedząc) i w długotrwałej pracy statycznej.',
    pages: [49, 55, 56],
    distractors: ['Mięsień brzuchaty łydki', 'Mięsień piszczelowy przedni', 'Mięśnie strzałkowe', 'Mięśnie zginacze palców']
  },
  {
    id: 'tibialis-anterior',
    region: 'nogi',
    name: 'Mięsień piszczelowy przedni',
    latin: 'm. tibialis anterior',
    view: 'front',
    targets: ['tibialis-anterior'],
    crop: 'calf',
    alt: 'Widok przedni: podświetlony mięsień biegnący wzdłuż goleni, tuż bocznie od jej wyczuwalnej kostnej krawędzi, w dół do przyśrodkowej strony stopy.',
    fn: 'Główny zginacz grzbietowy stopy (unosi jej przód); uczestniczy też w inwersji (odwracaniu) stopy.',
    pages: [49],
    distractors: ['Mięśnie strzałkowe', 'Mięśnie prostowniki palców', 'Mięsień płaszczkowaty', 'Mięsień brzuchaty łydki']
  },
  {
    id: 'peroneals',
    region: 'nogi',
    name: 'Mięśnie strzałkowe',
    latin: 'mm. fibulares (peronei)',
    view: 'front',
    targets: ['peroneus'],
    crop: 'calf',
    alt: 'Widok przedni: podświetlony wąski mięsień na bocznej (zewnętrznej) powierzchni podudzia, wzdłuż cieńszej, bocznej kości goleni, w kierunku bocznej kostki.',
    fn: 'Nawracają stopę i uczestniczą w zginaniu podeszwowym; stabilizują boczną stronę stawu skokowego.',
    pages: [49],
    distractors: ['Mięsień piszczelowy przedni', 'Mięśnie prostowniki palców', 'Mięsień płaszczkowaty', 'Mięsień brzuchaty łydki']
  }
];

export function regionLabel(regionId) {
  const r = REGIONS.find((x) => x.id === regionId);
  return r ? r.label : regionId;
}
