export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  return {
    success: true,
    message: 'CHIP Payment Gateway Configuration',
    config: {
      brandIdConfigured: !!config.chipBrandId && config.chipBrandId !== 'your_brand_id_here',
      apiKeyConfigured: !!config.chipApiKey && config.chipApiKey !== 'your_api_key_here',
      sandboxMode: config.chipSandbox,
      apiUrl: config.chipSandbox
        ? 'https://gate.chip-in.asia/api/v1/purchases (SANDBOX)'
        : 'https://gate.chip-in.asia/api/v1/purchases (PRODUCTION)'
    },
    instructions: !config.chipBrandId || config.chipBrandId === 'your_brand_id_here' ? {
      message: 'Please configure your CHIP credentials',
      steps: [
        '1. Sign up for a CHIP merchant account at https://merchant.chip-in.asia/',
        '2. Get your Brand ID and API Key from the dashboard',
        '3. Update your .env file with:',
        '   CHIP_BRAND_ID=your_actual_brand_id',
        '   CHIP_API_KEY=your_actual_api_key',
        '   CHIP_SANDBOX=true (for testing)',
        '4. Restart the server'
      ]
    } : null
  }
})
