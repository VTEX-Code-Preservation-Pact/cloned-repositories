import React from 'react'

import { ImageModeProps } from '../MediaTypes'

function Image(props: ImageModeProps) {
  const { src, alt, maxHeight, width } = props

  const style = {
    maxHeight,
    width,
  }

  return <img src={src} alt={alt} style={style} />
}

Image.cssHandles = [] as string[]

export { Image }
