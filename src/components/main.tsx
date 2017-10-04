/**
 * Created by Tomer on 12/10/2016.
 */
import * as React from 'react';
import {Dispatch} from 'redux'
/*Material UI dependencies */
import {MuiThemeProvider, lightBaseTheme} from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import LightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Snackbar from 'material-ui/Snackbar';

import {SnackbarState} from './../core/state/snackbar-state'
import {State} from './../core/state/state'
/*Local depenencies */
import TreeView from './treeView';

import ApplicationBar from './applicationBar';

/*Redux */
import { connect } from 'react-redux';

/*Actions*/
import * as appActions from './../core/state/actions/app-actions';

const lightMuiTheme = getMuiTheme(lightBaseTheme);


interface MainProps  {serverName : string,
                  snackbar : SnackbarState, 
                  hideSnackbar : () => void}

class Main extends React.Component<any,MainProps> {

    render() {
        return (
               <MuiThemeProvider muiTheme={lightMuiTheme}>
                  <div>
                    <ApplicationBar />
                    <div className='container'>
                        <h1>{this.props.serverName}</h1>
                    </div>
                    <div>
                        <TreeView />
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

const mapStateToProps = (state : State) => {
    return {
        snackbar: state.app.snackbar,
        serverName: state.server.serverName
    }
}

const mapDispatchToProps = (dispatch : Dispatch<State>)  => {
    return {
        hideSnackbar: (reason : string) => dispatch(appActions.hideMessageAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

