// React
import React from 'react';
// React Router
import { IndexRoute, Redirect, Router, Route, hashHistory } from 'react-router'
// Libraries and Helpers
import requireAuth from 'app/firebase/requireAuth';
// Material UI Components
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// App Components
import AppShell from './app_shell/AppShell';
import DeviceInfo from './device_info/DeviceInfo';
import Error from './error/Error';
import Home from './home/Home';
import Login from './login/Login';
import RootShell from './root_shell/RootShell';
import VarInfo from './var_info/VarInfo';
// Common colors
import { primary, accent } from 'app/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: primary,
        accent1Color: accent
    }
});

export default class AppRouter extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={RootShell}>
                        <IndexRoute component={Login}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/error" component={Error}/>
                        <Redirect from="/app" to="/app/home" />
                        <Route path="/app" component={AppShell} onEnter={requireAuth}>
                            <Route path="/app/home" component={Home}/>
                            <Route path="/app/variables/:varKey" component={VarInfo}/>
                            <Route path="/app/devices/:deviceKey" component={DeviceInfo}/>
                        </Route>
                    </Route>
                    <Route path="*" component={Error}/>
                </Router>
            </MuiThemeProvider>
        );
    }
}
