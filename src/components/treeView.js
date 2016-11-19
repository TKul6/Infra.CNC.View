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
import  copy from 'copy-to-clipboard';

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
export default class TreeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchPaese: '', data: this.props.data, selectedNode : null};
        this.onToggle = this.onToggle.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.copyPath = this.copyPath.bind(this);
    }

    onFilter(e) {
        this.setState({ searchPaese: e.target.value });
        const filter = e.target.value.trim();
        if (filter) {
            var filtered = filters.filterTree(this.props.data, filter);
            filtered = filters.expandFilteredNodes(filtered, filter);
            this.setState({ data: filtered });
        }
        else {
            this.setState({ data: this.props.data })
        }
    }

    onToggle(node, toggled) {
        if (this.state.cursor) { this.state.cursor.active = false; }
        node.active = true;
        this.setState({selectedNode: node});
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node});
    }

    copyPath(e) {
        var path = filters.getPath(this.props.data,this.state.selectedNode,'');

        copy(path);
    }

    render() {
        return (
            <div className="component">

                <h3>Tree View:</h3>

<div>
                <TextField hintText=''
                    floatingLabelText='Search' value={this.state.searchPaese}
                    onChange={this.onFilter} />
</div>
<div>
      <IconButton tooltip="Copy Path"  tooltipPosition="top-center" disabled={this.state.selectedNode == null} onClick={this.copyPath}>
      <FontIcon className="material-icons">content_copy</FontIcon>
    </IconButton>
      </div>          

                <Treebeard data={this.state.data}
                    onToggle={this.onToggle}
                    style={Style}
                    decorators={decorators} />
            </div>
        );
    }
};

