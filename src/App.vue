<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = ref(zhCn)
</script>

<template>
  <el-config-provider :locale="locale" size="small">
    <router-view />
  </el-config-provider>
</template>
