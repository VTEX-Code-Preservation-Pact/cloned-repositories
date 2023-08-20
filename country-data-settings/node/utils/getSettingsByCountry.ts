export const getSettingsByCountry = (settings: Configuration[]) => {
  const settingsByCountry = settings.reduce<{
    [country: string]: CountryDataConfiguration
  }>((groupedConfigs, configuration) => {
    const { declarer } = configuration

    const [declarerAppName] = declarer.split('@')

    if (!configuration[declarerAppName]) {
      return groupedConfigs
    }

    const countryConfig = configuration[declarerAppName]

    groupedConfigs[countryConfig.countryISO] = countryConfig

    return groupedConfigs
  }, {})

  return settingsByCountry
}
