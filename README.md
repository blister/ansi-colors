# ansi-colors
Simple JS library to extend String.prototype to add ANSI Terminal Color support.

# Installation
```console
$ npm install https://github.com/blister/ansi-colors
```

# Usage
```js
require('ansi-colors');

let coloredString = 'blister'.fg('green', 'bright').bg('blue').clearAll();
console.log(coloredString);

console.log(
	`${'colors'.fg('yellow').bg('red').clearAll()} ${'are'.fg('blue').bg('cyan').clearAll()} fun!`
);
```
