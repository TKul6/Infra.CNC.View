
import {Action} from './../action'

export const SHOW_MESSAGE = 'app/snackbar/show';
export const HIDE_MESSAGE = 'app/snackbar/hide';

export const hideMessageAction   = () :  Action =>{
    return {
        type : HIDE_MESSAGE
    }
}

export const showMessageAction = (message: string) : Action =>{
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
}
