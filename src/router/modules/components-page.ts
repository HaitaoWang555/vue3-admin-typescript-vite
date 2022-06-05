/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'
import Tailwind from '@/views/components-page/tailwind/base-tailwind.vue'

const componentsRouter: RouteRecordRaw = {
  path: '/components',
  component: Layout,
  redirect: '/components/table',
  name: 'componentsPages',
  meta: {
    title: 'Components',
    icon: 'component',
  },
  children: [
    {
      path: 'tailwind',
      name: 'Tailwind',
      component: Tailwind,
      meta: { title: 'tailwind' },
    },
  ],
}

export default componentsRouter
