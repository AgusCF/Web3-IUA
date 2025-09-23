import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
    meta: { requiresAuth: true }
  },
  // Agrega aquí otras rutas protegidas...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guardia global
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  // Restaurar sesión si es necesario
  if (!auth.user) auth.restoreSession()
  if (to.meta.requiresAuth && !auth.user) {
    next({ name: 'login' })
  } else if (to.meta.public && auth.user) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
