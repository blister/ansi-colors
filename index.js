// Simple implementation of console colors based on
// ANSI codes - https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797

/*
Usage:
	let name = 'Eric';
	console.log(
		name.fg('green').bg('cyan').clearAll()
	);
*/
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

const RFG_COLORS = ['31', '33', '32', '36', '34', '35'];
const RBG_COLORS = ['41', '43', '42', '46', '44', '45'];

(function() {
	String.prototype.clearAll = function() {
		// \u001b[0m
		return `${this}\u001b[0m`;
	};

	// normal fg
	String.prototype.fg = function(color, bright = false) {
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

	// currently assuming no \ for escape chars
    // rainbow fg text
    String.prototype.rfg = function () {
        let fgs = '';
        let ic = 0;

        for (let i = 0; i < this.length; i++) {
            if (this[i] === ' ') {
                fgs += ' ';
            } else {
                fgs += `\u001b[${RFG_COLORS[ic]}m${this[i]}`;
                ic++;
            }

            if (ic === RFG_COLORS.length) {
                ic = 0;
            }
        }

        return `\u001b[0m${fgs}\u001b[0m`;
    }

    // currently assuming no \ for escape chars
    // rainbow background
    String.prototype.rbg = function () {
        let bic = 0;
        let bgs = '\u001b[30m';//start with text black

        for (let i = 0; i < this.length; i++) {
            if (this[i] === ' ') {
                bgs += ' ';
            } else {
                bgs += `\u001b[${RBG_COLORS[bic]}m${this[i]}`;
                bic++;
            }

            if (bic === RBG_COLORS.length) {
                bic = 0;
            }
        }

        return `\u001b[0m${bgs}\u001b[0m`;
    };
})();