import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey // Use service key for server-side operations
  )
  
  try {
    let queryBuilder = supabase
      .from('products')
      .select('*')
    
    // Apply filters based on query parameters
    if (query.category) {
      queryBuilder = queryBuilder.eq('category', query.category)
    }
    
    if (query.search) {
      queryBuilder = queryBuilder.or(
        `name.ilike.%${query.search}%,description.ilike.%${query.search}%,sku.ilike.%${query.search}%`
      )
    }
    
    if (query.limit) {
      queryBuilder = queryBuilder.limit(parseInt(query.limit as string))
    }
    
    if (query.offset) {
      queryBuilder = queryBuilder.range(
        parseInt(query.offset as string),
        parseInt(query.offset as string) + (parseInt(query.limit as string) || 10) - 1
      )
    }
    
    const { data, error } = await queryBuilder
    
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      })
    }
    
    return data
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error'
    })
  }
})