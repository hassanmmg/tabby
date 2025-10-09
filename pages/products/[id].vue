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

        <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <!-- Product Image -->
          <div>
            <div class="bg-white border border-gray-200 overflow-hidden p-8 sm:p-12 lg:p-16">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.title"
                class="w-full h-auto object-contain"
              />
              <div v-else class="w-full h-64 sm:h-96 flex items-center justify-center bg-gray-100">
                <svg class="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold mb-2 leading-tight text-gray-900">{{ product.title }}</h1>

            <div v-if="product.part_no" class="mb-6">
              <p class="text-base text-gray-600">Part Number: <span class="font-medium text-gray-900">{{ product.part_no }}</span></p>
            </div>

            <div class="mb-6 border-t border-b border-gray-200 py-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-4xl sm:text-5xl font-bold text-red-600">MYR {{ Number(product.price || 0).toFixed(2) }}</span>
                <span v-if="isInStock" class="bg-green-100 text-green-700 px-4 py-2 rounded text-sm font-semibold">In Stock</span>
                <span v-else class="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-semibold">Out of Stock</span>
              </div>
              <p class="text-sm text-gray-600">All prices exclude SST</p>
            </div>

            <!-- Category and Brand -->
            <div class="bg-gray-50 border border-gray-200 mb-6">
              <div class="grid grid-cols-2 divide-x divide-gray-200">
                <div class="p-5">
                  <p class="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Category</p>
                  <p class="font-medium text-gray-900">{{ product.category }}</p>
                </div>
                <div class="p-5">
                  <p class="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Brand</p>
                  <p class="font-medium text-gray-900">{{ product.brand }}</p>
                </div>
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <div class="bg-white border border-gray-200 p-6">
                <p class="font-bold text-base mb-4 text-gray-900">Quantity:</p>
                <div class="flex items-center gap-3 mb-6">
                  <button @click="decrementQuantity" class="w-12 h-12 border border-gray-300 hover:bg-gray-50 font-bold text-xl text-gray-700 transition-colors flex items-center justify-center">−</button>
                  <input
                    v-model.number="quantity"
                    type="number"
                    min="1"
                    class="w-24 text-center border border-gray-300 py-3 text-lg font-semibold rounded"
                  />
                  <button @click="incrementQuantity" class="w-12 h-12 border border-gray-300 hover:bg-gray-50 font-bold text-xl text-gray-700 transition-colors flex items-center justify-center">+</button>
                </div>

                <!-- Buttons -->
                <div class="space-y-3">
                  <button
                    @click="addToCart"
                    :disabled="!isInStock"
                    class="w-full bg-blue-600 text-white py-4 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-base transition-colors shadow-sm"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button
                    @click="buyNow"
                    :disabled="!isInStock"
                    class="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 active:bg-gray-950 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-base transition-colors shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div v-if="product" class="mt-8 lg:mt-12">
          <div class="bg-blue-50 border border-blue-200 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Shipping Information</h3>
            <ul class="space-y-2.5 text-sm text-blue-700">
              <li class="flex items-start">
                <span class="mr-2 mt-0.5">•</span>
                <span class="font-medium">Free shipping on orders over MYR 500</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-0.5">•</span>
                <span class="font-medium">Fast shipping available</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-0.5">•</span>
                <span class="font-medium">Genuine OEM parts</span>
              </li>
            </ul>
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
const supabase = useSupabaseClient()

const loading = ref(true)
const product = ref(null)
const quantity = ref(1)

// Check if product is in stock (default to true if not specified)
const isInStock = computed(() => {
  if (!product.value) return false
  // If no stock_status field, assume in stock
  if (!product.value.stock_status) return true
  // Check if stock status includes "IN STOCK" (case insensitive)
  return product.value.stock_status.toUpperCase().includes('IN STOCK')
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

// Fetch product data from Supabase
onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', route.params.id)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
    } else {
      product.value = data
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
})
</script>