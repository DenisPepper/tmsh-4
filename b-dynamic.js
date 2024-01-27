'use strict';

const promise = import('node:events'); // динамический импорт через промис в Common JS module
promise.then((events) => {
    console.log({ defaultMaxListeneres: events.defaultMaxListeners });
  });

  // также доступен импорт через await, только внутри async функции
