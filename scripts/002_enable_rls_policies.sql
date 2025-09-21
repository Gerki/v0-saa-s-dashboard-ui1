-- Enable Row Level Security (RLS) on all tables
-- This ensures users can only access their own data

-- Organizations RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "organizations_select_own" ON organizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "organizations_insert_own" ON organizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "organizations_update_own" ON organizations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "organizations_delete_own" ON organizations
  FOR DELETE USING (auth.uid() = user_id);

-- Personas RLS
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "personas_select_own" ON personas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "personas_insert_own" ON personas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "personas_update_own" ON personas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "personas_delete_own" ON personas
  FOR DELETE USING (auth.uid() = user_id);

-- Industries RLS
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "industries_select_own" ON industries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "industries_insert_own" ON industries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "industries_update_own" ON industries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "industries_delete_own" ON industries
  FOR DELETE USING (auth.uid() = user_id);

-- Processes RLS
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "processes_select_own" ON processes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "processes_insert_own" ON processes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "processes_update_own" ON processes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "processes_delete_own" ON processes
  FOR DELETE USING (auth.uid() = user_id);

-- Files RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "files_select_own" ON files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "files_insert_own" ON files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "files_update_own" ON files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "files_delete_own" ON files
  FOR DELETE USING (auth.uid() = user_id);

-- Chat messages RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_messages_select_own" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "chat_messages_insert_own" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "chat_messages_update_own" ON chat_messages
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "chat_messages_delete_own" ON chat_messages
  FOR DELETE USING (auth.uid() = user_id);

-- Authorization workflows RLS
ALTER TABLE authorization_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authorization_workflows_select_own" ON authorization_workflows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "authorization_workflows_insert_own" ON authorization_workflows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "authorization_workflows_update_own" ON authorization_workflows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "authorization_workflows_delete_own" ON authorization_workflows
  FOR DELETE USING (auth.uid() = user_id);

-- Inventory items RLS
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inventory_items_select_own" ON inventory_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "inventory_items_insert_own" ON inventory_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "inventory_items_update_own" ON inventory_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "inventory_items_delete_own" ON inventory_items
  FOR DELETE USING (auth.uid() = user_id);

-- GPS locations RLS
ALTER TABLE gps_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gps_locations_select_own" ON gps_locations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "gps_locations_insert_own" ON gps_locations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "gps_locations_update_own" ON gps_locations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "gps_locations_delete_own" ON gps_locations
  FOR DELETE USING (auth.uid() = user_id);

-- Evidence records RLS
ALTER TABLE evidence_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "evidence_records_select_own" ON evidence_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "evidence_records_insert_own" ON evidence_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "evidence_records_update_own" ON evidence_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "evidence_records_delete_own" ON evidence_records
  FOR DELETE USING (auth.uid() = user_id);
