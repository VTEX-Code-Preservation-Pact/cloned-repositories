import React, { FC, Fragment } from 'react'

export const Image: FC<{ src: string }> = ({ src }) => (
  <Fragment>This should be an image with src: {src}</Fragment>
)
