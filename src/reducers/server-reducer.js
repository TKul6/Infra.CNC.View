import * as serverActions from './../actions/server-actions'
import * as tempDataSource from './../api.js';
const initialState = {
    serverName: 'No Server Name',
    treeData: tempDataSource
}

export function serverReducer(state = initialState, action) {

    switch (action.type) {
        case serverActions.RENAME_SERVER_NAME:
            {
                return Object.assign({}, state, { serverName: action.payload });
                break;
            }
        case serverActions.TREE_DATA_UPDATED:{

                return Object.assign({}, state, { treeData: action.payload });
                break;
        }
    }
    return state;

}