<script setup lang="ts">
const userStore = useUserStore()
const name = computed(() => userStore.name)
function open() {
  ElMessage.success(name.value)
}
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button @click="open">提示</el-button>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
