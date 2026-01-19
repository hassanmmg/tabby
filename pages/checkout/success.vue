<template>
  <div class="bg-cream-100 min-h-screen">
    <Navbar variant="solid" />
    <div class="py-12">
      <div class="max-w-2xl mx-auto px-4">
        <div class="bg-white border border-cream-300 shadow-luxury p-8 sm:p-10">
          <!-- Success Icon -->
          <div class="text-center mb-8">
            <div class="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 class="font-heading text-3xl text-black mb-3">Order Placed Successfully!</h1>
            <p class="text-cream-700">Thank you for your order.</p>
          </div>

          <!-- Order Number -->
          <div class="bg-cream-100 border border-cream-300 p-6 mb-6 text-center">
            <p class="text-sm text-cream-600 mb-2 uppercase tracking-wider">Order Number</p>
            <p class="text-2xl font-heading text-black">{{ order?.orderNumber || orderId }}</p>
          </div>

          <!-- Bank Transfer Details -->
          <div class="bg-orange-50 border border-orange-200 p-6 mb-6">
            <h3 class="font-heading text-lg text-black mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Bank Transfer Details
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-cream-600">Bank Name:</span>
                <span class="font-medium text-black">Maybank</span>
              </div>
              <div class="flex justify-between">
                <span class="text-cream-600">Account Name:</span>
                <span class="font-medium text-black">Tabby Sdn Bhd</span>
              </div>
              <div class="flex justify-between">
                <span class="text-cream-600">Account Number:</span>
                <span class="font-medium text-black">5621 2856 1234</span>
              </div>
              <div class="flex justify-between border-t border-orange-200 pt-3 mt-3">
                <span class="text-cream-600">Amount to Pay:</span>
                <span class="font-heading text-lg text-[#ea580c]">MYR {{ order?.total?.toFixed(2) || '0.00' }}</span>
              </div>
            </div>
            <p class="text-xs text-cream-600 mt-4">
              Please use your order number <strong>{{ order?.orderNumber || orderId }}</strong> as payment reference.
            </p>
          </div>

          <!-- Order Summary -->
          <div class="border border-cream-300 p-6 mb-6" v-if="order?.items?.length">
            <h3 class="font-heading text-lg text-black mb-4">Order Summary</h3>
            <div class="space-y-3 mb-4">
              <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                <span class="text-cream-700">{{ item.title }} x {{ item.quantity }}</span>
                <span class="text-black">MYR {{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
            <div class="border-t border-cream-200 pt-3 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-cream-600">Subtotal:</span>
                <span class="text-black">MYR {{ order?.subtotal?.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-cream-600">Shipping:</span>
                <span class="text-black">MYR {{ order?.shipping?.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-medium text-base pt-2 border-t border-cream-200">
                <span class="text-black">Total:</span>
                <span class="text-black">MYR {{ order?.total?.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="border border-cream-300 p-6 mb-8" v-if="order?.shippingAddress">
            <h3 class="font-heading text-lg text-black mb-3">Shipping To</h3>
            <div class="text-sm text-cream-700">
              <p class="font-medium text-black">{{ order.customerName }}</p>
              <p>{{ order.shippingAddress.street }}</p>
              <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.postalCode }}</p>
              <p class="mt-2">{{ order.customerPhone }}</p>
              <p>{{ order.customerEmail }}</p>
            </div>
          </div>

          <!-- What's Next -->
          <div class="border-t border-cream-300 pt-6 mb-8">
            <h3 class="font-heading text-lg text-black mb-4">What's Next?</h3>
            <ol class="space-y-3 text-sm text-cream-700">
              <li class="flex items-start">
                <span class="w-6 h-6 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">1</span>
                <span>Complete your bank transfer using the details above</span>
              </li>
              <li class="flex items-start">
                <span class="w-6 h-6 bg-cream-400 text-white rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">2</span>
                <span>Send your payment receipt to WhatsApp: +60 12-345 6789</span>
              </li>
              <li class="flex items-start">
                <span class="w-6 h-6 bg-cream-400 text-white rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">3</span>
                <span>We'll confirm and process your order within 24 hours</span>
              </li>
              <li class="flex items-start">
                <span class="w-6 h-6 bg-cream-400 text-white rounded-full flex items-center justify-center text-xs mr-3 flex-shrink-0">4</span>
                <span>Your order will be shipped within 3-5 business days</span>
              </li>
            </ol>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/"
              class="inline-block bg-[#ea580c] text-white px-8 py-3 font-medium tracking-wide hover:bg-[#c2410c] transition-colors text-center"
            >
              Continue Shopping
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
const route = useRoute()

const orderId = ref(route.query.order_id || 'N/A')
const order = ref(null)

onMounted(() => {
  // Load order from localStorage
  const savedOrder = localStorage.getItem('completedOrder')
  if (savedOrder) {
    try {
      order.value = JSON.parse(savedOrder)
    } catch (e) {
      console.error('Failed to parse order:', e)
    }
  }
})
</script>
