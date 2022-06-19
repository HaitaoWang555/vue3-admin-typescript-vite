import type { ProItem } from '@/types/components-utils'

const columnList: ProItem[] = [
  {
    dataIndex: 'id',
    title: 'ID',
    width: 180,
  },
  {
    dataIndex: 'title',
    width: undefined,
    minWidth: 350,
    align: 'left',
    title: 'Title',
  },
  {
    dataIndex: 'author',
    width: 150,
    title: 'Author',
  },
  {
    dataIndex: 'importance',
    width: 100,
    title: 'Imp',
    scopedSlots: { customRender: 'importance' },
    valueType: 'select',
    option: [
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
    ],
    isSearch: true,
    isForm: true,
    formSlot: 'importance',
  },
  {
    dataIndex: 'displayTime',
    width: 180,
    title: 'Date',
    scopedSlots: { customRender: 'date' },
    isSearch: true,
    valueType: 'date-picker',
    attrs: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      'value-format': 'YYYY-MM-DD',
      'start-placeholder': 'Start Date',
      'end-placeholder': 'End Date',
    },
  },
]

export { columnList }
