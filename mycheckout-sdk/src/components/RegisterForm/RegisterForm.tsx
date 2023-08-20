import type { Dispatch, SetStateAction } from 'react'
import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from '../shared'
import {
  selectUserRegistrationSections,
  setPaymentDataSection,
} from '../../contexts/global-context/reducers/checkoutFormSlice'
import LoadingProcessOrdeContainer from '../UserInfo/LoadingProcessOrder/LoadingProcessOrderContainer'
import PaymentForm from './PaymentForm'
import ProfileForm from './Profile/ProfileFormContainer'
import ShippingFormContainer from './Shipping/ShippingFormContainer'
import Summary from '../Summary'
import type { Item, Step } from '../../interfaces'
import UnavailableProductsContainer from '../UnavailableProducts/UnavailableProductsContainer'
import globalStyles from '../../myCheckout-styles.module.css'
import styles from './registerForm.css'
import type { ProfileMC } from '../../interfaces/orderForm'
import type {
  LogisticInfoSimulation,
  SimulationStatus,
} from '../../interfaces/simulation'
import PackagesContainer from '../LogisticsInfo/Packages/PackagesContainer'

interface Props {
  gateway: string
  isPickupPoint: boolean
  items: Item[]
  loadingOrder: boolean
  loadPaymentForm: boolean
  showEditButtonAddress: boolean
  steps: Step
  validateTriggerPayment: boolean
  handleGetDocumentsClient: (email: string) => void
  setSteps: Dispatch<SetStateAction<Step>>
  profile: ProfileMC
  logisticsInfo: LogisticInfoSimulation[]
  simulationStatus?: SimulationStatus
}

const RegisterForm = (props: Props) => {
  const {
    gateway,
    isPickupPoint,
    items,
    loadingOrder,
    loadPaymentForm,
    steps,
    handleGetDocumentsClient,
    // new Context
    profile,
    logisticsInfo,
    simulationStatus,
  } = props

  const userRegistrationSections = useSelector(selectUserRegistrationSections)
  const dispatchGlobal = useDispatch()

  useEffect(() => {
    if (!steps.payment) return
    const isPaymentList =
      (isPickupPoint && userRegistrationSections === 3) ||
      (!isPickupPoint && userRegistrationSections === 4)

    const isPaymentDetails =
      (isPickupPoint && userRegistrationSections === 4) ||
      (!isPickupPoint && userRegistrationSections === 5)

    dispatchGlobal(
      setPaymentDataSection(
        (isPaymentList && 'list') || (isPaymentDetails && 'details') || 'list'
      )
    )
  }, [userRegistrationSections, isPickupPoint, steps])

  return (
    <Fragment>
      {loadingOrder && <LoadingProcessOrdeContainer />}

      {profile.email ? (
        !loadingOrder && items.length ? (
          <div className={styles.resgisterFormContainer}>
            {steps.profile && !steps.shipping && <ProfileForm />}
            {steps.shipping && !steps.payment && (
              <ShippingFormContainer steps={steps} />
            )}
            {steps.logistic &&
              !steps.payment &&
              (simulationStatus !== 'loading' &&
              logisticsInfo &&
              logisticsInfo?.length > 0 ? (
                <PackagesContainer />
              ) : (
                <Loader text="store/checkoutless.loading.almostThere" />
              ))}
            {steps.payment && (
              <Fragment>
                {loadPaymentForm ? (
                  <Fragment>
                    <PaymentForm
                      gateway={gateway}
                      handleGetDocumentsClient={handleGetDocumentsClient}
                    />
                  </Fragment>
                ) : (
                  <Loader />
                )}
              </Fragment>
            )}
            <Summary
              isVisible={
                !(steps.logistic && !steps.payment && logisticsInfo?.length > 0)
              }
              className={globalStyles.inDesktop}
            />
          </div>
        ) : loadingOrder && items.length ? null : (
          <UnavailableProductsContainer />
        )
      ) : (
        <Loader />
      )}
    </Fragment>
  )
}

export default RegisterForm
