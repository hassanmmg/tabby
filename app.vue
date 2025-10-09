<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <CartSidebar />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// Load cart from localStorage on mount
onMounted(() => {
  const cartStore = useCartStore()
  cartStore.loadFromLocalStorage()
})
</script>
