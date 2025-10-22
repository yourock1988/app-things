import * as Vue from 'vue'
import store from '@/store'
import router from '@/router'

import App from '@/App.vue'

import '@/assets/css/reset.css'
import '@/assets/css/vars.css'
import '@/assets/css/layout.css'
import '@/assets/css/appearance.css'
import '@/assets/css/media.css'

import '@fortawesome/fontawesome-free/css/all.css'

const app = Vue.createApp(App)

const { APP_ORIGIN } = process.env
const { APP_FE_COMMENT } = process.env

global.console.log(APP_FE_COMMENT)
global.console.log(APP_ORIGIN)

app.use(store)
app.use(router)

window.vm = app.mount('#app')
