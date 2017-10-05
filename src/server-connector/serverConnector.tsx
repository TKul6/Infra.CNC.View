
/*React dependencies */
import * as  React from 'react';


/*Material UI depenencies */
import { teal100, white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* Wamp dependencies */
import * as Wampy from 'wampy';


/*Redux */
import {Dispatch} from 'redux'
import { connect } from 'react-redux'
import {showMessageAction} from './../core/state/actions/app-actions';
import {renameServerAction, treeDataUpdatedAction} from './../core/state/actions/server-actions';
import {State} from './../core/state/state'


export interface ServerConnectorState {serverUrl: string}


class ServerConnector extends React.Component<any,ServerConnectorState> {

private wampClient : Wampy;

    constructor(props : any) {
        super(props);

        this.connectToServer = this.connectToServer.bind(this);
        this.updateServerUrl = this.updateServerUrl.bind(this);
        this.state = {
            serverUrl: 'ws://localhost:4099/api/v1/cnc'
        };
    }

    updateServerUrl(e : object, url : string) {
        this.setState({ serverUrl: url });
    }

    connectToServer(e : any) {

        if (this.wampClient != undefined) {
            this.wampClient.disconnect();
            this.props.onDisconnect(this.props.serverName);
        }

        console.log('connecting to WAMP server ...');

        this.wampClient = new Wampy(this.state.serverUrl, {
            onConnect: () => {
               
                this.wampClient.call('infra.cnc.serverName', null, { onSuccess: (name : any) => { this.props.onServerNameChanged(name); 
                this.props.onServerConnected(name);} });

                this.wampClient.subscribe('cncData', (cncData :any) => {

                    this.props.onTreeDataRecieved(cncData[0]);
                });

            }, realm: 'infra.cncService.simulator', autoReconnect: false
        });
    }

    render() {
        return (
            <div>
                <TextField hintText='ws://localhost:4099/api/v1/cnc' floatingLabelText='Connect to server'
                    defaultValue='ws://localhost:4099/api/v1/cnc'
                    underlineStyle={labelStyles.underlineStyle}
                    floatingLabelStyle={labelStyles.whiteText}
                    hintStyle={labelStyles.semiWhiteText} inputStyle={labelStyles.whiteText}
                    onChange={this.updateServerUrl} />
                <IconButton tooltip='Connect to server' onClick={this.connectToServer}><FontIcon className="material-icons" color="white">arrow_forward</FontIcon></IconButton>

            </div>);
    }

}

const mapDispatchToProps = (dispatch : Dispatch<State>) => {
  return {
    onServerConnected: (serverName :string) => {
        dispatch(showMessageAction(`Successfully connected to ${serverName}`));
    },
    onServerNameChanged: (serverName : string) =>{
        dispatch(renameServerAction(serverName));
    },
    onTreeDataRecieved : (data : any) => dispatch(treeDataUpdatedAction(data)),
    onDisconnect : (serverName : string) => dispatch(showMessageAction(`Disconnected from ${serverName}`))
    
  }
}

const mapStateToProps = (state : State) => {
  return {
   serverName : state.server.serverName
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ServerConnector);

const labelStyles = {
    
        underlineStyle: {
            borderColor: white,
        },
        whiteText: {
            color: white,
        },
        semiWhiteText: {
            color: teal100,
        },
    };
    
