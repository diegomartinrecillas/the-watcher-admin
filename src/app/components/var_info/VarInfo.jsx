import VariableActions from 'app/actions/VariableActions';
import VariableStore from 'app/stores/VariableStore';
import DeviceActions from 'app/actions/DeviceActions';
import DeviceStore from 'app/stores/DeviceStore';
// React
import React from 'react';
// React Router
import { hashHistory } from 'react-router'
// Material UI Components
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
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
        textAlign: 'center',
        marginBottom: '5%'
    },
    devicesContainer: {},
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

export default class VarInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            description: '',
            devices: []
        }
    }

    componentDidMount() {
        VariableStore.subscribe(this._onChange);
        VariableActions.dispatch('getVariable', this.props.params.varKey);
        DeviceStore.subscribe(this._onChange);
        DeviceActions.dispatch('resetSelectedDevice');    
        DeviceActions.dispatch('getAllDevices', this.props.params.varKey);
    }

    componentWillUnmount() {
        VariableStore.unsubscribe(this._onChange);
        DeviceStore.unsubscribe(this._onChange);
    }

    _onChange = () => {
        this.setState({
            name: VariableStore.state.selectedVariable.name,
            key: VariableStore.state.selectedVariable.key,
            description: VariableStore.state.selectedVariable.description,
            devices: DeviceStore.state.allDevices
        })
    }
    handleInfo = (target) => {
        hashHistory.push(`/app/devices/${target}`)
    }

    handleAddDevice = () => {
        let target = this.props.params.varKey;
        hashHistory.push(`/app/addDevice/${target}`);
    }

    render() {
        return (
            <div>
                <div style={styles.mainContainer}>
                    <div style={styles.innerContainer}>
                        <Subtitle text="Variable"/>
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
                                        Variable Key
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
                            </Card>
                        </div>
                        <Subtitle text="Dispositivos"/>
                        <div style={styles.devicesContainer}>
                            <Card>
                                <List style={{textAlign: 'left'}}>
                                    {this.state.devices.map((device) => (
                                        <div key={device.key}>
                                            <ListItem
                                                primaryText={device.name}
                                                rightIcon={<Info />}
                                                onClick={() => this.handleInfo(device.key)}/>
                                        </div>
                                    ))}
                                </List>
                            </Card>
                        </div>
                        <RaisedButton
                            label="Agregar dispositivo"
                            primary={true}
                            style={styles.button}
                            onClick={this.handleAddDevice}
                            />
                    </div>
                </div>
            </div>
        );
    }
}
