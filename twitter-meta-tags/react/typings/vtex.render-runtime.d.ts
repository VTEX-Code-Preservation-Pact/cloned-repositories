declare module 'vtex.render-runtime' {
  export { Helmet } from 'react-helmet'

  export const canUseDOM: boolean

  export interface RenderContext {
    getSettings: (app: string) => AppSettings
  }

  export function useRuntime(): RenderContext
}

interface AppSettings {
  includeTwitterMetaTags: boolean
  twitterCard: string
  twitterUsername: string
}
