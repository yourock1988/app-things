import { createWebHistory, createRouter } from 'vue-router'
import PageAccounts from '@/pages/PageAccounts.vue'
import PageSessions from '@/pages/PageSessions.vue'
import PageTeapots from '@/pages/PageTeapots.vue'
import PageOnline from '@/pages/PageOnline.vue'
import PageSignUp from '@/pages/PageSignUp.vue'
import PageSignIn from '@/pages/PageSignIn.vue'
import PagePersons from '@/pages/PagePersons.vue'
import PageCars from '@/pages/PageCars.vue'
import PageMain from '@/pages/PageMain.vue'

const routes = [
  {
    path: '/',
    component: PageMain,
  },
  {
    path: '/sign-up',
    component: PageSignUp,
  },
  {
    path: '/sign-in',
    component: PageSignIn,
  },
  {
    path: '/online',
    component: PageOnline,
  },
  {
    path: '/teapots',
    component: PageTeapots,
  },
  {
    path: '/persons',
    component: PagePersons,
  },
  {
    path: '/cars',
    component: PageCars,
  },
  {
    path: '/accounts',
    component: PageAccounts,
  },
  {
    path: '/sessions',
    component: PageSessions,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
