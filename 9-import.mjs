import { Simple, fn, collection } from './8-esm-export.mjs'; // импорт из ESM модуля
import m1 from './1-exports.js'; // импорт из CommonJS модуля

console.log({ Simple, collection, fn });
console.log(m1);
