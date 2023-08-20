import React from 'react'

import Attachment from './Attachment'
import useAttachment from './useAttachment'
import type { BundleItem, Offering } from '../../../interfaces'

interface Props {
  offering: Offering
  bundleItem: BundleItem
  index: number
}

const AttachmentContainer = (props: Props) => {
  const attachment = useAttachment(props)

  return <Attachment {...attachment} {...props} />
}

export default AttachmentContainer
