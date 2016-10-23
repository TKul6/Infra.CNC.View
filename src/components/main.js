/**
 * Created by Tomer on 12/10/2016.
 */
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TreeView from './treeView'
import {deepOrange500} from 'material-ui/styles/colors';
import LightTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const muiTheme = getMuiTheme({})

export default class Main extends React.Component{

    render() {
        return (<MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                    <div className='container'>
                        <h1>Here will be the server name</h1>
                    </div>
                    <div>
                        <TreeView />
                    </div>
                    </div>
                </MuiThemeProvider>)
    }
}