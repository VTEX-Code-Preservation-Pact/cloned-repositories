/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-apollo'
// eslint-disable-next-line no-restricted-imports
import { pathOr, take } from 'ramda'

import GET_CATEGORIES from '../../graphql/getCategories.graphql'
import { onRemoveReference } from './utils'

export const useHandleCategories = (
  visualization: any[],
  onChange: (element: any[]) => void
) => {
  const { data } = useQuery(GET_CATEGORIES)
  const [categories, setCategories] = useState<any[]>([])
  const [hidde, setHiddeElement] = useState<any[]>([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const timeoutRef = useRef<any>(null)

  const value = useMemo(
    () =>
      take(
        10,
        categories
          .filter(
            (category) =>
              category.label.toLowerCase().includes(term.toLowerCase()) ||
              category.id.toLowerCase().includes(term.toLowerCase())
          )
          .reverse()
      ),
    [categories, term]
  )

  const onHandle = useCallback(
    (element: any) => {
      const index = hidde.findIndex((h: any) => h?.id === element?.id)
      const localHidde = onRemoveReference(hidde)

      if (index === -1) {
        localHidde.push(element)
      } else {
        localHidde.splice(index, 1)
      }

      setHiddeElement(localHidde)
    },
    [hidde]
  )

  const options = {
    onSelect: (args: any) => {
      onHandle(args)
      setTerm('')
    },
    loading,
    value,
  }

  const input = {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onChange: (term: any) => {
      if (term) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(term)
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(term)
      }
    },
    onClear: () => setTerm(''),
    placeholder: 'Search category... (e.g.: Technology)',
    value: term,
  }

  useEffect(() => {
    onChange(
      hidde.map((h) => ({
        key: h?.value,
        type: 'category',
      }))
    )
  }, [hidde])

  useEffect(() => {
    if (data) {
      const element: any[] = []
      const forceHidden: any[] = []
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const categories = pathOr<any[]>([], ['getCategories'], data)
      const onRecursive = (item: any, tree?: string) => {
        if (item.children && item.children.length) {
          item.children.map((child: any) => {
            return onRecursive(child, `${tree}/${child.name}`)
          })
        }

        element.push({
          ...item,
          label: item?.name,
          value: `${tree}/`,
          type: 'Category',
        })
      }

      categories.map((category) => {
        return onRecursive(category, `/${category?.name}`)
      })
      // eslint-disable-next-line array-callback-return
      visualization.map((v) => {
        const e = element.find((f) => f?.value === v?.key)

        if (e) forceHidden.push(e)
      })
      setHiddeElement(forceHidden)
      setCategories(element)
    }
  }, [data, visualization])

  return useMemo(
    () => ({
      options,
      input,
      hidde,
      onHandle,
    }),
    [options, input, hidde, onHandle]
  )
}
