<template>
  <div class="bg-white border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
    <div class="relative">
      <img 
        :src="product.image || '/images/placeholder.svg'" 
        :alt="product.name"
        class="w-full h-48 object-cover rounded-t-lg"
      />
      <span v-if="product.badge" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
        {{ product.badge }}
      </span>
    </div>
    <div class="p-4">
      <h3 class="font-medium text-gray-900 mb-1 line-clamp-2">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mb-2">SKU: {{ product.sku }}</p>
      <div class="flex items-center justify-between">
        <div>
          <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice }}</span>
          <span class="text-lg font-bold text-red-500">${{ product.price }}</span>
        </div>
        <button 
          @click.stop="addToCart"
          class="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const router = useRouter()

const addToCart = () => {
  cartStore.addItem({
    id: props.product.id,
    name: props.product.name,
    sku: props.product.sku,
    price: props.product.price,
    image: props.product.image,
    quantity: 1
  })
}

const viewProduct = () => {
  router.push(`/products/${props.product.id}`)
}
</script>