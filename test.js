'use strict';

const sysOfNum = require('./src/main');
const son = sysOfNum.create();

let testNum = 199999999999;

let test = (num) => {
    console.log('System: ', son.getSystem());
    console.log('Symbols: ', son.getSymbols().join(''));
    num = num || Date.now();
    console.log('Num: %s', num);
    let encoded = son.encode(num);
    console.log('Encoded: %s', encoded);
    let decoded = son.decode(encoded);
    console.log('Decoded: %s', decoded);
};

console.log('Run tests');

console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----');

console.log('Base settings');

test();

console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----');

console.log('Change system to "x52" and run test with num %s', testNum);

son.setSymbols('x52');
test(testNum);

console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----');

console.log('Change system to "x52revert" and run test with num %s', testNum);

son.setSymbols('x52revert');
test(testNum);

console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----');

let mySweetSymbols = ['@', '#', '$', '%', '&', ':', ';', '_', '<', '>', '?', '!', '^', '~', ',', '.', '=', '-', '+', '*', '/', '\\', '`', '"'];

console.log('Set clients symbols set:');
console.log('x%s: %s', mySweetSymbols.length, mySweetSymbols.join(''));
console.log('... and run test with num %s', testNum);

son.setSymbols(mySweetSymbols);
test(testNum);

console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----');

console.log('Now i want get is very short string and i create symbols set like join of my set and x62');
console.log('... and run test with num %s', testNum);

son.setSymbols([].concat(son.getSymbolsSetByName('x62'), mySweetSymbols));
test(testNum);

console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----');

console.log('That\'s all, guys');