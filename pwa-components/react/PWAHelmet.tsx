import React, { FC } from 'react'
import PropTypes from 'prop-types'

// @ts-ignore
import { Helmet, useRuntime } from 'vtex.render-runtime'

const propTypes = {
  appId: PropTypes.string.isRequired,
}

type Props = PropTypes.InferProps<typeof propTypes>

const PWAHelmet: FC<Props> = ({ appId }) => {
  const { rootPath = '' } = useRuntime()

  return (
    <Helmet
      meta={[
        { name: 'theme-color', content: '#F71963' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
      ]}
      script={[
        {
          type: 'text/javascript',
          src: `${rootPath}/pwa/workers/register.js?scope=${encodeURIComponent(
            rootPath
          )}`,
          defer: true,
        },
      ]}
      link={[
        {
          rel: 'manifest',
          href: `${rootPath}/pwa/manifest.json?app=${appId}`,
        },
      ]}
    />
  )
}

PWAHelmet.propTypes = propTypes

export default PWAHelmet
