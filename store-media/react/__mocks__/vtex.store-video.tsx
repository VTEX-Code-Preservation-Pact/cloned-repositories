import React from 'react'
import { VideoTypes } from 'vtex.store-video'

import { VideoSchema } from '../MediaTypes'

const VIMEO_PATTERN = /vimeo/
const YOUTUBE_PATTERN = /youtube|youtu.be/

function Video({ src = '' }: VideoTypes.VideoPlayer & VideoSchema) {
  if (VIMEO_PATTERN.test(src)) {
    return <div data-testid="vimeo-player" />
  }

  if (YOUTUBE_PATTERN.test(src)) {
    return <div data-testid="youtube-player" />
  }

  return (
    <div data-testid="html5-player">
      <source src={src} />
    </div>
  )
}

Video.cssHandles = [] as string[]

export { Video }
