import * as appActions from './../actions/app-actions'
const initialState = {
    snackbar: {
        isOpen: false,
        message: ''
    },
}

export function appReducer(state = initialState, action) {

    switch (action.type) {
        case appActions.SHOW_MESSAGE:
            {
                return Object.assign({}, state, { snackbar: { isOpen: true, message: action.payload } });
                break;
            }
        case appActions.HIDE_MESSAGE:
            {
                return Object.assign({}, state, { snackbar: { isOpen: false, message: '' } });
                break;
            }
        case appActions.RENAME_SERVER_NAME:
            {
                return Object.assign({}, state, { serverName: action.payload });
                break;
            }
    }
    return state;

}