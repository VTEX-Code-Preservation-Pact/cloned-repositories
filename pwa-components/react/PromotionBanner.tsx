import React, { FC, useCallback } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, InjectedIntlProps, intlShape } from 'react-intl'

// @ts-ignore
import { Button } from 'vtex.styleguide'

// @ts-ignore
import { usePWA } from 'vtex.store-resources/PWAContext'

const propTypes = {
  intl: intlShape,
  type: PropTypes.oneOf(['install', 'push-notification']),
  onDismiss: PropTypes.func,
}

const CONSTANTS = {
  TYPE_INSTALL: 'install',
  TYPE_PUSH_NOTIFICATION: 'push-notification',
  INSTALL_TITLE: 'store/promotion-banner.install.title',
  INSTALL_DESCRIPTION: 'store/promotion-banner.install.description',
  INSTALL_ACCEPT_BUTTON_LABEL:
    'store/promotion-banner.install.button-accept.label',
  PUSH_NOTIFICATION_TITLE: 'store/promotion-banner.push-notification.title',
  PUSH_NOTIFICATION_DESCRIPTION:
    'store/promotion-banner.push-notification.description',
  PUSH_NOTIFICATIONS_ACCEPT_BUTTON_LABEL:
    'store/promotion-banner.push-notification.button-accept.label',
  DISMISS_BUTTON_LABEL: 'store/promotion-banner.button-dismiss.label',
}

type Props = PropTypes.InferProps<typeof propTypes>

const PromotionBanner: FC<Props & InjectedIntlProps> = ({
  intl,
  type = 'install',
  onDismiss,
}) => {
  const { showInstallPrompt = null } = usePWA() || {}

  const handleDismiss = useCallback(async () => {
    if (type === CONSTANTS.TYPE_INSTALL)
      localStorage.setItem('webAppInstallDismissed', 'true')
    else localStorage.setItem('pushNotificationsDismissed', 'true')

    if (onDismiss) {
      onDismiss()
    }
  }, [type, onDismiss])

  const handleAccept = useCallback(() => {
    if (type === CONSTANTS.TYPE_INSTALL) {
      showInstallPrompt()
    }
  }, [type, showInstallPrompt])

  return (
    <div className="pa6 br2 bg-muted-5 mb8 mw5 w-80-ns w-90 center fr-l">
      <p className="t-body">
        {intl.formatMessage({
          id:
            type === CONSTANTS.TYPE_INSTALL
              ? CONSTANTS.INSTALL_TITLE
              : CONSTANTS.PUSH_NOTIFICATION_TITLE,
        })}
      </p>
      <p className="t-small c-muted-1">
        {intl.formatMessage({
          id:
            type === CONSTANTS.TYPE_INSTALL
              ? CONSTANTS.INSTALL_DESCRIPTION
              : CONSTANTS.PUSH_NOTIFICATION_DESCRIPTION,
        })}
      </p>
      <Button onClick={handleDismiss} variation="tertiary" size="small">
        {intl.formatMessage({
          id: CONSTANTS.DISMISS_BUTTON_LABEL,
        })}
      </Button>
      <Button onClick={handleAccept} size="small">
        {intl.formatMessage({
          id:
            type === CONSTANTS.TYPE_INSTALL
              ? CONSTANTS.INSTALL_ACCEPT_BUTTON_LABEL
              : CONSTANTS.PUSH_NOTIFICATIONS_ACCEPT_BUTTON_LABEL,
        })}
      </Button>
    </div>
  )
}

PromotionBanner.propTypes = propTypes

export default injectIntl(PromotionBanner)
