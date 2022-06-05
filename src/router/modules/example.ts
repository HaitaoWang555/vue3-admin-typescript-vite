/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'

import BaseIcons from '@/views/example/icons/base-icons.vue'

const exampleRouter: RouteRecordRaw = {
  path: '/example',
  component: Layout,
  redirect: '/example/icons',
  name: 'ExamplePages',
  meta: { title: 'Example', icon: 'help' },
  children: [
    {
      path: 'icons',
      name: 'icons',
      component: BaseIcons,
      meta: { title: 'icons', icon: 'icon' },
    },
  ],
}

export default exampleRouter
