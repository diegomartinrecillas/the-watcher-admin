// React
import React from 'react';
import ReactDOM from 'react-dom';
// Tap Event
import injectTapEventPlugin from 'react-tap-event-plugin';
// Router
import AppRouter from 'app/components/AppRouter';
// Stylesheets
import '../stylesheets/main.scss';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import LoginStore from 'app/stores/LoginStore';


ReactDOM.render(<AppRouter/>, document.getElementById('app'));
