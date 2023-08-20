import React from 'react'
import { useDispatch } from 'react-redux'

import { Alert, Button, HabeasData, Input } from '../../shared'
import { MyData, MyOrder } from '../../Icons'
import { regularExpressions } from '../../../utils'
import { setNextSection } from '../../../contexts/global-context/reducers/checkoutFormSlice'
import { Toast } from '../../shared/Toast/Toast'
import InfoItem from '../../shared/InfoItem'
import type { Message } from '../../shared/interfaces/interfaces'
import type { Section } from '../../../interfaces/StepsAndSections'
import globalStyles from '../../../myCheckout-styles.module.css'
import gridCss from '../../../grid.module.css'
import Title from '../../shared/Title'
import type { ProfileMC } from '../../../interfaces/orderForm'
import profileFormJson from './profileFormFields.json'
import type { InputValue } from '../../../interfaces'

interface Props {
  disabled: boolean
  document: InputValue
  email: InputValue
  firstName: InputValue
  hasError: boolean
  isEdit: boolean
  isLiteVersion: boolean
  isMobile: boolean
  lastName: InputValue
  loadingUser: boolean
  phone: InputValue
  profile: ProfileMC
  section: Section
  showHabeasData: boolean
  toastMessage?: Message
  handleClick: () => void
  handleContinue: () => void
  handleKeyUpevent: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

export const ProfileForm = (props: Props) => {
  const dispatchGlobal = useDispatch()

  const {
    disabled,
    handleClick,
    handleKeyUpevent,
    hasError,
    isEdit,
    loadingUser,
    showHabeasData,
    toastMessage,
  } = props

  return (
    <div>
      <Toast toastMessage={toastMessage} onClose={handleClick} />
      <div
        className={`${globalStyles.marginBottom} ${globalStyles.titleContainer}`}
      >
        <Title>
          <Title.Item title="store/checkoutless.summary.myPersonalData">
            <MyData fill={globalStyles.iconAlternativeSecondary} />
          </Title.Item>

          <InfoItem
            className={globalStyles.inMobileFlex}
            firstAction={() => dispatchGlobal(setNextSection('summary'))}
          >
            <InfoItem.Icon>
              <MyOrder
                fill={globalStyles.iconAlternative}
                height={24}
                width={24}
              />
            </InfoItem.Icon>
            <InfoItem.Content text="store/checkoutless.summary.myOrder" />
          </InfoItem>
        </Title>
      </div>
      <div className={gridCss.gridFormTwoCols}>
        {profileFormJson.map(
          ({
            type,
            name,
            errorMessage,
            disabled: inputDisabled,
            placeholder,
            maxLength,
          }) => (
            <div
              className={globalStyles.marginBottom}
              data-col={name === 'email' && `two-col`}
            >
              <Input
                type={type}
                placeholder={placeholder}
                errorMessage={errorMessage}
                regularExpression={regularExpressions[name]}
                name={name}
                disabled={name === 'document' ? isEdit : inputDisabled}
                maxLength={maxLength}
                handleKeyUpevent={handleKeyUpevent}
                {...props[name]}
              />
            </div>
          )
        )}
      </div>
      {showHabeasData && <HabeasData />}
      {hasError && (
        <Alert type="error" text="store/checkoutless.generalError" />
      )}
      <div className={globalStyles.marginBottom}>
        {!isEdit && (
          <Button
            value={
              loadingUser
                ? 'store/checkoutless.button.loading'
                : 'store/checkoutless.button.continue'
            }
            onClick={handleClick}
            disabled={disabled}
          />
        )}
        {isEdit && (
          <div className={globalStyles.actionButtonContainer}>
            <Button
              value={
                loadingUser
                  ? 'store/checkoutless.button.loading'
                  : 'store/checkoutless.button.save'
              }
              onClick={handleClick}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  )
}
