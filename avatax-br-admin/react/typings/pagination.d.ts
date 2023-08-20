interface Pagination {
  total: number
  page: number
  pageSize: number
}

interface PaginationContext {
  pagination?: Pagination
  setPage: (
    page: number,
    pageSize: number
  ) => Promise<{ pagination: Pagination }> | void
}
