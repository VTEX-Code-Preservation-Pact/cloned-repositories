/* eslint-disable no-restricted-imports */
import React, { useEffect, useState, createContext } from 'react'
import {
  Layout,
  PageBlock,
  PageHeader,
  Table,
  Alert,
  Toggle,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useQuery, useMutation } from 'react-apollo'
import { pathOr, uniqBy } from 'ramda'
import { useRuntime } from 'vtex.render-runtime'

import GET_PAYMENTS from '../../graphql/getPayments.graphql'
import CREATE_PAYMENTS from '../../graphql/createPaymentMethod.graphql'
import GET_LIST_PAYMENTS from '../../graphql/getListPayments.graphql'
import type { IPaymentRules, IPayment, PaymentListContext } from './interfaces'
import { kuikpayPayments } from './constants'

const paymentListContext = createContext<PaymentListContext | null>(null)

export const defaultSchema = {
  properties: {
    payment: {
      title: <FormattedMessage id="checkoutless.paymentsList.table.name" />,
    },
    isActive: {
      title: <FormattedMessage id="checkoutless.paymentsList.table.status" />,
      cellRenderer: ({
        rowData,
      }: {
        cellData: string
        rowData: { isActive: boolean }
      }) => {
        return (
          <paymentListContext.Consumer>
            {(value) => (
              <Toggle
                checked={rowData?.isActive}
                onChange={() => {
                  value?.onChangeState(rowData)
                }}
              />
            )}
          </paymentListContext.Consumer>
        )
      },
    },
    type: {
      title: <FormattedMessage id="checkoutless.paymentsList.table.origin" />,
    },
  },
}

const PaymentList = () => {
  const [createPayment] = useMutation(CREATE_PAYMENTS)
  const { data, loading, called } = useQuery(GET_PAYMENTS)
  const { data: listData } = useQuery(GET_LIST_PAYMENTS)
  const { account } = useRuntime()
  const [payments, setPayments] = useState<IPayment[]>([])
  const [showWarningAlert, setShowWarningAlert] = useState<boolean>(false)
  const [disabledChange, setDisabledChange] = useState<boolean>(false)

  useEffect(() => {
    if (data && listData) {
      const paymentsList = pathOr<any[]>([], ['getPaymentsMethods'], listData)
      const paymentsRules = uniqBy(
        (e) => pathOr('', ['paymentSystem', 'id'], e),
        [
          ...kuikpayPayments,
          ...pathOr<IPaymentRules[]>(
            [],
            ['paymentsRules', 'rules'],
            data
          ).filter(
            (ruler) => ruler.enabled && ruler?.paymentSystem?.name !== 'Kuikpay'
          ),
        ]
      ).map((ruler) => {
        const payment = paymentsList.find(
          (p) =>
            p?.paymentMethodName === pathOr('', ['paymentSystem', 'id'], ruler)
        )

        return {
          id: pathOr('', ['id'], payment),
          paymentMethodName: pathOr('', ['paymentSystem', 'id'], ruler),
          payment: pathOr('', ['paymentSystem', 'name'], ruler),
          isActive: pathOr(true, ['isActive'], payment),
          type: pathOr((ruler as any)?.type || 'store', ['type'], payment),
          accountName: account,
        }
      })

      setPayments(paymentsRules)
    }
  }, [data, account, listData])

  useEffect(() => {
    if (payments.length && called) {
      const elements = payments.filter((payment) => payment.isActive)

      setDisabledChange(elements.length === 1)
    }
  }, [payments, called])

  useEffect(() => {
    if (payments && payments.length) {
      const paymentWithoutId = payments.filter((p) => !p?.id)

      if (!paymentWithoutId.length) return
      const newPayments = Object.assign(payments, [])

      newPayments.map(async (payment) => {
        if (!payment.id) {
          const p = await createPayment({
            variables: {
              ...payment,
            },
          })

          payment.id = pathOr('', ['data', 'createPaymentMethod', 'id'], p)
        }

        return payment
      })
      setPayments(newPayments)
    }
  }, [payments])

  const onChangeState = (element: IPayment) => {
    const index = payments.findIndex((payment) => payment.id === element.id)
    const lPayments: any = Object.assign([], payments)

    if (index !== -1) {
      lPayments[index].isActive = !element.isActive
      const peyment = lPayments[index]

      delete peyment?.peyment
      createPayment({
        variables: {
          ...peyment,
        },
      })
      setPayments(lPayments)
    }
  }

  const onShowAlert = () => setShowWarningAlert(true)

  return (
    <paymentListContext.Provider
      value={{ onChangeState, disabledChange, onShowAlert }}
    >
      <Layout
        pageHeader={
          <PageHeader
            title={<FormattedMessage id="checkoutless.paymentsList.title" />}
          />
        }
      >
        <PageBlock variation="full">
          {showWarningAlert && (
            <div className="mb5">
              <Alert autoClose={5000} type="warning">
                <FormattedMessage id="checkoutless.paymentsList.table.warning" />
              </Alert>
            </div>
          )}
          <Alert autoClose={5000} type="success">
            <FormattedMessage id="checkoutless.paymentsList.auto-save" />
          </Alert>
          <Table
            fullWidth
            schema={defaultSchema}
            items={payments}
            loading={loading}
          />
        </PageBlock>
      </Layout>
    </paymentListContext.Provider>
  )
}

export default PaymentList
