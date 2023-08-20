import { keys } from 'ramda'
import { createAppsClient } from 'vtex'

const isNpm = (dep: string) => dep.startsWith('npm:')

export const removeNpm = (deps: Record<string, string[]>) => (inValues?: boolean) => {
  Object.keys(deps).forEach((key) => {
    if (isNpm(key)) {
      return delete deps[key]
    }

    if (inValues) {
      deps[key] = deps[key].filter((d) => !isNpm(d))
    }
  })

  return deps
}

export const cleanDeps = (deps: Record<string, string[]>) => keys(removeNpm(deps)())

export const getCleanDependencies = async (workspace: string) => {
  return (await createAppsClient({ workspace })
    .getDependencies()
    .then((deps) => {
      return cleanDeps(deps)
    })) as string[]
}
