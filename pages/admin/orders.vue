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
              <NuxtLink to="/admin" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Dashboard</NuxtLink>
              <NuxtLink to="/admin/orders" class="text-sm font-medium text-[#ea580c]">Orders</NuxtLink>
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
      <h1 class="font-heading text-2xl text-black mb-8">Orders</h1>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="animate-spin h-12 w-12 border-2 border-cream-400 border-t-burgundy-900 rounded-full"></div>
      </div>

      <div v-else>
        <!-- Orders Table -->
        <div class="bg-white border border-cream-300 shadow-luxury overflow-hidden">
          <div v-if="orders.length === 0" class="p-8 text-center text-cream-600">
            No orders yet
          </div>

          <table v-else class="w-full">
            <thead class="bg-cream-50 border-b border-cream-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-cream-200">
              <tr v-for="order in orders" :key="order.orderId || order.id" class="hover:bg-cream-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="font-medium text-black">#{{ order.orderNumber || order.orderId || order.id }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-cream-600">
                  {{ formatDate(order.createdAt || order.created_at || '') }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p class="text-sm text-black">{{ order.customerName || 'N/A' }}</p>
                    <p class="text-xs text-cream-500">{{ order.customerPhone || order.phone }}</p>
                    <p class="text-xs text-cream-500">{{ order.shippingAddress?.city || order.shipping_city }}, {{ order.shippingAddress?.state || order.shipping_state }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-black">
                  MYR {{ (order.total || order.total_amount || 0).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-block px-2 py-1 text-xs font-medium rounded',
                      getStatusClass(order.status)
                    ]"
                  >
                    {{ order.status || 'pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <button
                      @click="viewOrder(order)"
                      class="text-sm text-[#ea580c] hover:text-[#c2410c] transition-colors"
                    >
                      View
                    </button>
                    <select
                      v-model="order.status"
                      @change="updateStatus(order)"
                      class="text-xs border border-cream-300 rounded px-2 py-1 focus:outline-none focus:border-[#ea580c]"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Order Detail Modal -->
      <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-luxury-lg">
          <div class="px-6 py-4 border-b border-cream-200 flex justify-between items-center">
            <h2 class="font-heading text-xl text-black">Order #{{ selectedOrder.orderNumber || selectedOrder.orderId || selectedOrder.id }}</h2>
            <button @click="selectedOrder = null" class="text-cream-600 hover:text-black transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-6">
            <!-- Customer Info -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-cream-600 uppercase tracking-wider">Customer</p>
                <p class="font-medium text-black">{{ selectedOrder.customerName || 'N/A' }}</p>
                <p class="text-sm text-cream-600">{{ selectedOrder.customerEmail }}</p>
                <p class="text-sm text-cream-600">{{ selectedOrder.customerPhone || selectedOrder.phone }}</p>
              </div>
              <div>
                <p class="text-xs text-cream-600 uppercase tracking-wider">Date</p>
                <p class="font-medium text-black">{{ formatDate(selectedOrder.createdAt || selectedOrder.created_at || '') }}</p>
                <p class="text-xs text-cream-600 uppercase tracking-wider mt-2">Status</p>
                <span
                  :class="[
                    'inline-block px-2 py-1 text-xs font-medium rounded',
                    getStatusClass(selectedOrder.status)
                  ]"
                >
                  {{ selectedOrder.status }}
                </span>
              </div>
            </div>

            <!-- Shipping Address -->
            <div>
              <p class="text-xs text-cream-600 uppercase tracking-wider mb-2">Shipping Address</p>
              <div class="bg-cream-50 p-4 rounded">
                <p class="text-black">{{ selectedOrder.shippingAddress?.street || selectedOrder.shipping_address }}</p>
                <p class="text-black">{{ selectedOrder.shippingAddress?.city || selectedOrder.shipping_city }}, {{ selectedOrder.shippingAddress?.state || selectedOrder.shipping_state }} {{ selectedOrder.shippingAddress?.postalCode || selectedOrder.shipping_postal_code }}</p>
              </div>
            </div>

            <!-- Order Notes -->
            <div v-if="selectedOrder.notes">
              <p class="text-xs text-cream-600 uppercase tracking-wider mb-2">Notes</p>
              <div class="bg-cream-50 p-4 rounded">
                <p class="text-black">{{ selectedOrder.notes }}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div>
              <p class="text-xs text-cream-600 uppercase tracking-wider mb-2">Items</p>
              <div class="border border-cream-200 rounded divide-y divide-cream-200">
                <div v-for="item in selectedOrder.items" :key="item.id" class="p-4 flex gap-4">
                  <img v-if="item.image_url" :src="item.image_url" :alt="item.title" class="w-16 h-16 object-cover rounded" />
                  <div class="flex-1">
                    <p class="font-medium text-black">{{ item.title || `Product #${item.product_id || item.id}` }}</p>
                    <p class="text-sm text-cream-600">Qty: {{ item.quantity }} × MYR {{ item.price.toFixed(2) }}</p>
                  </div>
                  <p class="font-medium text-black">MYR {{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t border-cream-200 pt-4 space-y-2">
              <div class="flex justify-between text-cream-600">
                <span>Subtotal</span>
                <span>MYR {{ (selectedOrder.subtotal || 0).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-cream-600">
                <span>Shipping</span>
                <span>MYR {{ (selectedOrder.shipping || 0).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-lg font-heading pt-2 border-t border-cream-200">
                <span class="text-black">Total</span>
                <span class="text-black">MYR {{ (selectedOrder.total || selectedOrder.total_amount || 0).toFixed(2) }}</span>
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

interface OrderItem {
  id: string
  product_id?: string
  title?: string
  price: number
  quantity: number
  image_url?: string
}

interface Order {
  id?: string
  orderId?: string
  orderNumber?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  phone?: string
  total?: number
  total_amount?: number
  subtotal?: number
  shipping?: number
  status: string
  createdAt?: string
  created_at?: string
  shippingAddress?: {
    street: string
    city: string
    state: string
    postalCode: string
  }
  shipping_address?: string
  shipping_city?: string
  shipping_state?: string
  shipping_postal_code?: string
  items: OrderItem[]
  notes?: string | null
}

const API_BASE = 'https://tabbyscarvesapiv2.woofalert.com'
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const orders = ref<Order[]>([])
const selectedOrder = ref<Order | null>(null)

const logout = () => {
  router.push('/')
}

const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'N/A'
  }
}

const getStatusClass = (status: string | undefined | null) => {
  if (!status) return 'bg-gray-100 text-gray-800'
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

const viewOrder = (order: Order) => {
  selectedOrder.value = order
}

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  if (authStore.token) {
    headers['Authorization'] = `Bearer ${authStore.token}`
  }
  return headers
}

const updateStatus = async (order: Order) => {
  try {
    const orderId = order.id || order.orderId
    await fetch(`${API_BASE}/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: order.status })
    })
  } catch (error) {
    console.error('Failed to update order status:', error)
    await fetchOrders()
  }
}

const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/admin/orders`, {
      headers: getAuthHeaders()
    })
    if (response.ok) {
      const data = await response.json()
      orders.value = Array.isArray(data) ? data : []
    } else {
      // API failed - fallback to localStorage orders (dev mode)
      console.log('API failed, loading orders from localStorage')
      loadLocalOrders()
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    // Fallback to localStorage orders
    loadLocalOrders()
  }

  // Sort by date descending
  orders.value.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.created_at || 0).getTime()
    const dateB = new Date(b.createdAt || b.created_at || 0).getTime()
    return dateB - dateA
  })
}

const loadLocalOrders = () => {
  if (process.client) {
    const orderHistory = localStorage.getItem('orderHistory')
    if (orderHistory) {
      try {
        const parsed = JSON.parse(orderHistory)
        orders.value = Array.isArray(parsed) ? parsed : []
        console.log('Loaded', orders.value.length, 'orders from localStorage')
      } catch (e) {
        orders.value = []
      }
    }
  }
}

onMounted(async () => {
  authStore.initAuth()
  await fetchOrders()
  loading.value = false
})
</script>
