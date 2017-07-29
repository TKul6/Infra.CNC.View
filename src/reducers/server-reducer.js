import * as serverActions from './../actions/server-actions'

const initialState = {
    serverName: 'No Server Name'
}

export function serverReducer(state = initialState, action) {

    switch (action.type) {
        case serverActions.RENAME_SERVER_NAME:
            {
                return Object.assign({}, state, { serverName: action.payload });
                break;
            }
    }
    return state;

}