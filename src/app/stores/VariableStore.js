import $ from 'jquery';
import Store from 'app/libs/Store';
import VariableActions from 'app/actions/VariableActions';
import {domain} from 'app/AppConstants';

const VariableStore = new (class extends Store {
    constructor() {
        super('VARIABLE_STORE');

        this.state = {
            allVariables: [],
            selectedVariable: null,
            isAddingVar: false,
            isAddingVarSuccess: false,
            isAddingVarError: false,
            addingVarErrorMessage: '',
            varKey: ''
        }

        this.listenTo([
            { action: VariableActions['getAllVariables'], callback: this.getAllVariables },
            { action: VariableActions['getVariable'], callback: this.getVariable },
            { action: VariableActions['addNewVariable'], callback: this.addNewVariable },
            { action: VariableActions['resetAddVar'], callback: this.resetAddVar },
            { action: VariableActions['deleteVar'], callback: this.deleteVar }
        ]);
    }

    getAllVariables = () => {
        $.ajax({
            method: "GET",
            url: `${domain}/variables`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus, jqXHR) => {
                let variables = [];
                for (let object of data) {
                    let variable = {};
                    variable.key = object._id;
                    variable.name = object.nombre;
                    variable.zone = object.lugar;
                    variable.description = object.descripcion;
                    variable.timezone = object.timezoneOffset;
                    variables.push(variable);
                }
                this.setState({
                    allVariables: variables
                })
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('Failure: ' + errorThrown);
            }
        });
    }

    getVariable = (key) => {
        this.setState({
            selectedVariable: this.state.allVariables.find((variable) => variable.key === key)
        })
    }

    addNewVariable = (data) => {
        let varName = data.varName;
        let varUnit = data.varUnit;
        let varDescription = data.varDescription;
        let varZone = data.varZone;
        let varTimezone = data.varTimezone;

        let request = {
            'payload': {
                'nombre': varName,
                'lugar': varZone,
                'unidad': varUnit,
                'descripcion': varDescription,
                'foto_url': '',
                'timezone': varTimezone
            }
        }
        // Request Launch State
        this.setState({
            isAddingVar: true,
            isAddingVarSuccess: false,
            isAddingVarError: false,
            addingVarErrorMessage: '',
            varKey: ''
        });

        $.ajax({
            type: "POST",
            url: `${domain}/variable`,
            data: JSON.stringify(request),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus, jqXHR) => {
                let varKey = data.payload.dataKey;
                this.setState({
                    isAddingVar: false,
                    isAddingVarSuccess: true,
                    isAddingVarError: false,
                    addingVarErrorMessage: '',
                    varKey: `Key: ${varKey}`
                });
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('Failure: ' + errorThrown);
                this.setState({
                    isAddingVar: false,
                    isAddingVarSuccess: false,
                    isAddingVarError: true,
                    addingVarErrorMessage: `No se pudo agregar la nueva variable, por favor intenta más tarde`,
                    varKey: ''
                });
            }
        });

    }

    resetAddVar = () => {
        this.setState({
            isAddingVar: false,
            isAddingVarSuccess: false,
            isAddingVarError: false,
            addingVarErrorMessage: '',
            varKey: ''
        });
    }

    deleteVar = () => {
        console.log(`should delete ${this.state.selectedVariable.key}`);
    }
});

export default VariableStore;
