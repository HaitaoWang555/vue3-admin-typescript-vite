/** When your routing table is too long, you can split it into small modules **/
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/LayoutBase.vue'
import Tailwind from '@/views/components-page/tailwind/base-tailwind.vue'
import BaseTableList from '@/views/components-page/table/base-table-list.vue'
import formRouter from './components-modules/form'
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
      meta: { title: 'Tailwind' },
    },
    {
      path: 'table',
      name: 'Table',
      component: BaseTableList,
      meta: { title: 'BaseTableList' },
    },
    formRouter,
  ],
}

export default componentsRouter
