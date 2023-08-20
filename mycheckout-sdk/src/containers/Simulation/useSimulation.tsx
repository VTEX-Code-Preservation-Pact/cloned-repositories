import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActions } from '../../contexts/ActionsProviderV2'
import {
  selectAddressStore,
  setLogisticsInfo,
} from '../../contexts/global-context/reducers/orderFormDataSlice'
import {
  orderFormSimulation,
  selectSimulationStatus,
} from '../../contexts/global-context/reducers/simulationSlice'
import type { AppDispatch } from '../../contexts/global-context/store'
import { useCurrentPaymentMethod } from '../../hooks/usePaymentInfo'
import type {
  LogisticInfo,
  OrderFormMC,
  OrderFormSimulation,
  Payment,
} from '../../interfaces/orderForm'
import type { SlaSimulation } from '../../interfaces/simulation'
import { existUnavailableProducts } from '../../utils/simulation'

export const useSimulation = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { email, selectedAddresses, payments, items, logisticsInfo } =
    useSelector(
      (state: { orderForm: OrderFormMC }): OrderFormSimulation => ({
        email: state.orderForm.profile.email,
        selectedAddresses: state.orderForm.shipping.selectedAddresses,
        payments: state.orderForm.payments.payment,
        items: state.orderForm.items,
        logisticsInfo: state.orderForm.shipping.logisticInfo,
      })
    )

  const currentPaymentMethod = useCurrentPaymentMethod(payments[0])
  const paymentInfo: Payment[] = payments.map((payment) => ({
    ...payment,
    paymentId: payment?.paymentId || currentPaymentMethod?.id,
  }))

  const address = useSelector(selectAddressStore)
  const status = useSelector(selectSimulationStatus)

  const { cartSimulation } = useActions()

  const handleSimulationResponse = async () => {
    if (status !== 'loading') {
      try {
        // Trigger Simulation
        const simulationRes = await dispatch(
          orderFormSimulation({
            orderForm: {
              email,
              selectedAddresses,
              items,
              payments: paymentInfo,
              logisticsInfo,
            },
            cartSimulation: cartSimulation as any,
          })
        ).unwrap()

        const logisticInfoWithoutSelection =
          simulationRes?.logisticsInfo.filter(
            (logistic) => !logistic.selectedSla
          )

        if (
          simulationRes?.logisticsInfo?.length &&
          logisticInfoWithoutSelection?.length &&
          !existUnavailableProducts(simulationRes?.items)
        ) {
          // TODO: Probar un carrito no disponible para validar si no se queda infinitamente en la simulacion
          // if the orderForm have not selected SLA's it select the cheapest by default
          const logistics: LogisticInfo[] = []

          simulationRes.logisticsInfo.forEach((logisticInfo) => {
            let selectedSla = {} as SlaSimulation

            if (address?.addressDeliveryType === 'pickup') {
              // Obtiene el primer sla de compra y recoge
              selectedSla = logisticInfo?.slas?.find(
                (sla) => sla?.deliveryChannel === 'pickup-in-point'
              )
            } else if (
              address?.addressDeliveryType === 'delivery' &&
              address?.selectedSlaId
            ) {
              // Selecciona el index si ya existe una dirección
              selectedSla = logisticInfo?.slas?.find(
                (sla) => sla?.deliveryChannel === 'delivery'
              )
            } else {
              // Obtiene el primer sla de domicilio
              selectedSla = logisticInfo?.slas?.find(
                (sla) => sla?.deliveryChannel === 'delivery'
              )
            }

            selectedSla = selectedSla || logisticInfo.slas[0]

            const addressId =
              (address &&
                address.addressDeliveryType === 'pickup' &&
                selectedSla.deliveryChannel === 'pickup-in-point') ||
              !address
                ? logisticInfo.addressInternalId || selectedAddresses[0].id
                : null

            const logisticInfoSelected = {
              ...(selectedSla.availableDeliveryWindow[0]
                ? {
                    deliveryWindow: {
                      startDateUtc:
                        selectedSla?.availableDeliveryWindow[0].startDateUtc,
                      endDateUtc:
                        selectedSla?.availableDeliveryWindow[0].endDateUtc,
                    },
                  }
                : {}),
              itemIndex: logisticInfo.itemIndex,
              addressId,
              selectedSla: selectedSla.id,
              selectedDeliveryChannel: selectedSla.deliveryChannel,
              selectedShippingEstimate: selectedSla.shippingEstimate,
              storeName:
                selectedSla.deliveryChannel === 'pickup-in-point'
                  ? selectedSla.pickupStoreInfo.friendlyName.concat(
                      ' ',
                      selectedSla.pickupStoreInfo.address.street
                    )
                  : null,
            }

            logistics.push(logisticInfoSelected)
          })
          dispatch(setLogisticsInfo(logistics))
        }
      } catch (err) {
        console.error('Failed simulation: ', err)
      }
    }
  }

  useEffect(() => {
    handleSimulationResponse()
  }, [email, selectedAddresses, payments, items, logisticsInfo])
}
