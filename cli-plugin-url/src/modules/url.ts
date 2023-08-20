import { clusterIdDomainInfix, publicEndpoint, SessionManager } from 'vtex'

export default () => {
  const { account, workspace } = SessionManager.getSingleton()

  return `https://${workspace}--${account}${clusterIdDomainInfix()}.${publicEndpoint()}`
}
