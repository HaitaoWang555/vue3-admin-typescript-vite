<script setup lang="ts">
import { isExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: String,
    default: '',
    required: true,
  },
})

const isExternalC = computed(() => isExternal(props.to))
const type = computed(() => {
  if (isExternalC.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to: string) => {
  if (isExternalC.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    to: to,
  }
}
</script>

<template>
  <component
    :is="type"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>
