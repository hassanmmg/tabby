<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-red-500 to-red-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Teknopuri Parts Store
          </h1>
          <p class="text-xl mb-8">
            Your trusted source for quality equipment parts and accessories
          </p>
          <div class="flex gap-4">
            <NuxtLink to="/products" class="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Products
            </NuxtLink>
            <button class="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="category in categories" :key="category.id" class="group cursor-pointer">
            <div class="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition">
              <div class="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">{{ category.name }}</h3>
              <p class="text-gray-600 text-sm">{{ category.count }} Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
        <div class="text-center mt-8">
          <NuxtLink to="/products" class="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose Teknopuri</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Quality Guaranteed</h3>
            <p class="text-gray-600">All our products meet the highest quality standards</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Best Prices</h3>
            <p class="text-gray-600">Competitive pricing on all equipment parts</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p class="text-gray-600">Quick delivery to get you back up and running</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
        <p class="text-xl mb-8">Get the latest products and special offers delivered to your inbox</p>
        <div class="max-w-md mx-auto flex gap-2">
          <input 
            type="email" 
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock data - replace with actual API calls
const categories = ref([
  { id: 1, name: 'Cooling Parts', count: 250 },
  { id: 2, name: 'Engine Parts', count: 180 },
  { id: 3, name: 'Hydraulic Systems', count: 120 },
  { id: 4, name: 'Electrical Components', count: 95 },
  { id: 5, name: 'Filters', count: 200 },
  { id: 6, name: 'Bearings', count: 150 },
  { id: 7, name: 'Seals & Gaskets', count: 175 },
  { id: 8, name: 'Tools & Equipment', count: 80 }
])

const featuredProducts = ref([
  {
    id: 1,
    name: 'Heavy Duty Water Pump',
    sku: 'WP-001',
    price: 299.99,
    originalPrice: 399.99,
    image: '/images/placeholder.svg',
    badge: 'Sale'
  },
  {
    id: 2,
    name: 'Industrial Radiator',
    sku: 'RAD-002',
    price: 599.99,
    image: '/images/placeholder.svg'
  },
  {
    id: 3,
    name: 'Oil Cooler Assembly',
    sku: 'OC-003',
    price: 449.99,
    image: '/images/placeholder.svg'
  },
  {
    id: 4,
    name: 'Fan Blade Set',
    sku: 'FB-004',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/placeholder.svg',
    badge: 'Sale'
  }
])
</script>