<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">All Products</h1>
        <nav class="text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-red-500">Home</NuxtLink>
          <span class="mx-2">/</span>
          <span>Products</span>
        </nav>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Filters</h2>
            
            <!-- Categories -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Categories</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>Cooling Parts (250)</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>Engine Parts (180)</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>Hydraulic Systems (120)</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>Electrical (95)</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Price Range</h3>
              <div class="space-y-2">
                <input type="number" placeholder="Min" class="w-full border rounded px-3 py-2">
                <input type="number" placeholder="Max" class="w-full border rounded px-3 py-2">
              </div>
            </div>

            <!-- Brands -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Brands</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>OEM Parts</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>Aftermarket</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span>Premium</span>
                </label>
              </div>
            </div>

            <button class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Apply Filters
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Sort Bar -->
          <div class="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
            <p class="text-gray-600">Showing {{ products.length }} products</p>
            <select class="border rounded px-3 py-2">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
              <option>Name: Z to A</option>
            </select>
          </div>

          <!-- Products -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>

          <!-- Pagination -->
          <div class="mt-8 flex justify-center">
            <div class="flex gap-2">
              <button class="px-4 py-2 border rounded hover:bg-gray-100">Previous</button>
              <button class="px-4 py-2 bg-red-500 text-white rounded">1</button>
              <button class="px-4 py-2 border rounded hover:bg-gray-100">2</button>
              <button class="px-4 py-2 border rounded hover:bg-gray-100">3</button>
              <button class="px-4 py-2 border rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock products data - replace with API call
const products = ref([
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
  },
  {
    id: 5,
    name: 'Thermostat Housing',
    sku: 'TH-005',
    price: 89.99,
    image: '/images/placeholder.svg'
  },
  {
    id: 6,
    name: 'Expansion Tank',
    sku: 'ET-006',
    price: 129.99,
    image: '/images/placeholder.svg'
  },
  {
    id: 7,
    name: 'Cooling Hose Kit',
    sku: 'CH-007',
    price: 79.99,
    image: '/images/placeholder.svg'
  },
  {
    id: 8,
    name: 'Temperature Sensor',
    sku: 'TS-008',
    price: 49.99,
    image: '/images/placeholder.svg'
  },
  {
    id: 9,
    name: 'Radiator Cap',
    sku: 'RC-009',
    price: 19.99,
    image: '/images/placeholder.svg'
  }
])
</script>