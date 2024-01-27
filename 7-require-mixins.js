'use strict';

// так делать не надо
// пример того, как можно модифицировать объект экспорта 

const fs = require('node:fs');

// получает исходный вариант reaFile
const { readFile } = fs;

// модифицирует readFile в объекте экспорта
fs.readFile = (...args) => {
  const path = args.shift();
  const callback = args.pop();
  const options = args.pop() || {};
  console.log(`Intercepted call: fs.readFile('${path}')`);
  
  // Использует оригинальный readFile внутри модифицированного
  return readFile(path, options, (err, data) => {
    if (err) console.error(err);
    else console.log(`Data received: ${data.length}`);
    callback(err, data);
  });
};

// этот вызов будет уже с модифицированным readFile
fs.readFile('./7-mixin.js', (err, data) => {
  console.log({ err, data });
});