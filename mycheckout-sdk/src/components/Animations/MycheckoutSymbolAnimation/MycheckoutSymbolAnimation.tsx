import React from 'react'
import Lottie from 'react-lottie'

import * as animation from './MycheckoutSymbolLottie.json'

export const MycheckoutSymbolAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
  }

  return (
    <div>
      <Lottie options={defaultOptions} width={400} height={400} />
    </div>
  )
}
