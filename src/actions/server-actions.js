export const RENAME_SERVER_NAME = 'app/server/name/rename'

export const renameServerAction  = (serverName) =>{
    return {
        type: RENAME_SERVER_NAME,
        payload : serverName
    }
}