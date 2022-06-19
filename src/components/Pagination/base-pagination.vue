<script setup lang="ts">
import { scrollTo } from '@/utils/scroll-to'

const prop = defineProps({
  total: {
    required: true,
    type: Number,
  },
  page: {
    type: Number,
    default: 1,
  },
  pageSizes: {
    type: Array as () => Array<number>,
    default() {
      return [10, 20, 30, 50]
    },
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

type Tpagination = {
  page: number
  pageSize: number
  limit?: number
}

const emit = defineEmits<{
  (event: 'update:page', val: number): void
  (event: 'update:pageSize', val: number): void
  (event: 'pagination', val: Tpagination): void
}>()

const currentPage = computed({
  get: () => prop.page,
  set: (val) => {
    emit('update:page', val)
  },
})
const limit = computed({
  get: () => prop.pageSize,
  set: (val) => {
    emit('update:pageSize', val)
  },
})

function handleSizeChange(val: number) {
  emit('pagination', { page: 1, pageSize: val })
  if (prop.autoScroll) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange(val: number) {
  emit('pagination', { page: val, pageSize: limit.value })
  if (prop.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.pagination-container {
  background: #fff;
  padding: $smallPadding 16px;
}

.app-container .pagination-container:last-child {
  padding-bottom: 0;
}

.pagination-container.hidden {
  display: none;
}
</style>
