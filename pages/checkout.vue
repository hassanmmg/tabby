<template>
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
              <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
                <div class="flex-1">
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
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
const subtotal = computed(() => cartStore.total)
const shipping = computed(() => subtotal.value > 100 ? 0 : 10)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + shipping.value + tax.value)

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