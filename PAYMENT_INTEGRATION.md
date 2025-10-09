# CHIP Payment Gateway Integration

This e-commerce application now supports **CHIP Payment Gateway** for secure online payments including chip/EMV card payments, online banking, and e-wallets.

## Features

✅ **Secure Card Payments** - Accept all major credit/debit cards including chip (EMV) cards
✅ **Multiple Payment Methods** - CHIP, Bank Transfer, Cash on Delivery
✅ **Real-time Payment Status** - Webhook integration for instant payment updates
✅ **Malaysian Market Optimized** - Supports Malaysian phone numbers and currency (MYR)
✅ **Sandbox Testing** - Test payments without real transactions
✅ **Comprehensive Error Handling** - Graceful failure recovery and retry mechanisms

## Setup Instructions

### 1. Get CHIP Merchant Account

1. Sign up for a CHIP merchant account at [https://merchant.chip-in.asia/](https://merchant.chip-in.asia/)
2. Complete the merchant verification process
3. Access your dashboard to get your credentials

### 2. Configure Environment Variables

Update your `.env` file with your CHIP credentials:

```env
# CHIP Payment Gateway Configuration
CHIP_BRAND_ID=your_actual_brand_id_here
CHIP_API_KEY=your_actual_api_key_here
CHIP_SANDBOX=true  # Set to false for production
```

### 3. Test the Configuration

Visit: http://localhost:3000/api/payments/chip/test

You should see:
```json
{
  "success": true,
  "config": {
    "brandIdConfigured": true,
    "apiKeyConfigured": true,
    "sandboxMode": true
  }
}
```

## Payment Flow

### Customer Journey

1. **Add to Cart** → Customer adds products to cart
2. **Checkout** → Fill in shipping information
3. **Payment Method** → Select CHIP payment gateway
4. **Complete Order** → Order is created and redirected to CHIP
5. **CHIP Payment** → Customer completes payment on CHIP's secure page
6. **Return to Site** → Redirected back to success/failure page
7. **Order Confirmation** → Order status updated and confirmation shown

### Technical Flow

```
Customer Checkout
    ↓
Create Order
    ↓
Payment Method Selection
    ├─ CHIP → Create Payment Session → Redirect to CHIP → Customer Pays → Success/Failure
    ├─ Bank Transfer → Show Bank Details → Complete Order
    └─ COD → Complete Order Immediately
```

## API Endpoints

### Payment Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/payments/chip/create` | POST | Create new payment session |
| `/api/payments/chip/callback` | POST | Handle payment callbacks |
| `/api/payments/chip/webhook` | POST | Process webhook notifications |
| `/api/payments/chip/[id]` | GET | Get payment status |
| `/api/payments/chip/test` | GET | Test configuration |

### Request/Response Examples

#### Create Payment Session
```javascript
POST /api/payments/chip/create
{
  "orderId": "ORD-123456",
  "amount": 299.90,
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0123456789"
  },
  "currency": "MYR"
}

Response:
{
  "success": true,
  "paymentId": "pay_xxxxx",
  "checkoutUrl": "https://gate.chip-in.asia/purchases/pay_xxxxx",
  "reference": "ORD-123456"
}
```

## Testing in Sandbox Mode

When `CHIP_SANDBOX=true`, you can use test cards:

### Test Card Numbers
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **3D Secure**: 4000 0000 0000 3055

### Test Scenarios
1. Successful payment flow
2. Failed payment with retry
3. Cancelled payment
4. Webhook verification

## Security Considerations

1. **API Keys** - Never commit API keys to git
2. **HTTPS Only** - Always use HTTPS in production
3. **Webhook Validation** - Implement signature verification
4. **Rate Limiting** - Implement rate limiting on payment endpoints
5. **Input Validation** - Validate all customer inputs
6. **Error Messages** - Don't expose sensitive information

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid API Key" | Check CHIP_API_KEY in .env |
| "Brand ID not found" | Verify CHIP_BRAND_ID |
| Payment not redirecting | Check redirect URLs configuration |
| Webhook not received | Verify callback URL is accessible |
| Phone number error | Ensure Malaysian format (+60) |

### Debug Mode

Enable debug logging:
```javascript
// In server/api/payments/chip/create.post.ts
console.log('CHIP Request:', chipPayload)
console.log('CHIP Response:', response)
```

## Production Checklist

Before going live:

- [ ] Set `CHIP_SANDBOX=false` in production
- [ ] Use production API credentials
- [ ] Implement webhook signature verification
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure proper redirect URLs
- [ ] Test all payment scenarios
- [ ] Set up error monitoring
- [ ] Configure email notifications
- [ ] Implement order status tracking
- [ ] Set up database backups

## Support

### CHIP Support
- Documentation: https://docs.chip-in.asia/
- Merchant Dashboard: https://merchant.chip-in.asia/
- Support Email: support@chip-in.asia

### Application Support
- Check `/api/payments/chip/test` for configuration status
- Review server logs for detailed error messages
- Test with sandbox mode before production

## Additional Payment Methods

The system also supports:
- **Bank Transfer** - Manual bank transfer with order reservation
- **Cash on Delivery** - Pay when order is delivered

These can be enabled/disabled in the checkout form.

## Future Enhancements

- [ ] Save customer payment methods
- [ ] Recurring payments/subscriptions
- [ ] Multiple currency support
- [ ] Payment installments
- [ ] Invoice generation
- [ ] Refund processing
- [ ] Payment analytics dashboard
- [ ] Integration with Supabase database for order management
