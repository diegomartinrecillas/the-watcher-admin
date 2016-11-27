import { createActions }  from 'app/libs/Actions';

const DEBUG = false;

const LoginActions = createActions([
    'checkLoggedIn',
    'loginWithEmail',
    'loginWithGoogle',
    'loginWithFacebook',
    'logout',
    'resetError'
], DEBUG);

export default LoginActions;
