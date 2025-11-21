import { createWebHistory, createRouter } from 'vue-router'
import PageTests from '../pages/PageTests.vue'
import PageUsers from '../pages/PageUsers.vue'
import PageCars from '../pages/PageCars.vue'
import PageMain from '../pages/PageMain.vue'
import PagePicsum from '../pages/PagePicsum.vue'

const routes = [
  {
    path: '/',
    component: PageMain,
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
