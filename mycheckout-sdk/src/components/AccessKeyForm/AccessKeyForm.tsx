import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import React from 'react'
import type { IntlShape } from 'react-intl'

import useFormatMessage from '../../i18n/useFormatMessage'
import { Error } from '../Icons'
import { MessageResendAwait } from './Messages/MessageResendAwait'
import { MessageAwaitFullPage } from './Messages/MessageAwaitFullPage'
import global from '../../myCheckout-styles.module.css'
import styles from './accessKeyForm.css'

interface Props {
  error: boolean
  handleClick: () => void
  intl: IntlShape
  inputAuto: MutableRefObject<any>
  isLite: boolean
  onChangeValue: (newValue: string, index: number) => void
  onRemove: (key: string, index: number) => void
  refInput: any[]
  setCompletedValue: Dispatch<SetStateAction<string>>
  value: string[]
  canSendCode: boolean
  showInputsCode: boolean
  second: number
}

const AccessKeyForm = (props: Props) => {
  const {
    error,
    handleClick,
    intl,
    inputAuto,
    isLite,
    onChangeValue,
    onRemove,
    refInput,
    setCompletedValue,
    value,
    canSendCode,
    showInputsCode,
    second,
  } = props

  return (
    <div className={styles.accessKeyContainer}>
      {showInputsCode ? (
        <div className={styles.accessKeyContent}>
          {error && (
            <div className={`${styles.accessKeyIconContent}`}>
              <Error className={global.inMobile} width={27} height={27} />
            </div>
          )}
          <div className={styles.accessKeyTitleContent}>
            {!error && (
              <p className={styles.accessKeyTitle}>
                {intl.formatMessage({
                  id: 'store/checkoutless.accessKey.message',
                })}
              </p>
            )}
            {error && (
              <p className={styles.accessKeyTitle}>
                {intl.formatMessage({
                  id: 'store/checkoutless.accessKey.messageError',
                })}
              </p>
            )}
          </div>
          <div style={{ display: 'none' }}>
            <input
              required
              onChange={(e) => setCompletedValue(e.currentTarget.value)}
              maxLength={6}
              ref={inputAuto}
            />
          </div>
          <div className={styles.accessKeyInputContent}>
            <input
              className={`${error && styles.accessKeyError} ${
                styles.accessKeyInput
              }`}
              ref={(input) => {
                refInput[0] = input
              }}
              value={value[0]}
              onChange={({ target }) => onChangeValue(target.value, 0)}
              type="number"
              autoComplete="one-time-code"
            />
            <input
              className={`${error && styles.accessKeyError} ${
                styles.accessKeyInput
              }`}
              ref={(input) => {
                refInput[1] = input
              }}
              value={value[1]}
              onChange={({ target }) => onChangeValue(target.value, 1)}
              onKeyUp={({ key }) => onRemove(key, 1)}
              type="number"
            />
            <input
              className={`${error && styles.accessKeyError} ${
                styles.accessKeyInput
              }`}
              ref={(input) => {
                refInput[2] = input
              }}
              value={value[2]}
              onChange={({ target }) => onChangeValue(target.value, 2)}
              onKeyUp={({ key }) => onRemove(key, 2)}
              type="number"
            />
            <input
              className={`${error && styles.accessKeyError} ${
                styles.accessKeyInput
              }`}
              ref={(input) => {
                refInput[3] = input
              }}
              value={value[3]}
              onChange={({ target }) => onChangeValue(target.value, 3)}
              onKeyUp={({ key }) => onRemove(key, 3)}
              type="number"
            />
            <input
              className={`${error && styles.accessKeyError} ${
                styles.accessKeyInput
              }`}
              ref={(input) => {
                refInput[4] = input
              }}
              value={value[4]}
              onChange={({ target }) => onChangeValue(target.value, 4)}
              onKeyUp={({ key }) => onRemove(key, 4)}
              type="number"
            />
            <input
              className={`${error && styles.accessKeyError} ${
                styles.accessKeyInput
              }`}
              ref={(input) => {
                refInput[5] = input
              }}
              value={value[5]}
              onChange={({ target }) => onChangeValue(target.value, 5)}
              onKeyUp={({ key }) => onRemove(key, 5)}
              type="number"
            />
          </div>
          {!error && (
            <div className={styles.accessKeySendContainer}>
              <MessageResendAwait
                {...{
                  canSendCode,
                  handleClick,
                  isLite,
                  second,
                  message: useFormatMessage(
                    'store/checkoutless.accessKey.question'
                  ),
                }}
              ></MessageResendAwait>
            </div>
          )}
          {error && (
            <MessageResendAwait
              {...{
                canSendCode,
                handleClick,
                isLite,
                second,
                message: useFormatMessage(
                  'store/checkoutless.accessKey.question'
                ),
              }}
            ></MessageResendAwait>
          )}
        </div>
      ) : (
        <MessageAwaitFullPage
          {...{ canSendCode, second, handleClick, isLite }}
        ></MessageAwaitFullPage>
      )}
    </div>
  )
}

export default AccessKeyForm
