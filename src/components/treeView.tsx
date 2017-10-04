/**
 * Created by Tomer on 15/10/2016.
 */
import * as  React from 'react';
import Style from './../style/treeview-style';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import * as filters from './filter';
import { connect } from 'react-redux';
import {TreeNode} from './../models/tree-node'

let copy = require('copy-to-clipboard');

let Treebeard = require('react-treebeard').Treebeard;

let decorators = require('react-treebeard').decorators;

/*Actions*/
import * as appActions from './../core/state/actions/app-actions';


/*Redux*/
import {State} from './../core/state/state'
import {Dispatch} from 'redux'

decorators.Header = function (props: any) {

    const style = props.style;

    const iconStyle = {
        marginRight: '5px',
        verticalAlign: 'middle'
    };

    var nodeType = props.node.children ? 'folder' : 'insert_drive_file';

    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className='material-icons' style={iconStyle}>{nodeType}</i>
                {props.node.name}
            </div>
        </div>);

};

 export interface TreeState {filter: string, selectedNode : TreeNode<string>, cursor: TreeNode<string>}


class TreeView extends React.Component<any,TreeState>{

private toggleBookeeper : Map<string,boolean>;

    constructor(props : any) {
        super(props);
        this.toggleBookeeper = new Map<string,any>();
        this.state = { filter: '', 
        selectedNode: null,
    cursor : null,
};
        this.onToggle = this.onToggle.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.copyPath = this.copyPath.bind(this);
        this.normalizeTree = this.normalizeTree.bind(this);
        this.getNodeId = this.getNodeId.bind(this);
        this.buildTree = this.buildTree.bind(this);
    }

    onFilter(e : any) {
        this.setState({ filter: e.target.value });
       }

    onToggle(node: TreeNode<string>, toggled : boolean) {

        this.toggleBookeeper.set(node.id, toggled);

        if (this.state.cursor) { this.state.cursor.active = false; }
        node.active = true;
        this.setState({ selectedNode: node });
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    copyPath(e: any) {
        let path :string = filters.getPath(this.props.tree, this.state.selectedNode,'');

        copy(path);

        this.props.showMessage(this.state.selectedNode.name + ' was copied');
    }

    getNodeId(node: any, idPrefix: string) {
        if (!node.id) {
            if (idPrefix) {
                return `${idPrefix}/${node.name}`;
            }
            else {
                return node.name;
            }
        }
        return node.id;
    }

buildTree(node: any, idPrefix: string){
    var tree = this.normalizeTree(node,idPrefix);

    if(this.state.filter){
        var filtered = filters.filterTree(this.props.tree, this.state.filter);
            filtered = filters.expandFilteredNodes(filtered, this.state.filter);
        tree = filtered;
    }

    return tree;
}

    normalizeTree(node: any, idPrefix: string) {

        node.id = this.getNodeId(node, idPrefix);
        node.toggled = this.toggleBookeeper.get(node.id) === true;
        if (Array.isArray(node.value)) {
            node.name = node.name;
            node.children = node.value

            node.children.forEach((item: any) => this.normalizeTree(item, node.id));
        }

        else if (!node.name.includes('=')) {
            node.name = node.name + " = " + node.value;
        }

        return node;
    }

    render() {
        return (
            <div className="component">

                <h3>Tree View:</h3>

                <div>
                    <TextField hintText=''
                        floatingLabelText='Search' value={this.state.filter}
                        onChange={this.onFilter} />
                </div>
                <div>
                    <IconButton tooltip="Copy Path" tooltipPosition="top-center" disabled={this.state.selectedNode == null} onClick={this.copyPath}>
                        <FontIcon className="material-icons">content_copy</FontIcon>
                    </IconButton>
                </div>

                <Treebeard data={this.buildTree(this.props.tree, '')}
                    onToggle={this.onToggle}
                    style={Style}
                    decorators={decorators} />
            </div>

        );
    }
};

const mapStateToProps = (state : State) => {


    return {
        tree: state.server.treeData,
    }
}

const mapDispatchToProps = (dispatch : Dispatch<State>) => {
    return {
        showMessage: (message : string) => dispatch(appActions.showMessageAction(message))
    }
}

  

export default connect(mapStateToProps,mapDispatchToProps)(TreeView);
