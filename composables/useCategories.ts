import { useApi, type Category } from '~/composables/useApi'

const categoriesCache = ref<Category[]>([])
const categoriesLoading = ref(false)
const categoriesLoaded = ref(false)

export const useCategories = () => {
  const api = useApi()

  const fetchCategories = async (): Promise<Category[]> => {
    if (categoriesLoaded.value) {
      return categoriesCache.value
    }

    categoriesLoading.value = true

    try {
      const categories = await api.get<Category[]>('/api/categories/')
      categoriesCache.value = categories
      categoriesLoaded.value = true
      return categories
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      return []
    } finally {
      categoriesLoading.value = false
    }
  }

  const getCategoryById = (id: number): Category | undefined => {
    return categoriesCache.value.find(c => c.id === id)
  }

  const getCategoryName = (id: number | null): string => {
    if (!id) return 'Uncategorized'
    const category = getCategoryById(id)
    return category?.name || 'Uncategorized'
  }

  const clearCache = () => {
    categoriesCache.value = []
    categoriesLoaded.value = false
  }

  return {
    categories: categoriesCache,
    loading: categoriesLoading,
    fetchCategories,
    getCategoryById,
    getCategoryName,
    clearCache
  }
}
