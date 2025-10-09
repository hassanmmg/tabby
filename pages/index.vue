<template>
  <div class="bg-gray-50 min-h-screen">
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-72 lg:flex-shrink-0">
          <div class="bg-white shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-6 rounded-lg">
            <!-- Search -->
            <div class="mb-6">
              <h3 class="font-medium text-sm mb-3 text-gray-900">Search</h3>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by part # or name"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Category -->
            <div class="mb-6">
              <h3 class="font-medium text-sm mb-3 text-gray-900">Category</h3>
              <div class="space-y-2">
                <label
                  v-for="cat in categories"
                  :key="cat.value"
                  class="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :value="cat.value"
                      v-model="selectedCategories"
                      class="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span class="text-gray-700">{{ cat.label }}</span>
                  </div>
                  <span class="text-gray-500 text-sm">({{ cat.count }})</span>
                </label>
              </div>
            </div>

            <!-- Brand -->
            <div class="mb-6">
              <h3 class="font-medium text-sm mb-3 text-gray-900">Brand</h3>
              <div class="space-y-2">
                <label
                  v-for="brand in brands"
                  :key="brand"
                  class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                >
                  <input
                    type="checkbox"
                    :value="brand"
                    v-model="selectedBrands"
                    class="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="text-sm text-gray-700">{{ brand }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-medium text-sm mb-3 text-gray-900">Price Range (RM)</h3>
              <div class="flex gap-2">
                <input
                  v-model.number="minPrice"
                  type="number"
                  placeholder="Min"
                  class="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <input
                  v-model.number="maxPrice"
                  type="number"
                  placeholder="Max"
                  class="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="w-full text-blue-600 hover:text-blue-700 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </aside>

        <!-- Products Grid -->
        <main class="flex-1">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <!-- Products -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink
              v-for="product in filteredProducts"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden block group"
            >
              <!-- In Stock Badge -->
              <div class="relative">
                <span class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 sm:px-3 rounded-md z-10 shadow-sm">
                  In Stock
                </span>

                <!-- Product Image -->
                <div class="aspect-square bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 group-hover:bg-gray-50 transition-colors">
                  <img
                    :src="product.image_url"
                    :alt="product.title"
                    class="w-full h-full object-contain"
                    @error="handleImageError"
                  />
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-4 sm:p-5 border-t border-gray-100">
                <h3 class="font-normal text-sm sm:text-base text-gray-900 mb-1.5 line-clamp-2 leading-normal">
                  {{ product.title }}
                </h3>
                <p v-if="product.part_no" class="text-xs sm:text-sm text-gray-500 mb-4">{{ product.part_no }}</p>

                <!-- Price and Button -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                  <span class="text-lg font-bold text-gray-900">
                    MYR {{ product.price?.toFixed(2) || '0.00' }}
                  </span>
                  <button
                    @click.prevent.stop="addToCart(product)"
                    class="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-sm rounded-lg shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- No Products -->
          <div v-if="!loading && filteredProducts.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">No products found</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = ref(null)

// State
const allProducts = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedBrands = ref([])
const minPrice = ref(null)
const maxPrice = ref(null)

// Fetch products from server API
const fetchProducts = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/products')
    allProducts.value = data || []
    console.log(`Fetched ${allProducts.value.length} products`)
    if (allProducts.value.length > 0) {
      console.log('Sample product:', allProducts.value[0])
    }
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

// Categories with counts
const categories = computed(() => {
  const catMap = {}
  allProducts.value.forEach(p => {
    const cat = p.category
    if (!catMap[cat]) {
      catMap[cat] = { label: cat, value: cat, count: 0 }
    }
    catMap[cat].count++
  })
  return Object.values(catMap)
})

// Brands
const brands = computed(() => {
  const brandSet = new Set()
  allProducts.value.forEach(p => {
    if (p.brand) brandSet.add(p.brand)
  })
  return Array.from(brandSet).sort()
})

// Filtered products
const filteredProducts = computed(() => {
  let filtered = [...allProducts.value]

  // Only show products with image_url
  filtered = filtered.filter(p => p.image_url)

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.part_no && p.part_no.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(p => {
      const cat = p.category
      return selectedCategories.value.includes(cat)
    })
  }

  // Brand filter
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(p => selectedBrands.value.includes(p.brand))
  }

  // Price filter
  if (minPrice.value !== null && minPrice.value !== '') {
    filtered = filtered.filter(p => p.price >= minPrice.value)
  }
  if (maxPrice.value !== null && maxPrice.value !== '') {
    filtered = filtered.filter(p => p.price <= maxPrice.value)
  }

  return filtered
})

// Check for active filters
const hasActiveFilters = computed(() =>
  searchQuery.value ||
  selectedCategories.value.length > 0 ||
  selectedBrands.value.length > 0 ||
  minPrice.value !== null ||
  maxPrice.value !== null
)

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedBrands.value = []
  minPrice.value = null
  maxPrice.value = null
}

// Add to cart
const addToCart = (product) => {
  if (cartStore.value) {
    cartStore.value.addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url
    })
    cartStore.value.openCart()

    // Show notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 shadow-lg z-50 rounded'
    notification.textContent = 'Product added to cart!'
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}

// Handle image load errors
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  console.error('Failed to load image:', target.src)
  // Don't hide the image, let the fallback SVG show instead
  target.style.display = 'none'
  const fallback = target.nextElementSibling
  if (fallback) {
    (fallback as HTMLElement).style.display = 'block'
  }
}

// Initialize
onMounted(() => {
  cartStore.value = useCartStore()
  fetchProducts()
})
</script>
