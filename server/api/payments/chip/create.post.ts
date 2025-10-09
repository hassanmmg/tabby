export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validate required fields
  if (!body.orderId || !body.amount || !body.customerInfo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Check if CHIP credentials are configured
  if (!config.chipBrandId || config.chipBrandId === 'your_brand_id_here' ||
      !config.chipApiKey || config.chipApiKey === 'your_api_key_here') {

    console.log('CHIP credentials not configured, using mock payment flow')

    // Return mock payment session for testing
    return {
      success: true,
      paymentId: 'mock_payment_' + Date.now(),
      checkoutUrl: `/checkout/success?order_id=${body.orderId}&amount=${body.amount}&mock=true`,
      reference: body.orderId,
      mockMode: true,
      message: 'Using mock payment flow. Configure CHIP credentials for real payments.'
    }
  }

  try {
    // Prepare CHIP API request
    const chipApiUrl = config.chipSandbox
      ? 'https://gate.chip-in.asia/api/v1/purchases/'
      : 'https://gate.chip-in.asia/api/v1/purchases/'

    // Format customer phone (ensure Malaysian format)
    let phoneNumber = body.customerInfo.phone || ''
    if (phoneNumber && !phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.replace(/^0/, '') // Remove leading 0
      phoneNumber = `+60${phoneNumber}` // Add Malaysian country code
    }

    // Determine redirect URLs
    const origin = getHeader(event, 'origin') || 'http://localhost:3000'
    // For production, ensure we use the correct domain
    const baseUrl = origin.includes('localhost') ? origin : 'https://shop-teknopuri.vercel.app'
    const successUrl = `${baseUrl}/checkout/success?order_id=${body.orderId}&amount=${body.amount}`
    const failureUrl = `${baseUrl}/checkout/failure?order_id=${body.orderId}`
    const callbackUrl = `${baseUrl}/api/payments/chip/callback`

    // Create CHIP payment request
    const chipPayload = {
      brand_id: config.chipBrandId,
      client: {
        email: body.customerInfo.email,
        phone: phoneNumber,
        full_name: body.customerInfo.name || `${body.customerInfo.firstName} ${body.customerInfo.lastName}`.trim()
      },
      purchase: {
        products: [{
          name: `Order #${body.orderId}`,
          price: Math.round(body.amount * 100), // Convert to cents
          quantity: 1
        }],
        currency: body.currency || 'MYR'
      },
      redirect_url: successUrl,
      callback_url: callbackUrl,
      cancel_url: failureUrl,
      reference: body.orderId
    }

    console.log('Creating CHIP payment:', {
      orderId: body.orderId,
      amount: body.amount,
      brandId: config.chipBrandId,
      url: chipApiUrl
    })

    console.log('CHIP request payload:', JSON.stringify(chipPayload, null, 2))

    // Make request to CHIP API
    const response = await $fetch(chipApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.chipApiKey}`,
        'Content-Type': 'application/json'
      },
      body: chipPayload
    })

    console.log('CHIP payment created successfully:', response.id)

    // Return payment details
    return {
      success: true,
      paymentId: response.id,
      checkoutUrl: response.checkout_url,
      reference: body.orderId,
      chipData: response
    }

  } catch (error: any) {
    console.error('CHIP payment creation error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.message || 'Failed to create payment session'
    })
  }
})
