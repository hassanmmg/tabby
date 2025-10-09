<template>
  <div>
    <Navbar />

    <!-- Breadcrumb -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav class="text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
          <span class="mx-2">/</span>
          <span v-if="product">{{ product.category || 'Products' }}</span>
          <span class="mx-2">/</span>
          <span v-if="product" class="text-gray-900">{{ product.part_no || product.title }}</span>
        </nav>
      </div>
    </div>

    <div class="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>

        <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column: Product Image and Tabs -->
          <div class="space-y-6">
            <!-- Product Image -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.title"
                class="w-full h-auto object-contain"
              />
              <div v-else class="w-full h-64 sm:h-96 flex items-center justify-center bg-gray-100 rounded-md">
                <svg class="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Tabs Section -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
              <div class="flex gap-8 border-b border-gray-200 px-6 pt-6">
                <button
                  v-for="tab in tabs"
                  :key="tab"
                  @click="activeTab = tab"
                  :class="[
                    'pb-4 font-semibold text-base transition-colors border-b-2 -mb-px',
                    activeTab === tab
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  ]"
                >
                  {{ tab }}
                </button>
              </div>

              <div class="p-6">
                <div v-if="activeTab === 'Description'" class="text-gray-700 leading-relaxed">
                  <p>{{ product.description || product.part_no + ' - ' + product.category + ' - ' + (product.title.includes('Remote Control') ? 'Remote Control Type.' : '') + ' High-quality ' + product.category.toLowerCase() + ' from ' + product.brand + ' Malaysia, known for reliability and performance.' }}</p>
                </div>

                <div v-if="activeTab === 'Specifications'" class="text-gray-700">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <span class="font-semibold">Brand:</span>
                      <span class="col-span-2">{{ product.brand }}</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                      <span class="font-semibold">Category:</span>
                      <span class="col-span-2">{{ product.category }}</span>
                    </div>
                    <div v-if="product.part_no" class="grid grid-cols-3 gap-4">
                      <span class="font-semibold">Part Number:</span>
                      <span class="col-span-2">{{ product.part_no }}</span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                      <span class="font-semibold">Stock Status:</span>
                      <span class="col-span-2">{{ isInStock ? 'In Stock' : 'Out of Stock' }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'Shipping & Returns'" class="text-gray-700">
                  <h4 class="font-semibold mb-3 text-lg">Shipping Policy</h4>
                  <ul class="list-disc pl-5 space-y-2 mb-6">
                    <li>Free shipping on orders over MYR 500</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery available</li>
                    <li>Shipping to all major cities in Malaysia</li>
                  </ul>

                  <h4 class="font-semibold mb-3 text-lg">Returns Policy</h4>
                  <ul class="list-disc pl-5 space-y-2">
                    <li>30-day return policy</li>
                    <li>Products must be in original condition</li>
                    <li>Contact customer support for return authorization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Product Info -->
          <div class="space-y-6">
            <!-- Price and Stock -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <div class="flex items-start justify-between mb-3">
                <span class="text-3xl sm:text-4xl font-bold text-blue-600">MYR {{ Number(product.price || 0).toFixed(2) }}</span>
                <span v-if="isInStock" class="bg-green-100 text-green-700 px-3 py-1.5 text-sm font-semibold rounded-md">In Stock</span>
                <span v-else class="bg-red-100 text-red-700 px-3 py-1.5 text-sm font-semibold rounded-md">Out of Stock</span>
              </div>
              <p class="text-sm text-gray-600">All prices exclude SST</p>
            </div>

            <!-- Category and Brand -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
              <div class="grid grid-cols-2 border-b border-gray-200">
                <div class="p-6 border-r border-gray-200 bg-gray-50">
                  <p class="text-sm font-medium text-gray-700">Category</p>
                </div>
                <div class="p-6 bg-white">
                  <p class="text-sm font-semibold text-gray-900">{{ product.category }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="p-6 border-r border-gray-200 bg-gray-50">
                  <p class="text-sm font-medium text-gray-700">Brand</p>
                </div>
                <div class="p-6 bg-white">
                  <p class="text-sm font-semibold text-gray-900">{{ product.brand }}</p>
                </div>
              </div>
            </div>

            <!-- Quantity and Buttons -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <p class="font-bold text-base mb-4 text-gray-900">Quantity:</p>
              <div class="flex items-center justify-center gap-4 mb-6">
                <button @click="decrementQuantity" class="w-12 h-12 border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-400 font-bold text-xl text-gray-700 transition-all flex items-center justify-center rounded-md">−</button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="w-24 text-center border-2 border-gray-300 py-2 text-lg font-semibold rounded-md focus:border-blue-500 focus:outline-none"
                />
                <button @click="incrementQuantity" class="w-12 h-12 border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-400 font-bold text-xl text-gray-700 transition-all flex items-center justify-center rounded-md">+</button>
              </div>

              <!-- Buttons -->
              <div class="space-y-3">
                <button
                  @click="addToCart"
                  class="w-full bg-blue-600 text-white py-4 hover:bg-blue-700 flex items-center justify-center gap-2 font-semibold text-base transition-colors rounded-md shadow-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
                <button
                  @click="buyNow"
                  class="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 font-semibold text-base transition-colors rounded-md shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div v-if="product && relatedProducts.length > 0" class="mt-12">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Related Products</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            <NuxtLink
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :to="`/products/${relatedProduct.id}`"
              class="bg-white border border-gray-200 hover:shadow-lg transition-shadow group rounded-md overflow-hidden"
            >
              <div class="relative">
                <img
                  v-if="relatedProduct.image_url"
                  :src="relatedProduct.image_url"
                  :alt="relatedProduct.title"
                  class="w-full h-48 object-contain p-4"
                />
                <div v-else class="w-full h-48 flex items-center justify-center bg-gray-100">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span
                  v-if="relatedProduct.stock_status && relatedProduct.stock_status.toLowerCase() === 'in_stock'"
                  class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md"
                >
                  In Stock
                </span>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-sm mb-2 text-gray-900 group-hover:text-blue-600 line-clamp-2">
                  {{ relatedProduct.title }}
                </h3>
                <p class="text-lg font-bold text-black">
                  MYR {{ Number(relatedProduct.price || 0).toFixed(2) }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div v-else class="text-center py-20">
          <p class="text-gray-500">Product not found</p>
          <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Products
          </NuxtLink>
        </div>
      </div>
    </div>
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
const activeTab = ref('Description')
const tabs = ['Description', 'Specifications', 'Shipping & Returns']
const relatedProducts = ref([])

// Check if product is in stock (default to true if not specified)
const isInStock = computed(() => {
  if (!product.value) return false
  // If no stock_status field, assume in stock
  if (!product.value.stock_status) return true
  // Check if stock status is "in_stock" (case insensitive)
  return product.value.stock_status.toLowerCase() === 'in_stock'
})

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value || !isInStock.value) return

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
  if (!product.value || !isInStock.value) return

  // Clear cart and add only this product
  cartStore.clearCart()

  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image_url: product.value.image_url
    })
  }

  // Go directly to checkout
  router.push('/checkout')
}

// Fetch product data from server API
onMounted(async () => {
  try {
    // Fetch single product
    const data = await $fetch(`/api/products/${route.params.id}`)
    product.value = data

    // Fetch related products from the same category
    if (data.category) {
      const related = await $fetch('/api/products', {
        params: {
          category: data.category,
          limit: 5
        }
      })

      // Filter out the current product from related products
      if (related) {
        relatedProducts.value = related.filter(p => p.id !== data.id).slice(0, 4)
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})
</script>