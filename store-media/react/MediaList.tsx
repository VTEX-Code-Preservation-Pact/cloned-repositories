import React from 'react'
import type { PropsWithChildren } from 'react'
import { useDevice } from 'vtex.device-detector'
import { ListContextProvider, useListContext } from 'vtex.list-context'
import type { ImageTypes } from 'vtex.store-image'

import { getMediaAsJSXList } from './modules/mediaAsList'
import type { MediaProps } from './MediaTypes'

export interface MediaListProps {
  /**
   * List of Media props that will be turned into a list of Media components
   * @default []
   */
  mediaList?: MediaProps[]
}

export interface MediaListPropsWithHeight extends MediaListProps {
  /**
   * maxHeight to be applied to Media in case it's an image and is being used as a block
   * @default 420
   */
  height?: ImageTypes.ImageListProps['height']
}

/**
 * MediaList must receive a mediaList containing props identical
 * to the ones accepted by the Media component, meaning that it
 * receives 'src' when being used as a component.
 *
 * When used as a block, this component acts similar to the list-context.image-list block
 * present on the vtex.store-image app. It acceps 'image' and 'mobileImage'
 * to indicate the source of the image and, for video, it receives 'video' and 'mobileVideo'.
 */
function MediaList(props: PropsWithChildren<MediaListProps>) {
  const { mediaList = [], children } = props

  // This is here to mantain compatibility with list-context.image-list
  const { height } = props as MediaListPropsWithHeight

  const list = useListContext()?.list ?? []
  const { isMobile } = useDevice()

  const imageListContent = getMediaAsJSXList(mediaList, isMobile, height)

  const newListContextValue = list.concat(imageListContent)

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

MediaList.schema = {
  title: 'admin/editor.mediaList.title',
}

export default MediaList
