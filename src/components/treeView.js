/**
 * Created by Tomer on 15/10/2016.
 */
import React from 'react';
import {Treebeard} from 'react-treebeard'

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
            <Treebeard
                data={tempDataSource}
                onToggle={this.onToggle}
                />
        );
    }
};

