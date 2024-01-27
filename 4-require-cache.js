'use strict';

// управление кэшем
// однажды загруженный модуль находится в кэше в виде синглтона, require - это получение ссылки на этот объект.
const exp = require('./1-exports');
const expPath = require.resolve('./1-exports');

console.log({ required: expPath });
console.log(require.cache[expPath]);

// можно удалить этот объект из памяти, чтобы у кого-то не было возможности его модифицировать
delete require.cache[expPath];

// тогда мы не увидим в кэше этого объекта
console.log({ cached: require.cache[expPath] });

// а при новом импорте ссылки будут не равны
const exp2 = require('./1-exports');
console.log(exp === exp2);
