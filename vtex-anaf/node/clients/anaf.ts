import {ExternalClient, InstanceOptions, IOContext} from '@vtex/api'

import { getCurrentDate } from '../utils/functions'

export default class Anaf extends ExternalClient {

    constructor(context: IOContext, options?: InstanceOptions) {
        super('', context, options)
    }

    public async validateCuiAnaf(body: any): Promise<any> {
        const postBody = [
            {
                cui: body.cui,
                data: getCurrentDate(),
            },
        ]

        return this.http.post(
            `http://webservicesp.anaf.ro/PlatitorTvaRest/api/v5/ws/tva`,
            postBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Vtex-Use-Https': true,
                },
            })
    }

    public async validateCuiListaFirme(key: any, body: any): Promise<any> {
        return this.http.post(
            `https://www.listafirme.ro/api/info-v1.asp?key=${key}&data=${JSON.stringify(body)}`,
            {}, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Vtex-Use-Https': true,
                },
            })
    }

}
