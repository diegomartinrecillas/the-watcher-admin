import $ from 'jquery';
import Store from 'app/libs/Store';
import DeviceActions from 'app/actions/DeviceActions';
import {domain} from 'app/AppConstants';

const DeviceStore = new (class extends Store {
    constructor() {
        super('DEVICE_STORE');

        this.state = {
            allDevices: [],
            selectedDevice: null,
            isAddingDevice: false,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: '',
            deviceKey: ''
        }

        this.listenTo([
            { action: DeviceActions['getAllDevices'], callback: this.getAllDevices },
            { action: DeviceActions['getDevice'], callback: this.getDevice },
            { action: DeviceActions['addNewDevice'], callback: this.addNewDevice },
            { action: DeviceActions['resetAddDevice'], callback: this.resetAddDevice },
            { action: DeviceActions['resetSelectedDevice'], callback: this.resetSelectedDevice },
            { action: DeviceActions['deleteDevice'], callback: this.deleteDevice }
        ]);
    }

    getAllDevices = (key) => {
        $.ajax({
            method: "GET",
            url: `${domain}/devices/${key}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus, jqXHR) => {
                let devices = [];
                for (let object of data) {
                    let device = {};
                    device.key = object._id;
                    device.name = object.nombre;
                    device.zone = object.lugar;
                    device.description = object.descripcion;
                    device.timezone = object.timezoneOffset;
                    devices.push(device);
                }
                this.setState({
                    allDevices: devices
                })
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('Failure: ' + errorThrown);
            }
        });
    }

    getDevice = (key) => {
        this.setState({
            selectedDevice: this.state.allDevices.find((device) => device.key === key)
        })
    }

    resetSelectedDevice = () => {
        this.setState({
            allDevices: []
        });
    }

    addNewDevice = (data) => {
        let varKey = data.varKey;
        let deviceName = data.deviceName;
        let deviceDescription = data.deviceDescription;
        let deviceZone = data.deviceZone;

        let request = {
            'payload': {
                'variable_id': varKey,
                'nombre': deviceName,
                'lugar': deviceZone,
                'descripcion': deviceDescription
            }
        }
        // Request Launch State
        this.setState({
            isAddingDevice: true,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: '',
            deviceKey: ''
        });

        $.ajax({
            type: "POST",
            url: `${domain}/device`,
            data: JSON.stringify(request),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus, jqXHR) => {
                let deviceKey = data.payload.deviceKey;
                this.setState({
                    isAddingDevice: false,
                    isAddingDeviceSuccess: true,
                    isAddingDeviceError: false,
                    addingDeviceErrorMessage: '',
                    deviceKey: `Key: ${deviceKey}`
                });
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('Failure: ' + errorThrown);
                this.setState({
                    isAddingDevice: false,
                    isAddingDeviceSuccess: false,
                    isAddingDeviceError: true,
                    addingDeviceErrorMessage: 'Ocurrió un error, intenta más tarde',
                    deviceKey: ''
                });
            }
        });

    }

    deleteDevice = () => {
        console.log(`should delete ${this.state.selectedDevice.key}`);
    }

    resetAddDevice = () => {
        this.setState({
            isAddingDevice: false,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: '',
            deviceKey: ''
        });
    }
});

export default DeviceStore;