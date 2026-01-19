const API_BASE_URL = 'https://tabbyscarvesapiv2.woofalert.com'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
  requiresAuth?: boolean
}

interface ApiError {
  message: string
  status: number
  detail?: string
}

export const useApi = () => {
  const getToken = (): string | null => {
    if (process.client) {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  const request = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const { method = 'GET', body, headers = {}, requiresAuth = false } = options

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    }

    const token = getToken()
    if (token && requiresAuth) {
      requestHeaders['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders
    }

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      let errorDetail = ''
      try {
        const errorData = await response.json()
        errorDetail = errorData.detail || errorData.message || ''
      } catch {
        errorDetail = response.statusText
      }

      const error: ApiError = {
        message: errorDetail || `Request failed with status ${response.status}`,
        status: response.status,
        detail: errorDetail
      }
      throw error
    }

    // Handle empty responses
    const text = await response.text()
    if (!text) {
      return {} as T
    }

    return JSON.parse(text) as T
  }

  // Convenience methods
  const get = <T>(endpoint: string, requiresAuth = false) =>
    request<T>(endpoint, { method: 'GET', requiresAuth })

  const post = <T>(endpoint: string, body: any, requiresAuth = false) =>
    request<T>(endpoint, { method: 'POST', body, requiresAuth })

  const put = <T>(endpoint: string, body: any, requiresAuth = false) =>
    request<T>(endpoint, { method: 'PUT', body, requiresAuth })

  const del = <T>(endpoint: string, requiresAuth = false) =>
    request<T>(endpoint, { method: 'DELETE', requiresAuth })

  return {
    request,
    get,
    post,
    put,
    del,
    getToken
  }
}

// Type definitions for API responses
export interface User {
  id: number
  email: string
  full_name: string
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  is_active: boolean
  is_admin: boolean
  created_at: string
}

export interface AuthToken {
  access_token: string
  token_type: string
  user: User
}

export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  category_id: number | null
  image_url: string | null
  is_active: boolean
  sku: string | null
  created_at: string
}

export interface Category {
  id: number
  name: string
  description: string | null
  created_at: string
}

export interface CartItem {
  id: number
  product_id: number
  quantity: number
  product?: Product
}

export interface Cart {
  id: number
  user_id: number
  items: CartItem[]
  created_at: string
}

export interface OrderItem {
  id: number
  product_id: number
  quantity: number
  price: number
  product?: Product
}

export interface Order {
  id: number
  user_id: number
  total_amount: number
  status: string
  shipping_address: string
  shipping_city: string
  shipping_state: string
  shipping_postal_code: string
  phone: string
  notes: string | null
  items: OrderItem[]
  created_at: string
}
