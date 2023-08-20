interface ReskytSettings {
  reskytAppName: string
  reskytFabName: string
  reskytHtmlTitle: string
  reskytDownloadLink: string
  reskytAppImage: string
  reskytAppImageAlt: string
}

export const checkConfiguration = (config: ReskytSettings): boolean => {
  const keys = Object.keys(config)

  if (!keys.length) return false

  for (let i = 0; i < keys.length; i++) {
    if (!config[keys[i] as keyof ReskytSettings]) {
      return false
    }
  }

  return true
}
