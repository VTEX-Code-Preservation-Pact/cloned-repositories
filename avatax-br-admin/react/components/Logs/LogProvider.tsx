import React, { FC, useState } from 'react'
import { useQuery } from 'react-apollo'

import LogContext from '../../context/LogContext'
import getLogsQuery from '../../queries/getLogs.gql'

const LogProvider: FC<{ page: number; pageSize: number }> = (props: {
  children?: React.ReactNode
  page: number
  pageSize: number
}) => {
  const [reloading, setReloading] = useState(false)
  const [search, setSearch] = useState({
    page: props.page,
    pageSize: props.pageSize,
    searchTerm: '',
  })

  const { data, loading, refetch } = useQuery<
    CalculationLogQueryResult,
    { params: { page: number; pageSize: number; searchTerm?: string } }
  >(getLogsQuery, {
    variables: {
      params: {
        page: search.page,
        pageSize: search.pageSize,
        searchTerm: search.searchTerm,
      },
    },
  })

  const setPage = async (page: number, pageSize: number) => {
    setSearch({ ...search, page, pageSize })
  }

  const refetchFn = async () => {
    if (!data?.getLogs.pagination) return
    setReloading(true)
    await refetch({
      params: {
        page: data?.getLogs.pagination.page,
        pageSize: data?.getLogs.pagination.pageSize,
        searchTerm: search.searchTerm,
      },
    })
    setReloading(false)
  }

  return (
    <LogContext.Provider
      value={{
        loading,
        reloading,
        logs: data?.getLogs.data,
        pagination: data?.getLogs.pagination,
        setPage,
        refetch: refetchFn,
        searchTerm: search.searchTerm,
        setSearchTerm: (term?: string) => {
          if (search.searchTerm !== term) {
            setSearch({
              ...search,
              page: search.searchTerm !== term ? 1 : search.page,
              searchTerm: term ?? '',
            })
          }
        },
      }}
    >
      {props.children}
    </LogContext.Provider>
  )
}

export default LogProvider
