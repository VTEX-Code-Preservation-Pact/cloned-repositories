import React from 'react'
import Lottie from 'react-lottie'

import * as animation from './MycheckoutLottie.json'

export const MyCheckoutAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
  }

  return (
    <div
      style={{
        width: '100%',
        height: 200,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Lottie
        options={defaultOptions}
        width={380}
        height={380}
        style={{
          position: 'absolute',
          top: '-70px',
        }}
      />
    </div>
  )
}
