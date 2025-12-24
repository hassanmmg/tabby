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
                <div>
                  <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">First Name</label>
                  <input v-model="customerInfo.firstName" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">Last Name</label>
                  <input v-model="customerInfo.lastName" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
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
                    <label class="block text-sm font-medium mb-2 text-cream-800 uppercase tracking-wider">ZIP Code</label>
                    <input v-model="shippingAddress.zipCode" type="text" class="w-full border border-cream-400 px-4 py-3 bg-cream-50 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-burgundy-900 transition-colors">
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white border border-cream-300 shadow-luxury p-5 sm:p-6">
              <h2 class="font-heading text-lg sm:text-xl text-black mb-5">Payment Method</h2>
              <div class="space-y-3">
                <label class="flex items-center p-4 border cursor-pointer transition-all duration-200"
                  :class="paymentMethod === 'chip' ? 'border-[#ea580c] bg-orange-50' : 'border-cream-400 hover:border-orange-400'">
                  <input
                    type="radio"
                    v-model="paymentMethod"
                    value="chip"
                    class="mr-4 accent-[#ea580c]"
                    :disabled="processing"
                  >
                  <div>
                    <p class="font-medium text-black">CHIP Payment Gateway</p>
                    <p class="text-xs text-cream-600 mt-0.5">Pay securely with credit/debit card, online banking, or e-wallets</p>
                  </div>
                </label>

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
                    <p class="text-xs text-cream-600 mt-0.5">Pay via manual bank transfer</p>
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
    const orderNumber = 'ORD-' + Date.now()

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

    if (paymentMethod.value === 'chip') {
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
        localStorage.setItem('pendingOrder', JSON.stringify(orderData))
        window.location.href = paymentResponse.checkoutUrl
        return
      } else {
        throw new Error('Failed to create payment session')
      }
    }

    localStorage.setItem('completedOrder', JSON.stringify(orderData))
    cartStore.clearCart()
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
