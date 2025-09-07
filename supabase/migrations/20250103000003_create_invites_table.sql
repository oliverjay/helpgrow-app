-- Create invites table to track invite links
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
  used_count INTEGER DEFAULT 0,
  max_uses INTEGER DEFAULT NULL, -- NULL means unlimited uses
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable RLS
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own invites" 
  ON invites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own invites" 
  ON invites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invites" 
  ON invites FOR UPDATE 
  USING (auth.uid() = user_id);

-- Allow public read access to active invites for validation
CREATE POLICY "Public can view active invites" 
  ON invites FOR SELECT 
  USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Index for faster lookups
CREATE INDEX idx_invites_code ON invites(invite_code);
CREATE INDEX idx_invites_user_id ON invites(user_id);
CREATE INDEX idx_invites_active ON invites(is_active, expires_at);

-- Function to generate unique invite codes
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 8-character alphanumeric code
    code := substr(md5(random()::text), 1, 8);
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM invites WHERE invite_code = code) INTO exists_check;
    
    -- If code doesn't exist, return it
    IF NOT exists_check THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create or get existing invite for a user
CREATE OR REPLACE FUNCTION get_or_create_user_invite(user_uuid UUID)
RETURNS TABLE(invite_code TEXT, created_at TIMESTAMP WITH TIME ZONE) AS $$
DECLARE
  existing_invite RECORD;
  new_code TEXT;
BEGIN
  -- Check for existing active invite
  SELECT i.invite_code, i.created_at INTO existing_invite
  FROM invites i
  WHERE i.user_id = user_uuid 
    AND i.is_active = true 
    AND (i.expires_at IS NULL OR i.expires_at > NOW())
  LIMIT 1;
  
  -- If invite exists, return it
  IF existing_invite.invite_code IS NOT NULL THEN
    RETURN QUERY SELECT existing_invite.invite_code, existing_invite.created_at;
    RETURN;
  END IF;
  
  -- Generate new invite code
  new_code := generate_invite_code();
  
  -- Create new invite
  INSERT INTO invites (user_id, invite_code)
  VALUES (user_uuid, new_code);
  
  -- Return the new invite
  RETURN QUERY 
  SELECT new_code, NOW()::TIMESTAMP WITH TIME ZONE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 