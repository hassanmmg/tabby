<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-4">
          Discover Quality Parts for<br>
          Your Equipment Needs
        </h2>
        
        <!-- Footer Search -->
        <div class="max-w-2xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Search for parts..."
            class="flex-1 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            v-model="searchQuery"
          />
          <button class="bg-red-500 text-white px-8 py-3 hover:bg-red-600 font-medium" @click="handleSearch">
            Search
          </button>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="border-t border-gray-700 pt-8 mt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 Teknopuri. All rights reserved.
          </p>
          
          <div class="flex gap-6 text-sm">
            <NuxtLink to="/privacy" class="hover:text-red-500 transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-red-500 transition-colors">Terms of Service</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-red-500 transition-colors">Contact Us</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>