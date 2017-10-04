import {Action} from './../../../ext/action'

import * as serverActions from './../actions/server-actions'


export interface State {
    serverName: string,
    treeData : Object
}


let initialState : State = {
    serverName: 'No Server Name',
    treeData: {name: 'No data', value : 'No Data'}
}

export function serverReducer(state = initialState, action : Action) {

    switch (action.type) {
        case serverActions.RENAME_SERVER_NAME:
            {
                return Object.assign({}, state, { serverName: action.payload });
                
            }
        case serverActions.TREE_DATA_UPDATED:{

                return Object.assign({}, state, { treeData: action.payload });
        }
    }
    return state;

}