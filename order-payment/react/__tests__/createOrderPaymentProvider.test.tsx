import React, { FC } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  useOrderForm,
  useOrderQueue,
  useQueueStatus,
  OrderQueueProvider,
} from '@vtex/order-manager'

import { mockOrderForm } from '../__fixtures__/orderForm'
import { OrderFormProvider } from '../__fixtures__/OrderFormProvider'
import {
  createOrderPaymentProvider,
  useOrderPayment,
} from '../components/createOrderPaymentProvider'
import { LogParams } from '../utils/logger'

const mockCashPayment = {
  payments: [
    {
      paymentSystem: '201',
      bin: null,
      accountId: null,
      tokenId: null,
      installments: 1,
      referenceValue: 230500,
      value: 230500,

      installmentsInterestRate: 0,
    },
  ],
}

const mockLog = jest.fn()

function useLogger() {
  const log = ({
    type,
    level,
    event,
    workflowType,
    workflowInstance,
  }: LogParams) => {
    mockLog({
      type,
      level,
      event,
      workflowType,
      workflowInstance,
    })
  }

  return { log }
}

const mockUseUpdateOrderFormPayment = jest.fn().mockResolvedValue(true)
const createWrapperOrderProviders = () => {
  function useUpdateOrderFormPayment() {
    return {
      updateOrderFormPayment: mockUseUpdateOrderFormPayment,
    }
  }

  const { OrderPaymentProvider } = createOrderPaymentProvider({
    useLogger,
    useOrderQueue,
    useOrderForm,
    useUpdateOrderFormPayment,
    useQueueStatus,
  })

  const Wrapper: FC = ({ children }) => {
    return (
      <OrderQueueProvider>
        <OrderFormProvider>
          <OrderPaymentProvider>{children}</OrderPaymentProvider>
        </OrderFormProvider>
      </OrderQueueProvider>
    )
  }

  return { Wrapper }
}

describe('OrderPayment', () => {
  it('should throw an error if theres no OrderPaymentProvider on the tree', () => {
    const {
      result: { error },
    } = renderHook(() => useOrderPayment())

    expect(error).not.toBeNull()
    expect(error.message).toEqual(
      'useOrderPayment must be used within a OrderPaymentProvider'
    )
    expect(mockUseUpdateOrderFormPayment).not.toHaveBeenCalled()
  })

  it('should get payment data from the current orderForm', () => {
    const { Wrapper } = createWrapperOrderProviders()

    const { result } = renderHook(() => useOrderPayment(), { wrapper: Wrapper })
    const { current } = result

    expect(current).not.toBeNull()
    expect(current.referenceValue).toEqual(mockOrderForm.value)
    expect(mockUseUpdateOrderFormPayment).not.toHaveBeenCalled()
  })

  it('should call function to update orderForm on the server if the payment data is updated', async () => {
    const { Wrapper } = createWrapperOrderProviders()

    const { result } = renderHook(() => useOrderPayment(), { wrapper: Wrapper })
    const { current } = result

    await act(async () => {
      const { success } = await current.setPaymentField(
        mockCashPayment.payments[0]
      )

      expect(success).toBeTruthy()
    })
    expect(mockUseUpdateOrderFormPayment).toHaveBeenCalled()
  })

  it('should log information when a payment cannot be updated', async () => {
    const { Wrapper } = createWrapperOrderProviders()

    const { result } = renderHook(() => useOrderPayment(), { wrapper: Wrapper })
    const { current } = result

    mockUseUpdateOrderFormPayment.mockRejectedValue({ code: 'TASK_CANCELLED' })

    await act(async () => {
      const { success } = await current.setPaymentField(
        mockCashPayment.payments[0]
      )

      expect(success).toBeFalsy()
    })
    expect(mockLog).toHaveBeenCalled()
    expect(mockUseUpdateOrderFormPayment).toHaveBeenCalled()
  })
})
