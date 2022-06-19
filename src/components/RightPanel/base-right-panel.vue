<template>
  <div
    v-if="!show"
    class="handle-button"
    :style="{ top: buttonTop + 'px', 'background-color': theme }"
    @click="show = !show"
  >
    <i-ep-setting />
  </div>
  <el-drawer v-model="show" direction="rtl" :with-header="false">
    <slot />
  </el-drawer>
</template>
<script setup lang="ts">
defineProps({
  buttonTop: {
    default: 250,
    type: Number,
  },
})
const show = ref(false)
const theme = ref('#1890ff')
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  position: fixed;
  right: 0;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  z-index: 10000;

  svg {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
