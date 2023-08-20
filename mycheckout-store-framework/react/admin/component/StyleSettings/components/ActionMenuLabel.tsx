import React from 'react'
import { IconCheck } from 'vtex.styleguide'

interface Props {
  text: string
  selected: boolean
}

export const ActionMenuLabel = ({ text, selected }: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 20 }}>{selected && <IconCheck />}</div>
      <div> {text}</div>
    </div>
  )
}
