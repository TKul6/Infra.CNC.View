/**
 * Created by Tomer on 12/10/2016.
 */
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TreeView from './treeView'
import {deepOrange500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});



export default class Main extends React.Component{

    render() {
        return (<MuiThemeProvider>
                    <div className='container'>
                    <div>
                        <h1>Here will be the server name</h1>
                    </div>
                    <div>
                        <TreeView />
                    </div>
                    </div>
                </MuiThemeProvider>)
    }
}