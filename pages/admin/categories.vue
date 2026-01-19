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
              <NuxtLink to="/admin/products" class="text-sm font-medium text-cream-600 hover:text-black transition-colors">Products</NuxtLink>
              <NuxtLink to="/admin/categories" class="text-sm font-medium text-[#ea580c]">Categories</NuxtLink>
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
        <h1 class="font-heading text-2xl text-black">Categories</h1>
        <button
          @click="openCategoryModal()"
          class="bg-[#ea580c] text-white px-4 py-2 text-sm font-medium hover:bg-[#c2410c] transition-colors"
        >
          Add Category
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="animate-spin h-12 w-12 border-2 border-cream-400 border-t-burgundy-900 rounded-full"></div>
      </div>

      <div v-else>
        <!-- Categories Grid -->
        <div v-if="categories.length === 0" class="bg-white border border-cream-300 shadow-luxury p-8 text-center text-cream-600">
          No categories yet. Click "Add Category" to create one.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white border border-cream-300 shadow-luxury p-6"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-heading text-lg text-black">{{ category.name }}</h3>
                <p v-if="category.description" class="text-sm text-cream-600 mt-2">{{ category.description }}</p>
                <p class="text-xs text-cream-500 mt-3">Created {{ formatDate(category.created_at) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="openCategoryModal(category)"
                  class="p-2 text-cream-600 hover:text-[#ea580c] transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="deleteCategory(category)"
                  class="p-2 text-cream-600 hover:text-red-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white max-w-md w-full shadow-luxury-lg">
          <div class="px-6 py-4 border-b border-cream-200 flex justify-between items-center">
            <h2 class="font-heading text-xl text-black">{{ editingCategory ? 'Edit Category' : 'Add Category' }}</h2>
            <button @click="closeModal" class="text-cream-600 hover:text-black transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveCategory" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2 text-cream-800">Name *</label>
              <input
                v-model="categoryForm.name"
                type="text"
                required
                class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-2 text-cream-800">Description</label>
              <textarea
                v-model="categoryForm.description"
                rows="3"
                class="w-full border border-cream-400 px-4 py-2 bg-cream-50 focus:outline-none focus:border-[#ea580c]"
              ></textarea>
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
                {{ saving ? 'Saving...' : 'Save Category' }}
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
import { useApi, type Category } from '~/composables/useApi'

definePageMeta({
  middleware: 'admin'
})

const authStore = useAuthStore()
const api = useApi()
const router = useRouter()

const loading = ref(true)
const categories = ref<Category[]>([])
const showModal = ref(false)
const editingCategory = ref<Category | null>(null)
const saving = ref(false)
const error = ref('')

const categoryForm = ref({
  name: '',
  description: ''
})

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const openCategoryModal = (category?: Category) => {
  error.value = ''
  if (category) {
    editingCategory.value = category
    categoryForm.value = {
      name: category.name,
      description: category.description || ''
    }
  } else {
    editingCategory.value = null
    categoryForm.value = {
      name: '',
      description: ''
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCategory.value = null
  error.value = ''
}

const saveCategory = async () => {
  saving.value = true
  error.value = ''

  try {
    const data = {
      name: categoryForm.value.name,
      description: categoryForm.value.description || null
    }

    if (editingCategory.value) {
      // Update existing category
      await api.put(`/api/admin/categories/${editingCategory.value.id}`, data, true)
    } else {
      // Create new category
      await api.post('/api/admin/categories', data, true)
    }

    closeModal()
    await fetchCategories()
  } catch (err: any) {
    console.error('Failed to save category:', err)
    error.value = err.detail || err.message || 'Failed to save category'
  } finally {
    saving.value = false
  }
}

const deleteCategory = async (category: Category) => {
  if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return

  try {
    await api.del(`/api/admin/categories/${category.id}`, true)
    await fetchCategories()
  } catch (err: any) {
    console.error('Failed to delete category:', err)
    alert(err.detail || err.message || 'Failed to delete category')
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
  await fetchCategories()
  loading.value = false
})
</script>
