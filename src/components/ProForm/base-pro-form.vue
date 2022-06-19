<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import type {
  ProItem,
  optionType,
  radioValType,
} from '@/types/components-utils'
import type { FormRules } from 'element-plus'
import SendCode from '@/components/SendCode/base-send-code.vue'
import type { Ref } from 'vue'

const prop = defineProps({
  formParam: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as () => Record<string, any>,
    default: () => {
      return {}
    },
  },
  layout: {
    type: Object,
    default: () => {
      return {}
    },
  },
  formList: {
    type: Array as () => Array<ProItem>,
    default: () => {
      return []
    },
  },
})

const emit = defineEmits<{
  (e: 'proSubmit', val: (params: string) => void): void
}>()

defineExpose({
  handleSubmit,
  resetFormParam,
})

const showForm = ref(false)
const rules: FormRules = {}
const formRows: Ref<Array<Array<ProItem>>> = ref([])

const ProForm = ref()
const tempForm: Record<string, unknown> = {}
prop.formList.forEach((i) => {
  tempForm[i.dataIndex] = i.defaultValue || ''
})
const originalFormParams = JSON.parse(
  JSON.stringify(Object.assign(tempForm, prop.formParam))
)

function init() {
  for (let index = 0; index < prop.formList.length; index++) {
    const element = prop.formList[index]
    element.title = element.title || ''
    if (element.isShowFormItem) {
      element.isForm = element.isShowFormItem(prop.formParam)
    }
    if (!element.isForm) continue
    if (element.row || element.row === 0) {
      if (formRows.value[element.row]) {
        formRows.value[element.row].push(element)
      } else {
        formRows.value[element.row] = []
        formRows.value[element.row].push(element)
      }
    }
    if (
      element.valueType &&
      element.valueType === 'select' &&
      element.optionMth
    ) {
      element.option = []
      initOption(element)
    }
  }
  if (formRows.value.length === 0) formRows.value = [prop.formList]
  initRules()
  showForm.value = true
}
function initOption(element: ProItem) {
  element.optionMth &&
    element.optionMth().then((res) => {
      if (!res) return
      const arr = res.data.data.map((i) => {
        const obj = {} as optionType
        obj.label = i[element.optionskey ? element.optionskey.label : 'label']
        obj.value = i[element.optionskey ? element.optionskey.value : 'value']
        return obj
      })
      element.defaultOption = element.defaultOption ? element.defaultOption : []
      element.option = element.defaultOption.concat(arr)
    })
}
function initRules() {
  prop.formList.forEach((i) => {
    if (i.prop) {
      const msg = ['date-picker', 'select'].includes(i.inpuType as string)
        ? '请选择'
        : '请输入'
      rules[i.dataIndex] = i.prop.map((item) => {
        item.message = msg + i.title || item.message
        return item
      })
    }
  })
}
init()

function linkageForm() {
  if (prop.formList.filter((i) => i.isShowFormItem).length === 0) return
  formRows.value.forEach((list) => {
    list.forEach((item) => {
      if (item.isShowFormItem) {
        item.isForm = item.isShowFormItem(prop.formParam)
      }
    })
  })
}

function resetFormParam() {
  Object.assign(prop.formParam, originalFormParams)
  const timer = setTimeout(() => {
    if (ProForm.value) {
      ProForm.value.clearValidate()
      clearTimeout(timer)
    }
  }, 100)
}
function handleSubmit() {
  return new Promise((resolve, reject) => {
    ProForm.value.validate((valid: boolean) => {
      if (valid) {
        resolve(null)
        emit('proSubmit', (states) => {
          if (states === 'fulfilled') resetFormParam()
        })
      } else {
        reject(new Error('Form valid error'))
      }
    })
  })
}
onBeforeUnmount(() => {
  resetFormParam()
})

watch(
  () => prop.formParam,
  () => {
    linkageForm()
  },
  { deep: true }
)
watch(
  () => prop.formList.length,
  () => {
    formRows.value = []
    init()
  }
)
</script>

<template>
  <!-- eslint-disable vue/no-v-html  -->
  <el-form
    v-if="showForm"
    ref="ProForm"
    :model="formParam"
    :label-width="layout.labelWidth || '145px'"
    :rules="rules"
    :style="{ width: layout.formWidth || '560px' }"
    style="margin: 0 auto"
    class="base-pro-form"
  >
    <el-row
      v-for="(row, j) in formRows"
      :key="j"
      :class="{ 'card-row': formRows.length > 1 }"
    >
      <el-col v-if="formRows.length > 1" :span="24" class="card-title">
        <slot :name="'title' + String(j)" />
      </el-col>

      <el-row
        class="card-body"
        :gutter="layout.gutter || 20"
        style="width: 100%"
      >
        <el-col
          v-for="(item, index) in row.filter((i) => i.isForm)"
          :key="index"
          :span="item.formSpan || 24"
          :xs="item.formXs || item.formSpan"
          :sm="item.formSm || item.formSpan"
          :md="item.formMd || item.formSpan"
          :lg="item.formLg || item.formSpan"
          :xl="item.formXl || item.formSpan"
        >
          <template v-if="item.formSlot">
            <slot :name="item.formSlot" :item="item" />
          </template>
          <el-form-item v-else :prop="item.prop ? item.dataIndex : ''">
            <template #label>
              <span
                v-if="item.formLabelHtml"
                class="pro-slot-form-label"
                v-html="item.formLabelHtml"
              />
              <template v-else>
                {{ item.title }}
              </template>
              <el-tooltip
                v-if="item.formLabelTooltip"
                :content="item.formLabelTooltip"
                placement="top"
              >
                <i class="el-icon-question" />
              </el-tooltip>
              <template v-if="item.title">：</template>
            </template>
            <el-input
              v-if="item.valueType === 'input'"
              v-model="formParam[item.dataIndex]"
              v-bind="item.attrs"
              :type="item.inpuType || 'text'"
              :placeholder="item.placeholder || '请输入' + item.title"
            >
              <template v-if="item.attrs && item.attrs.prepend" #prepend>
                {{ item.attrs?.prepend }}
              </template>
              <template v-if="item.attrs && item.attrs.append" #append>
                {{ item.attrs?.append }}
              </template>
            </el-input>
            <el-input-number
              v-if="item.valueType === 'input-number'"
              v-model="formParam[item.dataIndex]"
              v-bind="item.attrs"
              :placeholder="item.placeholder || '请输入' + item.title"
              style="width: 100%"
            />
            <template v-else-if="item.valueType === 'check-code'">
              <el-row :gutter="16" style="width: 100%">
                <el-col class="gutter-row" :span="16">
                  <el-input
                    v-model="formParam[item.dataIndex]"
                    :placeholder="item.placeholder || '请输入' + item.title"
                  />
                </el-col>
                <el-col class="gutter-row" :span="8">
                  <SendCode v-bind="item.attrs" />
                </el-col>
              </el-row>
            </template>
            <el-switch
              v-else-if="item.valueType === 'switch'"
              v-model="formParam[item.dataIndex]"
            />
            <el-date-picker
              v-else-if="item.valueType === 'date-picker'"
              v-model="formParam[item.dataIndex]"
              v-bind="item.attrs"
              clearable
              style="width: 100%"
            />
            <el-select
              v-else-if="item.valueType === 'select'"
              v-model="formParam[item.dataIndex]"
              :placeholder="item.placeholder || '请选择' + item.title"
              filterable
              :multiple="item.multiple ? true : false"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="s in item.option?.filter((i) => i.value !== '')"
                :key="'select' + s.value"
                :value="s.value"
                :label="s.label"
              >
                {{ s.label }}
              </el-option>
            </el-select>
            <el-checkbox-group
              v-else-if="item.valueType === 'checkbox'"
              v-model="formParam[item.dataIndex]"
            >
              <el-checkbox
                v-for="(s, i) in item.option"
                :key="i"
                :label="s.value"
              >
                {{ s.label }}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              v-else-if="item.valueType === 'radio'"
              v-model="formParam[item.dataIndex]"
            >
              <el-radio
                v-for="(s, i) in item.option"
                :key="i"
                :label="(s.value as radioValType)"
              >
                {{ s.label }}
              </el-radio>
            </el-radio-group>
            <span v-if="item.formItemHelp" style="color: rgba(0, 0, 0, 0.45)">
              {{ item.formItemHelp }}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-row>

    <el-form-item
      v-if="$slots && $slots.footerBtn"
      label-width="0"
      class="footerBtn"
    >
      <slot name="footerBtn" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.card-row {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;

  .card-title {
    padding: $smallPadding 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  .card-body {
    padding: 20px;
  }
}

.card-row + .card-row {
  margin-top: 20px;
}
.base-pro-form {
  :deep(.el-form-item__label) {
    font-weight: 700;
  }
}
</style>
