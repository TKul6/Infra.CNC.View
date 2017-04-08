import React from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import { blue100, teal100, white, blueGrey900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import ServerConnector from './serverConnector';

const style = {
    'background-color': '#1c606b',
    icon: {
        'marginTop': '16px'
    }
}



export default class ApplicationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id='appBarPlaceHolder'>
                <AppBar title='Cnc View' iconStyleLeft={style.icon} style={style}
                    iconElementLeft={<FontIcon className='material-icons white' color={blue100}>build</FontIcon>}
                    children={<ServerConnector dispalyMessage={this.props.displayMessage} updateStatus={this.props.updateStatus}
                    updateTree={this.props.updateTree} treeData={this.props.treeData} />} />
            </div>
        )
            ;
    }

}