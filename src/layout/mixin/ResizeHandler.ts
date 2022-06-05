const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export function useResizeHandler(): void {
  const appStore = useAppStore()
  const route = useRoute()

  const sidebar = computed(() => appStore.sidebar)
  const device = computed(() => appStore.device)

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  function $_isMobile() {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  function $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        appStore.closeSideBar(true)
      }
    }
  }

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      appStore.toggleDevice('mobile')
      appStore.closeSideBar(true)
    } else {
      appStore.toggleDevice('desktop')
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  watch(
    () => route.path,
    () => {
      if (device.value === 'mobile' && sidebar.value.opened) {
        appStore.closeSideBar(false)
      }
    }
  )
}
