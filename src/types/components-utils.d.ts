/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDatePickerType, FormItemRule } from 'element-plus'
import type { ResponseBodyType } from '@/types/api'
import type { AxiosPromise } from 'axios'

export type radioValType = string | number | boolean
export type selectValType = string | number | boolean | Record<string, any>

export type optionType = {
  label: string | number | undefined
  value: radioValType | selectValType
}
export type scopedSlotsType = {
  customRender: string
  dict?: string
}

export type ProItem = {
  dataIndex: string
  valueType?: string
  optionMth?: () => AxiosPromise<ResponseBodyType<Array<Record<string, any>>>>
  optionskey?: { label: string; value: string }
  option?: Array<optionType>
  defaultOption?: Array<optionType>
  defaultValue?: any
  row?: number
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  slot?: string
  formSpan?: number
  formLabelHtml?: string
  formLabelTooltip?: string
  formItemHelp?: string
  formXs?: number
  formSm?: number
  formMd?: number
  formLg?: number
  formXl?: number
  formSlot?: string
  prop?: FormItemRule[]
  attrs?: Record<string, any>
  title?: string
  placeholder?: string
  inpuType?: string
  step?: number
  multiple?: boolean
  pickerType?: IDatePickerType
  pickerFormat?: string
  isSearch?: boolean
  isForm?: boolean
  noTable?: boolean
  fieldVisible?: boolean
  fixed?: boolean | string
  minWidth?: number | string
  width?: number | string | undefined
  align?: string
  sortable?: string | boolean
  scopedSlots?: scopedSlotsType
  isShowFormItem?: (params: Record<string, any>) => boolean
}
