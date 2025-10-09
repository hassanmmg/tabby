export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const paymentId = getRouterParam(event, 'id')

  if (!paymentId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Payment ID is required'
    })
  }

  try {
    // Get payment status from CHIP
    const chipApiUrl = config.chipSandbox
      ? `https://api.chip-in.asia/v1/purchases/${paymentId}`
      : `https://api.chip-in.asia/v1/purchases/${paymentId}`

    const response = await $fetch(chipApiUrl, {
      headers: {
        'Authorization': `Bearer ${config.chipApiKey}`
      }
    })

    // Map CHIP status to our status
    let status = 'pending'
    if (response.status === 'paid' || response.status === 'success') {
      status = 'completed'
    } else if (response.status === 'failed' || response.status === 'cancelled') {
      status = 'failed'
    }

    return {
      success: true,
      paymentId: response.id,
      status: status,
      chipStatus: response.status,
      reference: response.reference,
      amount: response.purchase?.total || 0,
      data: response
    }

  } catch (error: any) {
    console.error('Error fetching payment status:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.message || 'Failed to get payment status'
    })
  }
})
