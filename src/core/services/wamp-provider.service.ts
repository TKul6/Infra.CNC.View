import { IDataProviderService, SERVER_NAME_TOPIC, CNC_DATA_TOPIC } from './../interfaces/data-provider.service';
import { EventEmitter } from 'events';
import * as Wampy from 'wampy';

export class WampProviderService implements IDataProviderService {

    private _wampClient: Wampy;

    private _isConnected = false;


    public isConnected(): boolean {
        return this._isConnected;
    }

    public emitter = new EventEmitter();

    public async connect(serverUrl: string): Promise<any> {

        return new Promise<void>(async (resolve, reject) => {
            try {

                const options: WampyOptions = this.getWampOptions(resolve, reject);

                this._wampClient = new Wampy(serverUrl, options)

            }
            catch (e) {
                debugger;
                reject(e);
            }
        })
    }

    public disconnect(): Promise<void> {

        return new Promise<void>((resolve, reject) => {
            try {
                this._wampClient.disconnect();
                this._isConnected = false;

                this.emitter.removeAllListeners();

                resolve();
            }
            catch (e) {
                debugger;
                reject(e);
            }
        })
    }

    public getServerName(): Promise<string> {

        if (!this.isConnected()) {
            throw new Error('Wamp client is not initialized, please invoke the connect() before invoking the getServerName()');
        }

        return new Promise<string>((resolve, reject) => {

            this._wampClient.call('infra.cnc.serverName', null, {
                onSuccess: (name: any) => {
                    resolve(name as string)
                },
                onError: ((err: any) => {

                    console.log(`Failed to get server name. ${err}`)
                    reject(err);
                })

            })
        });
    }

    private getWampOptions(resolve: Function, reject: Function): WampyOptions {
        const options: WampyOptions = {
            onConnect: () => {

                this._wampClient.subscribe(CNC_DATA_TOPIC, (cncData: any) => {

                    this.emitter.emit(CNC_DATA_TOPIC, cncData);
                });

                this._isConnected = true;
                resolve();
            },
            onError: () => {
                console.log('Failed to connect to WAMP server');
                if (!this._isConnected) { //Indicates an error during connect
                    reject('Falied to connect to WAMP server due to unknown error');
                }
            },
            realm: 'infra.cncService.simulator',
            autoReconnect: false
        }

        return options;
    }
}

