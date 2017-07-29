
export const SHOW_MESSAGE = 'app/snackbar/show';
export const HIDE_MESSAGE = 'app/snackbar/hide';

export const RENAME_SERVER_NAME = 'app/server/name/rename'

export const hideMessageAction = () =>{
    return {
        type : HIDE_MESSAGE
    }
}

export const showMessageAction = (message) =>{
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
}

export const renameServerAction  = (serverName) =>{
    return {
        type: RENAME_SERVER_NAME,
        payload : serverName
    }
}