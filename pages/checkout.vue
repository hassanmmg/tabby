<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Customer Information -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Customer Information</h2>
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
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
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
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
            <div class="space-y-4">
              <label class="flex items-center">
                <input type="radio" v-model="paymentMethod" value="card" class="mr-3">
                <span>Credit/Debit Card</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="paymentMethod" value="paypal" class="mr-3">
                <span>PayPal</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="paymentMethod" value="bank" class="mr-3">
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow sticky top-6">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            
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

            <button 
              @click="placeOrder"
              :disabled="!isFormValid"
              class="w-full mt-6 bg-red-500 text-white py-3 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Place Order
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

const paymentMethod = ref('card')

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.subtotal)
const shipping = computed(() => subtotal.value > 200 ? 0 : 15)
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

  try {
    // Here you would integrate with your payment processor
    // and create the order in your database
    
    // For now, we'll simulate success
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear cart and redirect to success page
    cartStore.clearCart()
    router.push('/checkout/success')
  } catch (error) {
    console.error('Order failed:', error)
    router.push('/checkout/failure')
  }
}
</script>