<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-white py-12">
      <div class="container mx-auto px-4">
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>

        <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div>
            <div class="bg-white border rounded-lg overflow-hidden p-8">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.title"
                class="w-full h-auto object-contain"
              />
              <div v-else class="w-full h-96 flex items-center justify-center bg-gray-100">
                <svg class="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>

            <div v-if="product.part_no" class="mb-6">
              <p class="text-sm text-gray-600">Part Number: {{ product.part_no }}</p>
            </div>

            <div class="mb-6 flex items-center gap-4">
              <span class="text-4xl font-bold text-red-600">MYR {{ Number(product.price || 0).toFixed(2) }}</span>
              <span v-if="product.stock_status?.includes('IN STOCK')" class="text-green-600 font-medium">In Stock</span>
              <span v-else class="text-red-600 font-medium">Out of Stock</span>
            </div>

            <p class="text-sm text-gray-600 mb-6">All prices exclude SST</p>

            <!-- Category and Brand -->
            <div class="border-t border-b py-4 mb-6 space-y-2">
              <div class="flex">
                <span class="w-32 text-gray-600">Category</span>
                <span class="font-medium">{{ product.category || 'Ceiling Fans' }}</span>
              </div>
              <div class="flex">
                <span class="w-32 text-gray-600">Brand</span>
                <span class="font-medium">{{ product.brand || 'KDK' }}</span>
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <p class="font-semibold mb-3">Quantity:</p>
              <div class="flex items-center gap-4 mb-4">
                <button @click="decrementQuantity" class="w-10 h-10 border hover:bg-gray-100">-</button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="w-20 text-center border py-2"
                />
                <button @click="incrementQuantity" class="w-10 h-10 border hover:bg-gray-100">+</button>
              </div>

              <!-- Buttons -->
              <div class="space-y-3">
                <button
                  @click="addToCart"
                  :disabled="!product.stock_status?.includes('IN STOCK')"
                  class="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
                <button
                  @click="buyNow"
                  :disabled="!product.stock_status?.includes('IN STOCK')"
                  class="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <!-- Shipping Information -->
            <div class="bg-blue-50 border border-blue-200 rounded p-4">
              <h3 class="font-semibold text-blue-900 mb-3">Shipping Information</h3>
              <ul class="space-y-2 text-sm text-blue-900">
                <li>• Free shipping on orders over MYR 500</li>
                <li>• Fast shipping available</li>
                <li>• Genuine OEM parts</li>
                <li>• Expert support available</li>
              </ul>
            </div>
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

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value || !product.value.stock_status?.includes('IN STOCK')) return

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
  if (!product.value || !product.value.stock_status?.includes('IN STOCK')) return

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