import * as appActions from './../actions/app-actions'
import {Action} from './../../../ext/action';
import {SnackbarState} from './../snackbar-state'

export interface AppState {
    snackbar : SnackbarState
}

let initState: AppState =  {
    snackbar: {
        isOpen: false,
        message: ''
    }
}

export function appReducer(state: AppState = initState, action : Action) {
    switch (action.type) {
        case appActions.SHOW_MESSAGE:
            {
                return Object.assign({}, state, { snackbar: { isOpen: true, message: action.payload } });
                
            }
        case appActions.HIDE_MESSAGE:
            {
                return Object.assign({}, state, { snackbar: { isOpen: false, message: '' } });
                
            }
      
    }
    return state;

}