/*React Dependencies */
import * as React from 'react';
import * as ReactDom from 'react-dom';

require('style-loader!./style/main.css');

import { Shell } from './layout/app';


ReactDom.render(<Shell />, document.getElementById('app'));