'use strict';

// загрузка по относительному пути
const p1 = require('./Package1'); // прочитает точку входа из package.json
const p2 = require('./Package1/'); // прочитает точку входа из package.json
const p3 = require('./Package1/.'); // прочитает точку входа из package.json
const m1 = require('./Package1/main'); // лучше указать расширение
const m2 = require('./Package1/main.js'); // хороший импорт
const u1 = require('./Package1/utils');// лучше указать расширение
const u2 = require('./Package1/utils.js');// хороший импорт
const j1 = require('./Package1/package');// лучше указать расширение
const j2 = require('./Package1/package.json');// хороший импорт

console.log({ p1, p2, p3, m1, m2, u1, u2, j1, j2 });
