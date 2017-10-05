import {Action} from './../action'

export const RENAME_SERVER_NAME = 'app/server/name/rename'
export const TREE_DATA_UPDATED = 'app/server/tree/update'

export const renameServerAction = (serverName : string) : Action => {
    return {
        type: RENAME_SERVER_NAME,
        payload: serverName
    }
}

export const treeDataUpdatedAction = (data : any) :Action => {
    return {
        type: TREE_DATA_UPDATED,
        payload: data
    }
}