<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref } from 'vue'

const locale = ref(zhCn)
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
