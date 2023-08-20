/* eslint-disable @typescript-eslint/no-explicit-any */
const sanitizeFeatures = (settings: any) => {
  const ret: any = []

  settings.forEach((app: any) => {
    const [module] = app.declarer.split('@')

    if (app[module]?.features) {
      const { name, features } = app[module]

      ret.push({
        features,
        module,
        name,
      })
    }
  })

  return ret
}

export const getFeaturesByModule = async (
  _: any,
  params: any,
  ctx: Context
) => {
  const { module } = params

  if (ctx.vtex?.settings?.dependenciesSettings) {
    const settingsFiles: any = sanitizeFeatures(
      ctx.vtex.settings.dependenciesSettings
    )

    return settingsFiles.find((app: any) => {
      return app.module === module
    })
  }

  return null
}

export const listFeatures = async (_: any, __: any, ctx: Context) => {
  let result = []

  if (ctx.vtex?.settings?.dependenciesSettings) {
    const settingsFiles: any = sanitizeFeatures(
      ctx.vtex.settings.dependenciesSettings
    )

    if (settingsFiles?.length) {
      result = settingsFiles
    } else if (Object.getOwnPropertyNames(settingsFiles).length) {
      result = [settingsFiles]
    }
  }

  return result
}

const extractRoles = (settings: any) => {
  const roles: any = {}

  const apps = settings.length ? settings : [settings]

  apps.forEach((app: any) => {
    app.features?.forEach((feature: any) => {
      feature.roles?.forEach((role: string) => {
        roles[role] = true
      })
    })
  })

  return Object.getOwnPropertyNames(roles)
}

const featuresByRole = (settings: any, role: string) => {
  const features: any = []
  const apps = settings.length ? settings : [settings]

  apps.forEach((app: any) => {
    app.features?.forEach((feature: any) => {
      feature.roles?.forEach((current: string) => {
        if (current === role) {
          const moduleIndex = features.findIndex((f: any) => {
            return f.module === app.module
          })

          if (moduleIndex === -1) {
            features.push({
              features: [feature.value],
              module: app.module,
            })
          } else {
            features[moduleIndex].features.push(feature.value)
          }
        }
      })
    })
  })

  return features
}

export const groupByRole = async (ctx: Context) => {
  const settings = await listFeatures(null, null, ctx)
  const roles = extractRoles(settings)
  const features: any = []

  roles.forEach((role: string) => {
    features.push({ [role]: featuresByRole(settings, role) })
  })

  return features
}
