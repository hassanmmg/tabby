<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
      
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div>
          <div class="bg-white rounded-lg overflow-hidden">
            <img 
              :src="product.image || '/images/placeholder.svg'" 
              :alt="product.name"
              class="w-full h-96 object-cover"
            />
          </div>
          <div v-if="product.additionalImages" class="grid grid-cols-4 gap-2 mt-4">
            <img 
              v-for="(img, index) in product.additionalImages" 
              :key="index"
              :src="img" 
              :alt="`${product.name} ${index + 1}`"
              class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
              @click="changeMainImage(img)"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <div class="mb-4">
            <nav class="text-sm">
              <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Home</NuxtLink>
              <span class="mx-2 text-gray-400">/</span>
              <NuxtLink to="/products" class="text-gray-500 hover:text-gray-700">Products</NuxtLink>
              <span class="mx-2 text-gray-400">/</span>
              <span class="text-gray-900">{{ product.name }}</span>
            </nav>
          </div>

          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          
          <div class="mb-6">
            <p class="text-sm text-gray-500 mb-2">SKU: {{ product.sku }}</p>
            <p class="text-sm text-gray-500">Category: {{ product.category }}</p>
          </div>

          <div class="mb-6">
            <div class="flex items-center gap-4">
              <span v-if="product.originalPrice" class="text-2xl text-gray-400 line-through">
                ${{ product.originalPrice }}
              </span>
              <span class="text-3xl font-bold text-red-500">${{ product.price }}</span>
            </div>
            <p v-if="product.inStock" class="text-green-600 mt-2">✓ In Stock</p>
            <p v-else class="text-red-600 mt-2">Out of Stock</p>
          </div>

          <div class="mb-8">
            <p class="text-gray-700">{{ product.description }}</p>
          </div>

          <!-- Specifications -->
          <div v-if="product.specifications" class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Specifications</h3>
            <div class="bg-gray-50 rounded p-4">
              <dl class="space-y-2">
                <div v-for="(value, key) in product.specifications" :key="key" class="flex">
                  <dt class="font-medium text-gray-600 w-1/3">{{ key }}:</dt>
                  <dd class="text-gray-900 w-2/3">{{ value }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="flex items-center gap-4 mb-8">
            <div class="flex items-center border rounded">
              <button @click="decrementQuantity" class="px-4 py-2 hover:bg-gray-100">-</button>
              <input 
                v-model.number="quantity" 
                type="number" 
                min="1"
                class="w-16 text-center border-x py-2"
              />
              <button @click="incrementQuantity" class="px-4 py-2 hover:bg-gray-100">+</button>
            </div>
            <button 
              @click="addToCart"
              :disabled="!product.inStock"
              class="flex-1 bg-red-500 text-white py-3 px-6 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>

          <!-- Additional Info -->
          <div class="border-t pt-6">
            <div class="space-y-2 text-sm text-gray-600">
              <p>✓ Free shipping on orders over $100</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-500">Product not found</p>
        <NuxtLink to="/products" class="text-red-500 hover:text-red-600 mt-4 inline-block">
          Back to Products
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

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

const changeMainImage = (img) => {
  product.value.image = img
}

const addToCart = () => {
  if (!product.value || !product.value.inStock) return
  
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    sku: product.value.sku,
    price: product.value.price,
    image: product.value.image,
    quantity: quantity.value
  })
  
  cartStore.openCart()
}

// Fetch product data
onMounted(async () => {
  try {
    // This would normally fetch from your API/database
    // For now, using mock data
    product.value = {
      id: route.params.id,
      name: 'Sample Product',
      sku: 'SKU-001',
      category: 'Equipment Parts',
      price: 99.99,
      originalPrice: 149.99,
      description: 'High-quality replacement part for your equipment. Built to last with premium materials.',
      image: '/images/product-placeholder.jpg',
      inStock: true,
      specifications: {
        'Brand': 'Teknopuri',
        'Weight': '2.5 kg',
        'Dimensions': '30 x 20 x 10 cm',
        'Material': 'Steel',
        'Warranty': '1 Year'
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})
</script>