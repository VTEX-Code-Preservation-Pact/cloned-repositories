import type { VideoTypes } from 'vtex.store-video'
import type { ImageTypes } from 'vtex.store-image'

import type { MediaProps } from './Media'
import type { MediaListProps, MediaListPropsWithHeight } from './MediaList'

export { MediaProps, MediaListProps, MediaListPropsWithHeight }

export interface VideoModeProps extends Omit<VideoTypes.VideoPlayer, 'src'> {
  /**
   * The type of the media to be displayed
   * @default 'imageOrVideo'
   */
  mediaType?: 'video' | 'imageOrVideo'
  src?: VideoTypes.VideoPlayer['src']
}

type ImageModeMediaType = {
  /**
   * The type of the media to be displayed
   * @default 'imageOrVideo'
   */
  mediaType?: 'image' | 'imageOrVideo'
}

export type ImageModeProps = ImageModeMediaType & ImageTypes.ImageProps

// Media type will always be defined (image or video), but assuring that here
// makes the prop autocomplete on this component way less powerful
// on the test site-editor tests
export interface VideoSchema extends Omit<VideoModeProps, 'src'> {
  videoUrl?: VideoTypes.VideoPlayer['src']
}

export type MediaSchema = ImageTypes.ImageProps | VideoSchema

export type ImageListSchemaElement = Partial<ImageTypes.ImagesSchema[0]> &
  ImageModeMediaType

export type VideoListSchemaElement = Omit<VideoModeProps, 'src'> & {
  video?: VideoModeProps['src']
  mobileVideo?: VideoModeProps['src']
}

export type MediaListSchemaElement =
  | ImageListSchemaElement
  | VideoListSchemaElement

export type MediaListWithSchema = MediaListSchemaElement[] | MediaProps[]
