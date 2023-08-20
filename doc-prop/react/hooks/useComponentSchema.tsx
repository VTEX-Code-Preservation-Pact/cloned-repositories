import { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import appAssetsQuery from '../graphql/appAssets.graphql'

const RENDER_MAJOR = 8

const useComponentSchema = (appId: string, componentName: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState<ComponentDataInterface | null>(null)
  const { fetchComponents } = useRuntime()
  const client = useApolloClient()

  useEffect(() => {
    client
      .query({
        query: appAssetsQuery,
        variables: { appId, renderMajor: RENDER_MAJOR },
      })
      .then(({ data }: any) => {
        const {
          appAssets: { componentsJSON, messagesJSON },
        } = data
        const assetsList = JSON.parse(componentsJSON)
        const messagesFetched = JSON.parse(messagesJSON)

        const componentAssets = assetsList.length > 0 && assetsList[0]
        if (!componentAssets) {
          console.error(`Couldnt load component's asset`)
        }
        return fetchComponents(assetsList[0]).then(() => ({
          componentAssets,
          messagesFetched,
        }))
      })
      .then(({ componentAssets, messagesFetched }: any) => {
        if (!window.__RENDER_8_COMPONENTS__) {
          setError(error)
        }
        const componentData =
          window.__RENDER_8_COMPONENTS__[`${appId}/${componentName}`]
        if (componentData?.schema) {
          setData({
            schema: componentData.schema.properties,
            messages: messagesFetched,
          })
        }
      })
      .catch((error: { msg: any }) => {
        setError(error.msg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    loading,
    error,
    data,
  }
}

export default useComponentSchema
