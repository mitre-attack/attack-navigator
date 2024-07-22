// utils.ts
let comparatorFn = {
	'<': function(a, b) { return a < b; },
	'<=': function(a, b) { return a <= b; },
	'>': function(a, b) { return a > b; },
	'>=': function(a, b) { return a >= b; }
};

export function isBoolean(value: any): boolean {
	return typeof value === 'boolean';
}

export function isNumber(value: any): boolean {
	return typeof value === 'number';
}

export function isIE(): boolean {
	let userAgent = (window.navigator && window.navigator.userAgent || '').toLowerCase();
	let match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
	return match !== null;
}

export function isSafari(compRange): boolean {
	function compare(version, comp) {
		let str = (comp + '');
		let n = +(str.match(/\d+/) || NaN);
		let op = str.match(/^[<>]=?|/)[0];
		return comparatorFn[op] ? comparatorFn[op](version, n) : (version == n || n !== n);
	}

	let userAgent = (window.navigator && window.navigator.userAgent || '').toLowerCase();
	var match = userAgent.match(/version\/(\d+).+?safari/);
	return match !== null && compare(match[1], compRange);
}
