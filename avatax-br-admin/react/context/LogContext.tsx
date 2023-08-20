import React from 'react'

interface LogContextType {
  loading: boolean
  reloading: boolean
  logs?: CalculationLog[]
  pagination?: Pagination
  searchTerm?: string
  setSearchTerm: (term: string, callback?: () => void) => void
  setPage: (page: number, pageSize: number) => void
  refetch: (searchTerm?: string) => void
}
const LogContext = React.createContext<LogContextType>({
  loading: true,
  reloading: false,
  setSearchTerm: () => {},
  setPage: () => {},
  refetch: () => {},
})

export default LogContext
