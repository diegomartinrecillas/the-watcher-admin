import { createActions }  from 'app/libs/Actions';

const DEBUG = false;

const DeviceActions = createActions([
    'addNewDevice',
    'resetAddDevice',
    'resetSelectedDevice',
    'getAllDevices',
    'getDevice',
    'deleteDevice'
], DEBUG);

export default DeviceActions;
