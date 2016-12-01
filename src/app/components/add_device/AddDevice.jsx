// React
import React from 'react';
// Flux
import linkState from 'app/utils/onChangeHandlerFactory';
import DeviceActions from 'app/actions/DeviceActions';
import DeviceStore from 'app/stores/DeviceStore';
// Material UI Components
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
// Components
import Subtitle from 'app/components/misc/Subtitle';
// Colors
import { primary, accent } from 'app/styles/colors';

const styles = {
    mainContainer: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '0%',
        textAlign: 'center'
    },
    innerContainer: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 600
    },
    buttonContainer: {
        textAlign: 'right'
    },
    button: {
        margin: 12,
        width: 150,
        height: 50
    },
    alignment: {
        textAlign: 'left'
    },
    legend: {
        color: 'grey',
        paddingTop: 0,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '2%',
        textAlign: 'justify'
    },
    underlineStyle: {
        borderColor: primary,
    },
    isAddingVar:{},
    addingVarErrorMessage: {},
    isAddingVarSuccess: {},
    deviceKey: {}
}

export default class AddDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            selectValue: null,
            deviceName: '',
            deviceDescription: '',
            deviceZone: '',
            isAddingDevice: false,
            isAddingDeviceSuccess: false,
            isAddingDeviceError: false,
            addingDeviceErrorMessage: ''
        }
    }

    componentDidMount() {
        DeviceStore.subscribe(this._onChange);
        DeviceActions.dispatch('resetAddDevice');
    }

    componentWillUnmount() {
        DeviceStore.unsubscribe(this._onChange);
    }

    _onChange = () => {
        this.setState({
            isAddingDevice: DeviceStore.state.isAddingDevice,
            isAddingDeviceError: DeviceStore.state.isAddingDeviceError,
            addingDeviceErrorMessage: DeviceStore.state.addingDeviceErrorMessage,
            isAddingDeviceSuccess: DeviceStore.state.isAddingDeviceSuccess,
            deviceKey: DeviceStore.state.deviceKey
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.deviceName !== '' &&
            this.state.deviceZone !== '' &&
            this.state.deviceDescription !== '') {

            let data = {};
            data.varKey = this.props.params.varKey;
            data.deviceName = this.state.deviceName;
            data.deviceDescription = this.state.deviceDescription;
            data.deviceZone = this.state.deviceZone;
            DeviceActions.dispatch('addNewDevice', data);
        } else {
            //alert('Por favor llena todos los campos');
        }

        return false;
    }

    handleSelect = (event, index, selectValue) => {
        this.setState({
            selectValue: selectValue
        });
    }

    render() {
        return (
            <div style={styles.mainContainer}>
                <div style={styles.innerContainer}>
                    <Subtitle text='Nuevo Dispositivo'/>
                    <form>
                        <div style={styles.dataContainer}>
                            <Card style={styles.alignment}>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Nombre"
                                        hintText="Nombre del dispositivo"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.deviceName}
                                        onChange={linkState(this,'deviceName')}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Descripción"
                                        hintText="Descripción del dispositivo"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.deviceDescription}
                                        onChange={linkState(this,'deviceDescription')}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Zona"
                                        hintText="Zona del dispositivo"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.deviceZone}
                                        onChange={linkState(this,'deviceZone')}/>
                                </section>
                            </Card>
                        </div>
                        {this.state.isAddingDevice &&
                            <section>
                                <p style={styles.isAddingDevice}>Espere un momento...</p>
                            </section>
                        }
                        {this.state.isAddingDeviceError &&
                            <section>
                                <p style={styles.addingDeviceErrorMessage}>{this.state.addingDeviceErrorMessage}</p>
                            </section>
                        }
                        {this.state.isAddingDeviceSuccess &&
                            <section>
                                <p style={styles.isAddingDeviceSuccess}>Nuevo dispositivo agregado con éxito</p>
                            </section>
                        }
                        {this.state.isAddingDeviceSuccess &&
                            <section>
                                <p style={styles.deviceKey}>{this.state.deviceKey}</p>
                            </section>
                        }
                        <RaisedButton
                            type="submit"
                            label="Agregar"
                            primary={true}
                            style={styles.button}
                            onClick={this.handleSubmit}
                            />
                    </form>
                </div>
            </div>
        );
    }
}
