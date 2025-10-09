import { defineStore } from 'pinia'

interface CartItem {
  id: string
  title: string
  price: number
  weight?: string
  stock_status?: string
  image_url?: string
  url?: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),

    subtotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    }
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          price: Number(product.price) || 0,
          quantity: 1
        })
      }

      this.saveToLocalStorage()
    },

    removeFromCart(id: string) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    updateQuantity(id: string, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(id)
        } else {
          item.quantity = quantity
          this.saveToLocalStorage()
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
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
            console.error('Failed to load cart from localStorage:', e)
          }
        }
      }
    }
  }
})