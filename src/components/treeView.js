/**
 * Created by Tomer on 15/10/2016.
 */
import React from 'react';
import {Treebeard, decorators} from 'react-treebeard'
import Style from '../style/treeViewStyle.js'
import TextField from 'material-ui/TextField'
import * as filters from './filter';

const tempDataSource =
    {
        name :'root',
        toggled: false,
        children : [
            {
                name: 'child1',
                children : [
                    {
                        name : 'child11'
                    },
                    {
                        name : 'child12'
                    }
                 ]
            },
            {
                name : 'child2'
            },
            {
                name : 'Tomer',
                children : [
                    {name: 'Khalili'},
                    {name : 'Is Free'}

                ]
            }
        ]

    }

    ;


decorators.Header = function(props){

    const style = props.style;

    const iconStyle = {marginRight: '5px',
                        verticalAlign : 'middle'};

    var nodeType = props.node.children ? 'folder' : 'insert_drive_file' ;

    return (
            <div style={style.base}>
                <div style={style.title}>
                <i className='material-icons' style={iconStyle}>{nodeType}</i>
                {props.node.name}
                </div>
                </div>);

};
export default class TreeView extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = {searchPaese : '',data : tempDataSource};
        this.onToggle = this.onToggle.bind(this);
        this.onFilter = this.onFilter.bind(this);
}


onFilter(e) {

        this.setState({searchPaese : e.target.value});
        const filter = e.target.value.trim();
        if (filter) {
            var filtered = filters.filterTree(tempDataSource, filter);
            filtered = filters.expandFilteredNodes(filtered, filter);
            this.setState({data: filtered});
        }
        else {
            this.setState({data : tempDataSource})
        }
    }

    onToggle(node, toggled){
        if (this.state.cursor) {this.state.cursor.active = false;}
        node.active = true;
        if (node.children) { node.toggled = toggled; }
        this.setState({cursor: node});
    }
    render(){
        return (
<div>

    <h3>Tree View:</h3>

<TextField  hintText=''
      floatingLabelText='Search' value={this.state.searchPaese}
      onChange={this.onFilter}/>
            <Treebeard

                data={this.state.data}
                onToggle={this.onToggle}
                style={Style}
                decorators={decorators}
                />
                </div>
        );
    }
};

