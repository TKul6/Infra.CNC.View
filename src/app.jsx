/**
 * Created by Tomer on 12/10/2016.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Main from './components/main.jsx';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {systemReducer} from './reducers/system-reducer';

let store = createStore(systemReducer);
ReactDom.render(
    <Provider store={store}>
        <Main />
    </Provider>,document.getElementById('app'));