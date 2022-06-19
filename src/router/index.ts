import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'
import Redirect from '@/components/Redirect/base-redirect.vue'
import baseRouter from './modules/base'
import dashboardRouter from './modules/dashboard'
import nestedRouter from './modules/nested'
import errorRouter from './modules/error-page'
import exampleRouter from './modules/example'
import componentsRouter from './modules/components-page'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: Redirect,
      },
    ],
  },
  dashboardRouter,

  componentsRouter,
  exampleRouter,
  errorRouter,
  nestedRouter,

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/HaitaoWang555/vue3-admin-template',
        component: () => null,
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },

  ...baseRouter,
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } },
]

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: constantRoutes,
})

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

export default router

export function resetRouter(): void {
  const newRouter = createRouter({
    history,
    routes: constantRoutes,
  })
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
