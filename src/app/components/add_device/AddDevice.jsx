// React Router
import {hashHistory} from 'react-router';
// React
import React from 'react';
// Flux
import linkState from 'app/utils/onChangeHandlerFactory';
import DeviceActions from 'app/actions/DeviceActions';
import DeviceStore from 'app/stores/DeviceStore';
// Material UI Components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
            open: false,
            errorMessage: '',
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
            this.handleOpen('Por favor asegúrate de que todos los campos esten llenos.');
        }

        return false;
    }

    handleOpen = (error) => {
        this.setState({
            open: true,
            errorMessage: error
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            errorMessage: ''
        });
    }

    handleSelect = (event, index, selectValue) => {
        this.setState({
            selectValue: selectValue
        });
    }

    goBack = () => {
        hashHistory.push(`/app/home`);
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose}
                />
        ];
        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    {this.state.errorMessage}
                </Dialog>

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
                                            floatingLabelText="Lugar"
                                            hintText="Lugar donde se encuentra el dispositivo"
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
                            {!this.state.isAddingDeviceSuccess &&
                                <RaisedButton
                                    type="submit"
                                    label="Agregar"
                                    primary={true}
                                    style={styles.button}
                                    onClick={this.handleSubmit}
                                    />
                            }
                            {this.state.isAddingDeviceSuccess &&
                                <RaisedButton
                                    type="submit"
                                    label="Listo"
                                    primary={true}
                                    style={styles.button}
                                    onClick={this.goBack}
                                    />
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
