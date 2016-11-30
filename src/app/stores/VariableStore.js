import $ from 'jquery';
import Store from 'app/libs/Store';
import VariableActions from 'app/actions/VariableActions';

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

        this.listenTo(VariableActions['getAllVariables'], this.getAllVariables);
        this.listenTo(VariableActions['getVariable'], this.getVariable);
        this.listenTo(VariableActions['addNewVariable'], this.addNewVariable);
        this.listenTo(VariableActions['resetAddVar'], this.resetAddVar);
    }

    getAllVariables = () => {
        $.ajax({
            method: "GET",
            url: "http://172.16.90.89:3000/variables",
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
                'timezoneOffset': 360
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
            url: "http://172.16.90.89:3000/variable",
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
                    varKey: `Key: varKey`
                });
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('Failure: ' + errorThrown);
                this.setState({
                    isAddingVar: false,
                    isAddingVarSuccess: false,
                    isAddingVarError: true,
                    addingVarErrorMessage: `Error: ${errorThrown}`,
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
});

export default VariableStore;
