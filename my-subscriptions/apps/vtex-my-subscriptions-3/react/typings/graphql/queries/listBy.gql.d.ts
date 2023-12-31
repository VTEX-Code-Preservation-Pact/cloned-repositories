declare module '*/listBy.gql' {
  import { DocumentNode } from 'graphql'
  import {
    GroupOption,
    Subscription as ThinS,
  } from 'vtex.subscriptions-graphql'

  export interface Args {
    option: GroupOption
    value: string
  }

  export type Subscription = Pick<ThinS, 'id' | 'name' | 'status' | 'plan'> & {
    items: Array<{
      sku: {
        name: string
        imageUrl: string
        detailUrl: string
      }
    }>
  }

  export interface Result {
    list: Subscription[]
  }

  const value: DocumentNode
  export default value
}
