import type { ResponseBodyType, TableList } from '@/types/api'
import { mock } from 'mockjs'

const data = mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: '@name()',
      importance: '@integer(1, 3)',
      displayTime: '@datetime',
      pageviews: '@integer(300, 5000)',
    },
  ],
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: (): ResponseBodyType<TableList> => {
      const items = data.items
      return {
        code: 20000,
        success: true,
        data: {
          total: items.length,
          items: items,
        },
      }
    },
  },
]
