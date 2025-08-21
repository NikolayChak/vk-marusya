import {useEffect, useState, useTransition} from 'react'

export const useDebouncedValue = (searchValue: string, delay = 300) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue)
  const [, startTransition] = useTransition()

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        const trimValue = searchValue.trim()
        setDebouncedSearchValue(trimValue)
      })
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [searchValue, delay])

  return debouncedSearchValue
}
