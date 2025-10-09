import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  return {
    supabase,
    
    // Products methods
    async getProducts(limit = 50) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(limit)
      
      if (error) throw error
      return data
    },
    
    async getProduct(id: string) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    },
    
    async getProductsByCategory(category: string) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
      
      if (error) throw error
      return data
    },
    
    async searchProducts(query: string) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,sku.ilike.%${query}%`)
      
      if (error) throw error
      return data
    },
    
    // Orders methods
    async createOrder(orderData: any) {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    
    async getOrder(orderNumber: string) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('order_number', orderNumber)
        .single()
      
      if (error) throw error
      return data
    },
    
    // Categories methods
    async getCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data
    },
    
    // Auth methods
    async signUp(email: string, password: string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (error) throw error
      return data
    },
    
    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return data
    },
    
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    
    async getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    },
    
    // Storage methods
    getPublicUrl(bucket: string, path: string) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      return data.publicUrl
    }
  }
}