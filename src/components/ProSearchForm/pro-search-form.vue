<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */

import type { ProItem, optionType } from '@/types/components-utils'
const prop = defineProps({
  queryParam: {
    type: Object,
    default: () => {
      return {}
    },
  },
  searchList: {
    type: Array as () => Array<ProItem>,
    default: () => {
      return []
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits<{
  (e: 'search', val: boolean): void
}>()

const advanced = ref(false)

function init() {
  for (let index = 0; index < prop.searchList.length; index++) {
    const element = prop.searchList[index]
    if (
      element.valueType &&
      element.valueType === 'select' &&
      element.optionMth
    ) {
      if (element.option?.length === 0) {
        initOption(element)
      }
    }
  }
}
function initOption(element: ProItem) {
  element.optionMth &&
    element.optionMth().then((res) => {
      if (!res) return
      element.option = res.data.data.map((i) => {
        const obj = {} as optionType
        obj.label = i[element.optionskey ? element.optionskey.label : '']
        obj.value = i[element.optionskey ? element.optionskey.value : '']
        return obj
      })
    })
}

function toggleAdvanced() {
  advanced.value = !advanced.value
}

function resetQueryParam() {
  for (const key in prop.queryParam) {
    if (prop.queryParam[key] instanceof Array) {
      prop.queryParam[key] = []
    } else {
      prop.queryParam[key] = ''
    }
  }
}

init()
</script>

<template>
  <div id="search-form-wrap" class="table-page-search-wrapper">
    <el-form
      v-if="searchList && searchList.length > 0"
      :model="queryParam"
      class="search-form"
      label-position="left"
      :inline="true"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in searchList"
          v-show="index < 3 || advanced"
          :key="index"
          :span="item.span || 8"
          :xs="item.xs || item.span || 24"
          :sm="item.sm || item.span || 12"
          :md="item.md || item.span || 8"
          :lg="item.lg || item.span || 4"
          :xl="item.xl || item.span || 4"
        >
          <template v-if="item.slot">
            <slot :name="item.slot" :item="item"></slot>
          </template>
          <el-form-item :label="item.title + ' : '">
            <el-input
              v-if="item.valueType === 'input'"
              v-model="queryParam[item.dataIndex]"
              :placeholder="item.placeholder || item.title"
              clearable
            />
            <el-date-picker
              v-else-if="item.valueType === 'date-picker'"
              v-model="queryParam[item.dataIndex]"
              v-bind="item.attrs"
              style="width: 100%"
            />

            <el-select
              v-else-if="item.valueType === 'select'"
              v-model="queryParam[item.dataIndex]"
              :placeholder="item.placeholder || item.title"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="(s, i) in item.option"
                :key="i"
                :label="s.label"
                :value="s.value"
              >
                {{ s.label }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xl="6">
          <div class="table-page-search-submitButtons">
            <el-button
              type="primary"
              :loading="loading"
              @click="$emit('search', true)"
            >
              查询
            </el-button>
            <el-button style="margin-left: 8px" @click="resetQueryParam">
              重置
            </el-button>
            <a
              v-if="searchList.filter((i) => i.isSearch).length > 3"
              style="margin-left: 8px; font-size: 14px"
              @click="toggleAdvanced"
            >
              {{ advanced ? '收起' : '展开' }}

              <i-ep-arrow-up v-if="advanced" />
              <i-ep-arrow-down v-else />
            </a>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss">
@import '@/styles/variables.scss';
// 数据列表 搜索条件
.table-page-search-wrapper {
  overflow-x: hidden;
}

.table-page-search-submitButtons {
  margin-bottom: $smallPadding;
}

#search-form-wrap .search-form .el-form-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .el-form-item__content {
    flex-grow: 1;
  }
}
</style>
