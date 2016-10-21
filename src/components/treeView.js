/**
 * Created by Tomer on 15/10/2016.
 */
import React from 'react';
import {Treebeard, decorators} from 'react-treebeard'
import Style from '../style/treeViewStyle.js'

const tempDataSource =
    {
        name :'root',
        toggled: false,
        children : [
            {
                name: "child1",
                children : [
                    {
                        name : "child11"
                    },
                    {
                        name : "child12"
                    }
                 ]
            },
            {
                name : "child2"
            },
            {
                name : "Tomer",
                children : [
                    {name: "Khalili"},
                    {name : "Is Free"}

                ]
            }
        ]

    }

    ;


decorators.Header = function(props){

    const style = props.style;

    const iconStyle = { marginRight: '5px',
                        verticalAlign : 'middle'};

    var nodeType = props.node.children ? "folder" : "insert_drive_file" ;

    return (
            <div style={style.base}>
                <div style={style.title}>
                <i className="material-icons" style={iconStyle}>{nodeType}</i>
                {props.node.name}
                </div>
                </div>);

};
export default class TreeView extends React.Component{

constructor(props){
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
}

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
<div>
    <h3>Here will be the server name </h3>


            <Treebeard
                data={tempDataSource}
                onToggle={this.onToggle}
                style={Style}
                decorators={decorators}
                />
                </div>
        );
    }
};

