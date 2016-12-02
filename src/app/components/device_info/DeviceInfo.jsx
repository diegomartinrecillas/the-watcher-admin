import DeviceActions from 'app/actions/DeviceActions';
import DeviceStore from 'app/stores/DeviceStore';
// React
import React from 'react';
// Material UI Components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Info from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Card from 'material-ui/Card';
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
    dataContainer: {
        textAlign: 'center'
    },
    devicesContainer: {
        marginTop: '5%'
    },
    button: {
        margin: 12,
        width: 190,
        height: 50
    },
    alignment: {
        textAlign: 'left'
    },
    title: {
        fontSize: 12,
        fontWeight: 400,
        color: primary
    },
    legend: {
        color: 'grey',
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        textAlign: 'justify'
    },
    entry: {
        color: 'black',
        paddingRight: '0.3em',
        overflowWrap: 'normal'
    },
}

export default class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            name: '',
            key: '',
            description: '',
            zone: ''
        }
    }

    componentDidMount() {
        DeviceStore.subscribe(this._onChange);
        DeviceActions.dispatch('getDevice', this.props.params.deviceKey);
    }

    componentWillUnmount() {
        DeviceStore.unsubscribe(this._onChange);
    }

    _onChange = () => {
        this.setState({
            name: DeviceStore.state.selectedDevice.name,
            key: DeviceStore.state.selectedDevice.key,
            description: DeviceStore.state.selectedDevice.description,
            zone: DeviceStore.state.selectedDevice.zone
        })
    }

    handleDeleteDevice = () => {
        DeviceActions.dispatch('deleteDevice');
    }

    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true
        });
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancelear"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDialogClose}
                />,
            <FlatButton
                label="Borrar"
                secondary={true}
                onTouchTap={this.handleDeleteDevice}
                />,
        ];
        const dialogText = `¿Estas seguro de que quieres borrar el dispositivo "${this.state.name}"?`;
        return (
            <div>
                <Dialog
                    title="Borrar Dispositivo"
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleDialogClose}
                    >
                    {dialogText}
                </Dialog>
                <div style={styles.mainContainer}>
                    <div style={styles.innerContainer}>
                        <Subtitle text="Dispositivo"/>
                        <div style={styles.dataContainer}>
                            <Card style={styles.alignment}>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Nombre
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.name}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Device Key
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.key}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Descripción
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.description}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Zona
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.zone}
                                    </span>
                                </section>
                            </Card>
                        </div>
                        <RaisedButton
                            label="Borrar dispositivo"
                            secondary={true}
                            style={styles.button}
                            onClick={this.handleDialogOpen}
                            />
                    </div>
                </div>
            </div>
        );
    }
}
