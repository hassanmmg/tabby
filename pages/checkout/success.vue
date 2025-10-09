<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h1>
      <p class="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      
      <div class="bg-gray-50 rounded p-4 mb-6">
        <p class="text-sm text-gray-500">Order Number</p>
        <p class="text-lg font-semibold">{{ orderNumber }}</p>
      </div>
      
      <p class="text-sm text-gray-600 mb-6">
        You will receive an email confirmation shortly with your order details.
      </p>
      
      <div class="space-y-3">
        <NuxtLink to="/orders" class="block w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
          View Order Details
        </NuxtLink>
        <NuxtLink to="/" class="block w-full border border-gray-300 py-3 rounded hover:bg-gray-50">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
const orderNumber = ref('ORD-' + Date.now().toString(36).toUpperCase())
</script>