<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-2">Order Failed</h1>
        <p class="text-gray-600 mb-6">
          We couldn't process your order. Please try again or contact support.
        </p>

        <div class="bg-red-50 rounded p-4 mb-6">
          <p class="text-sm text-gray-600">
            If the problem persists, please contact our customer service team.
          </p>
        </div>

        <div class="space-y-3">
          <NuxtLink to="/checkout" class="block w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
            Try Again
          </NuxtLink>
          <NuxtLink to="/" class="block w-full border border-gray-300 py-3 rounded hover:bg-gray-50">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
