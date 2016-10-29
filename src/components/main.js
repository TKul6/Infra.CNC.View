/**
 * Created by Tomer on 12/10/2016.
 */
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TreeView from './treeView'
import {deepOrange500} from 'material-ui/styles/colors';
import LightTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import  * as tempDataSource from '../api.js';

const muiTheme = getMuiTheme({})

export default class Main extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            serverDetails :{
                url: '',
                method : '',
                name : 'Server Name',
                connectionLayout: {}

            },
            treeData : {},
            checks : []
        }

    }

    componentDidMount() {
        this.setState({treeData : tempDataSource});
    }

    render() {
        return (<MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                    <div className='container'>
                        <h1>{this.state.serverDetails.name}</h1>
                    </div>
                    <div>
                        <TreeView  data={this.state.treeData}/>
                    </div>
                    </div>
                </MuiThemeProvider>)
    }
}