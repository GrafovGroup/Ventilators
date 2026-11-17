// Original explanatory artwork. No manufacturer designs, product specifications or clinical instructions.
import { mkdir, writeFile } from 'node:fs/promises';
const navy = '#082448',
  blue = '#1267de',
  cyan = '#19b8ee',
  pale = '#d9e8f6';
const path = (d, fill = 'none', stroke = navy, width = 5, extra = '') =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const rect = (x, y, w, h, fill = 'white', r = 8, stroke = navy) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`;
const circle = (x, y, r, fill = 'white', stroke = navy, width = 4) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
const line = (x, y, x2, y2, color = navy, width = 4, extra = '') =>
  path(`M${x} ${y}L${x2} ${y2}`, 'none', color, width, extra);
const arrow = (d) => path(d, 'none', cyan, 7, 'marker-end="url(#arrow)"');
const group = (x, y, scale, body) =>
  `<g transform="translate(${x} ${y}) scale(${scale})">${body}</g>`;
const fan = (blades = 6) =>
  circle(0, 0, 172, '#f4f8fc') +
  circle(0, 0, 154, 'white', '#7998b5', 2) +
  Array.from(
    { length: blades },
    (_, i) =>
      `<g transform="rotate(${(i * 360) / blades})">${path('M-17 -22 C-65 -80 -28 -141 45 -128 C91 -119 88 -74 28 -18', pale, blue, 3)}</g>`,
  ).join('') +
  circle(0, 0, 32, navy) +
  circle(0, 0, 11, cyan, cyan);
const doc = (w = 270, h = 330) =>
  rect(0, 0, w, h, 'white', 10) +
  rect(25, 28, 70, 12, blue, 2, blue) +
  Array.from({ length: 5 }, (_, i) =>
    line(28, 90 + i * 42, w - 28 - (i % 2) * 35, 90 + i * 42, '#8ca6bd', 5),
  ).join('');
const check = (x, y) =>
  circle(x, y, 22, '#e8f6fc', blue, 2) + path(`M${x - 10} ${y}l7 7 14-16`, 'none', blue, 4);
const dimension = (x, y, x2, y2) =>
  line(x, y, x2, y2, blue, 2) +
  line(x - 8, y - 10, x + 8, y + 10, blue, 2) +
  line(x2 - 8, y2 - 10, x2 + 8, y2 + 10, blue, 2);
const grille = (x, y, w, h) =>
  rect(x, y, w, h, '#f4f8fc', 3) +
  Array.from({ length: 7 }, (_, i) =>
    line(
      x + 12,
      y + 20 + (i * (h - 40)) / 6,
      x + w - 12,
      y + 20 + (i * (h - 40)) / 6,
      '#7797b5',
      3,
    ),
  ).join('');
const device = () =>
  rect(0, 0, 260, 185, 'white', 16) +
  rect(22, 24, 170, 110, navy, 5) +
  rect(43, 46, 98, 9, cyan, 1, cyan) +
  line(43, 75, 166, 75, '#87a7ca', 4) +
  line(43, 95, 150, 95, '#87a7ca', 4) +
  circle(220, 61, 12, pale) +
  circle(220, 104, 12, pale) +
  line(130, 185, 130, 300, navy, 12) +
  line(55, 300, 205, 300, navy, 9) +
  circle(55, 316, 13, navy) +
  circle(205, 316, 13, navy);
const folder = () =>
  path('M0 45V0H110L145 45H300V240H0Z', 'white', navy, 4) +
  path('M0 75H320L295 240H0Z', pale, blue, 4);
const diagrams = {
  roof:
    path('M190 640L595 485 1000 640 595 795Z', pale, '#8ba7c0', 3) +
    path('M425 550V660L595 725 765 660V550', 'white') +
    path('M425 550L595 485 765 550 595 615Z', '#b8d4ec') +
    rect(467, 369, 255, 200, '#edf5fb', 6) +
    grille(485, 420, 218, 100) +
    path('M355 365Q595 100 835 365L835 390H355Z', 'white') +
    path('M355 390Q595 455 835 390', pale) +
    arrow('M595 594V457') +
    arrow('M390 290L285 245') +
    arrow('M800 290L905 245'),
  axial:
    rect(330, 215, 540, 490, 'white', 10) +
    group(600, 460, 1.2, fan(6)) +
    [
      [360, 245],
      [840, 245],
      [360, 675],
      [840, 675],
    ]
      .map(([x, y]) => circle(x, y, 8, navy))
      .join('') +
    dimension(330, 760, 870, 760) +
    line(330, 720, 330, 785, blue, 2) +
    line(870, 720, 870, 785, blue, 2),
  centrifugal:
    path('M335 642V430C335 180 735 180 755 425V480H935V640H650C585 715 415 740 335 642Z', pale) +
    circle(520, 470, 150, 'white') +
    circle(520, 470, 117, pale, blue) +
    Array.from(
      { length: 12 },
      (_, i) =>
        `<g transform="rotate(${i * 30} 520 470)">${path('M520 375Q570 383 565 418', 'none', navy, 4)}</g>`,
    ).join('') +
    circle(520, 470, 40, 'white') +
    rect(865, 480, 70, 160, 'white', 0) +
    path('M375 669L345 738H485M635 695L665 738H760', 'none', navy, 8) +
    arrow('M750 556H1010') +
    arrow('M235 470H365'),
  exhaust:
    path('M420 140L705 230V745L420 660Z', pale, '#8ba7c0', 3) +
    rect(345, 290, 405, 310, 'white', 4) +
    group(548, 445, 0.72, fan(4)) +
    path('M750 290L890 240V550L750 600Z', '#a8c9e6') +
    Array.from({ length: 5 }, (_, i) => line(765, 310 + i * 47, 870, 274 + i * 47, navy, 5)).join(
      '',
    ) +
    arrow('M170 445H320') +
    arrow('M915 410H1050'),
  supply:
    path('M220 365L480 235H1040L780 365Z', '#b8d4ec') +
    rect(220, 365, 560, 280, 'white', 1) +
    path('M780 365L1040 235V515L780 645Z', pale) +
    rect(275, 415, 110, 175, '#eef5fb', 2) +
    Array.from({ length: 6 }, (_, i) =>
      line(285 + i * 17, 420, 285 + i * 17, 585, '#7199bb', 3),
    ).join('') +
    line(435, 365, 435, 645, navy, 3) +
    group(603, 505, 0.55, fan(6)) +
    arrow('M100 505H240') +
    arrow('M885 365L1000 305') +
    path('M280 645V690H380V645M650 645V690H750V645', pale),
  blowers:
    rect(245, 650, 710, 40, pale, 3) +
    path('M325 650V400Q325 230 490 230Q655 230 655 400V650Z', 'white') +
    circle(490, 443, 125, pale) +
    circle(490, 443, 68, 'white', blue) +
    circle(490, 443, 25, navy) +
    rect(650, 415, 260, 170, pale, 12) +
    Array.from({ length: 6 }, (_, i) =>
      line(680 + i * 35, 430, 680 + i * 35, 570, '#7399bb', 5),
    ).join('') +
    path('M430 230V150H560V230', pale) +
    arrow('M495 200V85') +
    path('M720 585V650H855V585', pale),
  parts:
    line(170, 470, 1030, 470, '#99aec3', 2, 'stroke-dasharray="12 14"') +
    group(365, 470, 0.7, fan(8)) +
    circle(635, 470, 92, 'white') +
    circle(635, 470, 54, pale) +
    circle(635, 470, 24, 'white') +
    rect(800, 420, 175, 100, pale, 8) +
    rect(780, 446, 35, 48, 'white', 3) +
    Array.from({ length: 4 }, (_, i) =>
      line(840 + i * 30, 432, 840 + i * 30, 508, '#7199bb', 3),
    ).join('') +
    dimension(790, 610, 975, 610) +
    path('M275 680H410M570 680H700M820 680H960', 'none', blue, 7),
  medical:
    group(295, 295, 1.35, device()) +
    group(720, 335, 1, doc(240, 310)) +
    check(920, 620) +
    path('M677 465H720', 'none', cyan, 7, 'stroke-dasharray="9 13"') +
    circle(390, 190, 18, cyan, cyan) +
    line(430, 190, 690, 190, '#adc4d8', 4),
  invasive:
    group(255, 260, 1.4, device()) +
    rect(745, 245, 180, 330, 'white', 12) +
    rect(770, 275, 130, 55, pale, 5) +
    line(775, 370, 895, 370, blue, 5) +
    line(775, 400, 865, 400, '#8ca6bd', 5) +
    line(775, 430, 895, 430, '#8ca6bd', 5) +
    path('M745 500H680V405H620', 'none', cyan, 5, 'stroke-dasharray="10 12"') +
    dimension(250, 770, 615, 770),
  noninvasive:
    path('M305 430L410 315H735L835 430V610H305Z', 'white') +
    path('M305 430H835', pale) +
    rect(390, 455, 255, 100, navy, 10) +
    rect(420, 480, 100, 10, cyan, 2, cyan) +
    line(420, 515, 610, 515, '#98b7d1', 5) +
    circle(745, 503, 30, pale, blue) +
    rect(370, 610, 80, 28, navy, 4) +
    rect(710, 610, 80, 28, navy, 4) +
    path('M835 540H950V260H810', 'none', cyan, 6, 'stroke-dasharray="9 13"') +
    rect(700, 180, 180, 125, 'white', 8) +
    line(728, 215, 850, 215, blue, 5) +
    line(728, 250, 810, 250, '#8ca6bd', 5),
  accessories:
    path('M290 520C290 310 590 310 590 520S890 730 890 520', 'none', pale, 48) +
    path('M290 520C290 310 590 310 590 520S890 730 890 520', 'none', blue, 4) +
    rect(255, 510, 70, 120, 'white', 8) +
    rect(855, 400, 70, 120, 'white', 8) +
    line(265, 545, 315, 545, navy, 3) +
    line(865, 485, 915, 485, navy, 3) +
    group(465, 145, 0.8, doc(270, 180)) +
    path('M580 290V390', 'none', cyan, 4, 'stroke-dasharray="8 10"'),
  procurement:
    group(255, 300, 1.1, folder()) +
    group(665, 220, 1.25, doc(230, 340)) +
    check(918, 640) +
    path('M590 420H655', 'none', cyan, 6, 'marker-end="url(#arrow)"') +
    rect(310, 660, 250, 45, pale, 5) +
    line(345, 682, 525, 682, blue, 5),
  repair:
    group(440, 445, 1.2, fan(5)) +
    path(
      'M765 230C825 170 900 200 920 245L855 280 900 345 960 310C985 400 900 450 840 420L670 660Q630 705 590 665Q555 635 590 595L795 390C750 355 735 270 765 230Z',
      'white',
      blue,
      6,
    ) +
    circle(620, 636, 17, pale, blue) +
    path('M245 695H470', 'none', navy, 7) +
    line(245, 725, 390, 725, '#8ca6bd', 5),
  maintenance:
    rect(285, 240, 620, 470, 'white', 14) +
    rect(285, 240, 620, 95, navy, 10) +
    [400, 600, 800].map((x) => line(x, 200, x, 275, blue, 18)).join('') +
    Array.from({ length: 3 }, (_, row) =>
      Array.from({ length: 4 }, (_, col) =>
        rect(
          335 + col * 145,
          380 + row * 95,
          90,
          55,
          (row + col) % 3 === 0 ? pale : '#f4f8fc',
          4,
          '#c0d1e0',
        ),
      ).join(''),
    ).join('') +
    check(525, 504) +
    check(815, 599) +
    circle(850, 695, 100, 'white', blue) +
    path('M850 632V695L895 725', 'none', navy, 7),
  installation:
    path('M460 370L600 290 740 370V530L600 610 460 530Z', 'white') +
    path('M460 370L600 450 740 370M600 450V610', 'none', blue, 4) +
    rect(120, 360, 220, 145, pale, 6) +
    grille(155, 390, 150, 85) +
    rect(820, 360, 220, 145, pale, 6) +
    path('M890 390L860 435H920L890 480', 'none', navy, 6) +
    rect(490, 75, 220, 120, 'white', 6) +
    line(525, 115, 675, 115, blue, 5) +
    line(525, 150, 630, 150, '#8ca6bd', 5) +
    rect(490, 705, 220, 120, 'white', 6) +
    path('M530 790L570 750 610 785 665 730', 'none', blue, 5) +
    line(340, 432, 460, 432, cyan, 6) +
    line(740, 432, 820, 432, cyan, 6) +
    line(600, 195, 600, 290, cyan, 6) +
    line(600, 610, 600, 705, cyan, 6),
  replacement:
    rect(250, 240, 470, 425, 'white', 5) +
    group(485, 452, 1.05, fan(4)) +
    dimension(250, 725, 720, 725) +
    dimension(190, 240, 190, 665) +
    line(230, 240, 165, 240, blue, 2) +
    line(230, 665, 165, 665, blue, 2) +
    rect(800, 350, 165, 265, pale, 5) +
    Array.from({ length: 8 }, (_, i) =>
      line(815, 375 + i * 28, i % 2 ? 845 : 865, 375 + i * 28, navy, 3),
    ).join('') +
    path('M745 290H920V325', 'none', cyan, 6, 'marker-end="url(#arrow)"'),
  'technical-support':
    group(220, 315, 1, device()) +
    group(690, 200, 1.2, doc(250, 350)) +
    path('M510 405H610V325H680', 'none', cyan, 5, 'stroke-dasharray="9 12"') +
    rect(500, 610, 185, 100, 'white', 8) +
    circle(540, 660, 14, pale, blue) +
    line(575, 645, 650, 645, navy, 4) +
    line(575, 675, 625, 675, '#8ca6bd', 4),
  institutions:
    rect(240, 210, 720, 490, 'white', 10) +
    rect(240, 210, 720, 85, navy, 7) +
    line(430, 295, 430, 700, '#b3c7d8', 3) +
    line(650, 295, 650, 700, '#b3c7d8', 3) +
    line(810, 295, 810, 700, '#b3c7d8', 3) +
    [390, 490, 590].map((y) => line(240, y, 960, y, '#b3c7d8', 3)).join('') +
    [345, 445, 545, 645]
      .map(
        (y, i) =>
          line(275, y, 380, y, blue, 5) +
          line(465, y, 600, y, '#8ca6bd', 4) +
          (i < 3 ? check(730, y) : circle(730, y, 20, pale, '#8ca6bd', 2)) +
          circle(880, y, 9, cyan, cyan),
      )
      .join(''),
  'industrial-specifications':
    group(250, 180, 1.4, doc(320, 400)) +
    rect(700, 290, 250, 270, 'white', 8) +
    path('M740 505V345M740 505H915', 'none', navy, 4) +
    path('M750 365Q840 365 905 480', 'none', blue, 7) +
    line(835, 395, 835, 505, cyan, 3, 'stroke-dasharray="7 9"') +
    circle(835, 400, 8, cyan, cyan) +
    path('M735 620H945', 'none', navy, 4) +
    dimension(735, 655, 945, 655),
  'replacement-guide':
    group(235, 245, 1.25, doc(250, 355)) +
    group(700, 245, 1.25, doc(250, 355)) +
    arrow('M575 455H660') +
    rect(270, 570, 240, 75, pale, 6) +
    rect(735, 570, 240, 75, pale, 6) +
    line(295, 607, 480, 607, blue, 5) +
    line(760, 607, 945, 607, blue, 5) +
    path('M390 720V760H855V720', 'none', navy, 4),
  'medical-procurement-guide':
    group(250, 225, 1.25, doc(290, 400)) +
    rect(695, 250, 270, 140, 'white', 9) +
    rect(695, 445, 270, 140, 'white', 9) +
    rect(695, 640, 270, 100, pale, 9) +
    [310, 505, 690]
      .map(
        (y) =>
          line(615, y, 695, y, cyan, 5) +
          circle(735, y, 13, pale, blue) +
          line(775, y, 925, y, navy, 4),
      )
      .join('') +
    line(635, 310, 635, 690, cyan, 3),
  'accessory-guide':
    rect(220, 225, 760, 440, 'white', 8) +
    line(600, 225, 600, 665, '#a9c1d6', 3) +
    rect(265, 270, 280, 120, pale, 6) +
    rect(655, 270, 280, 120, pale, 6) +
    Array.from(
      { length: 4 },
      (_, i) =>
        line(265, 440 + i * 50, 515, 440 + i * 50, '#8ca6bd', 4) +
        line(655, 440 + i * 50, 905, 440 + i * 50, '#8ca6bd', 4),
    ).join('') +
    path('M420 725H780', 'none', blue, 5) +
    circle(600, 725, 30, 'white', blue) +
    path('M585 725L595 735 615 710', 'none', blue, 5),
};
await mkdir('public/images/diagrams', { recursive: true });
for (const [id, body] of Object.entries(diagrams)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1.3" fill="#b9cddd"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5 0 10Z" fill="${cyan}"/></marker></defs><rect width="1200" height="900" fill="#f0f5fa"/><rect width="1200" height="900" fill="url(#grid)"/><circle cx="605" cy="450" r="340" fill="#e6eff7" opacity=".65"/><path d="M60 105V60H105M1095 60H1140V105M1140 795V840H1095M105 840H60V795" fill="none" stroke="#9cb5cb" stroke-width="2"/>${body}</svg>`;
  await writeFile(`public/images/diagrams/${id}.svg`, svg);
}
console.log(`Generated ${Object.keys(diagrams).length} distinct original page illustrations.`);
