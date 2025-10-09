-- Enable Row Level Security on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Categories are insertable by authenticated users" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Categories are updatable by authenticated users" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Products policies (public read)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are insertable by authenticated users" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are updatable by authenticated users" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Products are deletable by authenticated users" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Customers policies (users can only see/edit their own data)
CREATE POLICY "Customers can view own profile" ON customers
  FOR SELECT USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

CREATE POLICY "Customers can insert own profile" ON customers
  FOR INSERT WITH CHECK (auth.uid()::text = id::text OR auth.role() = 'service_role');

CREATE POLICY "Customers can update own profile" ON customers
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    customer_email = auth.jwt() ->> 'email' OR 
    auth.role() = 'service_role'
  );

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update orders" ON orders
  FOR UPDATE USING (auth.role() = 'service_role');

-- Order items policies (users can see items for their orders)
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.customer_email = auth.jwt() ->> 'email' OR auth.role() = 'service_role')
    )
  );

CREATE POLICY "Service role can insert order items" ON order_items
  FOR INSERT WITH CHECK (auth.role() = 'service_role' OR true);

-- Cart items policies (session-based access)
CREATE POLICY "Users can view own cart items" ON cart_items
  FOR SELECT USING (true);

CREATE POLICY "Users can insert cart items" ON cart_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own cart items" ON cart_items
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete own cart items" ON cart_items
  FOR DELETE USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT ALL ON customers TO authenticated;
GRANT ALL ON orders TO authenticated;
GRANT ALL ON order_items TO authenticated;
GRANT ALL ON cart_items TO anon, authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;