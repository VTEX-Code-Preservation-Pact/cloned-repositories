import React, { PureComponent, Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

export class DeliveryChannelsLoading extends PureComponent {
  render() {
    return (
      <Fragment>
        <div style={{ fontSize: 120, lineHeight: 1.1 }}>
          <Skeleton />
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.3 }}>
          <Skeleton />
        </div>
      </Fragment>
    )
  }
}

export default DeliveryChannelsLoading
