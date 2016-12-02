import timezone from 'moment-timezone';
// React
import React from 'react';
// Flux
import linkState from 'app/utils/onChangeHandlerFactory';
import VariableActions from 'app/actions/VariableActions';
import VariableStore from 'app/stores/VariableStore';
// Material UI Components
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
    varKey: {},
    addingVarErrorMessage: {},
    isAddingVarSuccess: {},
}

export default class AddVar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            varKey: '',
            varName: '',
            varUnit: '',
            varDescription: '',
            varZone: '',
            varTimezone: '',
            isAddingVar: false,
            isAddingVarSuccess: false,
            isAddingVarError: false,
            addingVarErrorMessage: '',
            errorMessage: ''
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
            isAddingVarSuccess: VariableStore.state.isAddingVarSuccess,
            varKey: VariableStore.state.varKey
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.varName !== '' && this.state.varUnit !== '' && this.state.varZone !== '' && this.state.varDescription !== '') {
            if (timezone.tz.names().indexOf(this.state.varTimezone) !== -1) {
                let data = {};
                data.varName = this.state.varName;
                data.varUnit = this.state.varUnit;
                data.varDescription = this.state.varDescription;
                data.varZone = this.state.varZone;
                data.varTimezone = this.state.varTimezone;
                VariableActions.dispatch('addNewVariable', data);
            } else {
                this.handleOpen('La zona horaria que seleccionaste no es válida, por favor selecciona una zona de la lista.');
            }
        }
        else {
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

    handleTimezone = (value) => {
        this.setState({
            varTimezone: value
        });
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
                        <Subtitle text='Nueva Variable'/>
                        <form>
                            <div style={styles.dataContainer}>
                                <Card style={styles.alignment}>
                                    <section style={styles.legend}>
                                        <TextField
                                            required={true}
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
                                            required={true}
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
                                            required={true}
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
                                            required={true}
                                            floatingLabelText="Zona"
                                            hintText="Zona de la variable"
                                            underlineStyle={styles.underlineStyle}
                                            fullWidth={true}
                                            value={this.state.varZone}
                                            onChange={linkState(this,'varZone')}/>
                                    </section>
                                    <Divider/>
                                    <section style={styles.legend}>
                                        <AutoComplete
                                            required={true}
                                            fullWidth={true}
                                            underlineStyle={styles.underlineStyle}
                                            filter={AutoComplete.caseInsensitiveFilter}
                                            floatingLabelText="Timezone"
                                            hintText="Timezone"
                                            onUpdateInput={this.handleTimezone}
                                            maxSearchResults={3}
                                            dataSource={timezone.tz.names()}/>
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
                            {this.state.isAddingVarSuccess &&
                                <section>
                                    <p style={styles.varKey}>{this.state.varKey}</p>
                                </section>
                            }
                            {!this.state.isAddingVarSuccess &&
                                <RaisedButton
                                    type="submit"
                                    label="Agregar"
                                    primary={true}
                                    style={styles.button}
                                    onClick={this.handleSubmit}
                                    />
                            }
                            {this.state.isAddingVarSuccess &&
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
