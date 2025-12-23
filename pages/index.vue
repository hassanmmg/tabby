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
        <h2 class="font-heading text-3xl md:text-4xl text-burgundy-900 mb-3">Our Collection</h2>
        <p class="text-cream-700 max-w-2xl mx-auto">Discover our premium selection of industrial parts and equipment</p>
      </div>

      <div>
        <!-- Products Grid -->
        <main>
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-16">
            <div class="animate-spin h-12 w-12 border-2 border-cream-400 border-t-burgundy-900 rounded-full"></div>
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
                <span class="absolute top-3 left-3 bg-burgundy-900 text-white text-xs px-3 py-1 z-10">NEW</span>
                <!-- Product Image -->
                <div class="aspect-[3/4] bg-cream-50 overflow-hidden">
                  <img
                    :src="product.image_url"
                    :alt="product.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    @error="handleImageError"
                  />
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-5 border-t border-cream-200">
                <h3 class="font-heading text-lg sm:text-xl text-burgundy-900 mb-3">
                  {{ product.title.split(' ')[0] }}
                </h3>

                <!-- Price -->
                <div>
                  <span class="text-base text-burgundy-900">
                    MYR {{ product.price?.toFixed(2) || '0.00' }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- No Products -->
          <div v-if="!loading && filteredProducts.length === 0" class="text-center py-16">
            <p class="text-cream-600 text-lg">No products found</p>
          </div>
        </main>
      </div>
    </div>

    <!-- Newsletter Section -->
    <section class="bg-burgundy-900 py-20 md:py-28">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <h2 class="font-heading text-2xl md:text-3xl text-white mb-4">Subscribe to our emails</h2>
        <p class="text-cream-300 mb-8">Be the first to know about new collections and exclusive offers.</p>

        <form @submit.prevent="handleSubscribe" class="relative max-w-md mx-auto">
          <input
            v-model="email"
            type="email"
            placeholder="Enter email address"
            class="w-full px-6 py-4 pr-14 rounded-full bg-burgundy-800/50 border border-burgundy-700 text-white placeholder-cream-400 focus:outline-none focus:border-cream-400 transition-colors"
          />
          <button
            type="submit"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-burgundy-950 hover:bg-burgundy-800 rounded-full flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = ref(null)

// State
const allProducts = ref([])
const email = ref('')

// Newsletter subscribe
const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribed:', email.value)
    email.value = ''
    alert('Thank you for subscribing!')
  }
}
const loading = ref(true)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedBrands = ref([])
const minPrice = ref(null)
const maxPrice = ref(null)

// Mock products for testing
const mockProducts = [
  {
    id: 1,
    title: 'Nara Coolmint',
    description: 'Premium quality fabric with elegant design',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-b.jpg?v=1765855142&width=1000',
    category: 'Scarves',
    brand: 'Tabby',
    part_no: 'MINT-001',
    stock_status: 'in_stock'
  },
  {
    id: 2,
    title: 'Nara Smokey',
    description: 'Elegant signature collection piece',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Smokey-SQ-b.jpg?v=1765854993&width=1000',
    category: 'Scarves',
    brand: 'Tabby',
    part_no: 'SMOKE-001',
    stock_status: 'in_stock'
  },
  {
    id: 3,
    title: 'Nara Snow',
    description: 'Luxurious silk fabric for everyday elegance',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Snow-SQ-a.jpg?v=1765855990&width=1000',
    category: 'Premium',
    brand: 'Tabby',
    part_no: 'SNOW-001',
    stock_status: 'in_stock'
  },
  {
    id: 4,
    title: 'Nara Rosy',
    description: 'Comfortable and stylish for daily wear',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Rosy-SQ-a.jpg?v=1765855405&width=1000',
    category: 'Basics',
    brand: 'Tabby',
    part_no: 'ROSY-001',
    stock_status: 'in_stock'
  },
  {
    id: 6,
    title: 'Nara Ube',
    description: 'Light and airy for warm weather',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Ube-SQ-a.jpg?v=1765855299&width=1000',
    category: 'Seasonal',
    brand: 'Tabby',
    part_no: 'UBE-001',
    stock_status: 'in_stock'
  },
  {
    id: 7,
    title: 'Nara Cosmos',
    description: 'Beautiful cosmic inspired design',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Cosmos-SQ-a.jpg?v=1765854958&width=996',
    category: 'Premium',
    brand: 'Tabby',
    part_no: 'COSM-001',
    stock_status: 'in_stock'
  },
  {
    id: 8,
    title: 'Nara Onyx',
    description: 'Elegant dark sophistication',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Onyx-SQ-a.jpg?v=1765854942&width=1000',
    category: 'Premium',
    brand: 'Tabby',
    part_no: 'ONYX-001',
    stock_status: 'in_stock'
  },
  {
    id: 9,
    title: 'Nara Granola',
    description: 'Warm earthy tones for everyday style',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Granola-SQ-b.jpg?v=1765855045&width=998',
    category: 'Basics',
    brand: 'Tabby',
    part_no: 'GRAN-001',
    stock_status: 'in_stock'
  }
]

// Fetch products from server API
const fetchProducts = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/products')
    // Use API data if available, otherwise use mock products
    allProducts.value = (data && data.length > 0) ? data : mockProducts
    console.log(`Loaded ${allProducts.value.length} products`)
  } catch (err) {
    console.error('Error fetching products, using mock data:', err)
    allProducts.value = mockProducts
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

    // Show notification with luxury styling
    const notification = document.createElement('div')
    notification.className = 'fixed top-20 right-4 bg-burgundy-900 text-white px-6 py-3 shadow-luxury-lg z-50 tracking-wide'
    notification.textContent = 'Added to cart'
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
