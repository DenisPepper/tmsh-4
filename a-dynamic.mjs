const promise = import('node:events'); // динамический импорт через промис в ESM module
console.log({ promise });

promise.then((events) => {
  console.log({ defaultMaxListeneres: events.defaultMaxListeners });
});

const events = await import('node:events'); // динамический импорт через top level await (только в ESM)
console.log({ defaultMaxListeneres: events.defaultMaxListeners });
