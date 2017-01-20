import React from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import { blue100, teal100, white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import ServerConnector from './serverConnector';

const iconStyle = {
    'marginTop': '16px'
}



export default class ApplicationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id='appBarPlaceHolder'>
                <AppBar title='Cnc View' iconStyleLeft={iconStyle}
                    iconElementLeft={<FontIcon className='material-icons white' color={blue100}>build</FontIcon>}
                    children= {<ServerConnector />} />
                 </div>
                 )
            ;
    }

}