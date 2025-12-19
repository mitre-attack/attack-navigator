// utils.ts
import { detect } from 'detect-browser';

let comparatorFn = {
    '<': function (a, b) {
        return a < b;
    },
    '<=': function (a, b) {
        return a <= b;
    },
    '>': function (a, b) {
        return a > b;
    },
    '>=': function (a, b) {
        return a >= b;
    },
};

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

export function isNumber(value: any): boolean {
    return typeof value === 'number';
}

export function isIE(): boolean {
    const browser = detect();
    return browser.name == 'ie';
}

export function isSafari(compRange): boolean {
    function compare(version, comp) {
        let str = comp + '';
        let n = +(/\d+/.exec(str) || NaN);
        let op = /^[<>]=?/.exec(str)[0];
        return comparatorFn[op] ? comparatorFn[op](version, n) : version == n || Number.isNaN(n);
    }

    const browser = detect();
    return browser.name == 'safari' && compare(browser.version.split('.')[0], compRange);
}
