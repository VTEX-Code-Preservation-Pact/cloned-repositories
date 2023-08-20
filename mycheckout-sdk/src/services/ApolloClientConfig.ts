import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import type { Runtime } from '../interfaces'
import { Platform } from '../interfaces'

const searchEndpoint = (platform: string, workspace: string) => {
  switch (platform) {
    case Platform.vtexIo: {
      return `/_v/private/graphql/v1?workspace=${workspace}`
    }

    case Platform.vtexCms: {
      return `/api/io/_v/private/graphql/v1?workspace=${workspace}`
    }

    default: {
      return `/_v/private/graphql/v1?workspace=${workspace}`
    }
  }
}

const buildClient = (sandbox: boolean, runtime: Runtime) => {
  const httpLink = createHttpLink({
    uri: sandbox
      ? `https://${runtime.workspace}--${runtime.account}.myvtex.com/_v/private/graphql/v1?workspace=${runtime.workspace}`
      : searchEndpoint(runtime.platform, runtime.workspace),
    credentials: 'include',
  })

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default buildClient
