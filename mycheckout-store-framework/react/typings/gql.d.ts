declare module '*.gql' {
  import type { DocumentNode } from 'graphql'

  const Schema: DocumentNode

  export default Schema
}

declare module '*.graphql' {
  import type { DocumentNode } from 'graphql'

  const schema: DocumentNode

  export default Schema
}

interface Runtime {
  production: boolean
  account: string
  workspace: string
  culture: {
    language: string
  }
  query: {
    theme: string
  }
  platform: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __RUNTIME__: Runtime
