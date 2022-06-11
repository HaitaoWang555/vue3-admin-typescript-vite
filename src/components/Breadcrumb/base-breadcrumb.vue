<script setup lang="ts">
import { compile } from 'path-to-regexp'
import type { RouteRecordRaw } from 'vue-router'

const router = useRouter()
const route = useRoute()

const getBreadcrumb = () => {
  // only show routes with meta.title
  const matched: RouteRecordRaw[] = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  const first = matched[0]

  if (!isDashboard(first)) {
    const dashboard: RouteRecordRaw = {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => null,
      meta: { title: 'Dashboard' },
    }
    matched.unshift(dashboard)
  }

  return matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}
const isDashboard = (route: RouteRecordRaw) => {
  const name = (route && route.name) as string
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = (path: string) => {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const handleLink = (item: RouteRecordRaw) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(item)
    return
  }
  router.push(pathCompile(path))
}

// computed
const levelList = computed(() => getBreadcrumb())
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
