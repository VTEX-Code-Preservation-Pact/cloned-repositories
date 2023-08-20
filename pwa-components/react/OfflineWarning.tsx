import React, { FC } from 'react'
import { Button, EmptyState } from 'vtex.styleguide'
import { injectIntl, intlShape, InjectedIntlProps } from 'react-intl'
import PropTypes from 'prop-types'

const propTypes = {
  intl: intlShape,
}

type Props = PropTypes.InferProps<typeof propTypes>

const OfflineWarning: FC<Props & InjectedIntlProps> = ({ intl }) => {
  const handleReload = () => {
    if (window && window.location) {
      window.location.reload()
    }
  }

  return (
    <EmptyState
      title={intl.formatMessage({ id: 'store/offline-warning.title' })}
    >
      <p>{intl.formatMessage({ id: 'store/offline-warning.message' })}</p>
      <div className="pt5">
        <Button variation="secondary" size="small" onClick={handleReload}>
          <span className="flex align-baseline">
            {intl.formatMessage({ id: 'store/offline-warning.button' })}
          </span>
        </Button>
      </div>
    </EmptyState>
  )
}

OfflineWarning.propTypes = propTypes

export default injectIntl(OfflineWarning)
