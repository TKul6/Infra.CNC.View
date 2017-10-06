import {EventEmitter} from 'events'

export default interface IDataProviderService {

    connect(serverUrl : string) : Promise<any>;

    disconnect(): Promise<void>;

    getServerName() : Promise<string>

    dataEmitter : EventEmitter;
}