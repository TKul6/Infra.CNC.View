
/*React dependencies */
import React from 'react';


/*Material UI depenencies */
import { teal100, white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

/* Wamp dependencies */
import Wampy from 'wampy';

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

export default class ServerConnector extends React.Component {

    constructor(props) {
        super(props);

        this.connectToServer = this.connectToServer.bind(this);
        this.updateServerUrl = this.updateServerUrl.bind(this);
        this.normalizeTree = this.normalizeTree.bind(this);
        this.state = {
            serverUrl: 'ws://localhost:4099/api/v1/cnc'
        };

        this.wampClient = null;

    }


    updateServerUrl(e) {
        this.setState({ serverUrl: e.target.value });
    }

    connectToServer(e) {

        if (!this.wampClient) {
            //Todo disconnect
        }

        console.log('connecting to WAMP server ...');

        var client = new Wampy(this.state.serverUrl, {
            onConnect: () => {

                this.props.dispalyMessage('Connected to server');

                client.call('infra.cnc.serverName', null, { onSuccess: (name) => { this.props.updateStatus(name); } });

                client.subscribe('cncData', (cncData) => {
                 
                    var normalizedTree = this.normalizeTree(cncData[0]);

                    this.props.updateTree(normalizedTree);
                });

            }, realm: 'infra.cncService.simulator', autoReconnect: false
        });
    }

    normalizeTree(node) {

        if (Array.isArray(node.value)) {
            node.name = node.name;
            node.children = node.value

            node.children.forEach(item => this.normalizeTree(item));
        }

        else {
            node.name = node.name + " = " + node.value;
        }

        return node;
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