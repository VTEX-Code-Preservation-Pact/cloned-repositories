import React, { FunctionComponent } from 'react'
import { useOwnerBlockCssHandles } from 'vtex.render-runtime'
import { IconStar } from 'vtex.store-icons'
import styles from '../styles.css'
import classNames from 'classnames'

const handleNames = ['star', 'star--filled', 'star--empty']

const Star: FunctionComponent<StarProps> = ({ filled }) => {
  const handles = useOwnerBlockCssHandles(handleNames)

  return (
    <span
      className={classNames(handles.star, {
        [`${styles['star--filled']} ${handles['star--filled']}`]: filled,
        [`${styles['star--empty']} ${handles['star--empty']}`]: !filled,
      })}
    >
      <IconStar />
    </span>
  )
}

interface StarProps {
  filled: boolean
}

export default Star
