<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  confirmLoading: {
    type: Boolean,
    default: false,
  },
  noFooter: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: '确 定',
  },
})
const emit = defineEmits<{
  (event: 'cancle'): void
  (event: 'ok'): void
  (event: 'update:value', val: boolean): void
}>()

const attrs = useAttrs()

const ProDialog = ref()
const isFullscreen = ref(false)

const icon = computed(() => {
  return isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'
})
const isAppendToBody =
  attrs['append-to-body'] === undefined
    ? true
    : (attrs['append-to-body'] as boolean)
function handleClose() {
  if (!props.value) return
  emit('cancle')
  emit('update:value', false)
}
function handleOk() {
  emit('ok')
}
function changeFullscreen() {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    ProDialog.value.dialogRef.style.cssText += ';top:0px;left:0px;'
  }
}

watch(
  () => attrs.fullscreen,
  () => {
    if (attrs.fullscreen || attrs.fullscreen === '') {
      isFullscreen.value = true
    } else {
      isFullscreen.value = false
    }
  }
)
</script>

<template>
  <div class="ProDialogWrap">
    <el-dialog
      ref="ProDialog"
      :model-value="value"
      v-bind="$attrs"
      :fullscreen="isFullscreen"
      :append-to-body="isAppendToBody"
      :close-on-click-modal="false"
      custom-class="ProDialog"
      destroy-on-close
      draggable
      @close="handleClose"
    >
      <span class="ProDialogFullscreen" @click="changeFullscreen">
        <svg-icon :icon-class="icon" />
      </span>
      <template #header><slot name="title"></slot></template>
      <slot></slot>
      <template v-if="!noFooter" #footer>
        <slot v-if="$slots && $slots.footer" name="footer"></slot>
        <span v-else class="dialog-footer">
          <el-button @click="handleClose">关 闭</el-button>
          <el-button :loading="confirmLoading" type="primary" @click="handleOk">
            {{ confirmText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.el-dialog {
  position: relative;
}

.ProDialog {
  border-radius: 4px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  margin-bottom: 0 !important;

  .el-dialog__header {
    padding: 16px 24px;
    color: rgba(0, 0, 0, 0.65);
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }

  .el-dialog__footer {
    padding: 10px 16px;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
  }

  .el-dialog__body {
    max-height: calc(100vh - 15vh - 110px);
    overflow-y: auto;
  }

  &.is-fullscreen {
    overflow: hidden;

    .el-dialog__body {
      height: calc(100vh - 112px);
      max-height: calc(100vh - 112px);
      overflow: auto;
    }
  }
}

.ProDialogFullscreen {
  width: 16px;
  height: 16px;
  display: block;
  position: absolute;
  top: 22px;
  right: 42px;
  font-size: 12px;
  color: #909399;
  cursor: pointer;
}
</style>
