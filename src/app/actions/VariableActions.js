import { createActions }  from 'app/libs/Actions';

const DEBUG = false;

const VariableActions = createActions([
    'addNewVariable',
    'resetAddVar',
    'getAllVariables',
    'getVariable'
], DEBUG);

export default VariableActions;
