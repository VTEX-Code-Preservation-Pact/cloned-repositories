import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { EmptyState, Button } from 'vtex.styleguide'
import { withRouter, Link } from 'vtex.my-account-commons/Router'

import { withContentWrapper } from '../shared/withContentWrapper'
import AddressesLoading from '../loaders/AddressesLoading'
import AddressBox from '../Addresses/AddressBox'
import Toast from '../shared/Toast'
import GET_ADRESSES from '../../graphql/getAddresses.gql'

export const headerConfig = {
  namespace: 'vtex-account__address-list',
  titleId: 'pages.addresses',
  headerContent: (
    <Link to="/addresses/new">
      <Button variation="primary" block size="small">
        <FormattedMessage id="addresses.addAddress" />
      </Button>
    </Link>
  ),
}

function EmptyAddresses() {
  const title = <FormattedMessage id="addresses.notFound" />

  return <EmptyState title={title} />
}

class Addresses extends Component<Props> {
  public state = {
    showToast: false,
  }

  public componentDidMount = () => {
    const { location } = this.props

    this.setState({ showToast: location.search.indexOf('success=true') > -1 })
  }

  private handleCloseToast = () => {
    this.setState({ showToast: false })
  }

  private handleStartEditing = (address: Address) => {
    this.props.history.push(`/addresses/edit/${address.addressId}`)
  }

  public render() {
    return (
      <div className="flex-ns flex-wrap-ns items-start-ns relative tl">
        {this.props.addresses.map(address => (
          <AddressBox
            key={address.addressId}
            address={address}
            onEditClick={() => this.handleStartEditing(address)}
          />
        ))}

        {this.state.showToast && (
          <Toast messageId="alert.success" onClose={this.handleCloseToast} />
        )}
      </div>
    )
  }
}

interface Data {
  loading: boolean
  profile: {
    addresses: Address[]
  } | null
}

interface Props {
  location: any
  history: any
  addresses: Address[]
}

const enhance = compose<Props, void>(
  graphql(GET_ADRESSES, { options: { fetchPolicy: 'network-only' } }),
  branch(
    ({ data }: { data: Data }) => data.loading,
    renderComponent(AddressesLoading)
  ),
  withContentWrapper(headerConfig),
  branch(
    ({ data }: { data: { profile: { addresses: Address[] } } }) =>
      data.profile == null || data.profile.addresses.length === 0,
    renderComponent(EmptyAddresses)
  ),
  withProps(({ data }: { data: Data }) => ({
    addresses: data.profile && data.profile.addresses,
  })),
  withRouter
)

export default enhance(Addresses)
