import { ChangeEvent, useState } from 'react'

const INITIAL_PAGE_NUMBER = 1
const INITIAL_PER_PAGE = 5

function usePagination<T extends PaginationContext>(context: T) {
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER)
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE)
  const [total, setTotal] = useState(context.pagination?.total ?? 0)

  const resetPagination = () => {
    setPageNumber(INITIAL_PAGE_NUMBER)
    setPerPage(INITIAL_PER_PAGE)
  }

  const handleNext = async () => {
    const page = pageNumber + 1

    await context.setPage(page, perPage)
    setPageNumber(page)
  }

  const handlePrev = async () => {
    if (pageNumber <= 0) return
    const page = pageNumber - 1

    await context.setPage(page, perPage)
    setPageNumber(page)
  }

  const handlePerPageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newPerPage = parseInt(e.target.value, 10)
    const result = await context.setPage(pageNumber, newPerPage)

    setPerPage(newPerPage)
    if (result) {
      setTotal(result.pagination.total)
    }
  }

  const from = perPage * (pageNumber - 1)
  const to = perPage * pageNumber

  return {
    pageNumber,
    perPage,
    resetPagination,
    total,
    setTotal: (nr: number) => setTotal(nr),
    pagination: {
      onNextClick: handleNext,
      onPrevClick: handlePrev,
      currentItemFrom: from,
      currentItemTo: to,
      onRowsChange: handlePerPageChange,
    },
  }
}

export default usePagination
