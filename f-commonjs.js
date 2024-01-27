'use strict';
// Реализация кастомной системы загрузки модулейц

const fs = require('node:fs').promises;
const vm = require('node:vm');

const RUN_OPTIONS = { timeout: 5000, displayErrors: false };

const pseudoRequire = (name) => {
  console.log(`Intercepted require: ${name}`);
};

/**
 * функция - аналог require
 * @param filePath - путь к файлу (модулю)
 * @param sandbox - контекст (объект), который будет считаться глобальным внутри модуля
 */
const load = async (filePath, sandbox) => {
  // прочитает содержимое файла в переменную
  const src = await fs.readFile(filePath, 'utf8');
  // строковое представление стрелочной функции, которая выполняет код модуля из filePath
  const code = `(require, module, __filename, __dirname) => {\n${src}\n}`;
  /*
   Модуль node:vm позволяет компилировать и выполнять код в контексте виртуальной машины V8.
   Экземпляры класса vm.Script содержат предварительно скомпилированные сценарии, которые могут быть выполнены в определенных контекстах.
   https://nodejsdev.ru/api/vm/
  */
  // создаст экземпляр класса vm.Script
  const script = new vm.Script(code);
  // создаст контекст, в котором будет исполнена функция code,  предварительно скомпилированная в script
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  // получит ссылку на функцию в code, wrapper - можно будет запустить
  const wrapper = script.runInContext(context, RUN_OPTIONS);
  const module = {};
  // вызовет функцию из code, которая выполнит весь код из модуля из filePath,
  // внутри кода модуля объекту module будет присвоено свойство exports
  wrapper(pseudoRequire, module, filePath, __dirname);
  // вернет свойство exports, которое было присвоено при выполении кода модуля из filePath
  return module.exports;
};

const main = async () => {
  const sandbox = { Map: class PseudoMap {} };
  const exported = await load('./1-exports.js', sandbox);
  console.log(exported);
};

main();
