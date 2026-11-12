# Weryfikacja aplikacji – wersja z kursem GSA

Sprawdzono 11 listopada 2026 r.

## Testy automatyczne

`npm test`: **253 testy zaliczone, 0 błędów**.

Sprawdzono dotychczasową logikę quizu i zapisu wyników oraz:

- komplet 131 kolejnych stron, 109 ilustracji i istnienie wszystkich plików;
- zachowanie 5 modułów, 26 rozdziałów oraz wszystkich niepustych podrozdziałów spisu treści;
- 26 opracowań rozdziałów i zgodność numerów stron z dokumentem;
- schemat kart ćwiczeń i testów, unikalne identyfikatory i istniejące odwołania do rycin;
- 7 głównych ćwiczeń siłowych i wszystkie 38 zilustrowanych mobilizacji z PDF 54–73;
- 9 testów, w tym Patrick/FABER, Thomas i obie rotacje ramienia;
- wyszukiwanie pełnej treści, łączone filtry, zapis notatek i obsługę niedostępnej pamięci;
- niezależność nowego klucza postępu od poprzedniego zapisu quizu.

## Test przeglądarkowy

Chromium, aplikacja uruchomiona przez `npm start` na http://127.0.0.1:5173/.

- Otwarto każdy z 26 rozdziałów, sprawdzono opracowania, notatki i ładowanie oryginalnej strony; sprawdzono również dostęp do strony 131.
- Przełączono widok oryginalny/tekstowy i znaleziono test Patricka przez wyszukiwanie w pełnym tekście.
- Otwarto wszystkie 62 karty ćwiczeń, załadowano ich ilustracje i sprawdzono każdą dostępną zmianę podświetlonego mięśnia.
- Otwarto wszystkie 9 poradników testów, sprawdzono ilustracje i treść interpretacji.
- Sprawdzono dodawanie do zapisanych, filtrowanie, brak wyników i czyszczenie filtrów.
- Potwierdzono zachowanie notatki i oznaczenia przeczytania po odświeżeniu.
- Potwierdzono, że klawiatura w bibliotece nie udziela odpowiedzi w ukrytym quizie oraz że przełączanie sekcji zachowuje stan sesji.
- Osobny test przeprowadził pełną sesję 40 pytań, zapis błędów po odświeżeniu, poprawną powtórkę i usunięcie opanowanych pytań, filtry oraz skróty klawiszowe.
- Sprawdzono szerokości 1440 px i 390 px; katalogi, szczegóły, czytnik i quiz nie przewijają strony poziomo. Nawigacja na telefonie zawija się do dwóch rzędów.
- Brak błędów JavaScript i błędnych odpowiedzi HTTP w przebiegu nowej części aplikacji.

## Sprawdzenie wizualne i ograniczenia

Obejrzano stronę kursu, czytnik, kartę RDL, poradnik Patricka/FABER i układ mobilny. Ilustracje pozycji pochodzą z oryginalnego skryptu; ryciny mięśni są schematyczne. W grupach mięśni podpis wskazuje faktycznie zaznaczonego reprezentanta. Część struktur głębokich jest opisana tekstowo, bez osobnej ryciny. Testy techniczne nie stanowią niezależnej recenzji anatomicznej ani walidacji klinicznej poradników.

Testy przeglądarkowe przeprowadzono oddzielnie przy użyciu Playwright; `npm test` uruchamia testy Node, bez instalacji przeglądarki.
