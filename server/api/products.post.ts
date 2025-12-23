import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey
  )

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        title: body.title,
        description: body.description,
        price: body.price,
        image_url: body.image_url,
        category: body.category,
        brand: body.brand,
        part_no: body.part_no,
        stock_status: body.stock_status || 'in_stock'
      }])
      .select()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      })
    }

    return { success: true, product: data[0] }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error'
    })
  }
})
