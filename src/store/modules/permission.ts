import { defineStore } from 'pinia'

import { asyncRoutes, constantRoutes } from '@/router/index'
import type { RouteRecordRaw } from 'vue-router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) =>
      (route?.meta as { roles: string[] }).roles.includes(role)
    )
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(
  routes: RouteRecordRaw[],
  roles: string[]
): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export type IPermission = {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

// usePermissionStore
export const usePermissionStore = defineStore({
  id: 'usePermissionStore',
  state: (): IPermission => ({
    routes: [],
    addRoutes: [],
  }),
  actions: {
    async generateRoutes(roles: string[]): Promise<RouteRecordRaw[]> {
      return new Promise((resolve) => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    },
  },
})
