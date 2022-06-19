import { mock } from 'mockjs'
const data = mock('@integer(999, 9999)')
export default [
  {
    url: '/vue-admin-template/public/sendSms',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        message: 'success',
        data,
      }
    },
  },
  // submit
  {
    url: '/vue-admin-template/public/submit',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        message: 'success',
      }
    },
  },
]
