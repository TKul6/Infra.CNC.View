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
import TreeView from './treeView.jsx';
import * as tempDataSource from '../api.js';
import ApplicationBar from './applicationBar.jsx';

/*Redux */
import { connect } from 'react-redux';

/*Actions*/
import * as appActions from './../actions/app-actions';

const muiTheme = getMuiTheme({})

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            serverDetails: {
                connectionLayout: {}

            },
            checks: [],
         }
        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage(message) {

        if (message) {
             this.setState({ snackbar: { isOpen: true, message: message } });
        }
    }
    render() {
        return (

            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <ApplicationBar displayMessage={this.displayMessage} />
                    <div className='container'>
                        <h1>{this.props.serverName}</h1>
                    </div>
                    <div>
                        <TreeView displayMessage={this.displayMessage} />
                    </div>
                    <div>
                        <Snackbar
                            open={this.props.snackbar.isOpen}
                            message={this.props.snackbar.message}
                            autoHideDuration={3000}
                            onRequestClose={this.props.hideSnackbar}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

}

const mapStateToProps = state => {
    return {
        snackbar: state.app.snackbar,
        serverName: state.server.serverName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideSnackbar: (reason) => dispatch(appActions.hideMessageAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

