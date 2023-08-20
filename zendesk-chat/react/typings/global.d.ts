/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
import type { useRuntime } from 'vtex.render-runtime'

export {}

declare global {
  interface Window {
    __RUNTIME__: ReturnType<typeof useRuntime>

    __RENDER_8_SESSION__: {
      sessionPromise: Promise<{ response: any }>
    }

    __zendeskPixel: {
      widget: {
        // @deprecated. Use `theme`
        color?: {
          theme: string
        }
        theme: {
          launcherLabel: string
          launcherColor: string
          launcherTextColor: string
          launcherPosition: string
          theme: string
          widgetZindex: string
        }
        helpCenter: {
          suppress: unknown
        }
        chat: {
          departments: {
            enabled: string[]
            select: string
            tags: string[]
          }
        }
      }
      titlePathPreffix: string
      useAnalytics: boolean
      accountKey: string
    }

    zESettings: ZendeskSettings
    zE: ZendeskWidget

    $zopim: {
      (arg: Function): unknown
      livechat: {
        sendVisitorPath: Function
      }
    }
  }
}
