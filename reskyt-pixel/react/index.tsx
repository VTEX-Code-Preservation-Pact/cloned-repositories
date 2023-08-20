import { canUseDOM } from 'vtex.render-runtime'
import { reskytHtml } from './utils/reskyt'
import type { PixelMessage } from './typings/events'
import { getMobileUserAgent } from './utils/getMobileUserAgent'
import { getCookies } from './utils/getCookies'
import { checkConfiguration } from './utils/checkConfiguration'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      const mobileUserAgentLabel = getMobileUserAgent(navigator.userAgent)

      const hasConfig = checkConfiguration(window.__reskytSettings)

      if (!hasConfig) {
        console.error('Please configure Reskyt App settings')
      } else if (mobileUserAgentLabel) {
        const {
          reskytAppName,
          reskytFabName,
          reskytHtmlTitle,
          reskytDownloadLink,
          reskytAppImage,
          reskytAppImageAlt,
          reskytStorePrefix,
          reskytDownloadCTA
        } = window.__reskytSettings

        const appConfig = {
          htmlTitle: decodeURIComponent(reskytHtmlTitle),
          downloadLink: decodeURIComponent(reskytDownloadLink),
          appImage: decodeURIComponent(reskytAppImage),
          appImageAlt: decodeURIComponent(reskytAppImageAlt),
          appName: decodeURIComponent(reskytAppName),
          fabName: decodeURIComponent(reskytFabName),
          storePrefix: decodeURIComponent(reskytStorePrefix),
          downloadCTA: decodeURIComponent(reskytDownloadCTA)
        }

        const resky = reskytHtml(appConfig)
        const reskydocDOM = document
          .createRange()
          .createContextualFragment(resky)

        document.body.appendChild(reskydocDOM)
        const hasCookie =
          !!getCookies('is_app_install_bar') ||
          !!getCookies('reskyt-install-app')

        const nodeToShow = document.getElementById('href-download-app')
        const labelNode = document.getElementById('platform-app')

        if (!hasCookie && nodeToShow && labelNode) {
          labelNode.innerHTML = mobileUserAgentLabel
          nodeToShow.style.display = 'block'
        }
      }

      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
