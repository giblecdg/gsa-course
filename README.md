# Pracownia trenera

Lokalna aplikacja do nauki z dwóch materiałów: pierwszego Atlasu anatomii funkcjonalnej oraz „Skryptu Trener Personalny 2026 – GSA”.

## Uruchomienie

W katalogu aplikacji uruchom:

```bash
npm start
```

Otwórz http://127.0.0.1:5173/. Wymagany Node.js 18 lub nowszy. Nie trzeba instalować zależności ani budować projektu. `npm run dev` uruchamia ten sam serwer, a `npm test` wykonuje testy. Aplikację można też podać dowolnym serwerem statycznym; bezpośrednie otwarcie `index.html` z dysku nie wystarczy dla modułów i danych.

## Co jest w aplikacji

- **Skrypt GSA:** wszystkie 5 modułów, 26 głównych rozdziałów i ich podrozdziały; komplet 131 stron, oryginalne podglądy i tekst do czytania. Wyszukiwanie obejmuje treść stron, nie tylko tytuły. Każdy rozdział ma dodatkową powtórkę najważniejszych pojęć, miejsce na notatki i oznaczenie przeczytania.
- **Atlas ćwiczeń:** główne ćwiczenia siłowe, mobilizacje i warianty ze skryptu. Karty zawierają ustawienie, kroki, błędy, oryginalne fotografie i role mięśni. Wybór mięśnia pokazuje jego zaznaczenie na rycinie. Można filtrować ćwiczenia i zapisywać ulubione.
- **Testy funkcjonalne:** dziewięć poradników z pozycją wyjściową, instrukcją, obserwacjami, kompensacjami i ostrożną interpretacją: przysiad z tyczką, wyprost palców przy ścianie, ankle wall, ASLR, Thomas, Patrick/FABER, test kolców, rotacja piersiowa i rotacja ramienia.
- **Atlas mięśni:** przegląd 40 pozycji z pierwszego atlasu, funkcjami oraz powiązanymi ćwiczeniami GSA.
- **Quiz mięśni:** zachowano poprzednią bazę 40 pytań, losowanie kolejności pytań i czterech odpowiedzi, natychmiastową ocenę, wyniki i powtórkę błędów. Skróty 1–4 i Enter działają wyłącznie w widocznym quizie.

## Źródła i numery stron

Dane i oryginalne ilustracje pochodzą z dostarczonego przez użytkownika skryptu. W kartach są odnośniki do czytnika odpowiednich stron. **Numer PDF jest o jeden większy od numeru drukowanego** (np. test Patricka: PDF 31, druk 30); okładka i metryka nie mają numeru drukowanego. Cała treść i ilustracje są dostępne w dostarczonych zasobach, więc oryginalny plik z katalogu Downloads nie jest potrzebny podczas działania aplikacji.

Ryciny mięśni to schematyczne ilustracje SVG z wcześniejszej wersji aplikacji, a nie skany ze skryptu GSA. Gdy karta dotyczy grupy mięśni, podpis wskazuje, który reprezentant jest faktycznie pokazany. Struktury bez odrębnej ryciny są opisane tekstowo. W ćwiczeniach mobilizacyjnych odróżniono pracę aktywną od rozciągania. Gdy źródło zawiera jedynie tytuł i fotografię, dodatkowa instrukcja i przypisanie mięśni są oznaczone jako opracowanie edukacyjne.

Oryginalny tekst skryptu zachowano w czytniku. W poradnikach testów osobno zaznaczono ograniczenia interpretacji: pojedyncza próba nie ustala rozpoznania ani leczenia. Dla FABER i Thomasa podano dodatkowe źródła dotyczące interpretacji i kontroli ustawienia.

## Zapis danych

Wszystko działa lokalnie, bez konta i bez wysyłania notatek na serwer. Wyniki quizu korzystają z poprzedniego klucza `anatomia-quiz:v1`; dodanie kursu ich nie kasuje. Notatki, przeczytane rozdziały i zapisane ćwiczenia korzystają z osobnego klucza `trener-study:v1`. Dane są dostępne w tej samej przeglądarce i pod tym samym adresem (port też ma znaczenie). Gdy pamięć przeglądarki jest niedostępna, aplikacja działa bez trwałego zapisu.

## Najważniejsze pliki

- `src/learning/` – nawigacja, czytnik, katalogi i lokalny postęp nauki.
- `src/data/gsa-source.json` – pełny tekst, spis treści i powiązania z ilustracjami.
- `src/data/gsa-content.js` – opracowania rozdziałów, ćwiczenia i testy.
- `assets/gsa/pages/` – wszystkie oryginalne strony jako podglądy WebP.
- `assets/gsa/figures/` – 109 ilustracji wydzielonych z dokumentu.
- `src/anatomy/`, `src/quiz/`, `src/ui/` – ryciny i dotychczasowy quiz.
- `tests/` – testy quizu, zapisu postępu, kursu i integralności zasobów.

Projekt działa lokalnie. Nie został opublikowany w internecie.
