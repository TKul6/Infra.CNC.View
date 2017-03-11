/**
 * Created by Tomer on 12/10/2016.
 */
import React from 'react';

/*Material UI dependencies */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import LightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Snackbar from 'material-ui/Snackbar';

/*Local depenencies */
import TreeView from './treeView';
import * as tempDataSource from '../api.js';
import ApplicationBar from './applicationBar';


const muiTheme = getMuiTheme({})

export default class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            serverDetails: {
                name: 'Server Name',
                connectionLayout: {}

            },
            treeData: tempDataSource,
            checks: [],
            snackbar: {
                isOpen: false,
                message: ''
            }
        }
        this.displayMessage = this.displayMessage.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateTree = this.updateTree.bind(this);

    }

    displayMessage(message) {
        this.setState({ snackbar: { isOpen: true, message: message } });



    }
    onSnackbarClosed(reason) {

        this.setState({ snackbar: { isOpen: false, message: '' } });
    }

    updateStatus(serverName) {
        this.setState({ serverDetails: { name: serverName } });
    }


    updateTree(newTree) {
        this.setState({ treeData: newTree });
    }

    render() {

        return (<MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <ApplicationBar displayMessage={this.displayMessage} updateStatus={this.updateStatus} updateTree={this.updateTree} />
                <div className='container'>
                    <h1>{this.state.serverDetails.name}</h1>
                </div>
                <div>
                    <TreeView data={this.state.treeData} displayMessage={this.displayMessage} />
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