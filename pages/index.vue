<template>
  <div class="bg-cream-100 min-h-screen">
    <!-- Hero Section with overlaying navbar -->
    <div class="relative">
      <Navbar variant="transparent" />
      <BannerCarousel />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Section Header -->
      <div class="text-center mb-10">
        <h2 class="font-heading text-3xl md:text-4xl text-black mb-3">Our Collection</h2>
        <p class="text-cream-700 max-w-2xl mx-auto">Discover our premium selection of scarves and accessories</p>
      </div>

      <!-- Category Filter -->
      <div v-if="categories.length > 0" class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          @click="selectedCategory = null"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors',
            selectedCategory === null
              ? 'bg-[#ea580c] text-white'
              : 'bg-white text-cream-700 hover:bg-cream-200 border border-cream-300'
          ]"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'bg-[#ea580c] text-white'
              : 'bg-white text-cream-700 hover:bg-cream-200 border border-cream-300'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <div>
        <!-- Products Grid -->
        <main>
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-16">
            <div class="animate-spin h-12 w-12 border-2 border-cream-400 border-t-burgundy-900 rounded-full"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-16">
            <p class="text-red-600 text-lg mb-4">{{ error }}</p>
            <button @click="fetchProducts" class="px-6 py-2 bg-[#ea580c] text-white hover:bg-[#c2410c] transition-colors">
              Try Again
            </button>
          </div>

          <!-- Products -->
          <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <NuxtLink
              v-for="product in filteredProducts"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="bg-white border border-cream-300 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 overflow-hidden block group"
            >
              <div class="relative">
                <!-- NEW Badge -->
                <span class="absolute top-3 left-3 bg-[#ea580c] text-white text-xs px-3 py-1 z-10">NEW</span>
                <!-- Product Image -->
                <div class="aspect-[3/4] bg-cream-50 overflow-hidden">
                  <img
                    v-if="product.image_url"
                    :src="product.image_url"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    @error="handleImageError"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg class="w-16 h-16 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-5 border-t border-cream-200">
                <h3 class="font-heading text-lg sm:text-xl text-black mb-3">
                  {{ product.name }}
                </h3>

                <!-- Price -->
                <div>
                  <span class="text-base text-black">
                    MYR {{ product.price?.toFixed(2) || '0.00' }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- No Products -->
          <div v-if="!loading && !error && filteredProducts.length === 0" class="text-center py-16">
            <p class="text-cream-600 text-lg">No products found</p>
          </div>
        </main>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useApi, type Product } from '~/composables/useApi'
import { useCategories } from '~/composables/useCategories'

const cartStore = ref<ReturnType<typeof useCartStore> | null>(null)
const api = useApi()
const { categories, fetchCategories } = useCategories()

// State
const allProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedCategory = ref<number | null>(null)

// Fetch products from API
const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const params = new URLSearchParams()
    if (selectedCategory.value) {
      params.append('category_id', selectedCategory.value.toString())
    }

    const queryString = params.toString()
    const endpoint = queryString ? `/api/products/?${queryString}` : '/api/products/'

    allProducts.value = await api.get<Product[]>(endpoint)
    console.log(`Loaded ${allProducts.value.length} products from API`)
  } catch (err: any) {
    console.error('Error fetching products:', err)
    error.value = err.message || 'Failed to load products. Please try again.'
  } finally {
    loading.value = false
  }
}

// Filtered products (only show active products)
const filteredProducts = computed(() => {
  return allProducts.value.filter(p => p.is_active)
})

// Watch for category changes
watch(selectedCategory, () => {
  fetchProducts()
})

// Add to cart
const addToCart = (product: Product) => {
  if (cartStore.value) {
    cartStore.value.addToCart({
      id: product.id.toString(),
      title: product.name,
      price: product.price,
      image_url: product.image_url || undefined
    })
    cartStore.value.openCart()

    // Show notification
    if (process.client) {
      const notification = document.createElement('div')
      notification.className = 'fixed top-20 right-4 bg-burgundy-900 text-white px-6 py-3 shadow-luxury-lg z-50 tracking-wide'
      notification.textContent = 'Added to cart'
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.remove()
      }, 3000)
    }
  }
}

// Handle image load errors
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  console.error('Failed to load image:', target.src)
  target.style.display = 'none'
}

// Initialize
onMounted(async () => {
  cartStore.value = useCartStore()
  cartStore.value.loadFromLocalStorage()
  await Promise.all([
    fetchCategories(),
    fetchProducts()
  ])
})
</script>
