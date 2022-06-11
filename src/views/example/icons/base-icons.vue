<script setup lang="ts">
import clipboard from '@/utils/clipboard'
import svgIcon from './svg-icons'

const svgIcons = ref(svgIcon)

function generateIconCode(symbol: string) {
  return `<SvgIcon icon-class="${symbol}" />`
}

function clipboardCallBack(type: 'success' | 'error') {
  ElMessage({
    message: 'Copy ' + type,
    type,
  })
}

function handleClipboard(text: string, event: Event) {
  clipboard(text, event, clipboardCallBack)
}
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="SVG ICONS">
      <div class="card">
        <div
          v-for="item of svgIcons"
          :key="item"
          @click="handleClipboard(generateIconCode(item), $event)">
          <el-tooltip placement="top">
            <template #content>
              {{ generateIconCode(item) }}
            </template>
            <div class="icon-item">
              <SvgIcon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-wrap: wrap;
}
.icon-item {
  margin: 15px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 20px;
  color: #24292e;
  cursor: pointer;
}

span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}

.disabled {
  pointer-events: none;
  margin: auto;
}
</style>
