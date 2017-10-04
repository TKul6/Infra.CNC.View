/**
 * Created by Tomer on 12/10/2016.
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import Main from './components/main';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';


import {appReducer} from './core/state/reducers/app-reducer';
import {serverReducer} from './core/state/reducers/server-reducer';

require('style-loader!./style/main.css');

let store = createStore(combineReducers({app :appReducer,server : serverReducer}));

ReactDom.render(
    <Provider store={store}>
        <Main />
    </Provider>,document.getElementById('app'));