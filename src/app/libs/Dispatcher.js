export default class Dispatcher{
    /**
     * @constructor
     * @this {Dispatcher}
     */
    constructor(debug =  false) {
        this._isDebugging = debug;
        this.stores = {};
        this._log('Initializing the Dispatcher');
    }

    /**
     * Dispatches an Action to all the stores
     *
     * @param {Action} action The action to dispatch to all the stores
     * @param {object} args optional data to be passed to the action's callback
     */
    dispatch(actionType, ...args) {
        if (actionType === undefined) {
            throw 'Dispatcher.dispatch: action is undefined';
        }
        if (typeof actionType !== 'string') {
            throw 'Dispatcher.dispatch: actions can only be typeof string';
        }
        for (let store in this.stores) {
            if (actionType in this.stores[store].actions) {
                this._log(`Dispatching Action: [${actionType}] to store [${store}]`);
                this.stores[store].onAction(actionType, ...args);
            }
        }
    }

    /**
     * Registers a new Store with the Dispatcher
     *
     * @param {Store} store The store object
     */
    register(store) {
        let name = store.name;
        if (name in this.stores) {
            this._log(`[${name}] is already registered in the Dispatcher`);
        } else {
            this.stores[name] = store;
            this._log(`[${name}] registered in the Dispatcher`);
        }
    }

    /**
     * Unregisters a named store from the Dispatcher
     *
     * @param {string} name The name of the store
     */
    unregister(name) {
        if (name in this.stores) {
            this._log(`Store [${name}] unregistered`);
            delete this.stores[name];
        } else {
            this._log(`Store [${name}] is not registered`);
        }
    }

    /**
     * Gets a store that is registered with the Dispatcher
     *
     * @param {string} name The name of the store
     * @returns {Store} store The store object
     * @throws 'Invalid Store' if the store does not exist
     */
    getStore(name) {
        if (name in this.stores) {
            return this.stores[name];
        } else {
            throw 'Dispatcher.getStore: Invalid Store';
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
}
