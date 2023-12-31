import type { FC } from 'react'
import React, { useContext, useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'
import {
  Box,
  Set,
  Heading,
  useSelectState,
  Columns,
  Paragraph,
  Select,
  Button,
  toast,
} from '@vtex/admin-ui'

import UPDATE_ACCOUNT from '../graphql/UpdateAccount.graphql'
import { StateContext } from '../context/StateContext'

const SCHEDULE_OPTIONS = [
  {
    label: 'Daily',
    value: 'DAILY',
    description: 'Every day at midnight (00:00:00 CET).',
  },
  {
    label: 'Monthly',
    value: 'MONTHLY',
    description: 'Monthly at midnight (00:00:00 CET).',
  },
  {
    label: 'Weekly',
    value: 'WEEKLY',
    description: 'Weekly at midnight (00:00:00 CET).',
  },
  {
    label: 'Twice Weekly',
    value: 'WEEKLY_ON_TUE_FRI_MIDNIGHT',
    description: 'Weekly every Tuesday and Friday at midnight (00:00:00 CET).',
  },
  {
    label: 'Bimonthly',
    value: 'BIWEEKLY_ON_1ST_AND_15TH_AT_MIDNIGHT',
    description: 'Monthly on the 1st and 15th at midnight (00:00:00 CET).',
  },
]

const SellerPayouts: FC<any> = () => {
  const { adyenAccountHolder } = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(false)

  const [updateAccount] = useMutation(UPDATE_ACCOUNT)
  const [account] = adyenAccountHolder?.accounts || []

  const state = useSelectState({
    items: SCHEDULE_OPTIONS,
    itemToString: (item: any) => item.label,
    initialSelectedItem: SCHEDULE_OPTIONS[0],
  })

  useEffect(() => {
    if (!account?.payoutSchedule.schedule) {
      return
    }

    const selectedItem: any =
      SCHEDULE_OPTIONS.find(
        i => i.value === account?.payoutSchedule.schedule
      ) ?? SCHEDULE_OPTIONS[0]

    state.selectItem(selectedItem)
  }, [account?.payoutSchedule.schedule])

  const handleUpdate = async (setContextState: any) => {
    setIsLoading(true)

    try {
      const response = await updateAccount({
        variables: {
          accountCode: account.accountCode,
          schedule: state.selectedItem?.value,
        },
      })

      account.payoutSchedule.schedule = response.data.updateAccount.schedule
      setContextState({ adyenAccountHolder })
    } catch (err) {
      setIsLoading(false)

      toast.dispatch({
        type: 'error',
        message: 'Unable to update payout schedule',
      })

      return
    }

    setIsLoading(false)
    toast.dispatch({
      type: 'success',
      message: 'Payout schedule updated',
    })
  }

  return (
    <StateContext.Consumer>
      {({ setContextState }) => (
        <Columns spacing={1}>
          <Columns.Item>
            <Box>
              <Set orientation="vertical" spacing={3} fluid>
                <Heading>Payouts</Heading>
                <Paragraph csx={{ width: '60%' }}>
                  Set seller payout schedule.
                </Paragraph>
                <Set spacing={3}>
                  <Select
                    items={SCHEDULE_OPTIONS}
                    state={state}
                    label="Schedule"
                    renderItem={(item: any) => item.label}
                  />
                  <Paragraph csx={{ width: '60%' }}>
                    {state.selectedItem?.description}
                  </Paragraph>
                </Set>
              </Set>
            </Box>
            <Button
              loading={isLoading}
              disabled={!adyenAccountHolder}
              variant="primary"
              csx={{ marginTop: '20px' }}
              onClick={() => handleUpdate(setContextState)}
            >
              Save
            </Button>
          </Columns.Item>
        </Columns>
      )}
    </StateContext.Consumer>
  )
}

export default SellerPayouts
