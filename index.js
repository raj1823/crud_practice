/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './components/home';
import {name as appName} from './app.json';
import React from 'react'

import store from './rootReducer'
import {Provider} from 'react-redux'
const ApiApp = () => (
    <Provider store={store}>
        <Home />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ApiApp);
