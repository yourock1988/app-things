import { createWebHistory, createRouter } from 'vue-router'
import PageTests from '../pages/PageTests.vue'
import PageUsers from '../pages/PageUsers.vue'
import PageCars from '../pages/PageCars.vue'
import PageMain from '../pages/PageMain.vue'
import PagePicsum from '../pages/PagePicsum.vue'
import PageSignUp from '../pages/PageSignUp.vue'
import PageSignIn from '../pages/PageSignIn.vue'
import PageAccounts from '../pages/PageAccounts.vue'

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
    path: '/accounts',
    component: PageAccounts,
  },
  {
    path: '/users',
    component: PageUsers,
  },
  {
    path: '/cars',
    component: PageCars,
  },
  {
    path: '/tests',
    component: PageTests,
  },
  {
    path: '/pics',
    component: PagePicsum,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
