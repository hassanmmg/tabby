<template>
  <div class="bg-cream-100 min-h-screen">
    <Navbar variant="solid" />
    <div class="py-12">
      <div class="max-w-2xl mx-auto px-4">
        <div class="bg-white border border-cream-300 shadow-luxury p-8 sm:p-10 text-center">
          <!-- Success Icon -->
          <div class="mb-6">
            <div class="w-20 h-20 mx-auto bg-burgundy-900 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h1 class="font-heading text-3xl text-burgundy-900 mb-3">Order Placed Successfully</h1>
          <p class="text-cream-700 mb-8">Thank you for your order. We'll send you a confirmation email shortly.</p>

          <!-- Order Details -->
          <div class="bg-cream-100 border border-cream-300 p-6 mb-8">
            <p class="text-sm text-cream-600 mb-2 uppercase tracking-wider">Order Number</p>
            <p class="text-2xl font-heading text-burgundy-900">{{ orderId }}</p>
            <div v-if="orderAmount" class="mt-4">
              <p class="text-sm text-cream-600 mb-1 uppercase tracking-wider">Total Amount</p>
              <p class="text-xl font-heading text-burgundy-900">MYR {{ orderAmount }}</p>
            </div>
            <div v-if="isMockPayment" class="mt-4 p-3 bg-cream-200 border border-cream-400">
              <p class="text-sm text-cream-800"><strong>Note:</strong> This is a test order using mock payment mode.</p>
            </div>
          </div>

          <!-- Email Confirmation -->
          <p class="text-sm text-cream-600 mb-8">
            A confirmation email has been sent with your order details.
          </p>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/"
              class="inline-block bg-burgundy-900 text-white px-8 py-3 font-medium tracking-wide hover:bg-burgundy-800 transition-colors"
            >
              Continue Shopping
            </NuxtLink>
            <NuxtLink
              to="/"
              class="inline-block bg-cream-200 text-burgundy-900 px-8 py-3 font-medium tracking-wide hover:bg-cream-300 transition-colors"
            >
              Back to Home
            </NuxtLink>
          </div>

          <!-- Order Tracking Info -->
          <div class="mt-12 pt-8 border-t border-cream-300 text-left">
            <h3 class="font-heading text-lg text-burgundy-900 mb-4">What's Next?</h3>
            <ul class="space-y-3 text-sm text-cream-700">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-burgundy-900 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>You'll receive an email confirmation shortly</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-burgundy-900 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>We'll process your order within 1-2 business days</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-burgundy-900 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Your order will be shipped within 3-5 business days</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-burgundy-900 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>You'll receive a tracking number once shipped</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const orderId = ref(route.query.order_id || 'N/A')
const orderAmount = ref(route.query.amount || null)
const isMockPayment = ref(route.query.mock === 'true')

onMounted(() => {
  cartStore.clearCart()
})
</script>
