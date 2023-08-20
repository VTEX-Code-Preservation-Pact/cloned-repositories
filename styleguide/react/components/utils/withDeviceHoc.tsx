import React from 'react'
import { useMedia } from 'use-media'

export enum Device {
  phone = 'phone',
  tablet = 'tablet',
  desktop = 'desktop',
}

const withDevice = Component => {
  function WithDevice({
    device: customDevice,
    isMobile: customIsMobile,
    ...props
  }) {
    // Taken at https://github.com/vtex-apps/device-detector/blob/master/react/useDevice.tsx#L22
    const isScreenMedium = useMedia({ minWidth: '40rem' })
    const isScreenLarge = useMedia({ minWidth: '64.1rem' })

    const device =
      customDevice ?? isScreenLarge
        ? Device.desktop
        : isScreenMedium
        ? Device.tablet
        : Device.phone

    const isMobile = customIsMobile ?? device.toLowerCase() === 'phone'

    return <Component device={device} isMobile={isMobile} {...props} />
  }

  return WithDevice
}

export default withDevice
