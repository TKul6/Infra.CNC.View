import { IDataProviderService, SERVER_NAME_TOPIC, CNC_DATA_TOPIC} from './../core/interfaces/data-provider.service';
import { EventEmitter } from 'events';

import * as Wampy from 'wampy';



export class WampProviderService implements IDataProviderService {

    private _wampClient: Wampy;

    public emitter = new EventEmitter();

    public async connect(serverUrl: string): Promise<any> {

        return new Promise<void>(async (resolve, reject) => {
            try {
                this._wampClient = new Wampy(serverUrl);

                wampy.connect(serverUrl);
                this._wampClient.subscribe(CNC_DATA_TOPIC, (cncData :any) => {
                    
                                        this.emitter.emit(CNC_DATA_TOPIC,cncData);
                                    });
                resolve();

            }
            catch (e) {
                reject(e);
            }
        })
    }

    public disconnect(): Promise<void> {

        return new Promise<void>((resolve,reject) => {
            try {
                this._wampClient.disconnect();
                resolve();
            }
            catch (e) {
                reject(e);
            }
        })
   }

   public getServerName(): Promise<string> {
   
    if(this._wampClient == null) {
        throw new Error('Wamp client is not initialized, please invoke the connect() before invoking the getServerName()');
    }

    return new Promise<string>((resolve,reject) => {
        this._wampClient.call(SERVER_NAME_TOPIC,null,{onSuccess:(name: any) => resolve(name as string),
        onError: ((err: any) => reject(err))})
    });
}
}

