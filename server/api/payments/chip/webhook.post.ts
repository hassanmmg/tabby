export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const headers = getHeaders(event)

  console.log('CHIP webhook received:', {
    headers: headers,
    body: body
  })

  try {
    // Verify webhook signature (if provided by CHIP)
    // This is a placeholder - implement actual signature verification
    const signature = headers['x-chip-signature'] || headers['chip-signature']

    if (signature) {
      // TODO: Implement signature verification
      // const isValid = verifyChipSignature(body, signature, config.chipApiKey)
      // if (!isValid) {
      //   throw createError({
      //     statusCode: 401,
      //     statusMessage: 'Invalid webhook signature'
      //   })
      // }
    }

    // Extract webhook data
    const { event_type, data } = body

    console.log('Processing webhook event:', event_type)

    // Handle different webhook events
    switch (event_type) {
      case 'purchase.success':
      case 'purchase.paid':
        await handlePaymentSuccess(data)
        break

      case 'purchase.failed':
      case 'purchase.cancelled':
        await handlePaymentFailure(data)
        break

      case 'purchase.pending':
        await handlePaymentPending(data)
        break

      default:
        console.log('Unhandled webhook event:', event_type)
    }

    // Return success response
    return {
      success: true,
      message: 'Webhook processed successfully'
    }

  } catch (error: any) {
    console.error('CHIP webhook error:', error)

    // Return error but with 200 status to prevent retries
    return {
      success: false,
      error: error.message || 'Failed to process webhook'
    }
  }
})

async function handlePaymentSuccess(data: any) {
  console.log('Payment success:', data)

  // TODO: Update order and payment records in database
  // const supabase = useSupabaseClient()
  // await supabase
  //   .from('orders')
  //   .update({
  //     status: 'paid',
  //     payment_status: 'completed',
  //     payment_data: data,
  //     paid_at: new Date().toISOString()
  //   })
  //   .eq('id', data.reference)
}

async function handlePaymentFailure(data: any) {
  console.log('Payment failed:', data)

  // TODO: Update order status
  // const supabase = useSupabaseClient()
  // await supabase
  //   .from('orders')
  //   .update({
  //     status: 'cancelled',
  //     payment_status: 'failed',
  //     payment_data: data
  //   })
  //   .eq('id', data.reference)
}

async function handlePaymentPending(data: any) {
  console.log('Payment pending:', data)

  // TODO: Update payment status to pending
  // const supabase = useSupabaseClient()
  // await supabase
  //   .from('orders')
  //   .update({
  //     payment_status: 'pending',
  //     payment_data: data
  //   })
  //   .eq('id', data.reference)
}
