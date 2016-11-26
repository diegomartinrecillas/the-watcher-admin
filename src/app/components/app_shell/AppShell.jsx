// React
import React from 'react';
// React Router
import { hashHistory } from 'react-router';
// Flux
import LoginActions from 'app/actions/LoginActions';
import LoginStore from 'app/stores/LoginStore';
// React router
import { Link } from 'react-router';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
// Material Icons
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
// Colors
import { primary, accent, background } from 'app/styles/colors';

const styles = {
    container: {
        paddingTop: 65,
        paddingBottom: '2%'
    },
    logoContainer: {
        backgroundColor: 'rgb(20,20,20)',
        position: 'relative',
        height: 200
    },
    appbar: {
        position: 'fixed'
    },
    link: {
        textDecoration: 'none',
        boxSizing: 'border-box',
        display: 'block'
    },
    activeLink: {
        backgroundColor: 'rgba(0,0,0,0.05)'
    }
}

export default class AppShell extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: null,
            drawerIsOpen: false,
            popoverIsOpen: false
        }
    }
    componentDidMount() {
        // Register component callback and execute instantly
        this.LOGIN_STORE_ID = LoginStore.register(this._onChange, false);
    }
    componentWillUnmount() {
        // Unregister
        LoginStore.unregister(this.LOGIN_STORE_ID);
    }
    componentDidUpdate() {
        if (this.state.isLoggedIn !== null) {
            if (!this.state.isLoggedIn) {
                let router = this.context.router;
                router.push('/');
            }
        }
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isLoggedIn: LoginStore.state.get('isLoggedIn')
        });
    }
    handleLogout = () => {
        LoginActions.logout();
    }
    handleToggle = () => {
        this.setState({
            drawerIsOpen: !this.state.drawerIsOpen
        });
    }
    handleClose = () => {
        this.setState({
            popoverIsOpen: false,
            drawerIsOpen: false
        });
    }
    handleSettings = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            popoverIsOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            popoverIsOpen: false,
        });
    };

    goBack = () => {
        hashHistory.goBack();
    }

    render() {
        let currentLocation = this.props.location.pathname
        let iconLeft;
        if (currentLocation !== '/app/home') {
            iconLeft = <IconButton onClick={this.goBack}><ArrowBackIcon /></IconButton>
        } else {
            iconLeft = <div/>
        }
        return (
            <div>
                <AppBar
                    title='The Watcher - Admin'
                    style={styles.appbar}
                    iconElementLeft={iconLeft}
                    iconElementRight={<IconButton onClick={this.handleSettings}><SettingsIcon /></IconButton>}
                    />
                <Popover
                    open={this.state.popoverIsOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                    >
                    <Menu>
                        <MenuItem
                            primaryText="Salir"
                            leftIcon={<ExitIcon/>}
                            onClick={this.handleLogout}/>
                    </Menu>
                </Popover>
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
