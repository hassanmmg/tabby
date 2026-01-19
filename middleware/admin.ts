import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (process.server) return

  const authStore = useAuthStore()

  // Initialize auth if not already done
  if (!authStore.token) {
    authStore.initAuth()
  }

  // Check if user is authenticated and is admin
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    return navigateTo('/admin/login')
  }
})
