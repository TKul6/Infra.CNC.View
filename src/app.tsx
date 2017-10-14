/*React Dependencies */
import * as React from 'react';
import * as ReactDom from 'react-dom';

/*Redux dependencies */
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { appReducer } from './core/state/reducers/app-reducer';
import { serverReducer } from './core/state/reducers/server-reducer';

import Layout from './layout/layout';

require('style-loader!./style/main.css');

import { WampProviderService } from './core/services/wamp-provider.service';

let store = createStore(combineReducers({ app: appReducer, server: serverReducer }));

ReactDom.render(
    <Provider store={store}>
        <Layout dataProvider={new WampProviderService()} />
    </Provider>, document.getElementById('app'));