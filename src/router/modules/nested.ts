/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'

import Menu1 from '@/views/nested/menu1/base-menu1.vue'
import Menu1_1 from '@/views/nested/menu1/menu1-1/base-menu1-1.vue'
import Menu1_2 from '@/views/nested/menu1/menu1-2/base-menu1-2.vue'
import Menu1_2_1 from '@/views/nested/menu1/menu1-2/menu1-2-1/base-menu1-2-1.vue'
import Menu1_2_2 from '@/views/nested/menu1/menu1-2/menu1-2-2/base-menu1-2-2.vue'
import Menu1_3 from '@/views/nested/menu1/menu1-3/base-menu1-3.vue'
import Menu2 from '@/views/nested/menu2/base-menu2.vue'

const nestedRouter: RouteRecordRaw = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: 'Nested',
    icon: 'nested',
  },
  children: [
    {
      path: 'menu1',
      component: Menu1,
      name: 'Menu1',
      meta: { title: 'Menu 1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: Menu1_1,
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1' },
        },
        {
          path: 'menu1-2',
          component: Menu1_2,
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: 'Menu 1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: Menu1_2_1,
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1' },
            },
            {
              path: 'menu1-2-2',
              component: Menu1_2_2,
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2' },
            },
          ],
        },
        {
          path: 'menu1-3',
          component: Menu1_3,
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3' },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: Menu2,
      meta: { title: 'Menu 2' },
    },
  ],
}

export default nestedRouter
