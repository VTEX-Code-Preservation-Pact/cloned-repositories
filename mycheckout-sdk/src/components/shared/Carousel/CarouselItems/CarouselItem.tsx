import type { ReactElement } from 'react'
import React from 'react'

import styles from '../carousel.modules.css'

export interface Props {
  children?: ReactElement | ReactElement[]
}

export const CarouselItem = ({ children }: Props) => {
  return <div className={styles.carouselItem}>{children}</div>
}
