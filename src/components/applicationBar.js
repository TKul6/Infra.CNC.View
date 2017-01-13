import React from 'react';
import  AppBar  from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue100, teal100, white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

const iconStyle = {
    'marginTop': '16px'
}

const labelStyles = {
  
  underlineStyle: {
    borderColor: white,
},
  whiteText: {
    color:white,
  },
  semiWhiteText: {
      color:teal100,
  },


};

export default class ApplicationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('rendering app bar');
        return (
            <div id='appBarPlaceHolder'>
                <AppBar title='Cnc View'  iconStyleLeft={iconStyle}
                iconElementLeft={ <FontIcon className='material-icons white' color={blue100}>build</FontIcon>}
                children={<TextField hintText='http://localhost:4099/api/v1/cnc' floatingLabelText='Connect to server'
                className='app-bar-component' underlineStyle={labelStyles.underlineStyle}
                floatingLabelStyle={labelStyles.whiteText}
                hintStyle={labelStyles.semiWhiteText} inputStyle={labelStyles.whiteText} />} />
            </div>)
            ;
    }

}