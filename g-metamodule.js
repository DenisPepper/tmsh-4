'use strict';

const fs = require('node:fs').promises;
const vm = require('node:vm');

const RUN_OPTIONS = { timeout: 5000, displayErrors: false };

/**
 * функция - загрузчик
 * @param filePath - путь к файлу (модулю)
 * @param sandbox - контекст (объект), который будет считаться глобальным внутри модуля
 */
const load = async (filePath, sandbox) => {
  // читает файл
  const src = await fs.readFile(filePath, 'utf8');
  // получит строковое представление модуля
  const code = `'use strict';\n${src}`;
  // получит исполняемый скрипт модуля
  const script = new vm.Script(code);
  // получит контекст для выполнения модуля
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  // выполнит скрипт и вернет результат самого последнего оператора, выполненного в скрипте
  // (https://nodejs.org/api/vm.html#scriptrunincontextcontextifiedobject-options:~:text=execution%2C%20but%20continue%20to%20work%20after%20that.%20Default%3A%20false.-,Returns%3A%20%3Cany%3E%20the%20result%20of%20the%20very%20last%20statement%20executed%20in%20the%20script.,-Runs%20the%20compiled%20code%20contained%20by%20the%20vm.Script%20object)
  const exports = script.runInContext(context, RUN_OPTIONS);
  return exports;
};

const main = async () => {
  const sandbox = { Map: class PseudoMap {} };
  const exported = await load('./h-example.mm', sandbox);
  console.log(exported);
};

// загрузит и выполнет содержимое файла h-example.mm
// в контексте, в котором будет переопределен стандартный класс Map - классом PseudoMap
main();
