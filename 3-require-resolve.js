'use strict';

// обычный импорт - объект с экспортируемыми ключами
const exp = require('./1-exports');

// получит абсолютный путь к модулю
const expPath = require.resolve('./1-exports');

// получит из кэша объект с расширенным составом ключей
const expModule = require.cache[expPath];

console.log({ exp, expPath, expModule });
