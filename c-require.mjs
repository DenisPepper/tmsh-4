import { createRequire } from 'node:module';
console.log({ 'import.meta': import.meta });

// получает функцию require в ESM модуле, чтобы была возможность обращатся к кэшу require
// у import есть метаданные meta, в т.ч. url - путь к текущему модулю
const require = createRequire(import.meta.url);

// использует функционал require в ESM модуле
const fs = require('node:fs');
console.log(Object.keys(fs));

console.log({ require });
