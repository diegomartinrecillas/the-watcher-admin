// Flux
import Store from 'app/libs/Store';
import LoginActions from 'app/actions/LoginActions';
// Firebase
import firebase from 'firebase';
import { firebaseAuth } from 'app/firebase/firebase';

const DEBUG = false;

class LoginStore extends Store {

    constructor() {

        super('LOGIN_STORE', DEBUG);

        this.state = {
            isLoggedIn: false,
            isLoggingIn: false,
            isCheckingLoggedIn: false,
            isLoginError: false,
            loginErrorMessage: ''
        };

        this.listenTo(LoginActions.checkLoggedIn, this.checkLoggedIn);
        this.listenTo(LoginActions.loginWithEmail, this.loginWithEmail);
        this.listenTo(LoginActions.loginWithFacebook, this.loginWithFacebook);
        this.listenTo(LoginActions.loginWithGoogle, this.loginWithGoogle);
        this.listenTo(LoginActions.logout, this.logout);
        this.listenTo(LoginActions.resetError, this.resetError);
    }

    logout = () => {
        firebaseAuth.signOut()
        .then(() => {
            this.setState({'isLoggedIn': false});
        })
        .catch((error) => {
            this._loginError(error);
        });
    }

    checkLoggedIn = () => {
        this.setState({'isCheckingLoggedIn': true});
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    'isLoggedIn': true,
                    'isCheckingLoggedIn': false
                });
            } else {
                this.setState({
                    'isLoggedIn': false,
                    'isCheckingLoggedIn': false
                });
            }
        });
    }

    _loginWithProviderPopup = (provider) => {
        this.setState({
            'isLoggingIn': true,
            'isLoginError': false
        });

        firebaseAuth.signInWithPopup(provider)
        .then((result) => {
            this.setState({
                'isLoggedIn': true,
                'isLoginError': false,
                'isLoggingIn': false
            });
        })
        .catch((error) => {
            console.log(error);
            this._loginError(error);
            this.setState({'isLoggingIn': false});
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

        this.setState({
            'isLoggingIn': true,
            'isLoginError': false
        });

        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.setState({
                'isLoggedIn': true,
                'isLoginError': false,
                'isLoggingIn': false
            });
        })
        .catch((error) => {
            this._loginError(error);
            this.setState({'isLoggingIn': false});
        });

    }

    resetError = () => {
        this.setState({
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
        this.setState({
            'isLoginError': true,
            'loginErrorMessage': errorMsg
        });
    }
}

let loginStore = new LoginStore();
export default loginStore;
