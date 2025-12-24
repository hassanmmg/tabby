<template>
  <div class="relative w-full">
    <!-- Hero Carousel -->
    <div class="relative h-screen max-h-[800px] min-h-[500px] bg-cream-200">
      <!-- Slides -->
      <div class="relative h-full w-full overflow-hidden">
        <!-- Slide 1 -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-opacity duration-700"
          :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <!-- Content - Bottom Left -->
          <div class="absolute bottom-12 md:bottom-16 lg:bottom-20 left-6 md:left-12 lg:left-20 max-w-xl">
            <p class="text-white text-sm md:text-base tracking-wide mb-3">{{ slide.subtitle }}</p>
            <h1 class="font-heading text-3xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight font-medium">
              {{ slide.title }}
            </h1>
            <p class="text-white/90 text-base md:text-xl italic mb-8">
              {{ slide.description }}
            </p>
            <NuxtLink
              to="/"
              class="inline-block text-white text-base font-medium hover:opacity-70 transition-opacity"
            >
              Shop Now
              <div class="w-16 h-0.5 bg-white mt-2"></div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows - Bottom Right -->
      <div class="absolute bottom-16 md:bottom-24 right-6 md:right-12 lg:right-16 flex gap-3 z-20">
        <button
          @click="prevSlide"
          class="w-12 h-12 rounded-full bg-[#ea580c] flex items-center justify-center hover:bg-[#c2410c] transition-colors"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="w-12 h-12 rounded-full bg-white border border-[#ea580c] flex items-center justify-center hover:bg-cream-100 transition-colors"
        >
          <svg class="w-5 h-5 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    image: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Ilya-_-WF-Basic-Desktop.jpg?v=1758094600&width=3600',
    subtitle: 'Premium',
    title: 'Inaya Nara',
    description: 'Pure elegance for every occasion.'
  },
  {
    image: 'https://tudungpeople.com/cdn/shop/files/TudungPeople-Signature-Signatures-Slider-desktop.jpg?v=1762932395&width=3600',
    subtitle: 'Signature',
    title: 'Athleisure',
    description: 'Timeless sophistication redefined.'
  }
]

const currentSlide = ref(0)
const totalSlides = slides.length
let autoplayInterval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

const handleImageError = (e: Event) => {
  console.error('Image failed to load')
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>
