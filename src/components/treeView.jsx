/**
 * Created by Tomer on 15/10/2016.
 */
import React from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import Style from '../style/treeViewStyle.js';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import * as filters from './filter';
import copy from 'copy-to-clipboard';
import { connect } from 'react-redux';

/*Actions*/
import * as appActions from './../actions/app-actions';

decorators.Header = function (props) {

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
class TreeView extends React.Component {

    constructor(props) {
        super(props);
        this.toggleBookeeper = new Map();
        this.state = { filter: '', 
        selectedNode: null };
        this.onToggle = this.onToggle.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.copyPath = this.copyPath.bind(this);
        this.normalizeTree = this.normalizeTree.bind(this);
        this.getNodeId = this.getNodeId.bind(this);
        this.buildTree = this.buildTree.bind(this);
    }

    onFilter(e) {
        this.setState({ filter: e.target.value });
       }

    onToggle(node, toggled) {

        this.toggleBookeeper[node.id] = toggled;

        if (this.state.cursor) { this.state.cursor.active = false; }
        node.active = true;
        this.setState({ selectedNode: node });
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    copyPath(e) {
        var path = filters.getPath(this.props.tree, this.state.selectedNode);

        copy(path);

        this.props.showMessage(this.state.selectedNode.name + ' was copied');
    }

    getNodeId(node, idPrefix) {
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

buildTree(node,idPrefix){
    var tree = this.normalizeTree(node,idPrefix);

    if(this.state.filter){
        var filtered = filters.filterTree(this.props.tree, this.state.filter);
            filtered = filters.expandFilteredNodes(filtered, this.state.filter);
        tree = filtered;
    }

    return tree;
}

    normalizeTree(node, idPrefix) {

        node.id = this.getNodeId(node, idPrefix);
        node.toggled = this.toggleBookeeper[node.id] === true;
        if (Array.isArray(node.value)) {
            node.name = node.name;
            node.children = node.value

            node.children.forEach(item => this.normalizeTree(item, node.id));
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

const mapStateToProps = state => {


    return {
        tree: state.server.treeData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMessage: (message) => dispatch(appActions.showMessageAction(message))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TreeView)