import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  }
})
// Create app
const app = createApp(App)
// Use plugins
app.use(createPinia())
app.use(router)
app.use(vuetify)
// Mount app
app.mount('#app')
