import { defineStore } from 'pinia'
import { useApi, type User, type AuthToken } from '~/composables/useApi'

interface AuthState {
  token: string | null
  user: User | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.is_admin ?? false
  },

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      const api = useApi()
      this.loading = true

      console.log('=== AUTH STORE LOGIN ===')
      console.log('Calling API: POST /api/auth/admin/login')
      console.log('Payload:', { email, password: '***' })

      try {
        const response = await api.post<AuthToken>('/api/auth/admin/login', {
          email,
          password
        })

        console.log('API Response:', response)

        this.token = response.access_token
        this.user = response.user

        // Persist token and user data
        if (process.client) {
          localStorage.setItem('auth_token', response.access_token)
          localStorage.setItem('auth_user', JSON.stringify(response.user))
        }

        return true
      } catch (error: any) {
        console.error('Login API failed:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    logout(): void {
      this.token = null
      this.user = null

      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    },

    // Initialize auth state from localStorage
    initAuth(): void {
      if (process.client) {
        const token = localStorage.getItem('auth_token')
        const userStr = localStorage.getItem('auth_user')
        if (token && userStr) {
          this.token = token
          try {
            this.user = JSON.parse(userStr)
          } catch {
            // Invalid user data, clear everything
            this.logout()
          }
        }
      }
    }
  }
})
