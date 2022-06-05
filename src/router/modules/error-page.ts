/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'

import error_401 from '@/views/error-page/401.vue'
import error_404 from '@/views/error-page/404.vue'

const errorRouter: RouteRecordRaw = {
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: {
    title: 'Error Pages',
    icon: '404',
  },
  children: [
    {
      path: '401',
      component: error_401,
      name: 'Page401',
      meta: { title: '401', noCache: true },
    },
    {
      path: '404',
      component: error_404,
      name: 'Page404',
      meta: { title: '404', noCache: true },
    },
  ],
}

export default errorRouter
