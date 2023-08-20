/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { ChromePicker } from 'react-color'

import styles from './styles.css'

interface Props {
  label: { id: string }
  color: string
  action: (color: string) => void
  position?: 'top' | 'bottom'
}

export const ColorPicker = ({
  label,
  color,
  action,
  position = 'top',
}: Props) => {
  const { formatMessage } = useIntl()
  const [currentColor, setCurrentColor] = useState<string>()
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)

  const handleChange = (e: { hex: string }) => {
    setCurrentColor(e.hex)
  }

  const handleChangeComplete = (e: { hex: string }) => {
    action(e.hex)
  }

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  return (
    <div className={styles.inputColorContainer}>
      <button
        className={styles.buttonColor}
        style={{ background: currentColor }}
        onClick={() => setShowColorPicker(true)}
      />
      {showColorPicker ? (
        <div
          className={`${styles.chromePickerContainer} ${
            position === 'top' ? styles.positionTop : styles.positionBottom
          } `}
        >
          <div
            className={styles.chromePickerFixed}
            onClick={() => setShowColorPicker(false)}
          />
          <ChromePicker
            color={currentColor}
            onChangeComplete={handleChangeComplete}
            onChange={handleChange}
            disableAlpha
          />
        </div>
      ) : null}
      <p className={styles.inputColorlabel}>{formatMessage(label)}</p>
    </div>
  )
}
