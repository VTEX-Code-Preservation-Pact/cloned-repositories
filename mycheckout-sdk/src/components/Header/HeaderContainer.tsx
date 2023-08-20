import React from 'react'

import Header from './Header'
import useHeader from './useHeader'

interface Props {
  className?: string
  clearOrderFormProfile: () => void
}

const HeaderContainer = (props: Props) => {
  const headerForm = useHeader(props)

  return <Header {...props} {...headerForm} />
}

export default HeaderContainer
