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
              <span class="absolute top-4 left-4 bg-burgundy-900 text-white text-xs px-3 py-1 z-10">NEW</span>
              <img
                :src="thumbnails[0]"
                :alt="product.title"
                class="w-full h-full object-cover cursor-pointer"
                @click="openLightbox(0)"
              />
            </div>
            <!-- Top Right - Large image -->
            <div class="aspect-[3/4] bg-cream-100">
              <img
                :src="thumbnails[1]"
                :alt="product.title"
                class="w-full h-full object-cover cursor-pointer"
                @click="openLightbox(1)"
              />
            </div>
            <!-- Bottom Left - Smaller image -->
            <div class="aspect-[3/4] bg-cream-100">
              <img
                :src="thumbnails[2]"
                :alt="product.title"
                class="w-full h-full object-cover cursor-pointer"
                @click="openLightbox(2)"
              />
            </div>
            <!-- Bottom Right - Empty cream space -->
            <div class="aspect-[3/4] bg-cream-100"></div>
          </div>
        </div>

        <!-- Right Column: Product Info -->
        <div class="lg:w-[40%] px-6 lg:px-10 py-8 lg:py-6">
          <!-- Product Title -->
          <h1 class="font-heading text-2xl lg:text-3xl text-burgundy-900 mb-4">{{ productName }}</h1>

          <!-- Price -->
          <div class="mb-6">
            <p class="text-lg font-medium text-burgundy-900">MYR {{ Number(product.price || 0).toFixed(2) }}</p>
          </div>

          <!-- Color/Variant Selector -->
          <div class="mb-6">
            <div class="flex gap-2 overflow-x-auto pb-2">
              <button
                v-for="variant in variants"
                :key="variant.id"
                @click="selectVariant(variant)"
                class="flex-shrink-0 flex flex-col items-center"
              >
                <div
                  class="w-24 h-28 border-2 rounded overflow-hidden mb-2 transition-all"
                  :class="selectedVariant?.id === variant.id ? 'border-burgundy-900' : 'border-cream-200 hover:border-cream-400'"
                >
                  <img :src="variant.thumbnail" :alt="variant.name" class="w-full h-full object-cover" />
                </div>
                <span class="text-xs text-cream-700">{{ variant.name }}</span>
              </button>
            </div>
          </div>

          
          <!-- Add to Cart Section -->
          <div class="border-t border-cream-200 pt-6">
            <!-- Quantity -->
            <div class="flex items-center gap-4 mb-4">
              <span class="text-sm font-medium text-burgundy-900">Quantity:</span>
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
                class="w-full bg-burgundy-900 text-white py-3.5 hover:bg-burgundy-800 font-medium tracking-wide transition-colors rounded"
              >
                Add to Cart
              </button>
              <button
                @click="buyNow"
                class="w-full border border-burgundy-900 text-burgundy-900 py-3.5 hover:bg-burgundy-50 font-medium tracking-wide transition-colors rounded"
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
              <span class="font-medium text-burgundy-900">Description</span>
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
              <p class="mb-4">{{ product.description || `Meet ${productName}, your new everyday favourite! A basic staple, ${productName} is made from comfy poly voile, giving you precise styling and airy breathable comfort all day long.` }}</p>
              <ul class="space-y-2">
                <li><span class="font-medium text-burgundy-900">Material</span>: Poly Voile.</li>
                <li><span class="font-medium text-burgundy-900">Finishing</span>: Baby Seam.</li>
                <li><span class="font-medium text-burgundy-900">Label</span>: Metal Tag.</li>
                <li><span class="font-medium text-burgundy-900">Shape</span>: Square.</li>
                <li><span class="font-medium text-burgundy-900">Measurement</span>: 1.15m x 1.15m (45" x 45").</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="product && relatedProducts.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="font-heading text-2xl md:text-3xl mb-8 text-burgundy-900 text-center">You May Also Like</h2>
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
                :alt="relatedProduct.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 class="text-sm font-medium text-burgundy-900 mb-1">{{ relatedProduct.title }}</h3>
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

<script setup>
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const loading = ref(true)
const product = ref(null)
const quantity = ref(1)
const descriptionOpen = ref(true)
const relatedProducts = ref([])
const selectedVariant = ref(null)
const selectedCollection = ref('Nara')

// Collections
const collections = ['Nara', 'Inaya', 'Nluxe', 'Muna', 'Ilya', 'Wayfarer']

// Variants for the product
const variants = ref([
  { id: 1, name: 'Coolmint', thumbnail: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-a.jpg?v=1765855143&width=200', images: ['https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-a.jpg?v=1765855143&width=1000', 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-b.jpg?v=1765855142&width=1000', 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-c.jpg?v=1765855143&width=1000'] },
  { id: 2, name: 'Snow', thumbnail: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Snow-SQ-a.jpg?v=1765855990&width=200', images: ['https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Snow-SQ-a.jpg?v=1765855990&width=1000', 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Snow-SQ-b.jpg?v=1765855990&width=1000', 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Snow-SQ-c.jpg?v=1765855990&width=1000'] },
  { id: 3, name: 'Sunkissed', thumbnail: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Sunkissed-SQ-a.jpg?v=1765855246&width=200', images: ['https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Sunkissed-SQ-a.jpg?v=1765855246&width=1000', 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Sunkissed-SQ-b.jpg?v=1765855246&width=1000'] },
  { id: 4, name: 'Apricot', thumbnail: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Apricot-SQ-a.jpg?v=1765855898&width=200', images: ['https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Apricot-SQ-a.jpg?v=1765855898&width=1000', 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Apricot-SQ-b.jpg?v=1765855898&width=1000'] },
])

// Thumbnails for the gallery - changes based on selected variant
const thumbnails = computed(() => {
  if (selectedVariant.value?.images) {
    return selectedVariant.value.images
  }
  // Default Coolmint images
  return [
    'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-a.jpg?v=1765855143&width=600',
    'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-b.jpg?v=1765855142&width=600',
    'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-c.jpg?v=1765855143&width=1000',
  ]
})

// Product name without variant
const productName = computed(() => {
  if (!product.value) return ''
  return product.value.title.split(' ')[0] || product.value.title
})

// Mock products for testing
const mockProducts = [
  {
    id: 1,
    title: 'Nara Coolmint',
    description: 'Meet Nara, your new everyday favourite! A basic staple, Nara is made from comfy poly voile, giving you precise styling and airy breathable comfort all day long.',
    price: 69.00,
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-a.jpg?v=1765855143&width=1440',
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Coolmint-SQ-b.jpg?v=1765855142&width=1000',
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
    image_url: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Signatures-Nara-03.jpg?v=1765853724&width=1440',
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Smokey-SQ-b.jpg?v=1765854993&width=1000',
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
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Snow-SQ-b.jpg?v=1765855990&width=1000',
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
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Rosy-SQ-b.jpg?v=1765855405&width=1000',
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
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Ube-SQ-b.jpg?v=1765855299&width=1000',
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
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Cosmos-SQ-b.jpg?v=1765854958&width=996',
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
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Onyx-SQ-b.jpg?v=1765854942&width=1000',
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
    image_url_2: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Nara-Granola-SQ-a.jpg?v=1765855045&width=998',
    category: 'Basics',
    brand: 'Tabby',
    part_no: 'GRAN-001',
    stock_status: 'in_stock'
  }
]

const selectVariant = (variant) => {
  selectedVariant.value = variant
}

const selectCollection = (collection) => {
  selectedCollection.value = collection
}

const openLightbox = (index) => {
  // Lightbox functionality can be added later
  console.log('Open lightbox at index:', index)
}

const incrementQuantity = () => {
  quantity.value++
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
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image_url: product.value.image_url
    })
  }

  cartStore.openCart()
}

const buyNow = () => {
  if (!product.value) return

  cartStore.clearCart()

  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image_url: product.value.image_url
    })
  }

  router.push('/checkout')
}

onMounted(async () => {
  const productId = parseInt(route.params.id)

  try {
    const data = await $fetch(`/api/products/${route.params.id}`)
    product.value = data

    if (data.category) {
      const related = await $fetch('/api/products', {
        params: {
          category: data.category,
          limit: 5
        }
      })

      if (related) {
        relatedProducts.value = related.filter(p => p.id !== data.id).slice(0, 4)
      }
    }
  } catch (error) {
    console.error('Error fetching product, using mock data:', error)
    // Use mock products as fallback
    product.value = mockProducts.find(p => p.id === productId) || null

    if (product.value) {
      // Get related products from mock data
      relatedProducts.value = mockProducts
        .filter(p => p.id !== productId)
        .slice(0, 4)
    }
  } finally {
    loading.value = false
    // Select first variant by default
    if (variants.value.length > 0) {
      selectedVariant.value = variants.value[0]
    }
  }
})
</script>
