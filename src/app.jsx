/**
 * Created by Tomer on 12/10/2016.
 */

import React from 'react';
import ReactDom from 'react-dom';
import Main from './components/main.jsx';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';


import {appReducer} from './reducers/app-reducer';
import {serverReducer} from './reducers/server-reducer';

let store = createStore(combineReducers({app :appReducer,server : serverReducer}));

ReactDom.render(
    <Provider store={store}>
        <Main />
    </Provider>,document.getElementById('app'));