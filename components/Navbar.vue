<template>
  <nav class="sticky top-0 z-40 bg-blue-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        <!-- Logo -->
        <NuxtLink to="/" class="font-bold text-xl text-white hover:opacity-80 transition-opacity">
          TEKNOPURI Shop
        </NuxtLink>

        <!-- Right side - Home and Cart -->
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="text-white hover:opacity-80 transition-opacity font-medium">
            Home
          </NuxtLink>
          <button
            @click="cartStore.toggleCart()"
            class="relative p-2 -mr-2 hover:opacity-70 transition-opacity"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 h-5 w-5 bg-white text-blue-600 text-[10px] flex items-center justify-center font-bold rounded-sm"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// Initialize cart store
const cartStore = useCartStore()
</script>
