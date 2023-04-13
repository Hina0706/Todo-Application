/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );
