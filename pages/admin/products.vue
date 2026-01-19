<template>
  <div class="min-h-screen bg-cream-100">
    <!-- Admin Header -->
    <header class="bg-white border-b border-cream-300 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-8">
            <NuxtLink to="/admin" class="font-heading text-xl text-black">
              Tabby Admin
            </NuxtLink>
            <nav class="hidden md:flex gap-6">
              <NuxtLink to="/admin" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Dashboard</NuxtLink>
              <NuxtLink to="/admin/orders" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Orders</NuxtLink>
              <NuxtLink to="/admin/products" class="text-sm font-medium text-[#ea580c]">Products</NuxtLink>
              <NuxtLink to="/admin/categories" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Categories</NuxtLink>
            </nav>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-sm text-cream-600 hover:text-black transition-colors">View Store</NuxtLink>
            <button @click="logout" class="text-sm text-red-600 hover:text-red-700 transition-colors">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="font-heading text-2xl text-black">Products</h1>
        <button
          @click="openProductModal()"
          class="bg-[#ea580c] text-white px-4 py-2 text-sm font-medium hover:bg-[#c2410c] transition-colors"
        >
          Add Product
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="animate-spin h-12 w-12 border-2 border-cream-400 border-t-burgundy-900 rounded-full"></div>
      </div>

      <div v-else>
        <!-- Products Table -->
        <div class="bg-white border border-cream-300 shadow-luxury overflow-hidden">
          <div v-if="products.length === 0" class="p-8 text-center text-cream-600">
            No products yet. Click "Add Product" to create one.
          </div>

          <table v-else class="w-full">
            <thead class="bg-cream-50 border-b border-cream-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">SKU</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cream-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-cream-200">
              <tr v-for="product in products" :key="product.id" class="hover:bg-cream-50">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-cream-100 border border-cream-200 overflow-hidden flex-shrink-0">
                      <img
                        v-if="product.image_url"
                        :src="product.image_url"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p class="font-medium text-black">{{ product.name }}</p>
                      <p class="text-xs text-cream-500">{{ getCategoryName(product.category_id) }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-cream-600">
                  {{ product.sku || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-black">
                  MYR {{ product.price.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-cream-600">
                  {{ product.stock }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-block px-2 py-1 text-xs font-medium rounded',
                      product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ product.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <button
                      @click="openProductModal(product)"
                      class="text-sm text-[#ea580c] hover:text-[#c2410c] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteProduct(product)"
                      class="text-sm text-red-600 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Product Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-luxury-lg">
          <div class="px-6 py-4 border-b border-cream-200 flex justify-between items-center">
            <h2 class="font-heading text-xl text-black">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>
            <button @click="closeModal" class="text-cream-600 hover:text-black transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveProduct" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-cream-800">Name *</label>
              <input
                v-model="productForm.name"
                type="text"
                required
                class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-cream-800">Description</label>
              <textarea
                v-model="productForm.description"
                rows="3"
                class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2 text-cream-800">Price (MYR) *</label>
                <input
                  v-model.number="productForm.price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2 text-cream-800">Stock *</label>
                <input
                  v-model.number="productForm.stock"
                  type="number"
                  min="0"
                  required
                  class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
                >
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2 text-cream-800">SKU</label>
                <input
                  v-model="productForm.sku"
                  type="text"
                  class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2 text-cream-800">Category</label>
                <select
                  v-model="productForm.category_id"
                  class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
                >
                  <option :value="null">No Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-cream-800">Image URL</label>
              <input
                v-model="productForm.image_url"
                type="url"
                placeholder="https://..."
                class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
              >
            </div>

            <div v-if="error" class="p-4 border border-red-300 bg-red-50">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-cream-400 text-cream-700 hover:bg-cream-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-[#ea580c] text-white hover:bg-[#c2410c] disabled:bg-cream-400 transition-colors"
              >
                {{ saving ? 'Saving...' : 'Save Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useApi, type Product, type Category } from '~/composables/useApi'

definePageMeta({
  middleware: 'admin'
})

const authStore = useAuthStore()
const api = useApi()
const router = useRouter()

const loading = ref(true)
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const showModal = ref(false)
const editingProduct = ref<Product | null>(null)
const saving = ref(false)
const error = ref('')

const productForm = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  sku: '',
  category_id: null as number | null,
  image_url: ''
})

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}

const getCategoryName = (categoryId: number | null) => {
  if (!categoryId) return 'Uncategorized'
  const category = categories.value.find(c => c.id === categoryId)
  return category?.name || 'Uncategorized'
}

const openProductModal = (product?: Product) => {
  error.value = ''
  if (product) {
    editingProduct.value = product
    productForm.value = {
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      sku: product.sku || '',
      category_id: product.category_id,
      image_url: product.image_url || ''
    }
  } else {
    editingProduct.value = null
    productForm.value = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      sku: '',
      category_id: null,
      image_url: ''
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingProduct.value = null
  error.value = ''
}

const saveProduct = async () => {
  saving.value = true
  error.value = ''

  try {
    const data = {
      name: productForm.value.name,
      price: productForm.value.price,
      stock: productForm.value.stock,
      category_id: productForm.value.category_id || null,
      sku: productForm.value.sku || null,
      description: productForm.value.description || null,
      image_url: productForm.value.image_url || null
    }

    if (editingProduct.value) {
      // Update existing product
      await api.put(`/api/admin/products/${editingProduct.value.id}`, data, true)
    } else {
      // Create new product
      await api.post('/api/admin/products', data, true)
    }

    closeModal()
    await fetchProducts()
  } catch (err: any) {
    console.error('Failed to save product:', err)
    error.value = err.detail || err.message || 'Failed to save product'
  } finally {
    saving.value = false
  }
}

const deleteProduct = async (product: Product) => {
  if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return

  try {
    await api.del(`/api/admin/products/${product.id}`, true)
    await fetchProducts()
  } catch (err: any) {
    console.error('Failed to delete product:', err)
    alert(err.detail || err.message || 'Failed to delete product')
  }
}

const fetchProducts = async () => {
  try {
    // Try admin endpoint first
    products.value = await api.get<Product[]>('/api/admin/products', true)
  } catch (err) {
    console.error('Admin products failed, trying public endpoint:', err)
    try {
      // Fallback to public products endpoint
      products.value = await api.get<Product[]>('/api/products/')
    } catch (err2) {
      console.error('Failed to fetch products:', err2)
      products.value = []
    }
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await api.get<Category[]>('/api/categories/')
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

onMounted(async () => {
  authStore.initAuth()
  await Promise.all([fetchProducts(), fetchCategories()])
  loading.value = false
})
</script>
