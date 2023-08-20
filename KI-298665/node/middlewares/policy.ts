// import type { EventContext } from '@vtex/api'
// import type { Clients } from '../clients'
import { json } from 'co-body'

export async function policy(ctx: Context) {
    const {
        clients: { logistics: logistics },
    } = ctx
    ctx.set('Access-Control-Allow-Origin', '*')
    try {
        const bodyRequest = await json(ctx.req)
        const {account, shippingMethod} = bodyRequest

        const shippingPolicyResult = await logistics.shippingPolicies(
            shippingMethod, account
        )

        shippingPolicyResult.shippingMethod = `${shippingPolicyResult.shippingMethod}-${Math.floor(Math.random() * 100)}`

        await logistics.updateShippingPolicy(shippingMethod, account, shippingPolicyResult)

        ctx.body = "OK"
    } catch (error) {
        console.log("Error:")
        console.error(error)
        ctx.body
    }
}