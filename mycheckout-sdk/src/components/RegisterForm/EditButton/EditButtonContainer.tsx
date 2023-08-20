import React from 'react'

import EditButton from './EditButton'
import useEditButton from './useEditButton'
import type { Section } from '../../ViewValidate'

interface Props {
  completed: boolean
  orderSection: Section
}

const EditButtonContainer = (props: Props) => {
  const editButton = useEditButton()

  return <EditButton {...editButton} {...props} />
}

export default EditButtonContainer
