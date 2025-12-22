import '@fortawesome/fontawesome-free/css/all.css'
import vuetifyConfig from '@/../vuetify-config.js'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'
import * as Vue from 'vue'

const app = Vue.createApp(App)
const { APP_FE_COMMENT } = process.env
const { APP_WEBSOCK } = process.env
const { APP_ORIGIN } = process.env

globalThis.console.log(APP_FE_COMMENT)
globalThis.console.log(APP_WEBSOCK)
globalThis.console.log(APP_ORIGIN)

app.use(vuetifyConfig)
app.use(router)
app.use(store)

window.vm = app.mount('#app')
