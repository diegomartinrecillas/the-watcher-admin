import EventEmitter from 'events';
import { ACTION_DISPATCH_EVENT } from './Constants';

class Action extends EventEmitter{
    /**
    * @constructor
    * @this {action}
    * @param {string} name - The name of the action
    * @param {boolean} debug - Set the state of the debugger
    */
    constructor(name, debug = false) {
        if (name == null || name == undefined) {
            throw `Action.constructor: Actions must be named`;
        }
        super();
        // Set debug flag for the logger
        this._isDebugging = debug;
        // Action private propertires
        this._actionName = name;
        this._log(`ACTION [${this._actionName}]: Initializing new Action instance`);
    }

    /**
    * Default dispatch that tells all the listening Stores that the Action is taking place.
    * @param {object} data - The data to be passed to every listening Store.
    */
    dispatch(data) {
        if (data) {
            this._log(`ACTION [${this.name}]: Dispatching with data:${JSON.stringify(data)}`);
        } else {
            this._log(`ACTION [${this.name}]: Dispatching with no data`);
        }
        this.emmitDispatch(data);
    }

    /**
    * Emmits a dispatch event to all sunscribed components.
    * @param {object} data - The data to be passed to every listening Store.
    */
    emmitDispatch(data) {
        this.emit(ACTION_DISPATCH_EVENT, data);
    }

    /**
    * Action name getter.
    * @return {string} - The Store's name.
    */
    get name() {
        return this._actionName;
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

const createActions = (arr, DEBUG = false) => {
    let actions = {};
    for (let item of arr) {
        actions[item] = new Action(item, DEBUG);
    }
    return actions;
}

// Exports
export { Action };
export { createActions };
