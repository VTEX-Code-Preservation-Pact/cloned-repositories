import React from 'react'
import { Image } from 'vtex.store-image'
import { Video } from 'vtex.store-video'
import { useCssHandles, useCustomClasses } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import type { VideoSchema, ImageModeProps, VideoModeProps } from './MediaTypes'

const IMAGE_CSS_HANDLES = Image.cssHandles
const VIDEO_CSS_HANDLES = Video.cssHandles

/*
 * The no-useless-escape rule is disabled on these expressions so they work correctly on the popular
 * regex validator "Regex101". This makes it simple to debug them in the future.
 * */

// The original regex for this validation was taken from here: https://stackoverflow.com/a/36991065/6352590
// eslint-disable-next-line no-useless-escape
const isVideoFileRegex = /((?:https?(?:%3A%2F%2F|:\/\/))(?:www\.)?(?:\S+)(?:%2F|\/)(?:(?!\.(?:mp4|mkv|wmv|m4v|mov|avi|flv|webm))[^\/])*\.(mp4|mkv|wmv|m4v|mov|avi|flv|webm))(?!\/|\.[a-z]{1,3})/

// The original regex for this validation was taken from here: https://stackoverflow.com/a/50777192/6352590
// eslint-disable-next-line no-useless-escape
const isVimeoRegex = /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/

// The original regex for this validation was taken from here: https://stackoverflow.com/a/61033353/6352590
// eslint-disable-next-line no-useless-escape
const isYoutubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/

function isVideoSrc(src?: string) {
  if (!src) {
    return false
  }

  const matchesVideoPatterns =
    isVideoFileRegex.test(src) ||
    isYoutubeRegex.test(src) ||
    isVimeoRegex.test(src)

  return matchesVideoPatterns
}

type GetMediaValuesParams = {
  rawSrc?: ImageModeProps['src'] | VideoModeProps['src']
  mediaType: 'image' | 'video' | 'imageOrVideo'
  videoUrl?: VideoSchema['videoUrl']
}

function getMediaValues({ rawSrc, mediaType, videoUrl }: GetMediaValuesParams) {
  if (
    mediaType === 'video' ||
    (mediaType === 'imageOrVideo' && (videoUrl || isVideoSrc(rawSrc)))
  ) {
    return { isVideo: true, src: videoUrl ?? rawSrc }
  }

  return { isVideo: false, src: rawSrc }
}

function getModifiableHandles(handles: CssHandlesTypes.CssHandles<string[]>) {
  const modifiableHandles = {} as CssHandlesTypes.CustomClasses<string[]>

  Object.entries(handles).forEach(([handle, name]) => {
    modifiableHandles[handle] = { name, applyModifiers: true }
  })

  return modifiableHandles
}

export type MediaProps = ImageModeProps | VideoModeProps

function Media(props: MediaProps) {
  const { src: rawSrc, mediaType = 'imageOrVideo', classes } = props

  const { handles: imageHandles } = useCssHandles(IMAGE_CSS_HANDLES, {
    migrationFrom: ['vtex.store-image@0.x', 'vtex.store-components@3.x'],
    classes,
  })

  const { handles: videoHandles } = useCssHandles(VIDEO_CSS_HANDLES, {
    migrationFrom: 'vtex.store-video@1.x',
    classes,
  })

  const imageClasses = useCustomClasses(() =>
    getModifiableHandles(imageHandles)
  )

  const videoClasses = useCustomClasses(() =>
    getModifiableHandles(videoHandles)
  )

  /*
   * Dependency properties with the same name
   * on the schema conflicted when using different input methods.
   *
   * In this case, the src prop was showing as an image uploader
   * even when on video mode (where it shouldn't).
   *
   * This prop is used by the schema to receive the source of the video.
   * Since image is using a the src prop, they don't conflict.
   */
  const { videoUrl } = props as VideoSchema

  const { isVideo, src } = getMediaValues({
    rawSrc,
    mediaType,
    videoUrl,
  })

  if (isVideo) {
    return (
      <Video
        {...(props as VideoModeProps)}
        src={src ?? ''}
        classes={videoClasses}
      />
    )
  }

  return (
    <Image {...(props as ImageModeProps)} src={src} classes={imageClasses} />
  )
}

Media.schema = {
  title: 'admin/editor.media.title',
}

export default Media
