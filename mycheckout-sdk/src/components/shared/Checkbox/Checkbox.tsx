import React from 'react'

import styles from './checkbox.css'

interface Props {
  isSelected: boolean
  onCheckboxChange: (_id?: string) => void
  id?: string
}

const Checkbox = (props: Props) => {
  const { isSelected, onCheckboxChange, id = '' } = props

  return (
    <label className={styles.checkboxContainer}>
      <input
        id={id}
        className={styles.checkboxContent}
        type="checkbox"
        onChange={() => onCheckboxChange(id)}
        checked={isSelected}
      />
      <span className={styles.check}></span>
    </label>
  )
}

export default Checkbox
