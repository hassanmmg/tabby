export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('CHIP callback received:', body)

  try {
    // Extract payment details from callback
    const { id, reference, status, transaction_data } = body

    if (!id || !reference || !status) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid callback data'
      })
    }

    // Map CHIP status to internal status
    let orderStatus = 'pending'
    let paymentStatus = status

    switch (status.toLowerCase()) {
      case 'success':
      case 'paid':
        orderStatus = 'paid'
        paymentStatus = 'completed'
        break
      case 'failed':
      case 'cancelled':
        orderStatus = 'cancelled'
        paymentStatus = 'failed'
        break
      default:
        orderStatus = 'pending'
        paymentStatus = 'pending'
    }

    // Here you would update your database
    // For now, we'll just log the status
    console.log('Payment status update:', {
      orderId: reference,
      paymentId: id,
      status: paymentStatus,
      orderStatus: orderStatus
    })

    // TODO: Update order status in Supabase
    // const supabase = useSupabaseClient()
    // await supabase
    //   .from('orders')
    //   .update({
    //     status: orderStatus,
    //     payment_status: paymentStatus,
    //     payment_id: id,
    //     updated_at: new Date().toISOString()
    //   })
    //   .eq('id', reference)

    return {
      success: true,
      message: 'Callback processed successfully'
    }

  } catch (error: any) {
    console.error('CHIP callback error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to process callback'
    })
  }
})
