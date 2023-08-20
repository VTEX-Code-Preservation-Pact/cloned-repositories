interface Settings {
  sandbox?: boolean | undefined
  clientId?: string | undefined
  clientSecret?: string | undefined
  [index: string]: string | boolean | undefined
}

interface GetSettings {
  getSettings: {
    useAvalaraSandboxEnv: boolean
    clientIdValue: string
    clientSecretValue: string
  }
}
