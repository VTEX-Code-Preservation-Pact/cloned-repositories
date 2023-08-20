import React from 'react'
import type { ChangeEvent } from 'react'
import { Input, Slider } from 'vtex.styleguide'

import { Row } from '../Row'
import styles from './styles.css'

interface Props {
  label: { id: string }
  maxValue?: number
  value: number
  action: (args: number) => void
}

export const RadioSettings = ({
  label,
  maxValue = 99,
  value,
  action,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? parseInt(e.target.value, 10) : 0

    const left = Math.max(value || 0, 0)
    const right = Math.min(value || maxValue, maxValue)

    if (left > right) return
    action(val)
  }

  return (
    <Row label={label}>
      <div className={styles.radioContainer}>
        <div className={styles.sliderContainer}>
          <Slider
            onChange={(text: number[]) => action(text[0])}
            min={0}
            max={maxValue}
            step={1}
            defaultValues={[value]}
            values={[value]}
          />
        </div>

        <div className={styles.sliderInputContainer}>
          <Input id="input_radio" value={value} onChange={handleChange} />
          <label htmlFor="input_radio" className={styles.sliderInputLabel}>
            PX
          </label>
        </div>
      </div>
    </Row>
  )
}
