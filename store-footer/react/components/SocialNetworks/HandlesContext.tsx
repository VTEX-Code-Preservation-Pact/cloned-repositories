import { createCssHandlesContext } from 'vtex.css-handles'

import { CSS_HANDLES } from './index'

const { CssHandlesProvider, useContextCssHandles } = createCssHandlesContext(
  CSS_HANDLES
)

export {
  CssHandlesProvider as SocialNetworkHandlesProvider,
  useContextCssHandles as useSocialNetworkHandles,
}
