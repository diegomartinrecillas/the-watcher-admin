import { createActions }  from 'app/libs/Actions';

const DEBUG = false;

const VariableActions = createActions([
    'addNewVariable',
    'resetAddVar',
    'getAllVariables',
    'getVariable',
    'deleteVar'
], DEBUG);

export default VariableActions;
