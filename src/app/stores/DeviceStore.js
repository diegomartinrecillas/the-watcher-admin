import $ from 'jquery';
import Store from 'app/libs/Store';
import DeviceActions from 'app/actions/DeviceActions';

const DeviceStore = new (class extends Store {
    constructor() {
        super('DEVICE_STORE');

        this.state = {
            allDevices: [],
            selectedDevice: null,
            isAddingDevice: false,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: ''
        }

        this.listenTo(DeviceActions['getAllDevices'], this.getAllDevices);
        this.listenTo(DeviceActions['getDevice'], this.getDevice);
        this.listenTo(DeviceActions['addNewDevice'], this.addNewDevice);
        this.listenTo(DeviceActions['resetAddDevice'], this.resetAddDevice);
        this.listenTo(DeviceActions['resetSelectedDevice'], this.resetSelectedDevice);
    }

    getAllDevices = (key) => {
        $.ajax({
            method: "GET",
            url: `http://172.16.90.89:3000/devices/${key}`,
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
        console.log(request);
        // Request Launch State
        this.setState({
            isAddingDevice: true,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: ''
        });

        $.ajax({
            type: "POST",
            url: `http://172.16.90.89:3000/device`,
            data: JSON.stringify(request),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus, jqXHR) => {
                this.setState({
                    isAddingDevice: false,
                    isAddingDeviceSuccess: true,
                    isAddingDeviceError: false,
                    addingDeviceErrorMessage: ''
                });
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('Failure: ' + errorThrown);
                this.setState({
                    isAddingDevice: false,
                    isAddingDeviceSuccess: false,
                    isAddingDeviceError: true,
                    addingDeviceErrorMessage: 'Something happened'
                });
            }
        });

    }

    resetAddDevice = () => {
        this.setState({
            isAddingDevice: false,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: ''
        });
    }
});

export default DeviceStore;
