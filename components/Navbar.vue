<template>
  <nav class="border-b sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="font-semibold text-lg tracking-normal hover:opacity-80 transition-opacity">
          TEKNOPURI
        </NuxtLink>

        <!-- Right side - Cart -->
        <div class="flex items-center">
          <button
            @click="cartStore.toggleCart()"
            class="relative p-2 -mr-2 hover:opacity-70 transition-opacity"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute top-0 right-0 h-4 w-4 bg-black text-white text-[10px] flex items-center justify-center font-medium"
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
