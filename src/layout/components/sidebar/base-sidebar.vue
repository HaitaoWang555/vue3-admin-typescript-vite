<script setup lang="ts">
import Logo from './sidebar-logo.vue'
import SidebarItem from './sidebar-item.vue'

const settingsStore = useSettingsStore()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()

const sidebar = computed(() => appStore.sidebar)
const routes = computed(() => router.options.routes)

const activeMenu = computed<string>((): string => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})
const showLogo = computed(() => settingsStore.sidebarLogo)
const variables = ref({
  menuBg: '#001529',
  menuText: '#bfcbd9',
  menuActiveText: '#409eff',
})
const isCollapse = computed(() => !sidebar.value.opened)
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="item in routes"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
