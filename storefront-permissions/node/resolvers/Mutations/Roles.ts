/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentRoleNames, Slugify, toHash } from '../../utils'
import { ROLES_VBASE_ID } from '../../utils/constants'
import { groupByRole } from '../Queries/Features'
import { searchRoles } from '../Queries/Roles'

export const saveRole = async (_: any, params: any, ctx: Context) => {
  const {
    clients: { vbase },
    vtex: { logger },
  } = ctx

  try {
    const { id, name, features } = params
    const locked = params.locked ?? false
    const data: any = { name, features, locked }

    if (params.slug) {
      data.slug = params.slug
    } else if (!id && !params.slug) {
      data.slug = Slugify(name)
    }

    const roles = await searchRoles(null, ctx)
    const role = roles.find((item) => item.slug === data.slug)

    await vbase.saveJSON('b2b_roles', ROLES_VBASE_ID, [
      ...roles.filter((item) => item.slug !== data.slug),
      {
        features,
        id: role?.id ? role.id : data.id ?? data.slug,
        locked,
        name,
        slug: data.slug,
      },
    ])

    return { status: 'success', message: '', id: data.slug }
  } catch (error) {
    logger.error({
      error,
      message: 'Roles.saveRole-error',
    })

    return { status: 'error', message: error }
  }
}

const onlyModules = (obj: any) => {
  return obj.map(({ module }: any) => {
    return { module }
  })
}

export const syncRoles = async (ctx: Context) => {
  const newRoles: any = []
  // Get role names based on the location
  const roleNames = currentRoleNames(ctx.vtex.tenant?.locale)
  // List all features grouped by Role
  const groups = await groupByRole(ctx)

  // List all roles from VB
  const roles: any = await searchRoles(null, ctx)

  groups?.forEach((role: any) => {
    const [slug] = Object.getOwnPropertyNames(role)

    let currRole: any = {}
    const roleIndex = roles.findIndex((o: any) => o.slug === slug)

    if (roleIndex === -1) {
      currRole = {
        features: role[slug],
        locked: true,
        name: roleNames[slug],
        slug,
      }
    } else if (
      toHash(onlyModules(role[slug])) !==
      toHash(onlyModules(roles[roleIndex].features))
    ) {
      // Compare features
      const currModules: any = roles[roleIndex].features

      const newModules = role[slug].filter((m: any) => {
        return (
          roles[roleIndex].features.findIndex(
            (i: any) => i.module === m.module
          ) === -1
        )
      })

      newModules.forEach((m: any) => {
        currModules.push(m)
      })

      currRole = {
        ...roles[roleIndex],
        features: currModules,
      }
    }

    if (currRole.name) {
      newRoles.push(currRole)
    }
  })

  const oldRoles = roles.filter((old: any) => {
    return newRoles.findIndex((n: any) => n.slug === old.slug) === -1
  })

  const mergedRoles = oldRoles.concat(newRoles)

  const promise: any = []

  mergedRoles.forEach((role: any) => {
    promise.push(saveRole(role.id ?? null, role, ctx))
  })

  return Promise.all(promise).then(() => mergedRoles)
}

export const deleteRole = async (_: any, params: any, ctx: Context) => {
  const {
    clients: { vbase },
    vtex: { logger },
  } = ctx

  try {
    const roles = await searchRoles(null, ctx)

    await vbase.saveJSON(
      'b2b_roles',
      ROLES_VBASE_ID,
      roles.filter((item) => item.id !== params.id)
    )

    return { status: 'success', message: '', id: params.id }
  } catch (error) {
    logger.error({
      error,
      message: 'Roles.deleteRole-error',
    })

    return { status: 'error', message: error }
  }
}
