import { useMemo, useState } from 'react'

/**
 * Shared pagination state for any DummyJSON list endpoint that
 * accepts limit/skip and returns { total }.
 */
export function usePagination(initialLimit = 12) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(initialLimit)
  const [total, setTotal] = useState(0)

  const skip = useMemo(() => (page - 1) * limit, [page, limit])
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  )

  function goToPage(nextPage) {
    setPage(Math.min(Math.max(1, nextPage), totalPages))
  }

  function resetToFirstPage() {
    setPage(1)
  }

  return {
    page,
    limit,
    skip,
    total,
    totalPages,
    setLimit,
    setTotal,
    goToPage,
    resetToFirstPage
  }
}
