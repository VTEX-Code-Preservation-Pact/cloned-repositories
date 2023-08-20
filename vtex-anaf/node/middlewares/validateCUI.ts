import {json} from 'co-body'
import {getSettings} from '../utils/helpers'

export async function validateCUI(ctx: Context, next: () => Promise<any>) {

    const body = await json(ctx.req)
    const settings = await getSettings(ctx)

    const allowEdit = settings.allowEdit ? settings.allowEdit : false
    const allowContinue = settings.allowContinue ? settings.allowContinue : false
    const apiKeyListaFirme = settings.listaFirme ? settings.listaFirme : ''

    const {
        clients: {anaf: client},
    } = ctx

    let output = {
        address: '',
        allowContinue,
        allowEdit,
        cui: body.cui,
        error: false,
        errorMessage: '',
        isActive: false,
        name: '',
        nrRegCom: '',
        phone: '',
    }

    const response = await client.validateCuiAnaf(body)
    if (response.cod === 200 && response.found.length) {
        const company = response.found[0]
        output = {
            ...output,
            address: company.adresa,
            error: company.statusInactivi || !company.denumire,
            isActive: !company.statusInactivi,
            name: company.denumire,
            nrRegCom: company.nrRegCom,

            phone: company.telefon,
        }
    } else {
        if (apiKeyListaFirme) {
            const listaFirmeData = {
                Address: '',
                Mobile: '',
                Name: '',
                RegNo: '',
                Status: '',
                TaxCode: body.cui,
            }

            const responseListaFirme = await client.validateCuiListaFirme(apiKeyListaFirme, listaFirmeData)
            if (responseListaFirme.hasOwnProperty('error')) {
                output = {
                    ...output,
                    error: true,
                    errorMessage: responseListaFirme.error,
                }
            } else {
                output = {
                    ...output,
                    address: responseListaFirme.Address,
                    error: responseListaFirme.Status !== 'functiune',
                    errorMessage: responseListaFirme.Status !== 'functiune' ? 'Compania este inactiva' : '',
                    isActive: responseListaFirme.Status === 'functiune',
                    name: responseListaFirme.Name,
                    nrRegCom: responseListaFirme.RegNo,
                    phone: responseListaFirme.Mobile[0] ?? '',
                }
            }

        } else {
            output = {
                ...output,
                error: true,
                errorMessage: 'Couldn\'t get company info',
            }
        }
    }


    ctx.status = 200
    ctx.body = output

    await next()
}
