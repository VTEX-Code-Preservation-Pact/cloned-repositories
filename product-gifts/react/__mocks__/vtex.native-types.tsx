import React, { Fragment, FC } from 'react'

interface Props {
  id: string
  values: Record<string, string | number>
}

export const IOMessage: FC<Props> = ({ id, values }) => {
  return (
    <Fragment>
      {`Received message id: ${id} and the following values (totalGifts, exceedingItems, visibleItems): ${Object.values(
        values
      )}`}
    </Fragment>
  )
}
