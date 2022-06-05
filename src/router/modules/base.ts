/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import BaseLogin from '@/views/login/base-login.vue'
import Error_404 from '@/views/error-page/404.vue'

const baseRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    component: BaseLogin,
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: Error_404,
    meta: { hidden: true },
  },
]

export default baseRouter
