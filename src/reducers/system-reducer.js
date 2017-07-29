import * as systemActions from './../actions/system-actions'
const initialState = {
    snackbar: {
        isOpen: false,
        message: ''
    }
}

export function systemReducer(state = initialState, action) {

    switch (action.type) {
        case systemActions.SHOW_MESSAGE:
            return Object.assign({}, state, { snackbar: { isOpen: true, message: action.payload } });
            break;
        case systemActions.HIDE_MESSAGE:
            return Object.assign({}, state, { snackbar: { isOpen: false, message: '' } });
            break;
    }
    return state;

}