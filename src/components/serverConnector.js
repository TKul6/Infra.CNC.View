import React from 'react';
import { teal100, white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
    }

    render() {
        return (
            <div>
                <TextField hintText='http://localhost:4099/api/v1/cnc' floatingLabelText='Connect to server'
                    underlineStyle={labelStyles.underlineStyle}
                    floatingLabelStyle={labelStyles.whiteText}
                    hintStyle={labelStyles.semiWhiteText} inputStyle={labelStyles.whiteText} />
                     <RaisedButton label='Connect'  secondary={true}  />
                    
            </div>);
    }

}