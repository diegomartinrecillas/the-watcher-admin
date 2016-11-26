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
        width: 170,
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

const devices = [
    {
        name: 'Device 1',
        key: 'key_for_device_1'
    },
    {
        name: 'Device 2',
        key: 'key_for_device_2'
    }
]

export default class VarInfo extends React.Component {
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
                                        Nombre de la variable
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Variable Key
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.props.params.varKey}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Descripción
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </span>
                                </section>
                            </Card>
                        </div>
                        <Subtitle text="Dispositivos"/>
                        <div style={styles.devicesContainer}>
                            <Card>
                                <List style={{textAlign: 'left'}}>
                                    {devices.map((device) => (
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
                            label="Nuevo dispositivo"
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
