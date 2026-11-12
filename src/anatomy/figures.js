// Biblioteka rycin anatomicznych (SVG).
//
// Każdy widok to lista elementów rysowanych w podanej kolejności (późniejsze
// przykrywają wcześniejsze, tak jak warstwy w preparacie). Ścieżki opisane są
// dla lewej połowy ryciny (x < 200); renderer odbija je lustrzanie względem osi
// x = 200, chyba że element ma `side: 'left'` lub `side: 'right'`.
//
// Rodzaje elementów:
//   muscle – mięsień (koral, gdy jest celem pytania; niebiesko-szary jako kontekst)
//   bone   – kość lub ścięgno/rozcięgno (kość słoniowa)
//   ghost  – zarys usuniętego mięśnia powierzchownego (linia przerywana)
//
// `fiber` to kąt (w stopniach) przebiegu włókien względem poziomu, nadający fakturę
// mięśnia; w SVG oś y rośnie w dół, więc włókna wznoszące się w prawo mają kąt ujemny.

// --- Sylwetka całego ciała (wspólna dla widoków przedniego i tylnego) -------

export const BODY_SILHOUETTE = {
  head: { cx: 200, cy: 60, rx: 29, ry: 40 },
  neck: 'M 184 92 L 184 134 L 216 134 L 216 92 Z',
  half: [
    // tułów
    'M 200 124 L 186 126 C 168 136 140 142 120 150 C 104 156 95 172 95 196 C 97 210 110 218 126 220 C 130 250 132 290 140 350 C 140 380 134 410 126 440 C 124 460 130 476 160 484 L 200 490 Z',
    // kończyna górna
    'M 120 150 C 101 155 92 172 92 200 C 90 240 87 290 84 330 C 80 380 77 430 75 470 C 69 492 67 522 76 546 C 85 553 97 549 101 534 C 104 512 102 490 100 470 C 106 420 115 380 119 340 C 122 300 126 262 128 218 Z',
    // kończyna dolna
    'M 124 440 C 122 520 134 600 145 655 C 147 690 138 730 146 790 C 150 820 152 842 146 864 C 143 878 160 885 177 883 C 188 881 187 868 182 850 C 179 828 186 800 190 762 C 195 722 187 690 184 660 C 184 600 192 540 198 484 Z'
  ]
};

// Warstwa podścieliska: jasny odcień tkanki głębokiej pod mięśniami powierzchownymi,
// dzięki któremu przestrzenie między mięśniami czytają się jak przegrody, a nie puste pola.
export const BODY_UNDERLAY = [
  'M 200 128 L 186 128 C 168 137 140 143 120 151 C 105 157 96 172 96 196 C 98 210 110 218 126 221 C 130 250 132 290 139 350 C 139 380 133 410 125 440 C 124 460 130 476 160 484 L 200 490 Z',
  'M 120 151 C 102 156 93 172 93 200 C 91 240 88 290 85 330 C 81 380 78 430 76 468 L 100 468 C 106 420 114 380 118 340 C 121 300 125 262 127 219 Z',
  'M 125 442 C 123 520 135 600 145 655 C 147 690 139 730 146 790 C 149 812 151 828 150 838 L 180 838 C 181 820 186 800 190 762 C 194 722 186 690 183 660 C 183 600 191 540 197 486 Z'
];

// --- Generatory pomocnicze -------------------------------------------------

// Zęby mięśnia zębatego przedniego: palczaste przyczepy na kolejnych żebrach.
function serratusSlips(ys, xOuter, xTip) {
  return ys
    .map((y) => `M ${xOuter} ${y - 7} C ${xOuter + 8} ${y - 8} ${xTip - 6} ${y - 3} ${xTip} ${y + 2} C ${xTip - 6} ${y + 6} ${xOuter + 8} ${y + 8} ${xOuter} ${y + 7} Z`)
    .join(' ');
}

function ribArcs(ys, x1, x2, sag) {
  return ys.map((y) => `M ${x1} ${y} Q ${(x1 + x2) / 2} ${y + sag} ${x2} ${y + sag * 0.6}`);
}

function spinousProcesses(fromY, toY, step) {
  const out = [];
  for (let y = fromY; y <= toY; y += step) out.push(`M 196 ${y} L 204 ${y} L 203 ${y + step * 0.55} L 197 ${y + step * 0.55} Z`);
  return out.join(' ');
}

// --- Elementy wielokrotnego użytku ------------------------------------------

const P = {
  // KLATKA PIERSIOWA I BARK (przód)
  scm: 'M 183 92 C 186 110 191 132 197 150 L 190 151 C 184 132 180 112 179 96 Z',
  trapFront: 'M 184 114 C 181 126 172 134 158 139 C 143 143 130 146 121 150 L 152 146 C 168 141 180 135 188 128 Z',
  deltAnt: 'M 153 148 C 139 146 125 148 117 154 C 109 162 105 176 104 194 C 103 214 104 234 104 252 C 110 237 116 221 122 206 C 128 190 133 176 140 164 C 145 157 150 151 153 148 Z',
  deltMidFront: 'M 117 154 C 105 158 97 170 94 188 C 92 208 95 228 100 247 L 104 252 C 104 232 103 212 104 194 C 105 176 109 162 117 154 Z',
  pecClav: 'M 197 152 C 182 150 166 149 153 149 C 146 158 139 170 133 182 C 127 194 121 204 116 212 C 136 200 162 187 197 176 Z',
  pecStern: 'M 197 176 L 200 177 L 200 286 C 190 292 176 296 162 292 C 148 286 136 270 128 250 C 124 238 120 225 116 212 C 136 200 162 187 197 176 Z',
  latFront: 'M 124 224 C 128 252 131 292 135 340 L 130 336 C 127 300 124 262 121 228 Z',
  extObl: 'M 168 296 C 158 298 146 300 133 304 C 134 330 138 360 139 390 C 139 404 137 416 136 424 C 154 438 174 452 189 467 C 182 448 175 425 171 400 C 168 370 167 330 168 296 Z',
  rectAbd: 'M 197 288 L 169 291 C 166 320 166 352 170 382 C 174 412 182 442 190 467 L 197 469 Z',
  pyramidalis: 'M 197 470 L 187 467 C 189 457 193 447 197 439 Z',
  biceps: 'M 114 212 C 104 228 98 252 98 278 C 98 302 101 320 104 336 L 110 340 C 116 318 120 296 120 274 C 120 248 118 228 114 212 Z',
  brachialisSliver: 'M 98 286 C 94 302 92 318 92 332 L 103 338 C 100 320 98 302 98 286 Z',
  tricepsSliverFront: 'M 122 228 C 124 262 124 300 118 332 L 114 334 C 119 300 121 262 119 230 Z',
  brachiorad: 'M 92 300 C 86 320 82 345 82 372 C 82 402 80 432 78 462 L 84 463 C 88 432 92 402 94 377 C 96 352 98 332 98 316 Z',
  pronTeres: 'M 115 337 C 108 352 100 366 92 380 L 96 385 C 105 371 112 357 119 345 Z',
  fcr: 'M 115 341 C 108 362 101 392 95 421 C 91 441 89 455 87 466 L 93 466 C 97 441 103 411 109 386 C 113 368 117 352 119 345 Z',
  fds: 'M 119 346 C 115 382 106 430 97 466 L 103 466 C 109 432 117 392 121 354 Z',
  fcu: 'M 121 342 C 123 364 120 402 113 440 C 109 455 105 464 103 468 L 99 468 C 107 440 113 400 117 352 Z',

  // MIEDNICA, UDO, PODUDZIE (przód)
  tfl: 'M 136 428 C 132 442 128 462 128 490 L 135 492 C 137 470 140 449 143 432 Z',
  iliopsoas: 'M 160 446 C 156 458 156 470 158 482 L 168 478 C 168 466 168 456 168 446 Z',
  pectineus: 'M 187 466 L 171 461 C 168 470 168 480 170 490 C 177 488 183 481 189 476 Z',
  addLongus: 'M 192 474 L 186 477 C 178 494 172 522 168 560 L 178 562 C 184 532 190 502 193 479 Z',
  addMagFront: 'M 170 560 L 180 562 C 182 590 182 615 180 640 C 176 625 172 600 170 580 Z',
  gracilis: 'M 197 482 C 195 520 191 580 187 640 L 183 662 L 178 657 C 182 600 186 540 189 480 Z',
  sartorius: 'M 137 428 L 146 428 C 152 470 164 520 176 580 C 182 610 186 640 186 668 L 178 672 C 178 645 172 615 166 588 C 154 530 142 480 137 428 Z',
  rectFem: 'M 144 446 C 152 470 160 510 162 560 C 163 600 164 625 164 645 L 156 646 C 150 630 146 610 142 580 C 138 545 138 500 144 446 Z',
  vastLat: 'M 129 472 C 125 520 131 580 141 630 C 145 645 150 652 156 655 L 156 646 C 148 622 142 590 140 562 C 137 522 139 492 141 470 Z',
  vastMed: 'M 166 580 C 175 600 182 624 183 645 C 179 655 172 660 165 660 L 164 645 C 164 625 165 600 166 580 Z',
  tibAnt: 'M 160 690 C 154 710 151 740 152 770 C 154 800 160 820 168 836 L 174 834 C 168 810 165 780 165 750 C 165 725 166 705 168 690 Z',
  extDigLong: 'M 152 692 C 146 720 146 760 150 800 L 156 830 L 162 830 C 156 800 152 770 152 740 C 152 720 154 705 157 692 Z',
  peroneus: 'M 148 684 C 142 710 140 740 144 770 C 146 790 150 805 152 815 L 154 800 C 150 770 148 740 150 715 C 150 700 152 690 153 686 Z',
  gastrocMedFront: 'M 183 690 C 191 710 193 735 190 760 L 182 772 C 184 745 182 715 178 692 Z',
  soleusFront: 'M 182 772 L 190 762 C 188 790 184 810 178 826 L 176 824 C 178 805 180 790 182 772 Z',

  // GRZBIET (tył)
  trapDesc: 'M 200 92 C 196 104 190 116 186 126 C 170 136 145 144 120 152 C 122 157 126 161 132 164 C 152 160 178 154 200 150 Z',
  trapTrans: 'M 200 150 C 178 154 152 160 132 164 C 145 170 158 180 168 192 C 178 196 190 200 200 204 Z',
  trapAsc: 'M 200 204 C 190 200 178 196 168 192 C 178 230 190 285 200 330 Z',
  deltPost: 'M 165 186 C 150 176 135 166 124 158 C 108 162 98 178 96 200 C 96 220 100 236 104 252 C 112 236 122 218 136 206 C 146 198 156 192 165 186 Z',
  deltMidBack: 'M 124 158 C 114 155 103 160 96 173 C 91 191 92 216 98 240 L 104 252 C 100 236 96 220 96 200 C 98 178 108 162 124 158 Z',
  infraspinatus: 'M 166 194 C 166 215 166 235 164 250 C 155 244 140 230 130 218 C 124 210 120 200 118 192 C 132 189 150 189 166 194 Z',
  teresMinor: 'M 151 239 C 141 229 130 217 120 204 L 116 211 C 126 223 136 237 146 247 Z',
  teresMajor: 'M 166 252 C 164 260 162 266 158 268 C 145 258 132 244 120 231 L 120 218 C 134 230 150 244 166 252 Z',
  lat: 'M 200 250 L 200 425 C 182 425 165 420 150 414 C 140 410 136 395 136 375 C 134 340 132 300 130 270 C 128 250 126 235 124 226 L 120 231 C 132 245 145 258 158 268 C 172 266 186 258 200 250 Z',
  tlFascia: 'M 200 330 C 192 350 186 380 184 418 L 200 428 Z',
  triceps: 'M 104 252 C 98 270 94 290 94 310 C 94 322 96 330 100 334 L 112 334 C 118 320 124 290 126 260 C 126 245 125 232 124 224 C 116 232 110 242 104 252 Z',
  anconeus: 'M 90 336 C 96 338 102 342 107 349 C 105 357 101 364 97 369 C 93 359 90 347 90 336 Z',
  brachioradBack: 'M 91 300 C 87 320 85 340 85 360 C 84 395 82 430 79 462 L 83 462 C 86 430 88 395 89 360 Z',
  ecrl: 'M 89 330 C 87 362 85 400 83 440 L 89 440 C 91 400 93 362 93 336 Z',
  extDig: 'M 93 340 C 97 362 97 400 95 430 C 94 445 93 455 93 466 L 99 466 C 101 440 103 410 103 385 C 103 370 101 358 98 349 Z',
  ecu: 'M 103 368 C 107 390 107 420 103 440 C 101 452 100 460 100 466 L 104 466 C 108 440 112 410 110 385 Z',
  fcuBack: 'M 117 340 C 119 372 115 412 107 450 L 103 468 L 107 468 C 113 440 119 400 121 360 Z',

  // POŚLADKI I KOŃCZYNA DOLNA (tył)
  gmed: 'M 135 410 C 150 409 165 414 173 421 C 156 432 141 448 130 465 C 126 446 126 425 135 410 Z',
  gmax: 'M 175 420 C 190 428 198 445 198 470 C 198 490 192 505 180 515 C 165 520 145 515 132 505 L 128 470 C 135 450 150 430 175 420 Z',
  itb: 'M 128 490 C 131 560 139 620 147 660 L 152 660 C 144 620 136 560 134 495 Z',
  vastLatBack: 'M 134 500 C 134 545 139 595 148 640 L 152 640 C 147 600 142 555 140 512 Z',
  bfLong: 'M 177 508 C 168 540 158 590 152 630 C 150 645 149 657 149 668 L 155 668 C 158 640 166 600 174 566 C 178 546 181 526 181 510 Z',
  bfShort: 'M 141 568 C 141 604 145 638 150 660 L 153 648 C 150 622 148 594 147 566 Z',
  semitend: 'M 181 508 C 183 540 183 580 181 620 C 179 640 179 655 181 668 L 187 668 C 187 650 187 630 189 610 C 189 570 187 535 185 508 Z',
  semimemb: 'M 189 562 C 193 592 193 632 189 665 L 185 668 C 187 640 187 602 185 572 Z',
  addMagBack: 'M 186 505 C 191 520 194 540 196 560 L 190 590 C 188 560 186 530 184 508 Z',
  gracilisBack: 'M 197 496 C 195 560 192 620 189 666 L 193 666 C 196 620 198 560 198 496 Z',
  gastrocLat: 'M 150 668 C 142 690 138 720 142 750 C 146 770 156 785 166 792 L 166 702 C 162 686 156 673 150 668 Z',
  gastrocMed: 'M 184 668 C 191 690 194 720 190 750 C 186 770 178 785 168 792 L 168 702 C 172 686 178 673 184 668 Z',
  soleusLatSliver: 'M 143 752 C 146 775 152 795 160 810 L 164 800 C 156 790 148 772 143 752 Z',
  soleusMedSliver: 'M 189 752 C 186 775 180 795 172 810 L 168 800 C 176 790 184 772 189 752 Z',
  achilles: 'M 163 792 L 171 792 L 170 846 L 164 846 Z',
  peroneusBack: 'M 146 690 C 141 720 141 750 146 780 L 150 778 C 146 750 146 720 150 692 Z',

  // WARSTWA GŁĘBOKA GRZBIETU
  rhomboids: 'M 200 140 L 171 167 C 169 200 167 232 165 260 L 200 234 Z',
  supraspinatus: 'M 171 168 C 160 164 142 162 126 160 L 119 165 C 134 172 152 181 168 191 Z',
  erector: 'M 198 146 C 190 200 180 300 173 382 C 171 420 180 446 196 454 L 198 454 Z',
  ql: 'M 193 330 L 173 333 C 166 360 161 390 158 415 L 190 421 Z',
  soleusDeep: 'M 148 708 C 141 736 142 770 150 798 C 155 812 161 820 166 826 L 170 826 C 176 812 184 796 188 776 C 193 748 190 724 185 708 C 172 718 160 718 148 708 Z',
  piriformis: 'M 190 452 C 175 452 155 456 133 466 L 134 472 C 156 466 176 462 191 462 Z',
  gmin: 'M 141 424 C 156 424 166 431 167 440 C 152 448 139 456 130 465 C 128 450 132 432 141 424 Z',
  scapSpine: 'M 168 189 C 151 178 135 167 122 155 L 117 160 C 131 172 148 185 166 197 Z',
  acromion: 'M 126 151 C 118 150 112 153 110 159 C 116 163 122 162 127 158 Z',
  sacrum: 'M 182 430 L 218 430 L 210 478 L 200 492 L 190 478 Z',
  iliacCrest: 'M 186 420 C 170 410 150 404 134 408',
  rib12: 'M 196 328 C 186 330 178 334 170 342',

  // KLATKA PIERSIOWA – WARSTWA GŁĘBOKA
  pecMinor: 'M 130 170 C 142 176 158 186 170 196 C 170 218 168 240 165 262 C 160 252 153 244 147 236 C 142 214 136 190 130 170 Z',
  serratusSheet: 'M 128 196 C 132 230 134 270 134 312 L 140 312 C 140 270 140 230 138 196 Z',
  coracobrach: 'M 129 170 C 124 196 118 230 113 268 L 118 270 C 122 236 128 202 134 174 Z',
  brachialisDeep: 'M 104 246 C 97 270 94 300 94 322 C 95 334 99 342 104 346 L 110 344 C 115 320 117 290 116 260 C 112 252 108 248 104 246 Z',
  intObl: 'M 135 424 C 152 432 170 440 186 448 C 180 420 174 380 171 344 C 168 322 168 304 168 292 C 156 296 146 300 134 304 C 135 340 138 380 135 424 Z',
  transversus: 'M 134 300 C 137 340 139 390 136 424 C 154 434 170 444 186 452 C 178 420 172 380 170 340 C 169 320 169 304 169 292 C 156 294 146 296 134 300 Z',
  intercostal: 'M 140 170 C 150 160 175 156 196 156 L 196 290 C 175 298 150 300 136 304 C 134 260 135 210 140 170 Z',
  sternum: 'M 194 150 L 206 150 L 205 280 L 200 292 L 195 280 Z',
  clavicle: 'M 196 148 C 180 145 160 144 140 148 C 130 150 122 150 116 152 L 117 157 C 125 155 133 155 142 153 C 162 149 180 150 196 154 Z',
  coracoid: 'M 128 164 C 132 168 136 172 134 178 C 130 178 126 174 125 168 Z'
};

export const VIEWS = {
  front: {
    label: 'Widok przedni',
    layer: 'warstwa powierzchowna',
    viewBox: '0 0 400 900',
    silhouette: true,
    parts: [
      { key: 'scm', kind: 'muscle', paths: [{ d: P.scm, fiber: 70 }] },
      { key: 'trap-front', kind: 'muscle', paths: [{ d: P.trapFront, fiber: -20 }] },
      { key: 'clavicle', kind: 'bone', paths: [{ d: P.clavicle }] },
      { key: 'lat-front', kind: 'muscle', paths: [{ d: P.latFront, fiber: 80 }] },
      { key: 'serratus-anterior', kind: 'muscle', paths: [{ d: serratusSlips([236, 254, 272, 290], 124, 152), fiber: 10 }] },
      { key: 'external-oblique', kind: 'muscle', paths: [{ d: P.extObl, fiber: 55 }] },
      { key: 'rectus-abdominis', kind: 'muscle', paths: [{ d: P.rectAbd, fiber: 90 }], details: ['M 169 322 C 178 324 188 321 197 323', 'M 168 352 C 178 354 188 351 197 353', 'M 170 384 C 180 386 189 383 197 385'] },
      { key: 'pyramidalis', kind: 'muscle', paths: [{ d: P.pyramidalis, fiber: 75 }] },
      { key: 'deltoid-middle', kind: 'muscle', paths: [{ d: P.deltMidFront, fiber: 85 }] },
      { key: 'deltoid-anterior', kind: 'muscle', paths: [{ d: P.deltAnt, fiber: -65 }] },
      { key: 'pectoralis-major', kind: 'muscle', paths: [{ d: P.pecClav, fiber: -30 }, { d: P.pecStern, fiber: 10 }] },
      { key: 'triceps-front', kind: 'muscle', paths: [{ d: P.tricepsSliverFront, fiber: 85 }] },
      { key: 'brachialis-sliver', kind: 'muscle', paths: [{ d: P.brachialisSliver, fiber: 80 }] },
      { key: 'biceps', kind: 'muscle', paths: [{ d: P.biceps, fiber: 85 }] },
      { key: 'brachioradialis', kind: 'muscle', paths: [{ d: P.brachiorad, fiber: -85 }] },
      { key: 'pronator-teres', kind: 'muscle', paths: [{ d: P.pronTeres, fiber: -50 }] },
      { key: 'fds', kind: 'muscle', paths: [{ d: P.fds, fiber: 80 }] },
      { key: 'fcr', kind: 'muscle', paths: [{ d: P.fcr, fiber: -75 }] },
      { key: 'fcu', kind: 'muscle', paths: [{ d: P.fcu, fiber: 95 }] },
      { key: 'iliopsoas', kind: 'muscle', paths: [{ d: P.iliopsoas, fiber: 80 }] },
      { key: 'tfl', kind: 'muscle', paths: [{ d: P.tfl, fiber: 95 }] },
      { key: 'vastus-lateralis', kind: 'muscle', paths: [{ d: P.vastLat, fiber: 75 }] },
      { key: 'rectus-femoris', kind: 'muscle', paths: [{ d: P.rectFem, fiber: 80 }] },
      { key: 'vastus-medialis', kind: 'muscle', paths: [{ d: P.vastMed, fiber: 120 }] },
      { key: 'pectineus', kind: 'muscle', paths: [{ d: P.pectineus, fiber: 150 }] },
      { key: 'adductor-magnus-front', kind: 'muscle', paths: [{ d: P.addMagFront, fiber: 100 }] },
      { key: 'adductor-longus', kind: 'muscle', paths: [{ d: P.addLongus, fiber: 105 }] },
      { key: 'gracilis', kind: 'muscle', paths: [{ d: P.gracilis, fiber: 95 }] },
      { key: 'sartorius', kind: 'muscle', paths: [{ d: P.sartorius, fiber: 62 }] },
      { key: 'patella', kind: 'bone', paths: [{ d: 'M 164 650 C 172 650 175 658 175 664 C 175 672 170 677 164 677 C 158 677 153 672 153 664 C 153 657 157 650 164 650 Z' }] },
      { key: 'patellar-tendon', kind: 'bone', paths: [{ d: 'M 160 676 L 168 676 L 167 698 L 161 698 Z' }] },
      { key: 'tibia', kind: 'bone', paths: [{ d: 'M 169 694 C 172 740 174 790 176 834 L 180 834 C 180 790 178 740 175 694 Z' }] },
      { key: 'gastrocnemius-front', kind: 'muscle', paths: [{ d: P.gastrocMedFront, fiber: 95 }] },
      { key: 'soleus-front', kind: 'muscle', paths: [{ d: P.soleusFront, fiber: 100 }] },
      { key: 'peroneus', kind: 'muscle', paths: [{ d: P.peroneus, fiber: 85 }] },
      { key: 'extensor-digitorum-longus', kind: 'muscle', paths: [{ d: P.extDigLong, fiber: 82 }] },
      { key: 'tibialis-anterior', kind: 'muscle', paths: [{ d: P.tibAnt, fiber: 78 }] }
    ]
  },

  back: {
    label: 'Widok tylny',
    layer: 'warstwa powierzchowna',
    viewBox: '0 0 400 900',
    silhouette: true,
    parts: [
      { key: 'infraspinatus', kind: 'muscle', paths: [{ d: P.infraspinatus, fiber: 15 }] },
      { key: 'teres-minor', kind: 'muscle', paths: [{ d: P.teresMinor, fiber: 40 }] },
      { key: 'teres-major', kind: 'muscle', paths: [{ d: P.teresMajor, fiber: 40 }] },
      { key: 'latissimus', kind: 'muscle', paths: [{ d: P.lat, fiber: 55 }] },
      { key: 'tl-fascia', kind: 'bone', paths: [{ d: P.tlFascia }] },
      { key: 'trapezius', kind: 'muscle', paths: [{ d: P.trapDesc, fiber: -25 }, { d: P.trapTrans, fiber: 5 }, { d: P.trapAsc, fiber: 60 }] },
      { key: 'triceps', kind: 'muscle', paths: [{ d: P.triceps, fiber: 85 }], details: ['M 112 258 C 108 280 106 305 106 330'] },
      { key: 'deltoid-middle', kind: 'muscle', paths: [{ d: P.deltMidBack, fiber: 85 }] },
      { key: 'deltoid-posterior', kind: 'muscle', paths: [{ d: P.deltPost, fiber: 120 }] },
      { key: 'brachioradialis-back', kind: 'muscle', paths: [{ d: P.brachioradBack, fiber: 85 }] },
      { key: 'ecrl', kind: 'muscle', paths: [{ d: P.ecrl, fiber: 85 }] },
      { key: 'fcu-back', kind: 'muscle', paths: [{ d: P.fcuBack, fiber: 95 }] },
      { key: 'ecu', kind: 'muscle', paths: [{ d: P.ecu, fiber: 95 }] },
      { key: 'extensor-digitorum', kind: 'muscle', paths: [{ d: P.extDig, fiber: 88 }] },
      { key: 'olecranon', kind: 'bone', paths: [{ d: 'M 100 332 C 106 332 109 336 108 341 C 106 345 101 345 98 341 C 96 337 97 333 100 332 Z' }] },
      { key: 'anconeus', kind: 'muscle', paths: [{ d: P.anconeus, fiber: 50 }] },
      { key: 'gluteus-medius', kind: 'muscle', paths: [{ d: P.gmed, fiber: 110 }] },
      { key: 'gluteus-maximus', kind: 'muscle', paths: [{ d: P.gmax, fiber: -35 }] },
      { key: 'vastus-lateralis-back', kind: 'muscle', paths: [{ d: P.vastLatBack, fiber: 80 }] },
      { key: 'itb', kind: 'bone', paths: [{ d: P.itb }] },
      { key: 'gracilis-back', kind: 'muscle', paths: [{ d: P.gracilisBack, fiber: 92 }] },
      { key: 'adductor-magnus-back', kind: 'muscle', paths: [{ d: P.addMagBack, fiber: 100 }] },
      { key: 'semimembranosus', kind: 'muscle', paths: [{ d: P.semimemb, fiber: 95 }] },
      { key: 'semitendinosus', kind: 'muscle', paths: [{ d: P.semitend, fiber: 92 }] },
      { key: 'biceps-femoris', kind: 'muscle', paths: [{ d: P.bfLong, fiber: -75 }, { d: P.bfShort, fiber: 80 }] },
      { key: 'peroneus-back', kind: 'muscle', paths: [{ d: P.peroneusBack, fiber: 88 }] },
      { key: 'soleus-back', kind: 'muscle', paths: [{ d: P.soleusLatSliver, fiber: 70 }, { d: P.soleusMedSliver, fiber: 110 }] },
      { key: 'gastrocnemius', kind: 'muscle', paths: [{ d: P.gastrocLat, fiber: 80 }, { d: P.gastrocMed, fiber: 100 }] },
      { key: 'achilles', kind: 'bone', paths: [{ d: P.achilles }] }
    ]
  },

  'back-deep': {
    label: 'Widok tylny',
    layer: 'warstwa głęboka — mięśnie powierzchowne usunięte (zarysy przerywane); lewa połowa ryciny: warstwa pośrednia, prawa: najgłębsza',
    viewBox: '0 0 400 900',
    silhouette: true,
    parts: [
      { key: 'sacrum', kind: 'bone', side: 'left', paths: [{ d: P.sacrum }] },
      { key: 'rib12', kind: 'bone', side: 'right', stroke: true, paths: [{ d: P.rib12 }] },
      { key: 'iliac-crest', kind: 'bone', stroke: true, paths: [{ d: P.iliacCrest }] },
      { key: 'quadratus-lumborum', kind: 'muscle', side: 'right', paths: [{ d: P.ql, fiber: 95 }] },
      { key: 'erector-spinae', kind: 'muscle', side: 'left', paths: [{ d: P.erector, fiber: 88 }], details: ['M 196 160 C 194 260 192 360 194 450', 'M 190 170 C 186 260 182 360 184 446'] },
      { key: 'rhomboids', kind: 'muscle', paths: [{ d: P.rhomboids, fiber: -35 }], details: ['M 200 176 L 170 200'] },
      { key: 'spine', kind: 'bone', side: 'left', paths: [{ d: spinousProcesses(132, 420, 16) }] },
      { key: 'supraspinatus', kind: 'muscle', paths: [{ d: P.supraspinatus, fiber: 10 }] },
      { key: 'infraspinatus', kind: 'muscle', paths: [{ d: P.infraspinatus, fiber: 15 }] },
      { key: 'teres-minor', kind: 'muscle', paths: [{ d: P.teresMinor, fiber: 40 }] },
      { key: 'teres-major', kind: 'muscle', paths: [{ d: P.teresMajor, fiber: 40 }] },
      { key: 'scap-spine', kind: 'bone', paths: [{ d: P.scapSpine }] },
      { key: 'acromion', kind: 'bone', paths: [{ d: P.acromion }] },
      { key: 'triceps', kind: 'muscle', paths: [{ d: P.triceps, fiber: 85 }] },
      { key: 'piriformis', kind: 'muscle', side: 'right', paths: [{ d: P.piriformis, fiber: -10 }] },
      { key: 'gluteus-minimus', kind: 'muscle', side: 'right', paths: [{ d: P.gmin, fiber: 110 }] },
      { key: 'gluteus-medius', kind: 'muscle', side: 'left', paths: [{ d: P.gmed, fiber: 110 }] },
      { key: 'semimembranosus', kind: 'muscle', paths: [{ d: P.semimemb, fiber: 95 }] },
      { key: 'semitendinosus', kind: 'muscle', paths: [{ d: P.semitend, fiber: 92 }] },
      { key: 'biceps-femoris', kind: 'muscle', paths: [{ d: P.bfLong, fiber: -75 }, { d: P.bfShort, fiber: 80 }] },
      { key: 'soleus', kind: 'muscle', paths: [{ d: P.soleusDeep, fiber: 90 }], details: ['M 167 722 L 167 818'] },
      { key: 'achilles', kind: 'bone', paths: [{ d: P.achilles }] },
      { key: 'ghost-trapezius', kind: 'ghost', paths: [{ d: P.trapDesc }, { d: P.trapTrans }, { d: P.trapAsc }] },
      { key: 'ghost-latissimus', kind: 'ghost', paths: [{ d: P.lat }] },
      { key: 'ghost-deltoid', kind: 'ghost', paths: [{ d: P.deltPost }] },
      { key: 'ghost-gmax', kind: 'ghost', paths: [{ d: P.gmax }] },
      { key: 'ghost-gastrocnemius', kind: 'ghost', paths: [{ d: P.gastrocLat }, { d: P.gastrocMed }] }
    ]
  },

  'front-deep': {
    label: 'Widok przedni',
    layer: 'warstwa głęboka — mięśnie powierzchowne usunięte (zarysy przerywane); lewa połowa brzucha: warstwa pośrednia, prawa: najgłębsza',
    viewBox: '50 80 300 420',
    silhouette: true,
    parts: [
      { key: 'intercostal', kind: 'muscle', paths: [{ d: P.intercostal, fiber: 40 }] },
      { key: 'ribs', kind: 'bone', stroke: true, paths: ribArcs([176, 198, 220, 242, 264, 284], 196, 136, 10).map((d) => ({ d })) },
      { key: 'sternum', kind: 'bone', side: 'left', paths: [{ d: P.sternum }] },
      { key: 'clavicle', kind: 'bone', paths: [{ d: P.clavicle }] },
      { key: 'serratus-anterior', kind: 'muscle', paths: [{ d: P.serratusSheet, fiber: 90 }, { d: serratusSlips([206, 226, 246, 266, 286], 128, 156), fiber: 10 }] },
      { key: 'pectoralis-minor', kind: 'muscle', paths: [{ d: P.pecMinor, fiber: 55 }] },
      { key: 'coracoid', kind: 'bone', paths: [{ d: P.coracoid }] },
      { key: 'deltoid-middle', kind: 'muscle', paths: [{ d: P.deltMidFront, fiber: 85 }] },
      { key: 'deltoid-anterior', kind: 'muscle', paths: [{ d: P.deltAnt, fiber: -65 }] },
      { key: 'triceps-front', kind: 'muscle', paths: [{ d: P.tricepsSliverFront, fiber: 85 }] },
      { key: 'coracobrachialis', kind: 'muscle', paths: [{ d: P.coracobrach, fiber: 100 }] },
      { key: 'brachialis', kind: 'muscle', paths: [{ d: P.brachialisDeep, fiber: 82 }] },
      { key: 'brachioradialis', kind: 'muscle', paths: [{ d: P.brachiorad, fiber: -85 }] },
      { key: 'rectus-abdominis', kind: 'muscle', paths: [{ d: P.rectAbd, fiber: 90 }], details: ['M 169 322 C 178 324 188 321 197 323', 'M 168 352 C 178 354 188 351 197 353', 'M 170 384 C 180 386 189 383 197 385'] },
      { key: 'internal-oblique', kind: 'muscle', side: 'left', paths: [{ d: P.intObl, fiber: -50 }] },
      { key: 'transversus-abdominis', kind: 'muscle', side: 'right', paths: [{ d: P.transversus, fiber: 0 }] },
      { key: 'ghost-pectoralis', kind: 'ghost', paths: [{ d: P.pecClav }, { d: P.pecStern }] },
      { key: 'ghost-biceps', kind: 'ghost', paths: [{ d: P.biceps }] },
      { key: 'ghost-ext-oblique', kind: 'ghost', paths: [{ d: P.extObl }] }
    ]
  },

  'scapula-anterior': {
    label: 'Prawa łopatka — widok przedni (powierzchnia żebrowa)',
    layer: 'ściana klatki piersiowej odsunięta przyśrodkowo; zarysy przerywane: mięśnie położone bardziej z przodu',
    viewBox: '0 0 400 420',
    silhouette: false,
    parts: [
      { key: 'ribs-stumps', kind: 'bone', side: 'left', stroke: true, paths: [90, 130, 170, 210, 250, 290, 325].map((y) => ({ d: `M 334 ${y} Q 358 ${y + 10} 388 ${y + 4}` })) },
      { key: 'humerus', kind: 'bone', side: 'left', paths: [{ d: 'M 70 116 C 88 106 112 114 118 136 C 120 150 112 162 102 166 C 94 240 86 320 82 410 L 56 410 C 60 320 66 240 72 166 C 62 160 58 130 70 116 Z' }] },
      { key: 'scapula', kind: 'bone', side: 'left', paths: [{ d: 'M 242 76 L 162 92 C 152 90 142 80 130 78 C 120 80 118 92 128 96 L 145 100 C 136 108 124 112 116 118 C 108 130 108 150 118 162 C 144 220 182 290 222 334 C 234 300 246 200 252 120 C 252 100 248 86 242 76 Z' }] },
      { key: 'serratus-anterior', kind: 'muscle', side: 'left', paths: [70, 110, 150, 190, 230, 270, 305].map((y, i) => ({ d: `M ${250 - i * 3} ${y + 20} C 280 ${y + 14} 310 ${y + 4} 336 ${y} L 336 ${y + 18} C 310 ${y + 24} 280 ${y + 34} ${248 - i * 3} ${y + 46} Z`, fiber: -10 })) },
      { key: 'subscapularis', kind: 'muscle', side: 'left', paths: [{ d: 'M 238 94 C 244 150 240 240 222 318 C 190 282 156 224 132 176 L 112 150 C 130 142 152 124 170 106 C 196 100 218 96 238 94 Z', fiber: 25 }], details: ['M 230 140 C 190 140 150 146 120 150', 'M 226 200 C 186 186 150 168 122 154', 'M 220 260 C 186 230 154 196 126 158'] },
      { key: 'coracobrachialis', kind: 'muscle', side: 'left', paths: [{ d: 'M 128 92 C 120 140 112 200 104 280 L 112 282 C 120 210 128 150 138 96 Z', fiber: 98 }] },
      { key: 'biceps-short-head', kind: 'muscle', side: 'left', paths: [{ d: 'M 124 90 C 112 140 100 200 92 290 L 100 292 C 110 210 120 150 132 94 Z', fiber: 98 }] }
    ]
  }
};

// Kadry (viewBox) pozwalające powiększyć mały obszar ryciny.
export const CROPS = {
  full: '0 0 400 900',
  torso: '50 80 300 420',
  shoulders: '70 100 260 210',
  arm: '40 130 200 360',
  abdomen: '80 250 240 250',
  pelvis: '90 380 220 200',
  thigh: '90 400 220 300',
  legs: '90 400 220 490',
  calf: '100 620 200 260',
  forearm: '50 280 160 220'
};

export function getView(viewId) {
  const view = VIEWS[viewId];
  if (!view) throw new Error(`Nieznany widok: ${viewId}`);
  return view;
}

export function partKeys(viewId) {
  return getView(viewId).parts.map((p) => p.key);
}
