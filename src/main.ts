import App from '@/App.vue'

import '@/styles/index.scss'

// vue Router
import router from '@/router/index'

// pinia store
import pinia from '@/store/index'

import '@/permission'

createApp(App).use(router).use(pinia).mount('#app')
