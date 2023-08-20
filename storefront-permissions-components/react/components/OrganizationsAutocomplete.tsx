import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { AutocompleteInput } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { messages } from './customers-admin'
import GET_ORGANIZATIONS from '../queries/listOrganizations.gql'
import GET_ORGANIZATION_BY_ID from '../queries/getOrganization.graphql'

const initialState = {
  status: ['active', 'on-hold', 'inactive'],
  search: '',
  page: 1,
  pageSize: 25,
  sortOrder: 'ASC',
  sortedBy: 'name',
}

interface Props {
  onChange: (value: { value: string | null; label: string }) => void
  organizationId: string
}

const OrganizationsAutocomplete = ({ onChange, organizationId }: Props) => {
  const { formatMessage } = useIntl()
  const [term, setTerm] = useState('')
  const [hasChanged, setHasChanged] = useState(false)
  const [values, setValues] = useState([] as any)
  const { data, loading, refetch } = useQuery(GET_ORGANIZATIONS, {
    variables: initialState,
    ssr: false,
    notifyOnNetworkStatusChange: true,
  })

  const { data: organization } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: organizationId },
    ssr: false,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    skip: !organizationId,
  })

  const options = {
    onSelect: (value: any) => onChange(value),
    loading,
    value: values,
  }

  const onClear = () => {
    if (!hasChanged) return
    setTerm('')
    onChange({ value: null, label: '' })
  }

  useEffect(() => {
    if (!organization) {
      return
    }

    const { name, id } = organization.getOrganizationById

    setTerm(name)
    setHasChanged(true)
    onChange({ value: id, label: name })
  }, [organization])

  useEffect(() => {
    if (data?.getOrganizations?.data) {
      setValues(
        data.getOrganizations.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      )
    }
  }, [data])

  useEffect(() => {
    if (term && term.length > 2) {
      setHasChanged(true)
      refetch({
        ...initialState,
        search: term,
      })
    } else if (term === '') {
      onClear()
    }
  }, [term])

  const input = {
    onChange: (_term: string) => {
      setTerm(_term)
    },
    onClear,
    placeholder: formatMessage(messages.searchOrganizations),
    value: term,
  }

  return <AutocompleteInput input={input} options={options} />
}

export default OrganizationsAutocomplete
