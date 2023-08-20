import React, { Fragment, useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
// eslint-disable-next-line prettier/prettier
import type { RenderContext }  from 'vtex.render-runtime'
import { canUseDOM, Helmet, useRuntime } from 'vtex.render-runtime'

interface MetaTag {
  property: string
  content: string
}

const VTEX_STORE_APP = 'vtex.store'

function TwitterMetaTags() {
  const productContext: ProductContext = useContext(ProductContext)
  const runtime: RenderContext = useRuntime()
  const { getSettings } = runtime
  const { includeTwitterMetaTags, twitterCard, twitterUsername } = getSettings(
    VTEX_STORE_APP
  )

  if (!productContext.product || !includeTwitterMetaTags) {
    return null
  }

  const {
    product: { productName, description },
    selectedItem: {
      images: [firstImage],
    },
  } = productContext


  const protocol = canUseDOM && window.location.protocol
  const hostname = canUseDOM && window.location.hostname
  const pathname = canUseDOM && window.location.pathname
  const url = `${protocol}://${hostname}${pathname}`

  const metaTags: MetaTag[] = [
    { property: 'twitter:card', content: twitterCard },
    { property: 'twitter:site', content: twitterUsername.startsWith('@') ? twitterUsername : `@${twitterUsername}` },
    { property: 'twitter:title', content: productName },
    { property: 'twitter:description', content: description },
    { property: 'twitter:image', content: firstImage.imageUrl },
    { property: 'twitter:url', content: url },
  ]

  return (
    <Fragment>
      <Helmet meta={metaTags} />
    </Fragment>
  )
}

export default TwitterMetaTags
