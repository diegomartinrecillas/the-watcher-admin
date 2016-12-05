// Flux
import Store from 'app/libs/Store';
import LoginActions from 'app/actions/LoginActions';
// Firebase
import firebase from 'firebase';
import { firebaseAuth } from 'app/firebase/firebase';

const LoginStore = new (class extends Store {
    constructor() {
        super('LOGIN_STORE');

        this.state = {
            isLoggedIn: false,
            isLoggingIn: false,
            isCheckingLoggedIn: false,
            isLoginError: false,
            loginErrorMessage: ''
        };

        this.listenTo([
            { action: LoginActions['checkLoggedIn'], callback: this.checkLoggedIn },
            { action: LoginActions['loginWithEmail'], callback: this.loginWithEmail },
            { action: LoginActions['loginWithFacebook'], callback: this.loginWithFacebook },
            { action: LoginActions['loginWithGoogle'], callback: this.loginWithGoogle },
            { action: LoginActions['logout'], callback: this.logout },
            { action: LoginActions['resetError'], callback: this.resetError }
        ]);
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
            errorMsg = 'Usuario y/o contraseña incorrectos';
        } else if (error.code == "auth/wrong-password") {
            errorMsg = 'Usuario y/o contraseña incorrectos';
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
});

export default LoginStore;
