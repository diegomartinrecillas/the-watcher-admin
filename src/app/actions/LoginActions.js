import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import appDispatcher from 'app/dispatcher/AppDispatcher';

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

export default class LoginActions {
    static checkLoggedIn() {
        appDispatcher.dispatch(
            login.CHECK_LOGGED_IN
        );
    }
    static loginWithEmail(data) {
        appDispatcher.dispatch(
            login.LOGIN_WITH_EMAIL,
            data
        );
    }
    static loginWithGoogle() {
        appDispatcher.dispatch(
            login.LOGIN_WITH_GOOGLE
        );
    }
    static loginWithFacebook() {
        appDispatcher.dispatch(
            login.LOGIN_WITH_FACEBOOK
        );
    }
    static logout() {
        appDispatcher.dispatch(
            login.LOGOUT
        );
    }
    static resetError() {
        appDispatcher.dispatch(
            login.RESET_ERROR
        );
    }
}
