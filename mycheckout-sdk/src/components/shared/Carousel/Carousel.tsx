import type { CSSProperties, ReactElement } from 'react'
import React, { createContext, useEffect, useState } from 'react'

import { ArrowBack } from '../../Icons'
import type { CarouselContextProps } from '../interfaces/interfaces'
import globalSyles from '../../../myCheckout-styles.module.css'
import styles from './carousel.modules.css'

export interface Props {
  children: ReactElement | ReactElement[]
  className?: string
  data: unknown[]
  itemLimit?: number
  style?: CSSProperties
}

export const CarouselContext = createContext({} as CarouselContextProps)
const { Provider } = CarouselContext

export const Carousel = ({
  children,
  data,
  itemLimit = 4,
  className,
  style,
}: Props) => {
  const [showArrows, setShowArrows] = useState<boolean>(true)

  useEffect(() => {
    if (data?.length <= itemLimit) setShowArrows(false)
  }, [data])

  return (
    <Provider value={{ data }}>
      <div className={`${className} ${styles.carouselContainer}`} style={style}>
        {showArrows && (
          <a
            className={`${styles.carouselArrowsContent} ${styles.carouselArrowBackContent} ${globalSyles.cursorPointer}`}
          >
            <ArrowBack
              className={`${styles.carouselIcon} ${styles.carouselIconArrowBack}`}
              fill={globalSyles.iconAlternative}
            />
          </a>
        )}
        {children}
        {showArrows && (
          <a
            className={`${styles.carouselArrowsContent} ${styles.carouselForwardArrowContent} ${globalSyles.cursorPointer}`}
          >
            <ArrowBack
              className={`${styles.carouselIcon} ${styles.carouselIconForwardArrow}`}
              fill={globalSyles.iconAlternative}
            />
          </a>
        )}
      </div>
    </Provider>
  )
}
