<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4 max-w-2xl">
        <div class="bg-white p-8 rounded-lg shadow-sm text-center">
          <!-- Error Icon -->
          <div class="mb-6">
            <svg class="w-20 h-20 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>

          <!-- Title -->
          <h1 class="text-3xl font-bold text-gray-900 mb-3">Payment Failed</h1>
          <p class="text-gray-600 mb-8">Unfortunately, we couldn't process your payment. Please try again.</p>

          <!-- Order Details -->
          <div class="bg-red-50 border border-red-200 rounded-md p-6 mb-8">
            <p class="text-sm text-gray-600 mb-2">Order Reference:</p>
            <p class="text-xl font-bold font-mono text-gray-900">{{ orderId }}</p>
          </div>

          <!-- Reasons -->
          <div class="text-left mb-8 p-6 bg-gray-50 rounded-md">
            <h3 class="font-semibold text-gray-900 mb-3">Common reasons for payment failure:</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Insufficient funds in your account</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Incorrect card details entered</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Card expired or blocked</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Payment was cancelled</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Transaction timeout or network error</span>
              </li>
            </ul>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/checkout"
              class="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Continue Shopping
            </NuxtLink>
          </div>

          <!-- Help Section -->
          <div class="mt-12 pt-8 border-t">
            <h3 class="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p class="text-sm text-gray-600 mb-4">
              If you continue to experience issues with your payment, please contact our support team.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="mailto:support@teknopuri.com" class="text-blue-600 hover:text-blue-700 font-medium">
                Email Support
              </a>
              <span class="hidden sm:inline text-gray-300">|</span>
              <a href="tel:+60123456789" class="text-blue-600 hover:text-blue-700 font-medium">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const orderId = ref(route.query.order_id || 'N/A')
</script>
