-- Sample data for testing the Digital Asset Management system
-- This will only insert data if tables are empty

-- Insert sample industries (only if table is empty)
INSERT INTO industries (name, description, icon, user_id)
SELECT 'Technology', 'Software and hardware companies', 'laptop', auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM industries WHERE name = 'Technology' AND user_id = auth.uid());

INSERT INTO industries (name, description, icon, user_id)
SELECT 'Healthcare', 'Medical and pharmaceutical companies', 'heart', auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM industries WHERE name = 'Healthcare' AND user_id = auth.uid());

INSERT INTO industries (name, description, icon, user_id)
SELECT 'Finance', 'Banking and financial services', 'dollar-sign', auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM industries WHERE name = 'Finance' AND user_id = auth.uid());

INSERT INTO industries (name, description, icon, user_id)
SELECT 'Retail', 'Consumer goods and services', 'shopping-bag', auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM industries WHERE name = 'Retail' AND user_id = auth.uid());

-- Insert sample GPS locations
INSERT INTO gps_locations (name, latitude, longitude, address, description, type, user_id)
SELECT 'Main Office', 40.7128, -74.0060, '123 Business Ave, New York, NY', 'Primary business location', 'office', auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM gps_locations WHERE name = 'Main Office' AND user_id = auth.uid());

INSERT INTO gps_locations (name, latitude, longitude, address, description, type, user_id)
SELECT 'Warehouse', 40.6892, -74.0445, '456 Storage St, Brooklyn, NY', 'Main storage facility', 'warehouse', auth.uid()
WHERE NOT EXISTS (SELECT 1 FROM gps_locations WHERE name = 'Warehouse' AND user_id = auth.uid());
