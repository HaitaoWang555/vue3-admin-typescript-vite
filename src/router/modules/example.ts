/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'

import BaseIcons from '@/views/example/icons/base-icons.vue'

const exampleRouter: RouteRecordRaw = {
  path: '/example',
  component: Layout,
  redirect: '/example/icons',
  name: 'ExamplePages',
  meta: { title: 'Example', icon: 'example' },
  children: [
    {
      path: 'icons',
      name: 'Icons',
      component: BaseIcons,
      meta: { title: 'Icons' },
    },
  ],
}

export default exampleRouter
