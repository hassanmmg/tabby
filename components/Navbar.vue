<template>
  <nav
    :class="[
      'z-40 transition-all duration-300',
      navClass
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" :class="['font-heading text-xl md:text-2xl tracking-widest hover:opacity-90 transition-opacity', textClass]">
          Tabby
        </NuxtLink>

        
        <!-- Right side - Cart -->
        <div class="flex items-center gap-5">
          <!-- Cart Icon -->
          <button
            @click="cartStore.toggleCart()"
            class="relative p-1 hover:opacity-70 transition-opacity"
          >
            <svg :class="['w-5 h-5', iconClass]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span
              v-if="cartStore.itemCount > 0"
              :class="[
                'absolute -top-1 -right-1 h-4 w-4 text-[9px] flex items-center justify-center font-medium rounded-full',
                isScrolled || variant === 'solid' ? 'bg-[#ea580c] text-white' : 'bg-white text-[#ea580c]'
              ]"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  variant?: 'transparent' | 'solid'
}>()

const cartStore = useCartStore()
const isScrolled = ref(false)

const navClass = computed(() => {
  if (props.variant === 'solid') {
    return 'sticky top-0 bg-white border-b border-cream-300 shadow-sm'
  }
  // Transparent variant
  if (isScrolled.value) {
    return 'fixed top-0 left-0 right-0 bg-cream-100 border-b border-cream-300 shadow-sm'
  }
  return 'absolute top-0 left-0 right-0 bg-transparent'
})

const textClass = computed(() => {
  if (props.variant === 'solid') return 'text-black'
  return isScrolled.value ? 'text-black' : 'text-white'
})

const linkClass = computed(() => {
  if (props.variant === 'solid') return 'text-black/80 hover:text-black'
  return isScrolled.value ? 'text-black/80 hover:text-black' : 'text-white/90 hover:text-white'
})

const iconClass = computed(() => {
  if (props.variant === 'solid') return 'text-black'
  return isScrolled.value ? 'text-black' : 'text-white'
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
