import React, { useEffect, FunctionComponent, Fragment } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { urls } from './constants/URLs'

const Onboarding: FunctionComponent = () => {
  const {
    query: { account, code, state },
  } = useRuntime()

  useEffect(() => {
    if (account && code && state) {
      window.location.assign(`${urls.STOREFRONT_ONBOARDING_PAGE(account)}?account=${account}&code=${code}&state=${state}`)
    }
  }, [code, account, state])

  return <Fragment></Fragment>
}

export default Onboarding
