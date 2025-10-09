<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4 max-w-2xl">
        <div class="bg-white p-8 rounded-lg shadow-sm text-center">
          <!-- Success Icon -->
          <div class="mb-6">
            <svg class="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>

          <!-- Title -->
          <h1 class="text-3xl font-bold text-gray-900 mb-3">Order Placed Successfully!</h1>
          <p class="text-gray-600 mb-8">Thank you for your order. We'll send you a confirmation email shortly.</p>

          <!-- Order Details -->
          <div class="bg-blue-50 border border-blue-200 rounded-md p-6 mb-8">
            <p class="text-sm text-gray-600 mb-2">Order Number:</p>
            <p class="text-2xl font-bold font-mono text-gray-900">{{ orderId }}</p>
            <div v-if="orderAmount" class="mt-4">
              <p class="text-sm text-gray-600 mb-1">Total Amount:</p>
              <p class="text-xl font-semibold text-gray-900">MYR {{ orderAmount }}</p>
            </div>
            <div v-if="isMockPayment" class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
              <p class="text-sm text-yellow-800"><strong>Note:</strong> This is a test order using mock payment mode.</p>
            </div>
          </div>

          <!-- Email Confirmation -->
          <p class="text-sm text-gray-600 mb-8">
            A confirmation email has been sent with your order details.
          </p>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/"
              class="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Shopping
            </NuxtLink>
            <NuxtLink
              to="/"
              class="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Back to Home
            </NuxtLink>
          </div>

          <!-- Order Tracking Info -->
          <div class="mt-12 pt-8 border-t text-left">
            <h3 class="font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>You'll receive an email confirmation shortly</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>We'll process your order within 1-2 business days</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Your order will be shipped within 3-5 business days</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>You'll receive a tracking number once shipped</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const orderId = ref(route.query.order_id || 'N/A')
const orderAmount = ref(route.query.amount || null)
const isMockPayment = ref(route.query.mock === 'true')

// Clear cart on success
onMounted(() => {
  cartStore.clearCart()
})
</script>
