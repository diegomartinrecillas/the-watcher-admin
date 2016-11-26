// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import LoginActions from 'app/actions/LoginActions';
// Firebase
import firebase from 'firebase';
import { firebaseAuth } from 'app/firebase/firebase';
// Backbone
import { Collection, Model } from 'backbone';

const LoginState = Model.extend({
    defaults: {
        isLoggedIn: false,
        isLoggingIn: false,
        isCheckingLoggedIn: false,
        isLoginError: false,
        loginErrorMessage: ''
    }
});

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

class LoginStore extends Store {

    constructor() {
        const DEBUG = false;
        super('LoginStore', DEBUG);

        this.state = new LoginState();
        this.state.on('change',this.update, this);

        this.bindActions({
            [login.CHECK_LOGGED_IN]: this.checkLoggedIn,
            [login.LOGIN_WITH_EMAIL]: this.loginWithEmail,
            [login.LOGIN_WITH_FACEBOOK]: this.loginWithFacebook,
            [login.LOGIN_WITH_GOOGLE]: this.loginWithGoogle,
            [login.LOGOUT]: this.logout,
            [login.RESET_ERROR]: this.resetError
        });
    }

    logout = () => {
        firebaseAuth.signOut()
        .then(() => {
            this.state.set({'isLoggedIn': false});
        })
        .catch((error) => {
            this._loginError(error);
        });
    }

    checkLoggedIn = () => {
        this.state.set({'isCheckingLoggedIn': true});
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.state.set({
                    'isLoggedIn': true,
                    'isCheckingLoggedIn': false
                });
            } else {
                this.state.set({
                    'isLoggedIn': false,
                    'isCheckingLoggedIn': false
                });
            }
        });
    }

    _loginWithProviderPopup = (provider) => {
        this.state.set({
            'isLoggingIn': true,
            'isLoginError': false
        });

        firebaseAuth.signInWithPopup(provider)
        .then((result) => {
            this.state.set({
                'isLoggedIn': true,
                'isLoginError': false,
                'isLoggingIn': false
            });
        })
        .catch((error) => {
            console.log(error);
            this._loginError(error);
            this.state.set({'isLoggingIn': false});
        });
    }

    loginWithFacebook = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
        this._loginWithProviderPopup(provider);
    }

    loginWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        this._loginWithProviderPopup(provider);
    }

    loginWithEmail = (data) => {
        let email = data['email'];
        let password = data['password'];

        this.state.set({
            'isLoggingIn': true,
            'isLoginError': false
        });

        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.state.set({
                'isLoggedIn': true,
                'isLoginError': false,
                'isLoggingIn': false
            });
            console.log('should break');
        })
        .catch((error) => {
            this._loginError(error);
            this.state.set({'isLoggingIn': false});
        });

    }

    resetError = () => {
        this.state.set({
            'isLoginError': false,
            'loginErrorMessage': false
        });
    }

    _loginError = (error) => {
        console.log(error);
        let errorMsg;
        if (error.code == "auth/network-request-failed") {
            errorMsg = 'No hay conexión a Internet';
        } else if (error.code == "auth/user-not-found") {
            errorMsg = 'Usuario y/o contreseña incorrectos';
        } else if (error.code == "auth/wrong-password") {
            errorMsg = 'Usuario y/o contreseña incorrectos';
        } else if (error.code = "auth/user-disabled") {
            errorMsg = 'Tu cuenta ha sido dada de baja, por favor ponte en contacto con tu administrador'
        } else {
            errorMsg = 'Servicio temporalmente no disponible';
        }
        this.state.set({
            'isLoginError': true,
            'loginErrorMessage': errorMsg
        });
    }
}

let loginStore = new LoginStore();
appDispatcher.register(loginStore);

export default loginStore;
