import { ReactNode } from 'react'
import { ApolloError } from 'apollo-client'

declare global {
  interface ChallengeProps {
    children: ReactNode[]
  }

  interface MDField {
    key: string
    value: string
  }

  interface MDSearchResult {
    loading: boolean
    error?: ApolloError
    data: MDSearchData
  }

  interface MDSearchData {
    documents: MDSearchDocumentResult[]
  }

  interface MDSearchDocumentResult {
    id: string
    fields: MDField[]
  }

  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }

  interface Role {
    value: string
    label: string
    name: string
  }

  interface BusinessOrganization {
    name: string
    telephone: string
    id: string
    address?: string
    email?: string
  }

  interface OrganizationAssignment {
    id: string
    email?: string
    budgetAmount?: string
    roleId?: string
    status?: string
    roleId_linked?: Role
    businessOrganizationId_linked?: BusinessOrganization
  }
}
