import '@fortawesome/fontawesome-free/css/all.css'
import vuetifyConfig from '@/../vuetify-config.js'
import router from '@/router.js'
import store from '@/store.js'
import App from '@/App.vue'
import * as Vue from 'vue'

const app = Vue.createApp(App)

globalThis.console.log(process.env.APP_FE_COMMENT)
globalThis.console.log(process.env.APP_WEBSOCK)
globalThis.console.log(process.env.APP_ORIGIN)

app.use(vuetifyConfig)
app.use(router)
app.use(store)

window.vm = app.mount('#app')
