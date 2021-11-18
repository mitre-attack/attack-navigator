// utilities for working with browser cookies


/**
 * Set a cookie
 * @param  {string} key            key to set under
 * @param  {string} value          value to set under key
 * @param  {number} expirationDays when cookie expires in days
 */
 const setCookie = function(key: string, value: string, expirationDays: number) {
    let d = new Date();
    d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/;SameSite=Strict";
}

/**
 * Get the value of the cookie under the given key
 * @param  {string} key to retrieve from
 * @return {string}     cookie value
 */
const getCookie = function(key: string): string {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/**
 * Does a cookie exist under the given key?
 * @param  {string} key to check
 * @return {boolean}    true if cookie is stored under key, false otherwise
 */
const hasCookie = function(key: string): boolean {
    return getCookie(key) !== "";
}

/**
 * Delete the given cookie
 * @param {string} key to delete
 */
const deleteCookie = function(key: string) {
  document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Strict';
}

export {setCookie, getCookie, hasCookie, deleteCookie};
