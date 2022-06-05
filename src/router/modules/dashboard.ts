/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'

import Dashboard from '@/views/dashboard/base-dashboard.vue'

const dashboardRouter: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { title: 'Dashboard', icon: 'dashboard' },
    },
  ],
}

export default dashboardRouter
