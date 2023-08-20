/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-restricted-globals */
import { canUseDOM } from 'vtex.render-runtime'

let fakeBtn: HTMLButtonElement

function updateWidgetSettings(o: Record<string, unknown>) {
  window.zE('webWidget', 'updateSettings', o)
}

function setWidgetLocale(locale: string) {
  window.zE('webWidget', 'setLocale', locale)
}

function waitChatToLoad(fn: Function) {
  window.zE(() => window.$zopim(fn))
}

function onWidgetClosed(fn: Function) {
  window.zE('webWidget:on', 'close', fn)
}

function openWidget() {
  window.zE.activate()
}

function shouldOpenChat() {
  const zdStore = JSON.parse(localStorage.getItem('ZD-store') || 'null')

  if (zdStore) {
    return zdStore.widgetShown
  }

  return localStorage.getItem('zdChatOpen') === 'true'
}

function identifySession() {
  const sessionPromise = window?.__RENDER_8_SESSION__?.sessionPromise

  if (!sessionPromise) return

  sessionPromise.then((session) => {
    const userEmail: string =
      session?.response?.namespaces?.profile?.email?.value || ''

    const firstName: string =
      session?.response?.namespaces?.profile?.firstName?.value || ''

    const lastName: string =
      session?.response?.namespaces?.profile?.lastName?.value || ''

    const userName = `${firstName} ${lastName}`.trim()

    if (userEmail || userName) {
      window.zE.identify({
        name: userName,
        email: userEmail,
      })
    }
  })
}

function bootstrap() {
  const {
    widget: widgetSettings,
    titlePathPreffix = '',
    useAnalytics = false,
    accountKey = null,
  } = window.__zendeskPixel

  const IS_MOBILE = window.__RUNTIME__.hints.mobile

  const chatTheme = widgetSettings.theme?.theme || widgetSettings.color?.theme
  const btnLabel = widgetSettings.theme?.launcherLabel || 'Chat'
  const btnBgColor = widgetSettings.theme?.launcherColor || chatTheme
  const btnTextColor = widgetSettings.theme?.launcherTextColor
  const btnPosition = widgetSettings.theme?.launcherPosition || 'right'
  const widgetZindex = widgetSettings.theme?.widgetZindex || '999998'

  function configureSnippetForVTEX() {
    window.zESettings = window.zESettings || {}
    window.zESettings.analytics = useAnalytics

    waitChatToLoad(() => {
      const curLocale = document.documentElement.lang

      setWidgetLocale(curLocale)

      const titlePath = `${titlePathPreffix}${document.title}`

      window.$zopim.livechat.sendVisitorPath({
        url: document.URL,
        title: titlePath,
      })

      onWidgetClosed(() => localStorage.setItem('zdChatOpen', 'false'))

      identifySession()
    })

    const helpCenterSuppress = widgetSettings.helpCenter.suppress
    const { departments } = widgetSettings.chat
    const enabled =
      departments.enabled?.map((value) => {
        const intValue = parseInt(value, 10)

        return !isNaN(intValue) ? intValue : value
      }) || []

    const select = isNaN(parseInt(departments.select, 10))
      ? departments.select
      : parseInt(departments.select, 10)

    const { tags } = departments

    updateWidgetSettings({
      webWidget: {
        color: {
          theme: chatTheme,
          launcher: btnBgColor,
          launcherText: btnTextColor,
        },
        position: { horizontal: btnPosition, vertical: 'bottom' },
        zIndex: widgetZindex,
        launcher: {
          label: { '*': btnLabel },
          chatLabel: { '*': btnLabel },
        },
        helpCenter: {
          suppress: helpCenterSuppress,
        },
        chat: {
          departments: {
            enabled,
            select,
            tags,
          },
        },
      },
    })
  }

  function addZDSnippet() {
    const script = document.createElement('script')

    if (fakeBtn) fakeBtn.disabled = true

    script.id = 'ze-snippet'
    script.async = true
    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${accountKey}`
    script.onload = () => {
      const intervalId = setInterval(() => {
        if (window?.zE?.activate == null) {
          return
        }

        clearInterval(intervalId)

        configureSnippetForVTEX()

        openWidget()

        if (fakeBtn) {
          document.body.removeChild(fakeBtn)
        }
      }, 400)
    }

    document.head.appendChild(script)
  }

  function addFakeButton() {
    fakeBtn = document.createElement('button')

    fakeBtn.id = 'zendesk-fake-btn'
    fakeBtn.innerHTML = `<svg id="zendesk-fake-icon" x="0" y="0" viewBox="0 0 15 16" xml:space="preserve" aria-hidden="true"><path d="M1.3,16c-0.7,0-1.1-0.3-1.2-0.8c-0.3-0.8,0.5-1.3,0.8-1.5c0.6-0.4,0.9-0.7,1-1c0-0.2-0.1-0.4-0.3-0.7c0,0,0-0.1-0.1-0.1 C0.5,10.6,0,9,0,7.4C0,3.3,3.4,0,7.5,0C11.6,0,15,3.3,15,7.4s-3.4,7.4-7.5,7.4c-0.5,0-1-0.1-1.5-0.2C3.4,15.9,1.5,16,1.5,16 C1.4,16,1.4,16,1.3,16z M3.3,10.9c0.5,0.7,0.7,1.5,0.6,2.2c0,0.1-0.1,0.3-0.1,0.4c0.5-0.2,1-0.4,1.6-0.7c0.2-0.1,0.4-0.2,0.6-0.1 c0,0,0.1,0,0.1,0c0.4,0.1,0.9,0.2,1.4,0.2c3,0,5.5-2.4,5.5-5.4S10.5,2,7.5,2C4.5,2,2,4.4,2,7.4c0,1.2,0.4,2.4,1.2,3.3 C3.2,10.8,3.3,10.8,3.3,10.9z"></path></svg><span>${btnLabel}</span>`

    fakeBtn.className =
      'flex items-center justify-center b br-pill bg-base--inverted c-on-base--inverted pointer'

    if (btnTextColor) fakeBtn.style.color = btnTextColor
    if (btnBgColor) fakeBtn.style.backgroundColor = btnBgColor

    fakeBtn.addEventListener('click', () => {
      localStorage.setItem('zdChatOpen', 'true')
      addZDSnippet()
    })

    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
        #zendesk-fake-btn {
          position: fixed;
          ${btnPosition}: 0;
          bottom: 0;
          margin: 15px 20px;
          ${IS_MOBILE ? 'padding: .9em;' : 'padding: .9em 1.5em;'}
          opacity: 1;
          border: 0px;
          z-index: ${widgetZindex};
          font-size: 15px;
          -webkit-appearance: none;
        }
        #zendesk-fake-icon {
          ${!IS_MOBILE ? 'padding-right: 0.57143em;' : ''}
          fill: currentColor;
          width: 1.42em;
          height: 1.42em;
        }
        #zendesk-fake-btn span {
          font-size: 1.1em;
          ${IS_MOBILE ? `display: none;` : ''}
        }
      </style>`
    )

    document.body.appendChild(fakeBtn)
  }

  if (shouldOpenChat()) {
    addZDSnippet()
  } else {
    addFakeButton()
  }
}

if (canUseDOM && window.__zendeskPixel) {
  bootstrap()
}
