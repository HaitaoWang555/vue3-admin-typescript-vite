<script setup lang="ts">
import { getList } from '@/api/table'
import type { TableParams } from '@/api/table'
import { columnList } from './columns/inline'

const columns = ref(columnList)
const queryParam: TableParams = reactive({})
// loadData
function loadData() {
  const params = Object.assign({}, queryParam)
  if (params.displayTime && params.displayTime instanceof Array) {
    params.displayTime = params.displayTime.join(',')
  }
  return getList(params).then((res) => {
    // format data
    return res
  })
}
</script>
<template>
  <BaseProTable
    :query-param="queryParam"
    :border="true"
    :columns="columns"
    :data="loadData"
  >
    <template #btn>
      <el-button type="primary">Add</el-button>
      <el-button type="success">Publish</el-button>
      <el-button>Draft</el-button>
    </template>
    <template #importance="slotProps">
      <el-rate :model-value="slotProps.row.importance" disabled></el-rate>
    </template>
  </BaseProTable>
</template>
