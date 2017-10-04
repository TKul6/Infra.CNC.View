import {AppState} from './reducers/app-reducer'

import {State as ServerState} from './reducers/server-reducer'

export interface State {
    app : AppState,
    server: ServerState

}