import { defineStore } from 'pinia'

interface CartItem {
  id: string
  name: string
  sku: string
  price: number
  image?: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    total: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },

  actions: {
    addItem(item: CartItem) {
      const existingItem = this.items.find(i => i.id === item.id)
      
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }
      
      // Save to localStorage
      this.saveToLocalStorage()
    },

    removeItem(id: string) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    incrementQuantity(id: string) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        item.quantity++
        this.saveToLocalStorage()
      }
    },

    decrementQuantity(id: string) {
      const item = this.items.find(i => i.id === id)
      if (item && item.quantity > 1) {
        item.quantity--
        this.saveToLocalStorage()
      }
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Error loading cart from localStorage:', e)
          }
        }
      }
    }
  }
})