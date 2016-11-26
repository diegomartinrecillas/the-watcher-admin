import React from 'react';
// Flux
import LoginActions from 'app/actions/LoginActions';
import LoginStore from 'app/stores/LoginStore';
// Colors
import { primary, accent } from 'app/styles/colors';

export default class RootShell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckingLoggedIn: null
        }
    }
    // Store registration
    componentDidMount() {
        // Register component callback and execute it instantly
        this.LOGIN_STORE_ID = LoginStore.register(this._onChange, false);
        LoginActions.checkLoggedIn();
    }
    componentWillUnmount() {
        // Unregister
        LoginStore.unregister(this.LOGIN_STORE_ID);
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isCheckingLoggedIn: LoginStore.state.get('isCheckingLoggedIn')
        });
    }
    render() {
        let isLoading;
        if (this.state.isCheckingLoggedIn == null) {
            isLoading = true;
        } else {
            isLoading = this.state.isCheckingLoggedIn;
        }
        let rippleStyle = {transform: 'scale(1)'}
        return (
            <div>
                <div hidden={!isLoading} className='loader-container'>
                    <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                </div>
                <div className='root background'>
                    <div hidden={this.state.isCheckingLoggedIn}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
