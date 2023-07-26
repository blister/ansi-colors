// Simple implementation of console colors based on
// ANSI codes - https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797

/*
Usage:
	let name = 'Eric';
	console.log(
		name.fg('green').bg('cyan').clearAll()
	);
*/
const tty = require('tty');
const IS_TTY = tty.isatty(process.stdout.fd);

const FG_COLORS = {
	'black': 30,
	'red': 31,
	'green': 32,
	'yellow': 33,
	'blue': 34,
	'magenta': 35,
	'cyan': 36,
	'white': 37,
	'default': 39,
	'reset': 0,
};

const BG_COLORS = {
	'black': 40,
	'red': 41,
	'green': 42,
	'yellow': 43,
	'blue': 44,
	'magenta': 45,
	'cyan': 46,
	'white': 47,
	'default': 49,
	'reset': 0,
};

(function() {
	String.prototype.clearAll = function() {
		// \u001b[0m
		if ( ! IS_TTY ) { return this.toString(); }
		return `${this}\u001b[0m`;
	};

	// normal fg
	String.prototype.fg = function(color, bright = false) {
		if ( ! IS_TTY ) { return this.toString(); }
		let colorCode = null;
		if ( color in FG_COLORS ) {
			colorCode = FG_COLORS[ color ];
		}
		if ( bright ) {
			colorCode += 60;
		}
		if ( colorCode ) {
			return `\u001b[1;${colorCode}m${this}`;
		}

		return this;
	};

	// background
	String.prototype.bg = function(color,bright = false) {
		if ( ! IS_TTY ) { return this.toString(); }
		let colorCode = null;
		if ( color in BG_COLORS ) {
			colorCode = BG_COLORS[ color ];
		}
		if ( bright ) {
			colorCode += 60;
		}

		if ( colorCode ) {
			return `\u001b[1;${colorCode}m${this}`;
		}

		return this;
	};
})();