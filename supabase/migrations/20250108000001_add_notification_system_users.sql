-- Add notification preferences to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{
  "email_notifications": true,
  "sms_notifications": false,
  "milestone_notifications": true
}'::jsonb;

-- Add phone column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create notification_logs table to track sent notifications
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('milestone_1', 'milestone_2', 'milestone_3')),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'delivered')),
  response_count INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own notification logs" 
  ON notification_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notification_logs_user_id ON notification_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_type ON notification_logs(notification_type);
CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);
CREATE INDEX IF NOT EXISTS idx_notification_logs_created_at ON notification_logs(created_at);

-- Function to get unique response count for a user
CREATE OR REPLACE FUNCTION get_user_response_count_with_details(user_uuid UUID)
RETURNS TABLE(
  total_responses INTEGER,
  unique_sessions TEXT[],
  latest_response_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT sr.response_session_id)::INTEGER as total_responses,
    ARRAY_AGG(DISTINCT sr.response_session_id::TEXT) as unique_sessions,
    MAX(sr.created_at) as latest_response_at
  FROM survey_responses sr
  WHERE sr.invite_code = user_uuid::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if milestone notification should be sent
CREATE OR REPLACE FUNCTION should_send_milestone_notification(
  user_uuid UUID, 
  milestone_number INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  notification_type TEXT;
  already_sent BOOLEAN;
  user_preferences JSONB;
BEGIN
  -- Determine notification type
  notification_type := 'milestone_' || milestone_number;
  
  -- Check user preferences from users table
  SELECT u.notification_preferences INTO user_preferences
  FROM users u
  WHERE u.id = user_uuid;
  
  -- Return false if user has disabled milestone notifications
  IF NOT COALESCE((user_preferences->>'milestone_notifications')::BOOLEAN, true) THEN
    RETURN FALSE;
  END IF;
  
  -- Check if notification already sent for this milestone
  SELECT EXISTS(
    SELECT 1 FROM notification_logs nl
    WHERE nl.user_id = user_uuid 
    AND nl.notification_type = notification_type
    AND nl.status IN ('sent', 'delivered')
  ) INTO already_sent;
  
  RETURN NOT already_sent;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log milestone notification
CREATE OR REPLACE FUNCTION log_milestone_notification(
  user_uuid UUID,
  milestone_number INTEGER,
  response_count INTEGER,
  notification_channel TEXT DEFAULT 'email',
  notification_metadata JSONB DEFAULT '{}'::jsonb
) RETURNS UUID AS $$
DECLARE
  notification_id UUID;
  notification_type TEXT;
BEGIN
  notification_type := 'milestone_' || milestone_number;
  
  INSERT INTO notification_logs (
    user_id,
    notification_type,
    channel,
    response_count,
    metadata,
    status
  ) VALUES (
    user_uuid,
    notification_type,
    notification_channel,
    response_count,
    notification_metadata,
    'pending'
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update notification status
CREATE OR REPLACE FUNCTION update_notification_status(
  notification_id UUID,
  new_status TEXT,
  delivered_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  UPDATE notification_logs 
  SET 
    status = new_status,
    sent_at = CASE WHEN new_status = 'sent' THEN NOW() ELSE sent_at END,
    delivered_at = COALESCE(delivered_timestamp, CASE WHEN new_status = 'delivered' THEN NOW() ELSE delivered_at END)
  WHERE id = notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 