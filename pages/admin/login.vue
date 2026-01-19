<template>
  <div class="min-h-screen bg-cream-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="bg-white border border-cream-300 shadow-luxury p-8">
        <div class="text-center mb-8">
          <h1 class="font-heading text-2xl text-black mb-2">Admin Login</h1>
          <p class="text-cream-600 text-sm">Sign in to access the admin dashboard</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors"
              placeholder="admin@tabbyscarves.com"
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors"
              placeholder="Enter your password"
            >
          </div>

          <div v-if="error" class="p-4 border border-red-300 bg-red-50">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#ea580c] text-white py-4 font-medium tracking-wide hover:bg-[#c2410c] disabled:bg-cream-400 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-cream-600 hover:text-[#ea580c] transition-colors">
            Back to Store
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Check if already logged in as admin
onMounted(() => {
  authStore.initAuth()
  if (authStore.isAuthenticated && authStore.isAdmin) {
    router.push('/admin')
  }
})

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    // Try real API login first
    await authStore.login(email.value, password.value)

    // Check if user is admin
    if (!authStore.isAdmin) {
      authStore.logout()
      error.value = 'Access denied. Admin privileges required.'
      return
    }

    // Redirect to admin dashboard
    router.push('/admin')
  } catch (err: any) {
    console.error('Login error:', err)

    // DEV BYPASS: If API fails and using dev credentials, allow login
    if (email.value === 'admin@tabbyscarves.com' && password.value === 'admin123') {
      console.log('Using dev bypass login')

      // Set mock admin user
      const mockUser = {
        id: 1,
        email: 'admin@tabbyscarves.com',
        full_name: 'Admin User',
        is_admin: true,
        is_active: true,
        phone: null,
        address: null,
        city: null,
        state: null,
        postal_code: null,
        created_at: new Date().toISOString()
      }

      localStorage.setItem('auth_token', 'dev_token_' + Date.now())
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
      authStore.initAuth()

      router.push('/admin')
      return
    }

    error.value = err.detail || err.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>
