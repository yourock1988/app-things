import * as Vue from 'vue'
import store from '@/store'
import router from '@/router'

import App from '@/App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import vuetifyConfig from '../vuetify-config.js'

const app = Vue.createApp(App)
const { APP_FE_COMMENT } = process.env
const { APP_ORIGIN } = process.env
const { APP_WEBSOCK } = process.env

globalThis.console.log(APP_FE_COMMENT)
globalThis.console.log(APP_ORIGIN)
globalThis.console.log(APP_WEBSOCK)

app.use(vuetifyConfig)
app.use(store)
app.use(router)

window.vm = app.mount('#app')
