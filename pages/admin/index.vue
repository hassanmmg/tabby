<template>
  <div class="min-h-screen bg-cream-100">
    <!-- Admin Header -->
    <header class="bg-white border-b border-cream-300 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-8">
            <NuxtLink to="/admin" class="font-heading text-xl text-black">
              Tabby Admin
            </NuxtLink>
            <nav class="hidden md:flex gap-6">
              <NuxtLink to="/admin" class="text-sm font-medium text-[#ea580c]">Dashboard</NuxtLink>
              <NuxtLink to="/admin/orders" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Orders</NuxtLink>
              <NuxtLink to="/admin/products" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Products</NuxtLink>
              <NuxtLink to="/admin/categories" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Categories</NuxtLink>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-sm text-cream-600 hover:text-black transition-colors">View Store</NuxtLink>
            <button @click="logout" class="text-sm text-red-600 hover:text-red-700 transition-colors">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome & User Info -->
      <div class="bg-white border border-cream-300 shadow-luxury p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="font-heading text-2xl text-black">Welcome back, {{ authStore.user?.full_name || 'Admin' }}!</h1>
            <p class="text-cream-600 mt-1">Here's what's happening with your store today.</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-cream-600">Logged in as</p>
            <p class="font-medium text-black">{{ authStore.user?.email }}</p>
            <span class="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800">
              Admin
            </span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="animate-spin h-12 w-12 border-2 border-cream-400 border-t-burgundy-900 rounded-full"></div>
      </div>

      <div v-else>
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Orders -->
          <div class="bg-white border border-cream-300 shadow-luxury p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-cream-600 uppercase tracking-wider">Total Orders</p>
                <p class="text-3xl font-heading text-black mt-2">{{ stats.totalOrders }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Revenue -->
          <div class="bg-white border border-cream-300 shadow-luxury p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-cream-600 uppercase tracking-wider">Total Revenue</p>
                <p class="text-3xl font-heading text-black mt-2">MYR {{ stats.totalRevenue.toFixed(2) }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Products -->
          <div class="bg-white border border-cream-300 shadow-luxury p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-cream-600 uppercase tracking-wider">Products</p>
                <p class="text-3xl font-heading text-black mt-2">{{ stats.totalProducts }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Pending Orders -->
          <div class="bg-white border border-cream-300 shadow-luxury p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-cream-600 uppercase tracking-wider">Pending Orders</p>
                <p class="text-3xl font-heading text-black mt-2">{{ stats.pendingOrders }}</p>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white border border-cream-300 shadow-luxury">
          <div class="px-6 py-4 border-b border-cream-200 flex justify-between items-center">
            <h2 class="font-heading text-lg text-black">Recent Orders</h2>
            <NuxtLink to="/admin/orders" class="text-sm text-[#ea580c] hover:text-[#c2410c] transition-colors">
              View All
            </NuxtLink>
          </div>

          <div v-if="recentOrders.length === 0" class="p-8 text-center text-cream-600">
            No orders yet
          </div>

          <div v-else class="divide-y divide-cream-200">
            <div v-for="order in recentOrders" :key="order.id" class="px-6 py-4 flex items-center justify-between">
              <div>
                <p class="font-medium text-black">Order #{{ order.id }}</p>
                <p class="text-sm text-cream-600 mt-1">{{ formatDate(order.created_at) }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-black">MYR {{ order.total_amount.toFixed(2) }}</p>
                <span
                  :class="[
                    'inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded',
                    getStatusClass(order.status)
                  ]"
                >
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useApi, type Order, type Product } from '~/composables/useApi'

definePageMeta({
  middleware: 'admin'
})

const authStore = useAuthStore()
const api = useApi()
const router = useRouter()

const loading = ref(true)
const recentOrders = ref<Order[]>([])
const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  totalProducts: 0,
  pendingOrders: 0
})

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'confirmed':
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'shipped':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-purple-100 text-purple-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const loadLocalOrders = () => {
  if (process.client) {
    const orderHistory = localStorage.getItem('orderHistory')
    if (orderHistory) {
      try {
        return JSON.parse(orderHistory) || []
      } catch (e) {
        return []
      }
    }
  }
  return []
}

onMounted(async () => {
  // Initialize auth
  authStore.initAuth()

  let orders: any[] = []
  let products: any[] = []

  try {
    // Try to fetch from API
    const [apiOrders, apiProducts] = await Promise.all([
      api.get<Order[]>('/api/admin/orders', true).catch(() => []),
      api.get<Product[]>('/api/products/').catch(() => [])
    ])

    orders = apiOrders || []
    products = apiProducts || []

    // If API orders failed, load from localStorage
    if (orders.length === 0) {
      console.log('Loading orders from localStorage')
      orders = loadLocalOrders()
    }
  } catch (error) {
    console.error('Failed to fetch from API:', error)
    // Fallback to localStorage
    orders = loadLocalOrders()
  }

  // Calculate stats
  stats.value.totalOrders = orders.length
  stats.value.totalRevenue = orders.reduce((sum: number, order: any) => {
    return sum + (order.total_amount || order.total || 0)
  }, 0)
  stats.value.totalProducts = products.length
  stats.value.pendingOrders = orders.filter((o: any) =>
    (o.status || '').toLowerCase() === 'pending'
  ).length

  // Get recent orders (last 5)
  recentOrders.value = orders
    .sort((a: any, b: any) => {
      const dateA = new Date(a.created_at || a.createdAt || 0).getTime()
      const dateB = new Date(b.created_at || b.createdAt || 0).getTime()
      return dateB - dateA
    })
    .slice(0, 5)
    .map((o: any) => ({
      id: o.id || o.orderId || o.orderNumber,
      total_amount: o.total_amount || o.total || 0,
      status: o.status || 'pending',
      created_at: o.created_at || o.createdAt || new Date().toISOString()
    }))

  loading.value = false
})
</script>
