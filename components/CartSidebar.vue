<template>
  <TransitionRoot :show="cartStore.isOpen" as="template">
    <Dialog @close="cartStore.closeCart" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="cartStore.closeCart"
                        >
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul v-if="cartStore.items.length > 0" role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="item in cartStore.items" :key="item.id" class="flex py-6">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
                              <img
                                v-if="item.image_url"
                                :src="item.image_url"
                                :alt="item.title"
                                class="h-full w-full object-cover object-center"
                                @error="handleImageError"
                              />
                              <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
                                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{{ item.title }}</h3>
                                  <p class="ml-4">MYR {{ Number(item.price || 0).toFixed(2) }}</p>
                                </div>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <div class="flex items-center">
                                  <button
                                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                                    class="px-2 py-1 border hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span class="mx-2 w-8 text-center">{{ item.quantity }}</span>
                                  <button
                                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                                    class="px-2 py-1 border hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>

                                <div class="flex">
                                  <button
                                    type="button"
                                    @click="cartStore.removeFromCart(item.id)"
                                    class="font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div v-else class="text-center py-12">
                          <p class="text-gray-500">Your cart is empty</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="cartStore.items.length > 0" class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>MYR {{ Number(cartStore.subtotal || 0).toFixed(2) }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div class="mt-6">
                      <NuxtLink
                        to="/checkout"
                        @click="cartStore.closeCart"
                        class="flex items-center justify-center border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                      >
                        Checkout
                      </NuxtLink>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          class="font-medium text-blue-600 hover:text-blue-500"
                          @click="cartStore.closeCart"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// Handle image load errors
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}
</script>