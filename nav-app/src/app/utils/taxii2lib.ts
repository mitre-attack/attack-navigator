/**
 * @fileoverview
 * A TAXII 2.0 Javascript client library.
 * Converted to Typescript by Isabel Tuson 24 May 2018.
 * Added support for TAXII 2.1 by Charissa Miller 9 April 2024.
 *
 * @see https://github.com/workingDog/taxii2lib/
 * @see https://oasis-open.github.io/cti-documentation/
 *
 * @author R. Wathelet, September 2017
 * @modified by I. Tuson 24 May 2018
 * @modified by C. Miller 9 April 2024
 *
 * @version 0.3
 */

/**
 * Provide asynchronous network communications to a TAXII 2.0 or 2.1 server.
 */
export class TaxiiConnect {
    baseURL: string;
    user: string;
    password: string;
    hash: string;
    timeout: number;
    version: string;
    getConfig: any;
    getStixConfig: any;
    mediaType: string;

    /**
     * provide network communication to a Taxii 2.0 or 2.1 server.
     * @param {String} url - the base url of the Taxii2 server, for example https://example.com/
     * @param {String} user - the user name required for authentication.
     * @param {String} password - the user password required for authentication.
     * @param {Integer} timeout - the connection timeout in millisec
     */
    constructor(url, user, password, timeout = 10000) {
        this.baseURL = TaxiiConnect.withoutLastSlash(url);
        this.user = user;
        this.password = password;
        this.hash = btoa(this.user + ':' + this.password);
        this.timeout = timeout;

        this.version = '2.1';
        this.mediaType = `application/taxii+json;version=${this.version}`;
        // backwards compatibility for STIX 2.0
        if (url.includes('cti-taxii.mitre.org')) {
            this.version = '2.0';
            this.mediaType = 'application/vnd.oasis.stix+json';
        }

        // default headers configurations
        this.getConfig = {
            method: 'get',
            headers: new Headers({
                Accept: this.mediaType,
                version: this.version,
                Authorization: 'Basic ' + this.hash,
            }),
        };

        this.getStixConfig = {
            method: 'get',
            headers: new Headers({
                Accept: this.mediaType,
                version: this.version,
                Authorization: 'Basic ' + this.hash,
            }),
        };
    }

    // original code from: https://github.com/jkomyno/fetch-timeout
    timeoutPromise(promise, timeout, error) {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(error), timeout);
            promise.then(resolve, reject);
        });
    }
    // original code from: https://github.com/jkomyno/fetch-timeout
    fetchTimeout(url, options, timeout, error) {
        error = error || 'Timeout error';
        options = options || {};
        timeout = timeout || 10000;
        return this.timeoutPromise(fetch(url, options), timeout, error);
    }

    /**
     * send an async request (GET or POST) to the taxii2 server.
     *
     * @param {String} path - the full path to connect to.
     * @param {Object} config - the request configuration, see getConfig and postConfig for examples
     * @param {Object} filter - the filter object describing the filtering requested, this is added to the path as a query string
     * @returns {Promise} the server response in json.
     */
    async asyncFetch(path, config, filter?) {
        //CHANGED
        let fullPath = !filter ? path : path + '?' + TaxiiConnect.asQueryString(filter);
        return await this.fetchTimeout(fullPath, config, this.timeout, 'connection timeout')
            .then((res: Response) => res.json())
            .catch((err) => {
                throw new Error('fetch error: ' + err);
            });
    }

    /**
     * send a GET async request to the taxii2 server.
     *
     * The server response is assigned to the cache attribute of the options object, and
     * the options flag attribute is set to true if a server request was performed.
     * Otherwise if the options.flag is initially true, the cached response (options.cache) is returned and
     * no server request is performed.
     * To force a server request used invalidate(), for example: server.invalidate()
     *
     * @param {String} path - the path to connect to.
     * @param {Object} options - an option object of the form: { "cache": {}, "flag": false }
     * @param {Object} filter - the filter object describing the filtering requested, this is added to the path as a query string
     * @param {Object} config - the request configuration
     * @returns {Promise} the server response object
     */
    async fetchThis(path, options, filter?, config?) {
        //CHANGED
        let conf = config === undefined ? this.getConfig : config;
        if (!options.flag) {
            options.cache = await this.asyncFetch(path, conf, filter);
            options.flag = true;
        }
        return options.cache;
    }

    /**
     * return the url without the last slash.
     * @param {String} url - the URL string to process.
     * @returns {String} the url without the last slash.
     */
    static withoutLastSlash(url) {
        return url.substr(-1) === '/' ? url.substr(0, url.length - 1) : url;
    }

    /**
     * return the url with a terminating slash.
     * @param {String} url - the URL string to process.
     * @returns {String} the url with a terminating slash.
     */
    static withLastSlash(url) {
        return url.substr(-1) === '/' ? url : url + '/';
    }

    /**
     * convert a filter object into a query string.
     * @param {Object} filter - the filter object to process.
     * @returns {String} the query string corresponding to the filter object.
     */
    static asQueryString(filter) {
        return Object.keys(filter)
            .map((k) => {
                let value = k === 'added_after' ? k : 'match[' + k + ']';
                return encodeURIComponent(value) + '=' + encodeURIComponent(filter[k]);
            })
            .join('&');
    }
}

/**
 * A Collection resource endpoint.
 */
export class Collection {
    collectionInfo: any;
    api_root_path: string;
    conn: TaxiiConnect;
    path: string;
    colOptions: any;
    objsOptions: any;
    objOptions: any;
    manOptions: any;

    /**
     * Collection resource endpoint.
     * @param {CollectionInfoObject} collectionInfo - the collection object of this endpoint.
     * @param {String} api_root_path - the full path to the desired api root endpoint.
     * @param {TaxiiConnection} conn - a TaxiiConnection class instance.
     */
    constructor(collectionInfo, api_root_path, conn) {
        this.collectionInfo = collectionInfo;

        this.api_root_path = TaxiiConnect.withLastSlash(api_root_path + 'api/v21');
        // backwards compatibility for STIX 2.0
        if (api_root_path.includes('cti-taxii.mitre.org')) {
            // cont. support for stix 2.0
            this.api_root_path = TaxiiConnect.withLastSlash(api_root_path + 'stix');
        }
        this.conn = conn;
        // construct the path
        this.path = this.api_root_path + 'collections/' + collectionInfo.id + '/';
        // cache represents the cached results and flag determines if it needs a re-fetch
        this.colOptions = { cache: {}, flag: false };
        this.objsOptions = { cache: {}, flag: false };
        this.objOptions = { cache: {}, flag: false };
        this.manOptions = { cache: {}, flag: false };
    }

    /**
     * check that the collection allows reading, if true then return the function passed in
     * else log an error
     * @param {Function} func - the function to return if the collection allows reading it
     * @returns {Function} the function if this collection allow reading else undefined
     */
    ifCanRead(func) {
        if (this.collectionInfo.can_read) {
            return func;
        } else {
            console.log('this collection does not allow reading: \n' + JSON.stringify(this.collectionInfo));
        }
    }

    /**
     * check that the collection allows writing, if true then return the function passed in else log an error
     * @param {Function} func - the function to return if the collection allows writing it
     * @returns {Function} the function if this collection allow writing else undefined
     */
    ifCanWrite(func) {
        if (this.collectionInfo.can_write) {
            return func;
        } else {
            console.log('this collection does not allow writing: \n' + JSON.stringify(this.collectionInfo));
        }
    }

    /**
     * retrieve a STIX-2 bundle from this Collection.
     *
     * @param {Object} filter - the filter object describing the filtering requested, this is added to the path as a query string.
     * For example: {"added_after": "2016-02-01T00:00:01.000Z"}
     *              {"type": ["incident","ttp","actor"]}
     * @param {String} range - a pagination range string, for example "0-10"
     * @returns {Promise} the Bundle with the STIX-2 objects of this collection
     */
    async getObjects(filter, range) {
        let theConfig = this.conn.getStixConfig;
        if (range !== undefined) {
            theConfig = {
                method: 'get',
                headers: new Headers({
                    Accept: this.conn.mediaType,
                    version: this.conn.version,
                    Authorization: 'Basic ' + this.conn.hash, //CHANGED
                    Range: 'items=' + range,
                }),
            };
        }
        return this.ifCanRead(this.conn.fetchThis(this.path + 'objects/', this.objsOptions, filter, theConfig));
    }
}
