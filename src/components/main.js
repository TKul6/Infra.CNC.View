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
import Snackbar from 'material-ui/Snackbar';

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
            treeData : tempDataSource,
            checks : [],
            snackbar : {
                isOpen : false,
                message : ''
            }

        }
        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage(message) {
        this.setState({snackbar : {isOpen: true, message : message}});
    }
    onSnackbarClosed(reason) {

        this.setState({snackbar : {isOpen : false, message : ''}});
}
    render() {

        console.log(this.state.treeData);
        return (<MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                    <div className='container'>
                        <h1>{this.state.serverDetails.name}</h1>
                    </div>
                    <div>
                        <TreeView  data={this.state.treeData} displayMessage={this.displayMessage}/>
                    </div>
                    <div>
   <Snackbar
          open={this.state.snackbar.isOpen}
          message={this.state.snackbar.message}
          autoHideDuration={4000}
        />
                    </div>
                    </div>
                </MuiThemeProvider>)
    }
}