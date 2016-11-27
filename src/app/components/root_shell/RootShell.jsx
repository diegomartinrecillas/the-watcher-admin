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
    componentDidMount() {
        LoginStore.subscribe(this._onChange);
        LoginActions.checkLoggedIn.dispatch();
    }
    componentWillUnmount() {
        LoginStore.unsubscribe(this._onChange);
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isCheckingLoggedIn: LoginStore.state.isCheckingLoggedIn
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
