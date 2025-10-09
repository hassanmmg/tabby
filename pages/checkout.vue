<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div class="container mx-auto px-4">
      <h1 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-4 sm:space-y-6">
          <!-- Customer Information -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 class="text-lg sm:text-xl font-semibold mb-4">Customer Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">First Name</label>
                <input v-model="customerInfo.firstName" type="text" class="w-full border rounded px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Last Name</label>
                <input v-model="customerInfo.lastName" type="text" class="w-full border rounded px-3 py-2">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-2">Email</label>
                <input v-model="customerInfo.email" type="email" class="w-full border rounded px-3 py-2">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-2">Phone</label>
                <input v-model="customerInfo.phone" type="tel" class="w-full border rounded px-3 py-2">
              </div>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 class="text-lg sm:text-xl font-semibold mb-4">Shipping Address</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Street Address</label>
                <input v-model="shippingAddress.street" type="text" class="w-full border rounded px-3 py-2">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">City</label>
                  <input v-model="shippingAddress.city" type="text" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">State</label>
                  <input v-model="shippingAddress.state" type="text" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">ZIP Code</label>
                  <input v-model="shippingAddress.zipCode" type="text" class="w-full border rounded px-3 py-2">
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 class="text-lg sm:text-xl font-semibold mb-4">Payment Method</h2>
            <div class="space-y-3">
              <label class="flex items-center p-4 border rounded-md cursor-pointer hover:border-blue-400 transition-colors"
                :class="paymentMethod === 'chip' ? 'border-blue-500 bg-blue-50' : ''">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="chip"
                  class="mr-3"
                  :disabled="processing"
                >
                <div>
                  <p class="font-medium">CHIP Payment Gateway</p>
                  <p class="text-xs text-gray-500">Pay securely with credit/debit card, online banking, or e-wallets</p>
                </div>
              </label>

              <label class="flex items-center p-4 border rounded-md cursor-pointer hover:border-blue-400 transition-colors"
                :class="paymentMethod === 'bank_transfer' ? 'border-blue-500 bg-blue-50' : ''">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="bank_transfer"
                  class="mr-3"
                  :disabled="processing"
                >
                <div>
                  <p class="font-medium">Bank Transfer</p>
                  <p class="text-xs text-gray-500">Pay via manual bank transfer</p>
                </div>
              </label>

              <label class="flex items-center p-4 border rounded-md cursor-pointer hover:border-blue-400 transition-colors"
                :class="paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : ''">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="cod"
                  class="mr-3"
                  :disabled="processing"
                >
                <div>
                  <p class="font-medium">Cash on Delivery</p>
                  <p class="text-xs text-gray-500">Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow lg:sticky lg:top-6">
            <h2 class="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
            
            <div class="space-y-4 mb-6">
              <div v-for="item in cartItems" :key="item.id" class="flex gap-4">
                <div class="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  <img
                    v-if="item.image_url"
                    :src="item.image_url"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="font-medium">{{ item.title }}</p>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <span class="font-medium">MYR {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>MYR {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>MYR {{ shipping.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>MYR {{ total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mt-4 p-3 border-2 border-red-300 bg-red-50 rounded-md">
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <button
              @click="placeOrder"
              :disabled="!isFormValid || processing"
              class="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {{ processing ? 'Processing...' : 'Place Order' }}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const customerInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const shippingAddress = ref({
  street: '',
  city: '',
  state: '',
  zipCode: ''
})

const paymentMethod = ref('chip')
const processing = ref(false)
const errorMessage = ref('')

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.subtotal)
const shipping = computed(() => subtotal.value > 500 ? 0 : 25)
const total = computed(() => subtotal.value + shipping.value)

const isFormValid = computed(() => {
  return customerInfo.value.firstName &&
         customerInfo.value.lastName &&
         customerInfo.value.email &&
         customerInfo.value.phone &&
         shippingAddress.value.street &&
         shippingAddress.value.city &&
         shippingAddress.value.state &&
         shippingAddress.value.zipCode &&
         paymentMethod.value
})

const placeOrder = async () => {
  if (!isFormValid.value) return

  errorMessage.value = ''
  processing.value = true

  try {
    // Generate order number
    const orderNumber = 'ORD-' + Date.now()

    // Prepare order data
    const orderData = {
      orderNumber: orderNumber,
      customerName: `${customerInfo.value.firstName} ${customerInfo.value.lastName}`,
      customerEmail: customerInfo.value.email,
      customerPhone: customerInfo.value.phone,
      shippingAddress: shippingAddress.value,
      paymentMethod: paymentMethod.value,
      items: cartItems.value.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: subtotal.value,
      shipping: shipping.value,
      total: total.value,
      createdAt: new Date().toISOString()
    }

    // Check if payment is required (for CHIP payment method)
    if (paymentMethod.value === 'chip') {
      // Create CHIP payment session
      const paymentResponse = await $fetch('/api/payments/chip/create', {
        method: 'POST',
        body: {
          orderId: orderNumber,
          amount: total.value,
          customerInfo: {
            name: orderData.customerName,
            email: orderData.customerEmail,
            phone: orderData.customerPhone,
            firstName: customerInfo.value.firstName,
            lastName: customerInfo.value.lastName
          },
          currency: 'MYR'
        }
      })

      if (paymentResponse.success && paymentResponse.checkoutUrl) {
        // Save order data to localStorage before redirect
        localStorage.setItem('pendingOrder', JSON.stringify(orderData))

        // Redirect to CHIP payment page
        window.location.href = paymentResponse.checkoutUrl
        return
      } else {
        throw new Error('Failed to create payment session')
      }
    }

    // For non-CHIP payment methods, show success immediately
    // Save order to localStorage (in production, save to database)
    localStorage.setItem('completedOrder', JSON.stringify(orderData))

    // Clear cart
    cartStore.clearCart()

    // Redirect to success page
    router.push(`/checkout/success?order_id=${orderNumber}`)

  } catch (error) {
    console.error('Checkout error:', error)
    errorMessage.value = error.data?.statusMessage || 'An error occurred while processing your order. Please try again.'
    window.scrollTo(0, 0)
  } finally {
    processing.value = false
  }
}
</script>