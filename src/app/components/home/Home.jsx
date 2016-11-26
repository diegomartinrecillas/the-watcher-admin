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
    button: {
        margin: 12,
        width: 170,
        height: 50
    }
}

const variables = [
    {
        name: 'Variable 1',
        key: 'key_for_variable_1'
    },
    {
        name: 'Variable 2',
        key: 'key_for_variable_2'
    }
]

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    handleInfo = (target) => {
        hashHistory.push(`/app/variables/${target}`);
    }

    handleAddDevice = (target) => {
        hashHistory.push(`/app/addDevice/${target}`);
    }

    handleAddVar = () => {
        hashHistory.push('/app/addVar');
    }

    render() {
        return (
            <div style={styles.mainContainer}>
                <div style={styles.innerContainer}>
                    <Subtitle text="Todas las Variables"/>
                    <Card>
                        <List style={{textAlign: 'left'}}>
                            {variables.map((variable) => (
                                <div key={variable.key}>
                                    <ListItem
                                        primaryText={variable.name}
                                        initiallyOpen={false}
                                        primaryTogglesNestedList={true}
                                        nestedItems={[
                                            <ListItem
                                                key={1}
                                                primaryText="Información"
                                                leftIcon={<Info />}
                                                onClick={() => {
                                                    this.handleInfo(variable.key)
                                                }}
                                                />,
                                            <ListItem
                                                key={2}
                                                primaryText="Agregar Dispositivo"
                                                leftIcon={<AddCircle />}
                                                onClick={() => {
                                                    this.handleAddDevice(variable.key)
                                                }}
                                                />
                                        ]}
                                        />
                                </div>
                            ))}
                        </List>
                    </Card>
                    <RaisedButton
                        label="Agregar variable"
                        primary={true}
                        style={styles.button}
                        onClick={this.handleAddVar}
                        />
                </div>
            </div>
        );
    }

}
