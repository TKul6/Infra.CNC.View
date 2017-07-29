export const RENAME_SERVER_NAME = 'app/server/name/rename'
export const TREE_DATA_UPDATED = 'app/server/tree/update'

export const renameServerAction = (serverName) => {
    return {
        type: RENAME_SERVER_NAME,
        payload: serverName
    }
}

export const treeDataUpdatedAction = (data) => {
    return {
        type: TREE_DATA_UPDATED,
        payload: data
    }
}