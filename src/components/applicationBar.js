import React from 'react';
import  AppBar  from 'material-ui/AppBar';

export default class ApplicationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('rendering app bar');
        return (
            <div id='appBarPlaceHolder'>
                <AppBar title='Cnc View' />
            </div>)
            ;
    }

}