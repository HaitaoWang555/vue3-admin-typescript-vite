<script lang="ts" setup>
import Sortablejs from 'sortablejs'
import { cloneDeep } from 'lodash-es'
import type { ProItem } from '@/types/components-utils'

const prop = defineProps({
  columns: {
    type: Array as () => Array<ProItem>,
    default: () => {
      return []
    },
  },
})

const emit = defineEmits<{
  (e: 'update:columns', val: ProItem[]): void
  (e: 'reRender'): void
  (e: 'refresh'): void
  (e: 'resetting', type: string, val: boolean): void
}>()

const columnListKey = ref(0)
const columnListRef = ref<HTMLElement>()
const tableColumns = cloneDeep(prop.columns)
let isSortable = false

function showPopover() {
  if (isSortable) return
  nextTick(() => {
    const columnListEl = unref(columnListRef)
    if (!columnListEl) return
    const sortable = Sortablejs.create(columnListEl, {
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        if (
          newIndex !== undefined &&
          oldIndex !== undefined &&
          newIndex !== oldIndex
        ) {
          const columns = prop.columns
          if (oldIndex > newIndex) {
            columns.splice(newIndex, 0, columns[oldIndex])
            columns.splice(oldIndex + 1, 1)
          } else {
            columns.splice(newIndex + 1, 0, columns[oldIndex])
            columns.splice(oldIndex, 1)
          }
          emit('update:columns', columns)
          emit('reRender')
        }
      },
    })
    isSortable = Boolean(sortable.toArray().length)
  })
}
function resetTableColumns() {
  columnListKey.value += 1
  emit('update:columns', tableColumns)
  emit('reRender')
}
function changeShowIndex(val: string | number | boolean) {
  emit('resetting', 'showIndex', Boolean(val))
}
function changeShowSelection(val: string | number | boolean) {
  emit('resetting', 'showSelection', Boolean(val))
}

function fixedItem(dataIndex: string, str: string) {
  const index = prop.columns.findIndex((i) => i.dataIndex === dataIndex)
  if (!(index > -1)) return
  // eslint-disable-next-line vue/no-mutating-props
  prop.columns[index].fixed = str
  emit('update:columns', prop.columns)
  emit('reRender')
}
</script>

<template>
  <div class="table-setting">
    <i-ep-full-screen />
    <i-ep-refresh @click="$emit('refresh')" />
    <el-popover
      placement="left-end"
      :width="260"
      trigger="click"
      @show="showPopover"
    >
      <template #reference>
        <i-ep-setting />
      </template>
      <div class="box-card divide-y">
        <div class="flex items-center justify-between mb-2">
          <span>
            <el-checkbox label="序号列" @change="changeShowIndex" />
            <el-checkbox label="勾选列" @change="changeShowSelection" />
          </span>
          <el-button @click="resetTableColumns">重置</el-button>
        </div>
        <div ref="columnListRef" :key="columnListKey" class="card-body pt-2">
          <div
            v-for="(o, i) in tableColumns"
            :key="i"
            :data-id="o.dataIndex"
            class="flex items-center justify-between"
          >
            <span class="flex items-center">
              <i-ic-round-drag-indicator class="cursor-move mr-2" />
              <el-checkbox
                v-model="o.fieldVisible"
                :label="o.title"
                @change="$emit('reRender')"
              />
            </span>
            <div class="divide-x flex items-center justify-between">
              <i-ic-baseline-align-horizontal-left
                class="mr-1 cursor-pointer hover:text-primary"
                @click="fixedItem(o.dataIndex, 'left')"
              />

              <span
                class="pl-1 cursor-pointer hover:text-primary"
                @click="fixedItem(o.dataIndex, 'right')"
              >
                <i-ic-baseline-align-horizontal-right />
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-setting {
  font-size: 18px;
  line-height: 0;

  svg {
    margin: 0 6px;
    cursor: pointer;
  }

  svg:last-child {
    margin-right: 0;
  }

  svg:hover {
    color: #409eff;
  }
}
</style>
