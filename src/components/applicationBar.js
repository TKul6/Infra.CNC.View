import React from 'react';
import  AppBar  from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue100} from 'material-ui/styles/colors'

const iconStyle = {
     'margin-top': '16'
}

export default class ApplicationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('rendering app bar');
        return (
            <div id='appBarPlaceHolder'>
                <AppBar title='Cnc View'  iconStyleLeft={iconStyle}
                iconElementLeft={ <FontIcon className='material-icons white' color={blue100}>build</FontIcon>}/>
            </div>)
            ;
    }

}