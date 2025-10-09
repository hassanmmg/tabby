# Teknopuri E-Shop Setup Guide

## Project Structure

The project has been restructured to match a modern e-commerce application with the following architecture:

### Frontend Structure
- **Components**: Reusable Vue components (AppHeader, AppFooter, CartSidebar, ProductCard)
- **Pages**: Nuxt pages for routing (checkout, products, orders)
- **Stores**: Pinia stores for state management (cart store)
- **Composables**: Reusable composition functions (Supabase integration)
- **Layouts**: Application layouts with header/footer

### Backend Structure
- **Server API**: Nitro server API endpoints for products and orders
- **Middleware**: CORS and other server middleware
- **Database**: Supabase PostgreSQL database with RLS policies

## Setup Instructions

### 1. Environment Configuration

Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

### 2. Supabase Setup

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Get your project URL and keys from the project settings
3. Update your `.env` file with:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anonymous key
   - `SUPABASE_SERVICE_KEY`: Your service role key

### 3. Database Setup

Run the SQL scripts in the `supabase` folder in order:

1. **Create Tables**: Run `01_create_tables.sql` in Supabase SQL editor
2. **RLS Policies**: Run `02_rls_policies.sql` to set up security

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Key Features Implemented

### Frontend Features
- ✅ Product listing and detail pages
- ✅ Shopping cart with persistent storage
- ✅ Checkout process
- ✅ Order success/failure pages
- ✅ Responsive design with Tailwind CSS
- ✅ Cart sidebar with real-time updates

### Backend Features
- ✅ Product API endpoints
- ✅ Order creation API
- ✅ Database schema with relationships
- ✅ Row Level Security (RLS) policies
- ✅ CORS middleware

### Database Schema
- **products**: Product catalog with SKU, pricing, inventory
- **categories**: Product categories
- **orders**: Customer orders with status tracking
- **order_items**: Individual items in orders
- **customers**: Customer information
- **cart_items**: Persistent shopping cart

## Next Steps

1. **Add Sample Data**: Create sample products in your Supabase database
2. **Payment Integration**: Add Stripe or other payment gateway
3. **Email Notifications**: Set up order confirmation emails
4. **Admin Panel**: Create admin interface for managing products/orders
5. **Search & Filters**: Implement advanced product search
6. **User Authentication**: Add customer login/registration

## API Endpoints

- `GET /api/products`: Get all products (with filters)
- `POST /api/orders`: Create new order
- More endpoints can be added in `/server/api/`

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**: Check your environment variables
2. **Build Errors**: Run `npm run clean` then `npm install`
3. **Cart Not Persisting**: Check localStorage permissions

### Support

For issues or questions, please check:
- Nuxt documentation: https://nuxt.com
- Supabase documentation: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com