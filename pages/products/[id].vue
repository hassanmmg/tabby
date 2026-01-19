<template>
  <div class="bg-white min-h-screen">
    <Navbar variant="solid" />

    <div class="pt-4">
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-2 border-cream-400 border-t-burgundy-900"></div>
      </div>

      <div v-else-if="product" class="flex flex-col lg:flex-row">
        <!-- Left Column: Product Images -->
        <div class="lg:w-[60%]">
          <!-- Main Images Grid - 2x2 layout -->
          <div class="grid grid-cols-2 gap-0.5">
            <!-- Top Left - Large image with NEW badge -->
            <div class="relative aspect-[3/4] bg-cream-100">
              <span class="absolute top-4 left-4 bg-[#ea580c] text-white text-xs px-3 py-1 z-10">NEW</span>
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover cursor-pointer"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <!-- Top Right - Second view -->
            <div class="aspect-[3/4] bg-cream-100">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <!-- Bottom Left - Third view -->
            <div class="aspect-[3/4] bg-cream-100">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <!-- Bottom Right - Empty cream space -->
            <div class="aspect-[3/4] bg-cream-100"></div>
          </div>
        </div>

        <!-- Right Column: Product Info -->
        <div class="lg:w-[40%] px-6 lg:px-10 py-8 lg:py-6">
          <!-- Product Title -->
          <h1 class="font-heading text-2xl lg:text-3xl text-black mb-4">{{ product.name }}</h1>

          <!-- SKU -->
          <p v-if="product.sku" class="text-sm text-cream-500 mb-2">SKU: {{ product.sku }}</p>

          <!-- Price -->
          <div class="mb-6">
            <p class="text-lg font-medium text-cream-600">MYR {{ Number(product.price || 0).toFixed(2) }}</p>
          </div>

          <!-- Stock Status -->
          <div class="mb-6">
            <span
              :class="[
                'inline-block px-3 py-1 text-sm font-medium rounded',
                product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              ]"
            >
              {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
            </span>
          </div>

          <!-- Add to Cart Section -->
          <div class="border-t border-cream-200 pt-6">
            <!-- Quantity -->
            <div class="flex items-center gap-4 mb-4">
              <span class="text-sm font-medium text-black">Quantity:</span>
              <div class="flex items-center border border-cream-300 rounded">
                <button @click="decrementQuantity" class="w-10 h-10 flex items-center justify-center hover:bg-cream-50 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="product.stock"
                  class="w-12 text-center border-x border-cream-300 py-2 text-sm focus:outline-none"
                />
                <button @click="incrementQuantity" class="w-10 h-10 flex items-center justify-center hover:bg-cream-50 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Buttons -->
            <div class="space-y-3">
              <button
                @click="addToCart"
                :disabled="product.stock <= 0"
                class="w-full bg-[#ea580c] text-white py-3.5 hover:bg-[#c2410c] font-medium tracking-wide transition-colors rounded disabled:bg-cream-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                @click="buyNow"
                :disabled="product.stock <= 0"
                class="w-full border border-[#ea580c] text-[#ea580c] py-3.5 hover:bg-orange-50 font-medium tracking-wide transition-colors rounded disabled:border-cream-400 disabled:text-cream-400 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>

          <!-- Description Accordion -->
          <div class="border-t border-cream-200 mt-6">
            <button
              @click="descriptionOpen = !descriptionOpen"
              class="w-full py-4 flex items-center justify-between text-left"
            >
              <span class="font-medium text-black">Description</span>
              <svg
                class="w-5 h-5 text-cream-600 transition-transform duration-200"
                :class="descriptionOpen ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="descriptionOpen" class="pb-6 text-cream-700 text-sm leading-relaxed">
              <p class="mb-4">{{ product.description || `Meet ${product.name}, your new everyday favourite! A basic staple made from comfy poly voile, giving you precise styling and airy breathable comfort all day long.` }}</p>
              <ul class="space-y-2">
                <li><span class="font-medium text-black">Material</span>: Poly Voile.</li>
                <li><span class="font-medium text-black">Finishing</span>: Baby Seam.</li>
                <li><span class="font-medium text-black">Label</span>: Metal Tag.</li>
                <li><span class="font-medium text-black">Shape</span>: Square.</li>
                <li><span class="font-medium text-black">Measurement</span>: 1.15m x 1.15m (45" x 45").</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="product && relatedProducts.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="font-heading text-2xl md:text-3xl mb-8 text-black text-center">You May Also Like</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :to="`/products/${relatedProduct.id}`"
            class="group"
          >
            <div class="aspect-square bg-cream-100 overflow-hidden mb-3">
              <img
                v-if="relatedProduct.image_url"
                :src="relatedProduct.image_url"
                :alt="relatedProduct.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 class="text-sm font-medium text-black mb-1">{{ relatedProduct.name }}</h3>
            <p class="text-sm text-cream-700">MYR {{ Number(relatedProduct.price || 0).toFixed(2) }}</p>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="!loading && !product" class="text-center py-20">
        <p class="text-cream-600 mb-4">Product not found</p>
        <NuxtLink to="/" class="text-burgundy-900 hover:text-burgundy-700 font-medium transition-colors">
          Back to Products
        </NuxtLink>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useApi, type Product } from '~/composables/useApi'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const api = useApi()

const loading = ref(true)
const product = ref<Product | null>(null)
const quantity = ref(1)
const descriptionOpen = ref(true)
const relatedProducts = ref<Product[]>([])

const incrementQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value) return

  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart({
      id: product.value.id.toString(),
      title: product.value.name,
      price: product.value.price,
      image_url: product.value.image_url || undefined
    })
  }

  cartStore.openCart()
}

const buyNow = () => {
  if (!product.value) return

  cartStore.clearCart()

  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart({
      id: product.value.id.toString(),
      title: product.value.name,
      price: product.value.price,
      image_url: product.value.image_url || undefined
    })
  }

  router.push('/checkout')
}

onMounted(async () => {
  // Load cart from localStorage
  cartStore.loadFromLocalStorage()

  const productId = route.params.id

  try {
    // Fetch product from API
    product.value = await api.get<Product>(`/api/products/${productId}`)

    if (product.value) {
      // Fetch related products (other products, exclude current)
      const allProducts = await api.get<Product[]>('/api/products/')
      relatedProducts.value = allProducts
        .filter(p => p.id !== product.value!.id && p.is_active)
        .slice(0, 4)
    }
  } catch (error) {
    console.error('Failed to fetch product:', error)
    product.value = null
  } finally {
    loading.value = false
  }
})
</script>
