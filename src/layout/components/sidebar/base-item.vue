<script setup lang="ts">
const props = defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <SvgIcon
    v-if="props.icon"
    :icon-class="props.icon"
  />

  <span v-if="props.title">
    <slot name="title">{{ props.title }}</slot>
  </span>
</template>
