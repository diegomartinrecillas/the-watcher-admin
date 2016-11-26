import EventEmitter from 'events';

export default class Store extends EventEmitter{
    /**
    * @constructor
    * @this {Store}
    * @param {string} name The name of the store
    * @param {boolean} debug Set the state of the debugger
    */
    constructor(name, debug = false) {
        if (name == null || name == undefined) {
            throw `Store.constructor: Stores must be named`;
        }
        super();
        // Set debug flag for the logger
        this._isDebugging = debug;
        this._storeName = name;
        this._registeredComponents = {};
        this._storeData = {};

        this._actions = {};
        this.on('STORE_UPDATED', this._onUpdate.bind(this));

        this._log(`Initializing Store [${this._storeName}]`);
    }

    /**
    * Define the store data with a key-value pair object
    * @param {object} keys object with key-value pairs
    */
    defineStore(keys) {
        for (let key in keys) {
            if (typeof keys[key] !== 'function') {
                this._storeData[key] = keys[key];
            } else {
                throw `Store.defineStore: Stores can't be defined with functionality, they are only allowed to hold data`;
            }
        }
        this._log(`Store [${this.name}] defined with data=${JSON.stringify(this.storeData)}`);
    }

    /**
    * Bind the ActionTypes with their respective action
    * @param {object} actions object with action-callback pairs
    */
    bindActions(actions) {
        for (let action in actions) {
            this._actions[action] = actions[action];
        }

    }

    /**
    * Read-only Property for the name of the store
    */
    get isDebugging() {
        return this._isDebugging;
    }

    /**
    * Configure the logging process in the store
    * @param {bool} bool state of the logger
    */
    set isDebugging(isDebugging) {
        if (isDebugging) {
            this._isDebugging = isDebugging;
        }
    }

    /**
    * Read-only Property for the name of the store
    */
    get name() {
        return this._storeName;
    }

    /**
    * Read-only Property for the data of the store
    */
    get storeData() {
        return this._storeData;
    }

    /**
    * Read-only Property for the actions of the store
    */
    get actions() {
        return this._actions;
    }

    /**
    * Read-only Property for the registered Components of the store
    */
    get registeredComponents() {
        return this._registeredComponents;
    }

    /**
    * Set keys in the store to a new value
    *
    * @param {object} keys object with key-value pairs
    * @param {boolean} update set the key-values and immediately update the store
    * @throws exception if the key does not exist
    */
    set(keys, update = true) {
        // Iterate over all received key=value pairs
        for (let key in keys) {
            this._log(`Attempting to set key {${key}}=${JSON.stringify(keys[key])}`);
            // Check if key is defined in the Store
            if (key in this._storeData) {
                // Get the data type of the source and the target values
                let targetType = this._type(this._storeData[key]);
                let sourceType = this._type(keys[key]);
                // The received value is not a function
                if (sourceType === 'function') {
                    throw `Store.defineStore: Failed to set undefined value for key {${key}}. Keys can't be given functionality, they can only hold data.`
                } else
                // The received value is not undefined
                if (sourceType === 'undefined') {
                    // Thrown if the attempting to set a key to undefined
                    throw `Store.set: Failed to set undefined value for key {${key}}. Keys can't be given undefined values after they are defined.`;
                } else {
                    // Check if the value assigned to the key is undefined
                    if (targetType === 'undefined') {
                        console.warn(`Key {${key}} was initialized as undefined, it'll take the type of it's next assigned value.`);
                        this._storeData[key] = this._clone(keys[key]);
                    } else
                    // Check if the object was initialized as null
                    if (targetType === 'null') {
                        console.warn(`Key {${key}} was initialized as null, it'll take the type of it's next assigned value.`);
                        this._storeData[key] = this._clone(keys[key]);
                    } else
                    // Check if key is defined in the Store as an object
                    if (targetType === 'object') {
                        // Get the object class
                        let targetName = this._storeData[key].constructor.name;
                        let sourceName = keys[key].constructor.name;
                        // Check if the stored object is generic
                        if (targetName === 'Object') {
                            // Recursive merge of objects
                            this._log(`Object for key {${key}} already exists, merging existing object ${JSON.stringify(this._storeData[key])} with new object ${JSON.stringify(keys[key])}`);
                            this._storeData[key] = this._merge(this._storeData[key], keys[key]);
                        } else
                        // Fallback type check for all object types
                        // WARNING: the object will be overwritten, won't attempt to merge!
                        if (targetName === sourceName) {
                            this._storeData[key] = this._clone(keys[key]);
                        }
                        // Fallback error for object types, usually means a wrong type assignment
                        else {
                            throw `Store.set: key {${key}} was defined as [${targetName}], not [${sourceName}].`;
                        }
                    } else
                    // Check if key is defined in the Store as an array
                    if (targetType === 'array') {
                        if (sourceType === 'array') {
                            this._storeData[key] = this._clone(this._storeData[key], keys[key]);
                        } else {
                            throw `Store.set: Trying to set a value of type [${sourceType}] to key {${key}} but it was defined as [${targetType}].`;
                        }
                    } else
                    // Check if key is defined in the Store as a primitive
                    if (targetType === 'number' || targetType === 'boolean' || targetType === 'string') {
                        // Check if the primitive is not null
                        if (sourceType !== 'null') {
                            if (targetType === 'number' && sourceType === 'number') {
                                this._storeData[key] = keys[key];
                            } else
                            if (targetType === 'boolean' && sourceType === 'boolean') {
                                this._storeData[key] = keys[key];
                            } else
                            if (targetType === 'string' && sourceType === 'string') {
                                this._storeData[key] = keys[key];
                            } else {
                                throw `Store.set: Trying to set a value of type [${sourceType}] to key {${key}} but it was defined as [${targetType}].`;
                            }
                        } else {
                            throw `Store.set: {${key}} is a primitive, can't set it's value to null`;
                        }
                    } else {
                        // Fallback error for type not found, usually means that for some reason the Store value became undefined
                        throw `Store.set: Unknown value type for key {${key}}.`;
                    }
                }
                this._log(`Successfully set key {${key}}=${JSON.stringify(this._storeData[key])}.`);
            } else {
                // Thrown if received key is not defined in the Store
                throw `Store.set: Unknown key {${key}} in store.`;
            }
        }
        if (update) {
            this.update();
        }
    }

    /**
    * Retrieve a key in the store
    *
    * @param {string} key the key name
    * @returns {object} the key value
    * @throws exception if the key does not exist
    */
    get(key) {
        if (key in this._storeData) {
            return this._clone(this._storeData[key]);
        } else {
            throw `Store.get: Unknown key {${key}} in store`;
        }
    }

    /**
    * Function triggered by the dispatcher
    * @param {string} actionType name of the action to be called
    * @param {object} args optional data to be passed to the action's callback
    */
    onAction(actionType, ...args) {
        this._log(`[${this.name}] received Action [${actionType}] with data=`, ...args);
        if (actionType in this._actions) {
            this._actions[actionType].apply(this, args);
        } else {
            this._log(`[${this.name}] is no registered for  actionType [${actionType}] - ignoring`);
        }

    }

    /**
    * A Component needs to be able to register itself with the store to receive
    * notifications of updates to the store
    *
    * @param {function} callback the method to call back
    * @param {boolean} notifyInstantly immediately notify the newly registered component to execute it's callback
    * @returns {string} an ID to be used when un-registering
    */
    register(callback, notifyInstantly = true) {
        let id = `${this._storeName}-${this._guid}`;
        this._log(`Registering new Component Callback and returning ID [${id}]`);
        this._registeredComponents[id] = callback;
        if (notifyInstantly) {
            this.notify(id);
        }
        return id;
    }

    /**
    * A Component also needs to be able to unregister itself with the store to
    * stop receiving notifications of updates to the store.
    *
    * @param {string} id the ID from the call to register()
    */
    unregister(id) {
        if (id in this._registeredComponents) {
            this._log(`Unregistering Component Callback with ID [${id}]`);
            delete this._registeredComponents[id];
        } else {
            throw 'Invalid Component Registration ID';
        }
    }

    /**
    * Emit a UPDATE_STORE event on the private Event Bus
    */
    update() {
        this._log(`Emitting [${this.name}] update Event`);
        this.emit('STORE_UPDATED');
    }

    /**
    * Executed when an UPDATE_STORE even is emmited on the private Event Bus
    */
    _onUpdate() {
        this.notifyAll();
    }

    /**
    * Notifies only the specified store by componentID
    * @param {string} componentID the unique component identifier
    */
    notify(componentID) {
        if (componentID in this._registeredComponents) {
            this._log(`Sending Store Update Event to Component Registration [${componentID}]`);
            this._registeredComponents[componentID]();
        } else {
            this._log(`No registered component such as [${componentID}]`);
        }
    }

    /**
    * Notifies every registered component in the store
    */
    notifyAll() {
        for (let componentID in this._registeredComponents) {
            this.notify(componentID);
        }
    }

    /**
    * Helper function function that logs based on this._isDebugging state
    * @param {string} log message to be logged
    */
    _log(log, ...args) {
        if (this._isDebugging) {
            console.debug(log, ...args);
        }
    }

    /**
    * Helper function that generates an RFC-4122 Version 4 compliant Unique ID.
    * @return {string} u the ID
    */
    get _guid() {
        let u = '', i = 0;
        while (i++ < 36) {
            let c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
            r = Math.random() * 16 | 0, v = (c === 'x' ? r : ( r & 0x3 | 0x8));
            u += (c === '-' || c === '4') ? c : v.toString(16);
        }
        return u;
    }

    /**
    * Helper function that finds the type of some data
    * @param {unknown} data data we want to finds it's type
    */
    _type (data) {
        return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    /**
    * Helper function used to clone an object
    * @param {object} obj the object to clone
    * @return {object} copy the cloned object
    */
    _clone(obj) {
        if (null == obj || "object" != typeof obj) {
            return obj;
        }
        let copy = obj.constructor();
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    }
    /**
    * Helper function that merge to objects
    * @param {object} target target object
    * @param {object} source source object, equally named attributes take preference
    * @return {object} merged the merged object
    */
    _merge(target, source, optionsArgument) {
        /**
        * The MIT License (MIT)
        * Copyright (c) 2012 Nicholas Fisher
        * Implementation of Nicholas Fisher deepmerge library for ES6
        */
        let deepmerge = (target, source, optionsArgument) => {
            let array = Array.isArray(source);
            let options = optionsArgument || { arrayMerge: defaultArrayMerge };
            let arrayMerge = options.arrayMerge || defaultArrayMerge;

            if (array) {
                target = target || [];
                return arrayMerge(target, source, optionsArgument);
            } else {
                return mergeObject(target, source, optionsArgument);
            }
        }

        let isMergeableObject = (val) => {
            let nonNullObject = val && typeof val === 'object';

            return nonNullObject
            && Object.prototype.toString.call(val) !== '[object RegExp]'
            && Object.prototype.toString.call(val) !== '[object Date]';
        }

        let defaultArrayMerge = (target, source, optionsArgument) => {
            let destination = target.slice()
            source.forEach((e, i) => {
                if (typeof destination[i] === 'undefined') {
                    destination[i] = e
                } else if (isMergeableObject(e)) {
                    destination[i] = deepmerge(target[i], e, optionsArgument)
                } else if (target.indexOf(e) === -1) {
                    destination.push(e)
                }
            })
            return destination;
            //return target.concat(source);
        }

        let mergeObject = (target, source, optionsArgument) => {
            let destination = {};
            if (isMergeableObject(target)) {
                Object.keys(target).forEach((key) => {
                    destination[key] = target[key];
                })
            }
            Object.keys(source).forEach((key) => {
                if (!isMergeableObject(source[key]) || !target[key]) {
                    destination[key] = source[key];
                } else {
                    destination[key] = deepmerge(target[key], source[key], optionsArgument);
                }
            })
            return destination;
        }

        return deepmerge(target, source, optionsArgument);

    }
}
