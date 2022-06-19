import type { ProItem } from '@/types/components-utils'
const list: ProItem[] = [
  {
    dataIndex: 'payAccount',
    title: '付款账户',
    isForm: true,
    valueType: 'select',
    option: [
      {
        label: 'ant-design@alipay.com',
        value: 'ant-design@alipay.com',
      },
    ],
    prop: [
      {
        required: true,
        message: '请选择付款账户',
        trigger: 'change',
      },
    ],
    step: 0,
  },
  {
    dataIndex: 'receiver',
    title: '收款账户',
    isForm: true,
    formSlot: 'receiver',
    step: 0,
  },
  {
    dataIndex: 'receiverName',
    title: '收款人姓名',
    isForm: true,
    valueType: 'input',
    prop: [
      {
        required: true,
        message: '请输入收款人姓名',
        trigger: 'blur',
      },
    ],
    step: 0,
  },
  {
    dataIndex: 'amount',
    title: '转账金额',
    isForm: true,
    valueType: 'input-number',
    attrs: {
      min: 0,
      precision: 2,
      step: 0.1,
      max: 100,
    },
    prop: [
      {
        required: true,
        validator: (
          rule: any,
          value: any,
          callback: (error?: string | Error) => void
        ): void => {
          if (!value) {
            callback(new Error('请输入转账金额!'))
          } else {
            callback()
          }
        },
        trigger: 'change',
      },
    ],
    step: 0,
  },
  {
    dataIndex: 'desinfo',
    isForm: true,
    formSlot: 'desinfo',
    step: 1,
  },
  {
    dataIndex: 'password',
    title: '支付密码',
    isForm: true,
    valueType: 'input',
    prop: [
      {
        required: true,
        message: '需要支付密码才能进行支付',
        trigger: 'blur',
      },
    ],
    attrs: {
      'show-password': true,
    },
    step: 1,
  },
  {
    dataIndex: 'result',
    isForm: true,
    formSlot: 'result',
    step: 2,
    formSpan: 24,
  },
]

export { list }
