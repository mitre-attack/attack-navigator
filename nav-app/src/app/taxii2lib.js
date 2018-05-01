/**
 * @file
 * A TAXII 2.0 Javascript client library.
 *
 * @see https://oasis-open.github.io/cti-documentation/
 *
 * @author R. Wathelet, September 2017.
 * @version 0.1
 */

/**
 * Provide asynchronous network communications to a TAXII 2.0 server.
 *
 */
export class TaxiiConnect {

    /**
     * provide network communication to a Taxii 2.0 server.
     * @param {String} url - the base url of the Taxii2 server, for example https://example.com/
     * @param {String} user - the user name required for authentication.
     * @param {String} password - the user password required for authentication.
     * @param {Integer} timeout - the connection timeout in millisec
     */
    constructor(url, user, password, timeout) {
        this.baseURL = TaxiiConnect.withoutLastSlash(url);
        this.user = user;
        this.password = password;
        this.hash = btoa(this.user + ":" + this.password);
        this.timeout = timeout ? timeout : 10000; // default timeout

        this.version = '2.0';

        // default headers configurations
        this.getConfig = {
            'method': 'get',
            'headers': new Headers({
                'Accept': 'application/vnd.oasis.taxii+json',
                'version': this.version,
                'Authorization': 'Basic ' + this.hash
            })
        };

        this.postConfig = {
            'method': 'post',
            'headers': new Headers({
                'Accept': 'application/vnd.oasis.taxii+json',
                'Content-Type': 'application/vnd.oasis.stix+json',
                'version': this.version,
                'Authorization': 'Basic ' + this.hash
            })
        };

        this.getStixConfig = {
            'method': 'get',
            'headers': new Headers({
                'Accept': 'application/vnd.oasis.stix+json',
                'version': this.version,
                'Authorization': 'Basic ' + this.hash
            })
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
    async asyncFetch(path, config, filter) {
        let fullPath = (filter === undefined) ? path : path + "?" + TaxiiConnect.asQueryString(filter);
        return await (await (
            this.fetchTimeout(fullPath, config, this.timeout, 'connection timeout')
                .then(res => res.json())
                .catch(err => { throw new Error("fetch error: " + err); } ) ));
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
    async fetchThis(path, options, filter, config) {
        let conf = config === undefined ? this.getConfig : config;
        if (!options.flag) {
            options.cache = await (this.asyncFetch(path, conf, filter));
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
        return (url.substr(-1) === '/') ? url.substr(0, url.length - 1) : url;
    }

    /**
     * return the url with a terminating slash.
     * @param {String} url - the URL string to process.
     * @returns {String} the url with a terminating slash.
     */
    static withLastSlash(url) {
        return (url.substr(-1) === '/') ? url : url + "/";
    }

    /**
     * convert a filter object into a query string.
     * @param {Object} filter - the filter object to process.
     * @returns {String} the query string corresponding to the filter object.
     */
    static asQueryString(filter) {
        return Object.keys(filter).map(k => {
            let value = (k === "added_after") ? k : "match[" + k + "]";
            return encodeURIComponent(value) + '=' + encodeURIComponent(filter[k]);
        }).join('&');
    }
}

/**
 * Server encapsulates a discovery and api roots endpoints.
 */
export class Server {

    /**
     * A TAXII Server endpoint representation.
     * @param {String} path - the path to the server discovery endpoint, for example "/taxii/"
     * @param {TaxiiConnect} conn - a TaxiiConnection instance providing network communications.
     */
    constructor(path, conn) {
        this.path = TaxiiConnect.withLastSlash(path);
        this.conn = conn;
        // cache represents the cached results and flag determines if it needs a re-fetch
        this.disOptions = {"cache": {}, "flag": false};
        this.apiOptions = {"cache": [], "flag": false};
    }

    /**
     * determine if the obj is empty, {}
     * @param {Object} obj - the object to test
     * @returns {Boolean} - true if empty else false
     */
    static isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    /**
     * reset the internal options flags so that the next method call of this class will
     * send a request to the server rather than retreive the results from cache.
     */
    invalidate() {
        this.disOptions.flag = false;
        this.apiOptions.flag = false;
    }

    /**
     * retrieve the information about a TAXII Server and the list of API Roots.
     * @returns {Promise} the server discovery information object.
     */
    async discovery() {
        return this.conn.fetchThis(this.conn.baseURL + this.path, this.disOptions);
    }

    /**
     * retrieve the api roots information objects.
     * Note: unreachable roots are not part of the results.
     *
     * API Roots are logical groupings of TAXII Channels, Collections, and related functionality.
     * Each API Root contains a set of Endpoints that a TAXII Client contacts in order to interact with the TAXII Server.
     * This returns the api roots information objects from the string urls.
     * @returns {Promise} the Array of api roots information objects
     */
    async api_roots() {
        return this.discovery().then(discovery => this._getApiRoots(discovery));
    }

    /**
     * retrieve a map of key=the api root url and value=the api root object.
     *
     * API Roots are logical groupings of TAXII Channels, Collections, and related functionality.
     * Each API Root contains a set of Endpoints that a TAXII Client contacts in order to interact with the TAXII Server.
     * @returns {Promise} a Map of key=the url and value=the api root object.
     */
    async api_rootsMap() {
        var apiRootMap = new Map();
        await this.discovery().then(discovery => this._getApiRoots(discovery, apiRootMap));
        return apiRootMap;
    }

    /**
     * private function to retrieve the api roots
     * @param {discovery} discovery - a discovery object
     * @param {Map} apiRootMap - a map of key=url, value=api root object
     * @returns {Promise} the Array of api roots information objects
     */
    async _getApiRoots(discovery, apiRootMap) {
        if (!this.apiOptions.flag) {
            // clear the cache
            this.apiOptions.cache = [];
            // fetch all the api_roots in parallel
            await Promise.all(discovery.api_roots.map(async url => {
                let apiroot = await this.conn.asyncFetch(url, this.conn.getConfig);
                // add to the map
                if (apiRootMap !== undefined) {
                    apiRootMap.set(url, apiroot);
                }
                // add to the array of results
                this.apiOptions.cache.push(apiroot);
            }));
            // remove the undefined and empty elements, that is those we could not connect to.
            this.apiOptions.cache = this.apiOptions.cache.filter(element => (element !== undefined && !Server.isEmpty(element)));
            this.apiOptions.flag = true;
        }
        return this.apiOptions.cache;
    }

}

/**
 * Collections resource endpoint.
 * A TAXII Collections is an interface to a logical repository of CTI objects
 * provided by a TAXII Server and is used by TAXII Clients to send information
 * to the TAXII Server or request information from the TAXII Server.
 * A TAXII Server can host multiple Collections per API Root, and Collections
 * are used to exchange information in a request–response manner.
 */
export class Collections {

    /**
     * A TAXII Collections for a specific api root path.
     * The collections resource is a simple wrapper around a list of collection resources.
     * @param {String} api_root_path - the full path to the desired api root endpoint
     * @param {TaxiiConnection} conn a TaxiiConnection class instance.
     */
    constructor(api_root_path, conn) {
        this.api_root_path = TaxiiConnect.withLastSlash(api_root_path);
        this.conn = conn;
        // cache represents the cached results and flag determines if it needs a re-fetch
        this.options = {"cache": {}, "flag": false};
    }

    /**
     * reset the internal options flags so that the next method call of this class will
     * send a request to the server rather than retreive the results from cache.
     */
    invalidate() {
        this.options.flag = false;
    }

    /**
     * provide information about a specific Collection hosted under this API Root.
     *
     * @param {Integer} index - the index of the desired collection object.
     * @returns {Object} a specific collection object.
     */
    async get(index) {
        if (Number.isInteger(index) && index >= 0) {
            // return a specific collection info
            if (!this.collectionsFlag) {
                return this.collections().then(cols => {
                    if (index < this.options.cache.collections.length) {
                        return this.options.cache.collections[index];
                    } else {
                        console.log("----> in Collections get(index) invalid index value: " + index);
                    }
                });
            } else {
                if (index < this.options.cache.collections.length) {
                    return this.options.cache.collections[index];
                } else {
                    console.log("----> in Collections get(index) invalid index value: " + index);
                }
            }
        } else {
            console.log("----> in Collections get(index) invalid index value: " + index);
        }
    }

    /**
     * provide information about the Collections hosted under this API Root.
     *
     * @param {String} range - a pagination range string, for example "0-10"
     * @returns {Array} an array of collection objects
     */
    async collections(range) {
        var theConfig = this.conn.getConfig;
        if (range !== undefined) {
            theConfig = {
                'method': 'get',
                'headers': new Headers({
                    'Accept': 'application/vnd.oasis.taxii+json',
                    'version': this.conn.version,
                    'Authorization': 'Basic ' + this.hash,
                    'Range': 'items=' + range
                })
            };
        }
        // return a list of collection info
        await this.conn.fetchThis(this.api_root_path + "collections/", this.options, "", theConfig);
        return this.options.cache.collections;
    }

}

/**
 * A Collection resource endpoint.
 */
export class Collection {

    /**
     * Collection resource endpoint.
     * @param {Collection} collectionInfo - the collection object of this endpoint.
     * @param {String} api_root_path - the full path to the desired api root endpoint.
     * @param {TaxiiConnection} conn - a TaxiiConnection class instance.
     */
    constructor(collectionInfo, api_root_path, conn) {
        this.collectionInfo = collectionInfo;
        this.api_root_path = TaxiiConnect.withLastSlash(api_root_path);
        this.conn = conn;
        // construct the path
        this.path = this.api_root_path + "collections/" + collectionInfo.id + "/";
        // cache represents the cached results and flag determines if it needs a re-fetch
        this.colOptions = {"cache": {}, "flag": false};
        this.objsOptions = {"cache": {}, "flag": false};
        this.objOptions = {"cache": {}, "flag": false};
        this.manOptions = {"cache": {}, "flag": false};
    }

    /**
     * reset the internal options flags so that the next method call of this class will
     * send a request to the server rather than retreive the results from cache.
     */
    invalidate() {
        this.colOptions.flag = false;
        this.objsOptions.flag = false;
        this.objOptions.flag = false;
        this.manOptions.flag = false;
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
            console.log("this collection does not allow reading: \n" + JSON.stringify(this.collectionInfo));
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
            console.log("this collection does not allow writing: \n" + JSON.stringify(this.collectionInfo));
        }
    }

    /**
     * retrieve this Collection object.
     * @returns {Promise} the Collection object
     */
    async get() {
        return this.ifCanRead(this.conn.fetchThis(this.path, this.colOptions));
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
        var theConfig = this.conn.getStixConfig;
        if (range !== undefined) {
            theConfig = {
                'method': 'get',
                'headers': new Headers({
                    'Accept': 'application/vnd.oasis.stix+json',
                    'version': this.conn.version,
                    'Authorization': 'Basic ' + this.hash,
                    'Range': 'items=' + range
                })
            };
        }
        return this.ifCanRead(this.conn.fetchThis(this.path + "objects/", this.objsOptions, filter, theConfig));
    }

    /**
     * retrieve a specific STIX-2 object from this collection objects bundle.
     *
     * @param {String} obj_id - the STIX-2 object id to retrieve
     * @param {Object} filter - the filter object describing the filtering requested, this is added to the path as a query string.
     * For example: {"version": "2016-01-01T01:01:01.000Z"}
     */
    async getObject(obj_id, filter) {
        return await (await (this.ifCanRead(this.conn.fetchThis(this.path + "objects/" + obj_id + "/", this.objOptions, filter, this.conn.getStixConfig)
        .then(bundle => bundle.objects.find(obj => obj.id === obj_id) ))));
    }

    /**
     * add a STIX-2 bundle object to this Collection objects.
     * @param {Bundle} bundle - the STIX-2 bundle object to add
     * @return {Status} a status object
     */
    async addObject(bundle) {
        return this.ifCanWrite(this.conn.asyncFetch(this.path + "objects/", this.conn.postConfig));
    }

    /**
     * retrieve all manifests about objects from this Collection.
     * Manifests are metadata about the objects.
     *
     * @param {Object} filter - the filter object describing the filtering requested, this is added to the path as a query string.
     * @param {String} range - a pagination range string, for example "0-10"
     * @return {Array} an array of manifest entries object
     */
    async getManifests(filter, range) {
        var theConfig = this.conn.getConfig;
        if (range !== undefined) {
            theConfig = {
                'method': 'get',
                'headers': new Headers({
                    'Accept': 'application/vnd.oasis.taxii+json',
                    'version': this.conn.version,
                    'Authorization': 'Basic ' + this.hash,
                    'Range': 'items=' + range
                })
            };
        }
        this.ifCanRead(await this.conn.fetchThis(this.path + "manifest/", this.manOptions, filter, theConfig));
        return this.manOptions.cache.objects;
    }

    /**
     * retrieve the manifest about a specific object (obj_id) from this Collection.
     * Manifests are metadata about the objects.
     *
     * @param {String} obj_id - the STIX-2 object id of the manifest to retrieve.
     * @param {Object} filter - the filter object describing the filtering requested, this is added to the path as a query string.
     * @return {Object} a manifest entry of the desired STIX-2 object.
     */
    async getManifest(obj_id, filter) {
        return await (this.getManifests(filter).then(objects => objects.find(obj => obj.id === obj_id)));
    }

}

/**
 * This Endpoint provides information about the status of a previous request.
 * In TAXII 2.0, the only request that can be monitored is one to add objects to a Collection.
 */
export class Status {

    /**
     * provide information about the status of a previous request.
     * @param {String} api_root_path - the full path to the desired api root
     * @param {String} status_id - the identifier of the status message being requested, for STIX objects, their id.
     * @param {TaxiiConnection} conn - a TaxiiConnection class instance.
     */
    constructor(api_root_path, status_id, conn) {
        this.api_root_path = TaxiiConnect.withLastSlash(api_root_path);
        this.status_id = status_id;
        this.conn = conn;
        this.path = this.api_root_path + "status/" + status_id + "/";
    }

    /**
     * retrieve the Status information about a request to add objects to a Collection.
     * @return {Promise} the status object
     */
    async get() {
        return this.conn.asyncFetch(this.path, this.conn.getConfig);
    }

}
