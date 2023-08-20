import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'

import { Input, Select, Button, Alert } from '../../shared'
import { Add, LiteLocation, MyOrder } from '../../Icons'
import useFormatMessage from '../../../i18n/useFormatMessage'
import type { SelectValue, InputValue } from '../../../interfaces'
import { regularExpressions } from '../../../utils'
import global from '../../../myCheckout-styles.module.css'
import styles from './shippingForm.css'
import Title from '../../shared/Title'
import InfoItem from '../../shared/InfoItem'
import { setNextSection } from '../../../contexts/global-context/reducers/checkoutFormSlice'

interface LocationError {
  error: boolean
  idMessage: string
}

interface StateCities {
  label: string
  value: string
  postalCode: string
}

interface Props {
  activeLocation: boolean
  canAddAddress: boolean
  complement: InputValue
  disabled: boolean
  formatedStateCities: StateCities[]
  hasError: boolean
  imgUrl: string
  loading: boolean
  loadingCities: boolean
  loadingGeoCoordinates: boolean
  locationError: LocationError
  neighborhood: InputValue
  stateCity: SelectValue
  street: InputValue
  userLocation: boolean
  formAction: 'none' | 'add' | 'edit'
  addressValidation: () => void
  getLocation: () => void
  handleClick: () => void
  handleKeyUpevent: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleKeyUpeventStreet: (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onInputChangeCities: (newValue: string) => void
  setActiveLocation: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingGeoCoordinates: React.Dispatch<React.SetStateAction<boolean>>
}

const ShippingForm = (props: Props) => {
  const {
    activeLocation,
    canAddAddress,
    complement,
    disabled,
    formatedStateCities,
    hasError,
    imgUrl,
    loading,
    loadingCities,
    loadingGeoCoordinates,
    locationError,
    neighborhood,
    stateCity,
    street,
    userLocation,
    formAction,
    addressValidation,
    getLocation,
    handleClick,
    handleKeyUpeventStreet,
    onInputChangeCities,
    setActiveLocation,
    setLoadingGeoCoordinates,
  } = props

  const dispatchGlobal = useDispatch()

  return (
    <Fragment>
      {loadingGeoCoordinates ? (
        <div className={styles.locationContainer}>
          <img src={imgUrl} alt="loading..." />
          <p className={styles.locationText}>
            {useFormatMessage('store/checkoutless.location.imgText')}
          </p>
        </div>
      ) : (
        <Fragment>
          {locationError.error && (
            <Alert type="error" text={locationError.idMessage} />
          )}

          {
            // TODO: Logica en exito, probar agregando un producto de marketplace y luego en mercado agregar un producto de pickup
            // addressAlternative?.addressType !== 'residential' &&
            //   logisticsInfo?.length > 0 &&
            //   logisticsInfo[0].selectedDeliveryChannel === 'pickup-in-point' &&
            //   logisticsInfo?.some(
            //     (item) => item.selectedDeliveryChannel === 'delivery'
            //   ) && (
            //     <Alert
            //       type="warning"
            //       text="store/checkoutless.register.notAddress"
            //     />
            //   )
          }

          {formAction === 'none' && (
            <div
              className={`${styles.locationContainer} ${global.cursorPointer}`}
              onClick={() => {
                setLoadingGeoCoordinates(true)
                setActiveLocation(true)
                getLocation()
              }}
            >
              <Title>
                <Title.Item title="store/checkoutless.location.userLocation">
                  <LiteLocation
                    fill={
                      activeLocation
                        ? global.iconPrimary
                        : global.iconAlternativeSecondary
                    }
                  />
                </Title.Item>

                <InfoItem
                  className={global.inMobileFlex}
                  firstAction={() => dispatchGlobal(setNextSection('summary'))}
                >
                  <InfoItem.Icon>
                    <MyOrder
                      fill={global.iconAlternative}
                      height={24}
                      width={24}
                    />
                  </InfoItem.Icon>
                  <InfoItem.Content text="store/checkoutless.summary.myOrder" />
                </InfoItem>
              </Title>
            </div>
          )}
          {userLocation && (
            <div className={styles.containerInfo}>
              <LiteLocation fill={global.iconPrimary} />
              <p>
                {useFormatMessage('store/checkoutless.location.userLocation')}
              </p>
            </div>
          )}
          {formAction === 'add' && !userLocation && (
            <div className={styles.containerInfo}>
              <Add fill={global.iconPrimary} />
              <p>
                {useFormatMessage('store/checkoutless.userInfo.newAddress')}
              </p>
            </div>
          )}
          <Fragment>
            <div className={global.gridFormTwoCols}>
              <div className={styles.cityContainer} data-col="two-col">
                <Select
                  options={formatedStateCities}
                  placeholder="store/checkoutless.register.city"
                  onInputChange={(newValue: string) =>
                    onInputChangeCities(newValue)
                  }
                  isLoading={loadingCities}
                  {...stateCity}
                />
              </div>
              <div data-col="two-col">
                <Input
                  placeholder="store/checkoutless.register.address"
                  name="street"
                  errorMessage="store/checkoutless.register.addressError"
                  blurFunction={addressValidation}
                  onCustomKeyUpEvent={handleKeyUpeventStreet}
                  {...street}
                  disabled={!canAddAddress}
                  showClearButton={true}
                  maxLength={50}
                />
              </div>
              <div>
                <Input
                  placeholder="store/checkoutless.register.neighborhood"
                  name="neighborhood"
                  regularExpression={regularExpressions.neighborhood}
                  errorMessage="store/checkoutless.register.neighborhoodError"
                  {...neighborhood}
                  maxLength={50}
                />
              </div>
              <div>
                <Input
                  placeholder="store/checkoutless.register.complement"
                  name="complement"
                  {...complement}
                  maxLength={50}
                />
              </div>
            </div>
            {hasError && (
              <Alert type="error" text="store/checkoutless.generalError" />
            )}
            <div>
              {formAction === 'none' ? (
                <Button
                  value={
                    loading
                      ? 'store/checkoutless.button.loading'
                      : 'store/checkoutless.button.continue'
                  }
                  onClick={handleClick}
                  disabled={disabled}
                />
              ) : (
                <div className={global.actionButtonContainer}>
                  <Button
                    value={
                      loading
                        ? 'store/checkoutless.button.loading'
                        : 'store/checkoutless.button.save'
                    }
                    onClick={handleClick}
                    disabled={disabled}
                  />
                </div>
              )}
            </div>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ShippingForm
