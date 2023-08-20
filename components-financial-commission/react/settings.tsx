import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import {
  Layout,
  PageBlock,
  PageHeader,
  ActionMenu,
  IconOptionsDots,
  Alert,
  EXPERIMENTAL_Select as Select,
  Box,
  Button,
  Toggle,
  EXPERIMENTAL_Table as Table,
  Spinner,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useQuery, useMutation } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { DocumentNode } from 'graphql'

import TableComponent from './components/Table'
import PaginationComponent from './components/Table/pagination'
import { Filter, TokenAuth } from './components'

interface SettingsProps {
  getSellersQuery: DocumentNode
  createSettingsMutation: DocumentNode
  getSettingsQuery: DocumentNode
  createTokenMutation: DocumentNode
  editToken: DocumentNode
  getTokenQuery: DocumentNode
}

const Settings: FC<SettingsProps> = (props) => {
  const { getSellersQuery, createSettingsMutation, getSettingsQuery, createTokenMutation, editToken, getTokenQuery, } = props
  const { navigate, account } = useRuntime()
  const [sellersId, setSellersId] = useState('')
  const [optionsSelect, setOptionsSelect] = useState<SellerSelect[]>([])
  const [sellersResult, setSellersResult] = useState<SettingsSellers[] | []>([])
  const [selectedValue, setSelectValue] = useState<SelectObj | null>()
  const [infoSettings, setInfoSettings] = useState<SettingInfoType[]>([])
  const [createSettings, { data: dataSettings }] = useMutation(
    createSettingsMutation
  )
  const [tokenSeller, setTokenSeller] = useState<any>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [itemFrom, setItemFrom] = useState(1)
  const [itemTo, setItemTo] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [openAlert, setOpenAlert] = useState(false)
  const [integration, setIntegration] = useState(true)
  const { data: dataSellers } = useQuery(getSellersQuery, {
    ssr: false,
    pollInterval: 0,
  })

  const { data: dataSellersTable } = useQuery(getSellersQuery, {
    ssr: false,
    pollInterval: 0,
    variables: {
      listSellersParams: {
        page,
        pageSize,
        sellersId,
      },
    },
  })

  const [editTokenMutation] = useMutation(editToken)

  const { data: getToken } = useQuery(getTokenQuery, {
    ssr: false,
    pollInterval: 0,
    variables: {
      accountId: account,
    },
  })

  const { data: settings, loading } = useQuery(getSettingsQuery, {
    ssr: false,
    pollInterval: 0,
    fetchPolicy: 'no-cache',
  })

  const DATE_CUT_OPTIONS = [
    /*
    {
      value: 7,
      label: 'Weekly',
    },
    {
      value: 15,
      label: 'Bi-weekly',
    }, */
    {
      value: 1,
      label: 'Daily',
    },
    {
      value: 30,
      label: 'Monthly',
    },
  ]

  useEffect(() => {
    if (getToken) setTokenSeller(getToken)
  }, [getToken])

  useEffect(() => {
    if (settings) {
      setInfoSettings([
        {
          idbilling: settings.getSettings.billingCycle,
          start: settings.getSettings.startDate,
          end: settings.getSettings.endDate,
        },
      ])

      setSelectValue({
        value: 30,
        label: settings.getSettings.billingCycle,
      })

      if (settings.getSettings.integration === 'external') setIntegration(false)
    }
  }, [settings])

  useEffect(() => {
    if (dataSellersTable) {
      const dataTableDashboard: SettingsSellers[] = []

      dataSellersTable.getSellers.sellers.forEach((seller: DataSeller) => {
        dataTableDashboard.push({
          id: seller.id,
          name: seller.name,
        })
      })
      setSellersResult(dataTableDashboard)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSellersTable])

  useEffect(() => {
    if (dataSellers) {
      const builtSelectSeller: SellerSelect[] = []

      dataSellers.getSellers.sellers.forEach((seller: DataSeller) => {
        builtSelectSeller.push({
          value: { id: seller.id, name: seller.name },
          label: seller.name,
        })
      })
      setOptionsSelect(builtSelectSeller)
      setTotalItems(dataSellers.getSellers.sellers.length)
    }
  }, [dataSellers])

  const Actions = ({ data }: any) => {
    return (
      <ActionMenu
        buttonProps={{
          variation: 'tertiary',
          icon: <IconOptionsDots />,
        }}
        options={[
          {
            label: <FormattedMessage id="admin/table-settings-detail" />,
            onClick: () => {
              navigate({
                to: `/admin/app/commission-report/settings/detail/${data.id}`,
                replace: true,
                query: `name=${data.name}&integration=${integration}`,
              })
            },
          },
        ]}
      />
    )
  }

  const schemaTable = [
    {
      id: 'name',
      title: <FormattedMessage id="admin/table-settings-name" />,
      width: '90em',
      // eslint-disable-next-line react/display-name
      cellRenderer: (cellProps: CellRendererProps) => {
        return <span>{cellProps.data}</span>
      },
    },
    {
      id: 'id',
      title: <FormattedMessage id="admin/table-settings-actions" />,
      width: '10em',
      // eslint-disable-next-line react/display-name
      cellRenderer: (cellProps: CellRendererProps) => (
        <Actions {...cellProps} />
      ),
      extended: true,
    },
  ]

  const handleCreateSettings = (integrationType = integration) => {
    if (selectedValue) {
      const nowDate = new Date()
      let date = ''
      let lastDateString = ''

      const month =
        nowDate.getMonth() + 1 <= 9
          ? `0${nowDate.getMonth() + 1}`
          : nowDate.getMonth() + 1

      if (selectedValue.label === 'Monthly') {
        const day =
          nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()

        date = `${nowDate.getFullYear()}-${month}-${day}`

        const lastDate = new Date(
          nowDate.getFullYear(),
          nowDate.getMonth() + 1,
          0
        )

        const lastMonth =
          lastDate.getMonth() + 1
            ? `0${lastDate.getMonth() + 1}`
            : lastDate.getMonth() + 1

        const lastDay =
          lastDate.getDate() < 10
            ? `0${lastDate.getDate()}`
            : lastDate.getDate()

        lastDateString = `${lastDate.getFullYear()}-${lastMonth}-${lastDay}`
      } else {
        const day =
          nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()

        /* const finalDay =
          nowDate.getDate() + 1 < 10? `0${nowDate.getDate() + 1}` : nowDate.getDate() + 1 */

        date = `${nowDate.getFullYear()}-${month}-${day}`
        lastDateString = `${nowDate.getFullYear()}-${month}-${day}`
      }

      createSettings({
        variables: {
          settingsData: {
            startDate: date,
            endDate: lastDateString,
            billingCycle: selectedValue.label,
            integration: integrationType ? 1 : 0,
          },
        },
      })

      editTokenMutation({
        variables: {
          accountId: account,
          isEnable: !integrationType,
        },
      })
    }
  }

  useEffect(() => {
    if (dataSettings) {
      setInfoSettings([
        {
          idbilling: dataSettings.createSettings.billingCycle,
          start: dataSettings.createSettings.startDate,
          end: dataSettings.createSettings.endDate,
        },
      ])

      setOpenAlert(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSettings])

  const changeRows = (row: number) => {
    setPageSize(row)
    setItemTo(row)
    setItemFrom(1)
    setPage(1)
  }

  const onNextClick = () => {
    const nextPage = page + 1

    const currentTo = pageSize * nextPage
    const currentFrom = itemTo + 1

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(nextPage)
  }

  const onPrevClick = () => {
    const previousPage = page - 1

    const currentTo = itemTo - pageSize
    const currentFrom = itemFrom - pageSize

    setItemTo(currentTo)
    setItemFrom(currentFrom)
    setPage(previousPage)
  }

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin/navigation.settings" />}
        />
      }
    >
      {loading ? <div className='flex justify-center'> <Spinner /> </div> : (<div className="mb2">
        <Box>
          {integration && (
            <div className="mb7">
              <h2>
                <FormattedMessage id="admin/modal-settings.billingCycle" />
              </h2>
              <div className="mb4">
                <Alert type="warning">
                  <FormattedMessage id="admin/modal-settings.alert-warning" />
                </Alert>
                <div className="mb5 flex w-100 mt6">
                  <div className="w-90">
                    <Select
                      menuPosition="fixed"
                      options={DATE_CUT_OPTIONS}
                      multi={false}
                      value={selectedValue}
                      onChange={(values: SelectObj) => {
                        setSelectValue(values)
                      }}
                    />
                  </div>
                  <div className="w-10 pl2">
                    <Button
                      variation="primary"
                      onClick={() => {
                        handleCreateSettings()
                      }}
                    >
                      <FormattedMessage id="admin/save-settings" />
                    </Button>
                  </div>
                </div>
                <div className="w-100">
                  <p className="t-small mw9 c-muted-1">
                    <FormattedMessage id="admin/modal-settings.billingCycle-helpText" />
                  </p>
                </div>
              </div>
              {openAlert ? (
                <div className="mt7">
                  <Alert type="success" onClose={() => setOpenAlert(false)}>
                    Data was updated successfully
                  </Alert>
                </div>
              ) : (
                <div />
              )}
              <div className="mt7">
                <Table
                  stickyHeader
                  measures={[]}
                  items={infoSettings}
                  columns={[
                    {
                      id: 'idbilling',
                      title: 'Billing Cycle',
                    },
                    {
                      id: 'start',
                      title: 'Start Date',
                    },
                    {
                      id: 'end',
                      title: 'End Date',
                    },
                  ]}
                />
              </div>
            </div>
          )}
          <div>
            <h3 className="ma0">Type Integration</h3>
            <div className="flex items-center">
              <div className="w-20">
                <Toggle
                  label={integration ? 'Internal' : 'External'}
                  semantic
                  checked={integration}
                  onChange={() => {
                    setIntegration(!integration)
                    handleCreateSettings(!integration)
                  }}
                />
              </div>
              <div className="w-80">
                <p>
                  If you choose the <b>External</b> option, you will be in
                  charge to do the commission calculations and invoices.
                </p>
              </div>
            </div>
          </div>
        </Box>
      </div>)}
      {!integration && (<TokenAuth activateToogle={false} editToken={editToken} createTokenMutation={createTokenMutation} sellerId={account} tokenSeller={tokenSeller} />)}
      <p className="c-action-primary hover-c-action-primary fw5 ml2 mt6">
        <FormattedMessage id="admin/billing-cycle" />
      </p>
      <div className="mt6">
        <PageBlock>
          <div>
            <Filter
              optionsSelect={optionsSelect}
              setSellerId={setSellersId}
              setTotalItems={setTotalItems}
              multiValue
            />
          </div>
        </PageBlock>
      </div>
      <div className="mt2">
        <PageBlock>
          <div className="mt4 mb7">
            <TableComponent
              schemaTable={schemaTable}
              items={sellersResult}
              loading={false}
            />
            <PaginationComponent
              setPageSize={setPageSize}
              currentPage={itemFrom}
              pageSize={itemTo}
              setPage={setPage}
              totalItems={totalItems}
              onNextClick={onNextClick}
              changeRows={changeRows}
              onPrevClick={onPrevClick}
            />
          </div>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default Settings
