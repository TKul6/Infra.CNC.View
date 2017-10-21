
/*React dependencies */
import * as  React from 'react';


/*Material UI depenencies */
import { teal100, white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* DI */
import { IDataProviderService } from './../core/interfaces/data-provider.service';
import { DependencyInjectionProps } from './../core/interfaces/dependency-injection-props'

/*Redux */
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { showMessageAction } from './../core/state/actions/app-actions';
import { renameServerAction, treeDataUpdatedAction } from './../core/state/actions/server-actions';
import { State } from './../core/state/state'


interface ServerConnectorState { serverUrl: string }

interface ServerConnectorProps extends DependencyInjectionProps {
    serverName: string,
    onServerConnected: (name: string) => void,
    onServerNameChanged: (name: string) => void,
    onTreeDataRecieved: (data: any) => void,
    onDisconnect: (serverName: string) => void,
}

class ServerConnector extends React.Component<ServerConnectorProps, ServerConnectorState> {

    constructor(props: any) {
        super(props);

        this.connectToServer = this.connectToServer.bind(this);
        this.updateServerUrl = this.updateServerUrl.bind(this);
        this.state = {
            serverUrl: 'ws://localhost:4099/api/v1/cnc'
        };

    }

    updateServerUrl(e: object, url: string) {
        this.setState({ serverUrl: url });
    }

    async connectToServer(e: any) {
        const service: IDataProviderService = this.props.di('dataProvider');

        if (service.isConnected()) {
            await service.disconnect();
            this.props.onDisconnect(this.props.serverName);
        }
        await service.connect(this.state.serverUrl);


        service.emitter.on('cncData', (cncData: any) => {

            this.props.onTreeDataRecieved(cncData[0]);
        });

        const serverName = await service.getServerName();

        this.props.onServerConnected(serverName);
        this.props.onServerNameChanged(serverName);
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

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    return {
        onServerConnected: (serverName: string) => {
            dispatch(showMessageAction(`Successfully connected to ${serverName}`));
        },
        onServerNameChanged: (serverName: string) => {
            dispatch(renameServerAction(serverName));
        },
        onTreeDataRecieved: (data: any) => dispatch(treeDataUpdatedAction(data)),
        onDisconnect: (serverName: string) => dispatch(showMessageAction(`Disconnected from ${serverName}`))

    }
}

const mapStateToProps = (state: State) => {
    return {
        serverName: state.server.serverName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerConnector);

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

