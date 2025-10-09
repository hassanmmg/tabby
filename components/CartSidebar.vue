<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeCart"></div>
    
    <!-- Sidebar -->
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-semibold">Shopping Cart</h2>
          <button @click="closeCart" class="p-2 hover:bg-gray-100 rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="items.length === 0" class="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
          <div v-else class="space-y-4">
            <div v-for="item in items" :key="item.id" class="flex gap-4 p-3 border rounded">
              <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded">
              <div class="flex-1">
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">{{ item.sku }}</p>
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-center gap-2">
                    <button @click="decrementQuantity(item.id)" class="w-6 h-6 border rounded hover:bg-gray-100">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="incrementQuantity(item.id)" class="w-6 h-6 border rounded hover:bg-gray-100">+</button>
                  </div>
                  <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t p-4 space-y-4">
          <div class="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
          <div class="space-y-2">
            <button @click="checkout" class="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
              Proceed to Checkout
            </button>
            <button @click="closeCart" class="w-full border border-gray-300 py-3 rounded hover:bg-gray-50">
              Continue Shopping
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

const isOpen = computed(() => cartStore.isOpen)
const items = computed(() => cartStore.items)
const total = computed(() => cartStore.total)

const closeCart = () => {
  cartStore.closeCart()
}

const incrementQuantity = (id) => {
  cartStore.incrementQuantity(id)
}

const decrementQuantity = (id) => {
  cartStore.decrementQuantity(id)
}

const removeItem = (id) => {
  cartStore.removeItem(id)
}

const checkout = () => {
  closeCart()
  router.push('/checkout')
}
</script>