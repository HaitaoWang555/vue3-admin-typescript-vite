<script setup lang="ts">
import type { Ref } from 'vue'
import Pagination from '@/components/Pagination/base-pagination.vue' // secondary package based on el-pagination
import type { ProItem } from '@/types/components-utils'
import type { ProTableList, ResponseBodyType } from '@/types/api'
import type { AxiosResponse } from 'axios'
import { parseTime } from '@/utils'
const prop = defineProps({
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  queryParam: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as () => Record<string, any>,
    default: () => {
      return {}
    },
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
  columns: {
    type: Array as () => Array<ProItem>,
    default: () => {
      return []
    },
  },
})

const ProElTable = ref()
const key = ref(0)
const list = ref()
const listLoading = ref(false)

const tableShowIndex = ref(prop.showIndex)
const tableShowSelection = ref(prop.showSelection)

const localPagination = reactive({
  total: 0,
  page: 1,
  pageSize: 20,
})
const tableColumns: Ref<Array<ProItem>> = ref([])

function initColumns() {
  tableColumns.value = prop.columns
    .filter((i) => !i.noTable)
    .map((i) => {
      i.fieldVisible = true
      return i
    })
}

function loadData() {
  listLoading.value = true
  const result = prop.data(localPagination)
  // r.page, r.totalCount, r.data
  if (
    (typeof result === 'object' || typeof result === 'function') &&
    typeof result.then === 'function'
  ) {
    result
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((r: AxiosResponse<ResponseBodyType<ProTableList<any>>>) => {
        if (r.data.data.items.length === 0) {
          return null
        }
        list.value = r.data.data.items // Table Data
        localPagination.total = r.data.data.total || 0
      })
      .finally(() => {
        listLoading.value = false
      })
  }
}
function refresh(bool = false) {
  if (bool) {
    localPagination.page = 1
  }
  loadData()
}

function updateTable() {
  key.value = key.value += 1
}

function resetting(type: string, val: boolean) {
  if (type === 'showIndex') {
    tableShowIndex.value = val
  }
  if (type === 'showSelection') {
    tableShowSelection.value = val
  }
}

if (!prop.lazyLoad) {
  initColumns()
  loadData()
}

watch(
  () => prop.lazyLoad,
  () => {
    if (!prop.lazyLoad) {
      initColumns()
      loadData()
    }
  }
)

defineExpose({
  refresh,
  list,
})
</script>
<template>
  <div class="pro-table">
    <ProSearchForm
      :search-list="columns.filter((i) => i.isSearch)"
      :query-param="queryParam"
      :loading="listLoading"
      @search="refresh"
    ></ProSearchForm>
    <div class="table-operator">
      <div class="solt">
        <slot name="btn"></slot>
      </div>
      <TableSetting
        v-model:columns="tableColumns"
        @refresh="refresh(true)"
        @re-render="updateTable"
        @resetting="resetting"
      />
    </div>
    <el-table
      ref="ProElTable"
      :key="key"
      v-loading="listLoading"
      :data="list"
      v-bind="$attrs"
      max-height="calc(100vh - 218px)"
    >
      <el-table-column
        v-if="tableShowSelection"
        type="selection"
        :align="'center'"
        width="55"
      />
      <el-table-column
        v-if="tableShowIndex"
        label="#"
        :align="'center'"
        type="index"
      />
      <el-table-column
        v-for="item in tableColumns.filter((i) => i.fieldVisible)"
        :key="item.dataIndex"
        :label="item.title"
        :min-width="item.minWidth"
        :width="item.width"
        :fixed="item.fixed"
        :align="item.align ? item.align : 'center'"
        :sortable="item.sortable || false"
        :prop="item.sortable ? item.dataIndex : ''"
      >
        <template #default="scope">
          <span v-if="!item.scopedSlots">{{ scope.row[item.dataIndex] }}</span>
          <span v-else-if="item.scopedSlots.customRender === 'date'">
            {{ parseTime(scope.row[item.dataIndex]) }}
          </span>
          <slot
            v-else
            :name="item.scopedSlots.customRender"
            :row="scope.row"
            :index="scope.$index"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="showPagination && localPagination.total"
      v-model:page="localPagination.page"
      v-model:pageSize="localPagination.pageSize"
      :total="localPagination.total"
      @pagination="loadData"
    />
  </div>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.table-operator {
  margin-bottom: $smallPadding;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
