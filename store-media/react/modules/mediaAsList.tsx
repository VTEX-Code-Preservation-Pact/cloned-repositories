import React from 'react'

import Media from '../Media'
import type {
  ImageModeProps,
  VideoModeProps,
  ImageListSchemaElement,
  VideoListSchemaElement,
  MediaListSchemaElement,
  MediaProps,
} from '../MediaTypes'

export const getMediaAsJSXList = (
  mediaList: MediaProps[],
  isMobile: boolean,
  maxHeight?: string | number
) => {
  return mediaList.map((props: MediaProps | MediaListSchemaElement, idx) => {
    const { mediaType } = props as MediaProps

    const {
      image,
      mobileImage,
      // This is here to mantain compatibility with list-context.image-list
      description,
      width = '100%',
    } = props as ImageListSchemaElement

    // If it's being used as a block and it's set to be 'image', 'imageOrVideo' or undefined
    if (mediaType !== 'video' && (image || mobileImage)) {
      return (
        <Media
          key={idx}
          {...(props as ImageModeProps)}
          mediaType="image"
          src={isMobile && mobileImage ? mobileImage : image}
          // These are here to mantain compatibility with list-context.image-list
          alt={description}
          maxHeight={maxHeight ?? 420}
          width={width}
        />
      )
    }

    const { video, mobileVideo } = props as VideoListSchemaElement

    // If it's being used as a block and it's set to be 'video', 'imageOrVideo' or undefined
    if (mediaType !== 'image' && (video || mobileVideo)) {
      return (
        <Media
          key={idx}
          {...(props as VideoModeProps)}
          mediaType="video"
          src={isMobile && mobileVideo ? mobileVideo : video}
        />
      )
    }

    // If it's being used as a React Component
    // mediaType can be either 'image', 'video', 'imageOrVideo' or undefined
    return <Media key={idx} {...(props as MediaProps)} />
  })
}
