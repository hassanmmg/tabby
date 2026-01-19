<template>
  <div class="bg-cream-100 min-h-screen">
    <Navbar variant="solid" />
    <div class="py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-heading text-2xl sm:text-3xl text-black mb-8">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Customer Information -->
            <div class="bg-white border border-cream-300 shadow-luxury p-5 sm:p-6">
              <h2 class="font-heading text-lg sm:text-xl text-black mb-5">Customer Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Full Name</label>
                  <input v-model="customerInfo.fullName" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Email</label>
                  <input v-model="customerInfo.email" type="email" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Phone</label>
                  <input v-model="customerInfo.phone" type="tel" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="bg-white border border-cream-300 shadow-luxury p-5 sm:p-6">
              <h2 class="font-heading text-lg sm:text-xl text-black mb-5">Shipping Address</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Street Address</label>
                  <input v-model="shippingAddress.street" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">City</label>
                    <input v-model="shippingAddress.city" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">State</label>
                    <input v-model="shippingAddress.state" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Postal Code</label>
                    <input v-model="shippingAddress.postalCode" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Notes -->
            <div class="bg-white border border-cream-300 shadow-luxury p-5 sm:p-6">
              <h2 class="font-heading text-lg sm:text-xl text-black mb-5">Order Notes (Optional)</h2>
              <textarea
                v-model="orderNotes"
                rows="3"
                placeholder="Any special instructions for your order..."
                class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors"
              ></textarea>
            </div>

            <!-- Payment Method -->
            <div class="bg-white border border-cream-300 shadow-luxury p-5 sm:p-6">
              <h2 class="font-heading text-lg sm:text-xl text-black mb-5">Payment Method</h2>
              <div class="space-y-3">
                <label class="flex items-center p-4 border cursor-pointer transition-all duration-200"
                  :class="paymentMethod === 'bank_transfer' ? 'border-[#ea580c] bg-orange-50' : 'border-cream-400 hover:border-orange-400'">
                  <input
                    type="radio"
                    v-model="paymentMethod"
                    value="bank_transfer"
                    class="mr-4 accent-[#ea580c]"
                    :disabled="processing"
                  >
                  <div>
                    <p class="font-medium text-black">Bank Transfer</p>
                    <p class="text-xs text-cream-600 mt-0.5">Pay via manual bank transfer - we'll send you the details</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-cream-300 shadow-luxury p-5 sm:p-6 lg:sticky lg:top-20">
              <h2 class="font-heading text-lg sm:text-xl text-black mb-5">Order Summary</h2>

              <div class="space-y-4 mb-6">
                <div v-for="item in cartItems" :key="item.id" class="flex gap-4">
                  <div class="w-20 h-20 flex-shrink-0 bg-cream-100 border border-cream-300 overflow-hidden">
                    <img
                      v-if="item.image_url"
                      :src="item.image_url"
                      :alt="item.title"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-black text-sm">{{ item.title }}</p>
                    <p class="text-xs text-cream-600 mt-1">Qty: {{ item.quantity }}</p>
                  </div>
                  <span class="font-medium text-black">MYR {{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>

              <div class="border-t border-cream-300 pt-4 space-y-3">
                <div class="flex justify-between text-cream-700">
                  <span>Subtotal</span>
                  <span>MYR {{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-cream-700">
                  <span>Shipping</span>
                  <span>MYR {{ shipping.toFixed(2) }}</span>
                </div>
                <div class="border-t border-cream-300 pt-3 flex justify-between text-lg font-heading text-black">
                  <span>Total</span>
                  <span>MYR {{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="mt-4 p-4 border border-red-300 bg-red-50">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>

              <!-- Validation Errors -->
              <div v-if="validationErrors.length > 0 && !isFormValid" class="mt-4 p-4 border border-orange-300 bg-orange-50">
                <p class="text-sm font-medium text-orange-800 mb-2">Please complete the following:</p>
                <ul class="text-sm text-orange-700 list-disc list-inside space-y-1">
                  <li v-for="error in validationErrors" :key="error">{{ error }}</li>
                </ul>
              </div>

              <button
                @click="placeOrder"
                :disabled="!isFormValid || processing"
                class="w-full mt-6 bg-[#ea580c] text-white py-4 font-medium tracking-wide hover:bg-[#c2410c] disabled:bg-cream-400 disabled:cursor-not-allowed transition-colors"
              >
                {{ processing ? 'Processing...' : 'Place Order' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

// Track if cart is loaded
const cartLoaded = ref(false)

// Load cart from localStorage and redirect if empty
onMounted(async () => {
  // Ensure we're on client side
  if (process.client) {
    // Load cart from localStorage
    cartStore.loadFromLocalStorage()
    authStore.initAuth()

    // Mark cart as loaded
    cartLoaded.value = true

    // Debug: log cart state
    console.log('Cart loaded, items:', cartStore.items.length, cartStore.items)

    // Wait a tick then check if cart is empty
    await nextTick()

    if (cartStore.items.length === 0) {
      console.log('Cart is empty, redirecting to home')
      router.push('/')
    }
  }
})

const customerInfo = ref({
  fullName: '',
  email: '',
  phone: ''
})

const shippingAddress = ref({
  street: '',
  city: '',
  state: '',
  postalCode: ''
})

const orderNotes = ref('')
const paymentMethod = ref('bank_transfer')
const processing = ref(false)
const errorMessage = ref('')

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.subtotal)
const shipping = computed(() => subtotal.value > 500 ? 0 : 25)
const total = computed(() => subtotal.value + shipping.value)

const isFormValid = computed(() => {
  return customerInfo.value.fullName &&
         customerInfo.value.email &&
         customerInfo.value.phone &&
         shippingAddress.value.street &&
         shippingAddress.value.city &&
         shippingAddress.value.state &&
         shippingAddress.value.postalCode &&
         paymentMethod.value &&
         cartItems.value.length > 0
})

const validationErrors = computed(() => {
  const errors = []
  if (cartItems.value.length === 0) errors.push('Your cart is empty')
  if (!customerInfo.value.fullName) errors.push('Full name is required')
  if (!customerInfo.value.email) errors.push('Email is required')
  if (!customerInfo.value.phone) errors.push('Phone is required')
  if (!shippingAddress.value.street) errors.push('Street address is required')
  if (!shippingAddress.value.city) errors.push('City is required')
  if (!shippingAddress.value.state) errors.push('State is required')
  if (!shippingAddress.value.postalCode) errors.push('Postal code is required')
  return errors
})

// Get or create a guest ID for cart operations (simple numeric format)
const getGuestId = () => {
  if (process.client) {
    let guestId = localStorage.getItem('guest_id')
    if (!guestId) {
      // Use simple numeric ID
      guestId = String(Date.now())
      localStorage.setItem('guest_id', guestId)
    }
    return guestId
  }
  return String(Date.now())
}

const placeOrder = async () => {
  if (!isFormValid.value) return

  // Check cart is not empty
  if (cartItems.value.length === 0) {
    errorMessage.value = 'Your cart is empty. Please add items before checkout.'
    return
  }

  errorMessage.value = ''
  processing.value = true

  const API_BASE = 'https://tabbyscarvesapiv2.woofalert.com'

  try {
    // Get guest ID for cart operations
    const guestId = getGuestId()
    console.log('Using guest ID:', guestId)
    console.log('Cart items to add:', cartItems.value)

    // Step 1: Clear the API cart first (ignore errors - cart might not exist)
    try {
      await fetch(`${API_BASE}/api/cart/${guestId}/clear`, {
        method: 'DELETE'
      })
    } catch (e) {
      console.log('Clear cart failed (this is okay):', e)
    }

    // Step 2: Add each item to the API cart
    for (const item of cartItems.value) {
      const productId = parseInt(item.id, 10)
      const qty = parseInt(String(item.quantity), 10)

      console.log('Adding item to cart:', { product_id: productId, quantity: qty })

      const addResponse = await fetch(`${API_BASE}/api/cart/${guestId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: qty
        })
      })

      if (!addResponse.ok) {
        const errData = await addResponse.json().catch(() => ({}))
        console.error('Add to cart failed:', errData)
        throw new Error(errData.detail || `Failed to add item "${item.title}" to cart`)
      }
    }

    // Generate order number
    const orderNumber = 'ORD-' + Date.now()

    // Create order data for local storage
    const orderData = {
      orderId: orderNumber,
      orderNumber: orderNumber,
      total: total.value,
      subtotal: subtotal.value,
      shipping: shipping.value,
      customerName: customerInfo.value.fullName,
      customerEmail: customerInfo.value.email,
      customerPhone: customerInfo.value.phone,
      shippingAddress: {
        street: shippingAddress.value.street,
        city: shippingAddress.value.city,
        state: shippingAddress.value.state,
        postalCode: shippingAddress.value.postalCode
      },
      items: cartItems.value.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url
      })),
      paymentMethod: paymentMethod.value,
      notes: orderNotes.value || null,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Step 3: Place the order using the guest ID
    const orderPayload = {
      email: customerInfo.value.email,
      phone: customerInfo.value.phone,
      shipping_address: shippingAddress.value.street,
      shipping_city: shippingAddress.value.city,
      shipping_state: shippingAddress.value.state,
      shipping_postal_code: shippingAddress.value.postalCode,
      notes: orderNotes.value || null
    }

    console.log('=== ORDER API REQUEST ===')
    console.log('URL:', `${API_BASE}/api/orders/${guestId}`)
    console.log('Payload:', JSON.stringify(orderPayload, null, 2))

    const response = await fetch(`${API_BASE}/api/orders/${guestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      let errorMsg = 'Failed to submit order'
      if (errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errorMsg = errorData.detail
        } else if (Array.isArray(errorData.detail)) {
          // Handle validation errors array (e.g., FastAPI format)
          errorMsg = errorData.detail.map(e => e.msg || e.message || String(e)).join(', ')
        } else if (typeof errorData.detail === 'object') {
          errorMsg = errorData.detail.message || errorData.detail.msg || JSON.stringify(errorData.detail)
        }
      } else if (errorData.message) {
        errorMsg = errorData.message
      } else if (errorData.error) {
        errorMsg = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error)
      }
      throw new Error(errorMsg)
    }

    // Get the created order from response
    const createdOrder = await response.json()
    orderData.orderId = createdOrder.id || orderNumber

    // Store order locally for success page
    localStorage.setItem('completedOrder', JSON.stringify(orderData))

    // Also store in order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    orderHistory.push(orderData)
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory))

    // Clear cart
    cartStore.clearCart()

    // Redirect to success page
    router.push(`/checkout/success?order_id=${orderNumber}`)

  } catch (error) {
    console.error('Checkout error:', error)
    errorMessage.value = error.message || 'An error occurred while processing your order. Please try again.'
    window.scrollTo(0, 0)
  } finally {
    processing.value = false
  }
}
</script>
