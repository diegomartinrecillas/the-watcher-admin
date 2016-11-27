// React
import React from 'react';
import { firebaseAuth } from 'app/firebase/firebase';
// Flux
import LoginStore from 'app/stores/LoginStore';
import LoginActions from 'app/actions/LoginActions';
// React Router
import { Link } from 'react-router';
// Libraries and Helpers
import linkState from 'app/utils/onChangeHandlerFactory';
// Material UI Components
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { red500, orange500 } from 'material-ui/styles/colors';
// Components
import CenteredContainer from 'app/components/misc/CenteredContainer';
import InnerContainer from 'app/components/misc/InnerContainer';
// Colors
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
const styles = {
    inlineButton: {
        marginTop: 12,
        marginRight: 12,
        marginLeft: 12
    },
    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    link: {
        display: 'inline-block',
        paddingBottom: '0%',
        textDecoration: 'none',
        color: accent
    },
    image: {
        paddingTop: '5%',
        paddingBottom: '5%',
        maxWidth: '30%'
    },
    isLoginError: {
        color: red500
    },
    loggingIn: {
        color: primary
    },
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    }
}

export default class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailErrorText: '',
            password: '',
            passwordErrorText: '',
            loginErrorMessage: '',
            isLoginError: false,
            isLoggedIn: false,
            isLoggingIn: false,
            isCheckingLoggedIn: false
        }
    }
    componentDidMount() {
        LoginStore.subscribe(this._onChange);
        LoginStore.emmitChange();
        LoginActions.resetError.dispatch();
    }
    componentWillUnmount() {
        LoginStore.unsubscribe(this._onChange);
    }
    componentDidUpdate() {
        if (this.state.isLoggedIn !== null) {
            if (this.state.isLoggedIn) {
                let router = this.context.router;
                router.push('/app/home');
            }
        }
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isLoginError: LoginStore.state.isLoginError,
            isLoggedIn: LoginStore.state.isLoggedIn,
            isLoggingIn: LoginStore.state.isLoggingIn,
            loginErrorMessage: LoginStore.state.loginErrorMessage,
            isCheckingLoggedIn: LoginStore.state.isCheckingLoggedIn
        });
    }
    // Handlers

    handleFacebookLogin = () => {
        LoginActions.loginWithFacebook.dispatch();
    }

    handleGoogleLogin = () => {
        LoginActions.loginWithGoogle.dispatch();
    }
    // Handle <form> login event
    handleLogin = (event) => {
        console.log('login');
        // Disable <form> default actions
        event.preventDefault();
        // Validate email and password existance
        if (!this._emailOrPasswordEmpty()) {
            // Validate the email structure
            if (this._validateEmail(this.state.email)) {
                let email = this.state.email;
                let password = this.state.password;

                LoginActions.loginWithEmail.dispatch({
                    email: email,
                    password: password,
                });
            } else {
                this.setState({
                    emailErrorText: 'Correo no valido'
                });
            }
        }
        // Disable <form> default actions a second time to be sure
        return false;
    }
    // Handle email change
    handleEmail = (event) => {
        let value = event.target.value;
        this.setState({
            email: value,
            isLoginError:  false,
            emailErrorText: ''
        });
    }
    // Handle password change
    handlePassword = (event) => {
        let value = event.target.value;
        this.setState({
            password: value,
            isLoginError:  false,
            passwordErrorText: ''
        });
    }
    // Helpers
    // Check if email OR password is empty
    _emailOrPasswordEmpty = () => {
        let emailEmpty = true;
        let passwordEmpty = true;
        if (this.state.password.length < 1) {
            this.setState({
                passwordErrorText: 'Introduce tu contraseña'
            });
        } else {
            this.setState({
                passwordErrorText: ''
            });
            passwordEmpty = false;
        }
        if (this.state.email.length < 1) {
            this.setState({
                emailErrorText: 'Introduce tu correo'
            });
        } else {
            this.setState({
                emailErrorText: ''
            });
            emailEmpty = false;
        }
        if (passwordEmpty || emailEmpty) {
            return true;
        } else {
            return false;
        }
    }
    // RegExp to check email structure
    _validateEmail = (event) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin(e);
        }
    }
    // Render
    render() {
        let loggingIn;
        if (this.state.isLoggingIn) {
            loggingIn =
            <section>
                <p style={styles.loggingIn}>Espere un momento...</p>
            </section>;
        }
        let isLoginError;
        if (this.state.isLoginError) {
            isLoginError =
            <section>
                <p style={styles.isLoginError}>{this.state.loginErrorMessage}</p>
            </section>;
        }
        return (
            <div hidden={this.state.isCheckingLoggedIn} style={{paddingTop: '20vh'}}>
                <CenteredContainer >
                    <InnerContainer >
                        <form>
                            <section>
                                <TextField
                                    hintText="Correo Electrónico"
                                    floatingLabelText="Correo Electrónico"
                                    disabled={this.state.isLoggingIn}
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                    errorText={this.state.emailErrorText}
                                    onKeyPress={this.handleKeyPress}
                                    />
                            </section>
                            <section>
                                <TextField
                                    hintText="Contraseña"
                                    floatingLabelText="Contraseña"
                                    type="password"
                                    disabled={this.state.isLoggingIn}
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    errorText={this.state.passwordErrorText}
                                    onKeyPress={this.handleKeyPress}
                                    />
                            </section>
                            {isLoginError}
                            {loggingIn}
                            <section>
                                <RaisedButton
                                    label="Iniciar Sesión"
                                    primary={true}
                                    style={styles.button}
                                    onClick={this.handleLogin}
                                    />
                            </section>
                        </form>
                    </InnerContainer>
                </CenteredContainer>
            </div>
        );
    }
}
