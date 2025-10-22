import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    component: PageMain,
    children: [
      {
        path: 'products',
        component: PageProducts,
      },
      {
        path: 'product/:id',
        component: PageProduct,
        props: true,
      },
      {
        path: 'cart',
        component: PageCart,
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
