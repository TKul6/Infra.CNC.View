/*React Dependencies */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { WampProviderService } from './core/services/wamp-provider.service';

require('style-loader!./style/main.css');

let ReactDI = require('react-di');

import { Shell } from './layout/app';

let diEngine = new ReactDI({
    dataProvider: new WampProviderService()
});

diEngine.inject(React);


ReactDom.render(<Shell />, document.getElementById('app'));