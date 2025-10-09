import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey
  )
  
  try {
    // Validate required fields
    if (!body.customer_email || !body.items || body.items.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase()
    
    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity)
    }, 0)
    
    const shipping = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax
    
    // Create order
    const orderData = {
      order_number: orderNumber,
      customer_email: body.customer_email,
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      shipping_address: body.shipping_address,
      billing_address: body.billing_address || body.shipping_address,
      payment_method: body.payment_method,
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending',
      created_at: new Date().toISOString()
    }
    
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()
    
    if (orderError) {
      throw createError({
        statusCode: 500,
        statusMessage: orderError.message
      })
    }
    
    // Create order items
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.name,
      product_sku: item.sku,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }))
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
    
    if (itemsError) {
      // Rollback order if items fail
      await supabase
        .from('orders')
        .delete()
        .eq('id', order.id)
      
      throw createError({
        statusCode: 500,
        statusMessage: itemsError.message
      })
    }
    
    // Return the complete order
    return {
      ...order,
      items: orderItems
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create order'
    })
  }
})