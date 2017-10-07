import {EventEmitter} from 'events'

export  interface IDataProviderService {

    connect(serverUrl : string) : Promise<void>;

    disconnect(): Promise<void>;

    getServerName() : Promise<string>

    emitter : EventEmitter;
}

export const CNC_DATA_TOPIC = 'cncData';
export const SERVER_NAME_TOPIC = 'infra.cnc.serverName';
