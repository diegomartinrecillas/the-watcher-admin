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
    subtitle: {
        textAlign: 'left',
        color: '#424242',
        fontSize: 24
    },
    underline: {
        border: 0,
        height: 1,
        background: '#333',
        backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)'
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

    render() {
        return (
            <div style={styles.mainContainer}>
                <div style={styles.innerContainer}>
                    <div style={styles.buttonContainer}>
                        <RaisedButton
                            label="Nueva variable"
                            primary={true}
                            style={styles.button}
                            onClick={this.handleNewVariable}
                            />
                    </div>
                    <section style={styles.subtitle}>
                        Todas las Variables
                    </section>
                    <hr style={styles.underline}/>
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
                                                primaryText="Information"
                                                leftIcon={<Info />}
                                                onClick={() => {
                                                    this.handleInfo(variable.key)
                                                }}
                                                />,
                                            <ListItem
                                                key={2}
                                                primaryText="Add device"
                                                leftIcon={<AddCircle />}
                                                />
                                        ]}
                                        />
                                </div>
                            ))}
                        </List>
                    </Card>

                </div>
            </div>
        );
    }

}
