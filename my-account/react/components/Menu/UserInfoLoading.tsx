import React from 'react'
import { SkeletonPiece } from 'vtex.my-account-commons'

const UserInfoLoading = () => {
  return (
    <div className="flex items-end mb7">
      <div className="mr5 relative">
        <div className="h3 w3 br-100 bg-light-silver">
          <div className="shimmer" />
        </div>
      </div>
      <div className="flex-auto w3">
        <div className="mb2">
          <SkeletonPiece width={50} />
        </div>
        <SkeletonPiece />
      </div>
    </div>
  )
}

export default UserInfoLoading
