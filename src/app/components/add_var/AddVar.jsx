// React
import React from 'react';
// Flux
import linkState from 'app/utils/onChangeHandlerFactory';
import VariableActions from 'app/actions/VariableActions';
import VariableStore from 'app/stores/VariableStore';
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
}

const zones = [
    {"value":"1", "name":"UTC-12"},
    {"value":"2", "name":"UTC-11"},
    {"value":"3", "name":"UTC-10"},
    {"value":"4", "name":"UTC-9"},
    {"value":"5", "name":"UTC-8"},
    {"value":"6", "name":"UTC-7"},
    {"value":"7", "name":"UTC-6"},
    {"value":"8", "name":"UTC-5"},
    {"value":"9", "name":"UTC-4"},
    {"value":"10", "name":"UTC-3"},
    {"value":"11", "name":"UTC-2"},
    {"value":"12", "name":"UTC-1"},
    {"value":"13", "name":"UTC+0"},
    {"value":"14", "name":"UTC+1"},
    {"value":"15", "name":"UTC+2"},
    {"value":"16", "name":"UTC+3"},
    {"value":"17", "name":"UTC+4"},
    {"value":"18", "name":"UTC+5"},
    {"value":"19", "name":"UTC+6"},
    {"value":"20", "name":"UTC+7"},
    {"value":"21", "name":"UTC+8"},
    {"value":"22", "name":"UTC+9"},
    {"value":"23", "name":"UTC+10"},
    {"value":"24", "name":"UTC+11"},
    {"value":"25", "name":"UTC+12"},
    {"value":"26", "name":"UTC+13"},
    {"value":"27", "name":"UTC+14"}
]

export default class AddVar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: null,
            varName: '',
            varUnit: '',
            varDescription: '',
            varZone: '',
            isAddingVar: false,
            isAddingVarSuccess: false,
            isAddingVarError: false,
            addingVarErrorMessage: ''
        }
    }

    componentDidMount() {
        VariableStore.subscribe(this._onChange);
        VariableActions.dispatch('resetAddVar');
    }

    componentWillUnmount() {
        VariableStore.unsubscribe(this._onChange);
    }

    _onChange = () => {
        this.setState({
            isAddingVar: VariableStore.state.isAddingVar,
            isAddingVarError: VariableStore.state.isAddingVarError,
            addingVarErrorMessage: VariableStore.state.addingVarErrorMessage,
            isAddingVarSuccess: VariableStore.state.isAddingVarSuccess
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.selectValue !== null &&
            this.state.varName !== '' &&
            this.state.varUnit !== '' &&
            this.state.varZone !== '' &&
            this.state.varDescription !== '') {

            let data = {};

            data.varName = this.state.varName;
            data.varUnit = this.state.varUnit;
            data.varDescription = this.state.varDescription;
            data.varZone = this.state.varZone;
            data.varTimezone = zones[this.state.selectValue - 1].name;

            VariableActions.dispatch('addNewVariable', data);
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
                    <Subtitle text='Nueva Variable'/>
                    <form>
                        <div style={styles.dataContainer}>
                            <Card style={styles.alignment}>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Nombre"
                                        hintText="Nombre de la variable"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.varName}
                                        onChange={linkState(this,'varName')}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Unidad"
                                        hintText="Unidad de la variable"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.varUnit}
                                        onChange={linkState(this,'varUnit')}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Descripción"
                                        hintText="Descripción de la variable"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.varDescription}
                                        onChange={linkState(this,'varDescription')}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <TextField
                                        floatingLabelText="Zona"
                                        hintText="Zona de la variable"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        value={this.state.varZone}
                                        onChange={linkState(this,'varZone')}/>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <SelectField
                                        value={this.state.selectValue}
                                        onChange={this.handleSelect}
                                        floatingLabelText="Uso Horario"
                                        underlineStyle={styles.underlineStyle}
                                        fullWidth={true}
                                        maxHeight={200}>
                                        {zones.map((zone) => (
                                            <MenuItem
                                                key={zone.value}
                                                value={zone.value}
                                                label={zone.name}
                                                primaryText={zone.name} />
                                        ))}
                                    </SelectField>
                                </section>
                            </Card>
                        </div>
                        {this.state.isAddingVar &&
                            <section>
                                <p style={styles.isAddingVar}>Espere un momento...</p>
                            </section>
                        }
                        {this.state.isAddingVarError &&
                            <section>
                                <p style={styles.addingVarErrorMessage}>{this.state.addingVarErrorMessage}</p>
                            </section>
                        }
                        {this.state.isAddingVarSuccess &&
                            <section>
                                <p style={styles.isAddingVarSuccess}>Nueva variable agregada con éxito</p>
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
