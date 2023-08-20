import React, { Fragment } from 'react'

import { Input, Button, Loader } from '../shared'
import { regularExpressions } from '../../utils'
import { MyProfile } from '../Icons'
import global from '../../myCheckout-styles.module.css'
import styles from './emailForm.css'
import Email from '../Icons/Email'
import { ErrorLoadingInformation } from './ErrorLoadingInformation'

interface Props {
  showErrorMessage: boolean
  setShowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>
  handleKeyUpevent: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  loading: boolean
  email: any
  handleClick: () => void
  disabled: boolean
}

const EmailForm = (props: Props) => {
  const {
    showErrorMessage,
    setShowErrorMessage,
    handleKeyUpevent,
    loading,
    email,
    handleClick,
    disabled,
  } = props

  return (
    <div className={styles.emailFormContainer}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.emailFormContent}>
          {showErrorMessage ? (
            <ErrorLoadingInformation
              handleClick={() => setShowErrorMessage(false)}
            />
          ) : (
            <Fragment>
              <Input
                type="email"
                placeholder="store/checkoutless.register.email"
                errorMessage="store/checkoutless.register.emailError"
                regularExpression={regularExpressions.email}
                name="email"
                onCustomKeyUpEvent={handleKeyUpevent}
                {...email}
                icon={
                  <Fragment>
                    <MyProfile
                      fill={global.iconAlternative}
                      width={18}
                      height={18}
                      className={global.inMobile}
                    />
                    <Email
                      className={global.inDesktop}
                      fill={global.iconAlternative}
                    />
                  </Fragment>
                }
                showClearButton={true}
                maxLength={50}
              />
              <Button
                value={
                  loading
                    ? 'store/checkoutless.button.loading'
                    : 'store/checkoutless.button.continue'
                }
                onClick={() => handleClick()}
                disabled={disabled}
              />
            </Fragment>
          )}
        </div>
      )}
    </div>
  )
}

export default EmailForm
