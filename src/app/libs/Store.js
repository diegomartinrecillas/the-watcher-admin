import EventEmitter from 'events';
import _ from 'lodash';
import { STORE_CHANGE_EVENT, ACTION_DISPATCH_EVENT } from './Constants';

export default class Store extends EventEmitter{
    /**
    * @constructor
    * @this {Store}
    * @param {string} name - The name of the store
    * @param {boolean} debug - Set the state of the debugger
    */
    constructor(name, debug = false) {
        if (name == null || name == undefined) {
            throw `Store.constructor: Stores must be named`;
        }
        super();
        // Set debug flag for the debug logger
        this._isDebugging = debug;
        // Store private propertires
        this._storeName = name;
        this._storeState = {};
        // Debug logger
        this._log(`STORE [${this._storeName}]: Initializing new Store instance`);
    }

    /**
    * Starts listening to an Action's dispatch event and binds a callback to it.
    * @param {object} action - The Action we will listen to.
    * @param {callback} callback - The callback we will bind to the Action.
    */
    listenTo(action, callback) {
        action.on(ACTION_DISPATCH_EVENT, callback);
    }

    /**
    * Stops listening to an Action's dispatch event and unbinds a callback to it.
    * @param {object} action - The Action we will listen to.
    * @param {function} callback - The callback we will unbind to the Action.
    */
    unlistenTo(action, callback) {
        action.off(ACTION_DISPATCH_EVENT, callback);
    }

    /**
    * Subscribes a component to the Store.
    * @param {function} callback - The callback executed when the Store changes.
    */
    subscribe(callback) {
        this.addListener(STORE_CHANGE_EVENT, callback);
        this._log(`STORE [${this.name}]: a callback has subscribed`);
    }

    /**
    * Unsubscribes a component to the Store.
    * @param {function} callback - The callback executed when the Store changes.
    */
    unsubscribe(callback) {
        this.removeListener(STORE_CHANGE_EVENT, callback);
        this._log(`STORE [${this.name}]: a callback has unsubscribed`);
    }

    /**
    * Updates the Store's state and tells the Store to emmit a change event.
    * @param {object} state - State to be set into the store's state.
    */
    setState(state) {
        for (let key in state) {
            if (key in this._storeState) {
                this._storeState[key] = _.cloneDeep(state[key]);
            } else {
                throw `Store.setState: key ${key} not defined in STORE [${this.name}] state`
            }
        }
        this.emmitChange();
    }

    /**
    * Emmits a change event to all sunscribed components.
    */
    emmitChange() {
        // Debug logger
        this._log(`STORE [${this.name}]: has changed`);
        this.emit(STORE_CHANGE_EVENT);
    }

    /**
    * Store name getter.
    * @return {string} - The Store's name.
    */
    get name() {
        return this._storeName;
    }
    /**
    * Immutable Store's state getter.
    * @return {object} - A copy of the Store's state.
    */
    get state() {
        return _.cloneDeep(this._storeState);
    }
    /**
    * Immutable Store's state setter.
    * @param {object} state - State to be set.
    */
    set state(state) {
        this._storeState = _.cloneDeep(state);
    }

    /**
    * Helper function function that logs based on this._isDebugging state.
    * @param {string} log - Message to be logged.
    * @param {array} args - Any number of extra data passed to the logger.
    */
    _log(log, ...args) {
        if (this._isDebugging) {
            console.debug(log, ...args);
        }
    }
}
