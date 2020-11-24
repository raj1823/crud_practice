/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Tabs from './router';
import {name as appName} from './app.json';
import React from 'react'


const ApiApp = () =>{
   return(
        <Tabs />
   )
}


AppRegistry.registerComponent(appName, () => ApiApp);
