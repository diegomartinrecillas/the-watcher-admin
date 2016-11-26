// React
import React from 'react';
// Material UI Components
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
        width: 150,
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
    render() {
        return (
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
                                    Nombre del dispositivo
                                </span>
                            </section>
                            <Divider/>
                            <section style={styles.legend}>
                                <span style={styles.title}>
                                    Device Key
                                </span>
                                <br/>
                                <span style={styles.entry}>
                                    {this.props.params.deviceKey}
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
                </div>
            </div>
        );
    }
}
