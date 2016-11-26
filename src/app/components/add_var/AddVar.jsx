// React
import React from 'react';
// Material UI Components
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
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        textAlign: 'justify'
    }
}

export default class AddVar extends React.Component {
    constructor(props) {
        super(props);
    }
    handleAddVar = (event) => {
        event.preventDefault();

        // Code goes here
        console.log('submit');
        // Code goes here

        return false;
    }
    render() {
        return (
            <div style={styles.mainContainer}>
                <div style={styles.innerContainer}>
                    <Subtitle text='Nueva Variable'/>
                    <form>
                        <div style={styles.dataContainer}>
                            <Card style={styles.alignment}>

                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Nombre"
                                        hintText="Nombre de la variable"
                                        fullWidth={true}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Descripción"
                                        hintText="Descripción de la variable"
                                        fullWidth={true}/>
                                </section>

                            </Card>
                        </div>
                        <RaisedButton
                            type="submit"
                            label="Agregar"
                            primary={true}
                            style={styles.button}
                            onClick={this.handleAddVar}
                            />
                    </form>
                </div>
            </div>
        );
    }
}
