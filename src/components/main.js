/**
 * Created by Tomer on 12/10/2016.
 */
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TreeView from './treeView'

export default class Main extends React.Component{

    render(){
        return( <MuiThemeProvider>
            <TreeView />
        </MuiThemeProvider>)
    }
}