<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <div class="app-content">
        <component :is="Component" />
      </div>
    </router-view>
  </section>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.app-main {
  /* 50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
.app-content {
  padding: 15px 20px;
  padding-bottom: 0;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
