'use strict';
import {TreeNode} from './../models/tree-node'


// Helper functions for filtering
export const defaultMatcher = (filterText: string, node: TreeNode<string>) => {
    return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const findNode = (node: TreeNode<string>, filter: string, matcher: any) : boolean =>  {
    return matcher(filter, node) || // i match
        (node.children && // or i have decendents and one of them match
        node.children.length &&
        !!node.children.find(child => findNode(child, filter, matcher)));
};

export const filterTree = (node: TreeNode<string>, filter: string, matcher = defaultMatcher): TreeNode<string> => {
    // If im an exact match then all my children get to stay
    if(matcher(filter, node) || !node.children){ return node; }
    // If not then only keep the ones that match or have matching descendants
    const filtered = node.children
      .filter(child => findNode(child, filter, matcher))
      .map(child => filterTree(child, filter, matcher));
    return Object.assign({}, node, { children: filtered });
};

export const expandFilteredNodes = (node: TreeNode<string>, filter: string, matcher = defaultMatcher) : TreeNode<string> =>  {
    let children = node.children;
    if(!children || children.length === 0){
      return Object.assign({}, node, { toggled: false });
    }
    const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
    const shouldExpand = childrenWithMatches.length > 0;
    // If im going to expand, go through all the matches and see if thier children need to expand
    if(shouldExpand){
      children = childrenWithMatches.map(child => {
          return expandFilteredNodes(child, filter, matcher);
      });
    }
    return Object.assign({}, node, {
      children: children,
      toggled: shouldExpand
    });
};

// Getting the XPath of the node in the tree
export const getPath = (root: TreeNode<string>, node: TreeNode<string>, path: string) : string => {

        if (root === node) {
            return path + '/' + node.name;
        }
        else if (root.children && root.children.length) {

            var currentPath = path + '/' + root.name;

            var result = null
            for (var childIndex = 0; childIndex < root.children.length && result == null; childIndex++) {
                result = getPath(root.children[childIndex],node,currentPath);
            }
        }
        return result;
    }