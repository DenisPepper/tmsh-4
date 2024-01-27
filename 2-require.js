'use strict';

const fs = require('node:fs');
const events = require('node:events');
const timers1 = require('node:timers');
const timers2 = require('node:timers/promises');
const exp = require('./1-exports.js');

console.log(Object.keys(fs));
console.log(Object.keys(events));
console.log(Object.keys(timers1));
console.log(Object.keys(timers2));
console.log(Object.keys(exp));
