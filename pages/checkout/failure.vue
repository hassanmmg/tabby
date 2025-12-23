<template>
  <div class="bg-cream-100 min-h-screen">
    <Navbar variant="solid" />
    <div class="py-12">
      <div class="max-w-2xl mx-auto px-4">
        <div class="bg-white border border-cream-300 shadow-luxury p-8 sm:p-10 text-center">
          <!-- Error Icon -->
          <div class="mb-6">
            <div class="w-20 h-20 mx-auto bg-red-500 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h1 class="font-heading text-3xl text-burgundy-900 mb-3">Payment Failed</h1>
          <p class="text-cream-700 mb-8">Unfortunately, we couldn't process your payment. Please try again.</p>

          <!-- Order Details -->
          <div class="bg-red-50 border border-red-200 p-6 mb-8">
            <p class="text-sm text-cream-600 mb-2 uppercase tracking-wider">Order Reference</p>
            <p class="text-xl font-heading text-burgundy-900">{{ orderId }}</p>
          </div>

          <!-- Reasons -->
          <div class="text-left mb-8 p-6 bg-cream-100 border border-cream-300">
            <h3 class="font-heading text-lg text-burgundy-900 mb-4">Common reasons for payment failure:</h3>
            <ul class="space-y-3 text-sm text-cream-700">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-cream-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Insufficient funds in your account</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-cream-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Incorrect card details entered</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-cream-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Card expired or blocked</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-cream-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Payment was cancelled</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-cream-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              class="inline-block bg-burgundy-900 text-white px-8 py-3 font-medium tracking-wide hover:bg-burgundy-800 transition-colors"
            >
              Try Again
            </NuxtLink>
            <NuxtLink
              to="/"
              class="inline-block bg-cream-200 text-burgundy-900 px-8 py-3 font-medium tracking-wide hover:bg-cream-300 transition-colors"
            >
              Continue Shopping
            </NuxtLink>
          </div>

          <!-- Help Section -->
          <div class="mt-12 pt-8 border-t border-cream-300">
            <h3 class="font-heading text-lg text-burgundy-900 mb-3">Need Help?</h3>
            <p class="text-sm text-cream-600 mb-4">
              If you continue to experience issues with your payment, please contact our support team.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="mailto:support@tabby.com" class="text-burgundy-900 hover:text-burgundy-700 font-medium transition-colors">
                Email Support
              </a>
              <span class="hidden sm:inline text-cream-400">|</span>
              <a href="tel:+60123456789" class="text-burgundy-900 hover:text-burgundy-700 font-medium transition-colors">
                Call Us
              </a>
            </div>
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
</script>
