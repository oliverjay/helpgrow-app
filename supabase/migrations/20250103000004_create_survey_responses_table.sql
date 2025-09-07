-- Create survey responses table with flexible schema
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code TEXT NOT NULL, -- User UUID who shared the survey
  respondent_id UUID DEFAULT NULL, -- Optional: if respondent is logged in
  question_id TEXT NOT NULL,
  answer_type TEXT NOT NULL CHECK (answer_type IN ('text', 'number', 'boolean', 'multiple_choice', 'scale')),
  answer_text TEXT,
  answer_number INTEGER,
  answer_boolean BOOLEAN,
  response_session_id UUID NOT NULL, -- Groups all responses from one survey session
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Policies for survey responses
-- Users can view responses for surveys they created (their invite code)
CREATE POLICY "Users can view own survey responses" ON survey_responses 
  FOR SELECT USING (
    auth.uid()::text = invite_code OR 
    auth.uid() = respondent_id
  );

-- Anyone can insert survey responses (anonymous surveys)
CREATE POLICY "Anyone can submit survey responses" ON survey_responses 
  FOR INSERT WITH CHECK (true);

-- Users can only update their own responses if they're logged in
CREATE POLICY "Users can update own responses" ON survey_responses 
  FOR UPDATE USING (auth.uid() = respondent_id);

-- Indexes for performance
CREATE INDEX idx_survey_responses_invite_code ON survey_responses(invite_code);
CREATE INDEX idx_survey_responses_session_id ON survey_responses(response_session_id);
CREATE INDEX idx_survey_responses_created_at ON survey_responses(created_at);
CREATE INDEX idx_survey_responses_question_id ON survey_responses(question_id);

-- Function to get response count for a user
CREATE OR REPLACE FUNCTION get_user_response_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT response_session_id)
    FROM survey_responses 
    WHERE invite_code = user_uuid::text
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get latest responses for a user (for insights)
CREATE OR REPLACE FUNCTION get_user_survey_insights(user_uuid UUID, min_responses INTEGER DEFAULT 1)
RETURNS TABLE(
  total_responses INTEGER,
  can_view_results BOOLEAN,
  response_sessions UUID[]
) AS $$
DECLARE
  response_count INTEGER;
BEGIN
  SELECT get_user_response_count(user_uuid) INTO response_count;
  
  RETURN QUERY SELECT 
    response_count as total_responses,
    (response_count >= min_responses) as can_view_results,
    ARRAY(
      SELECT DISTINCT response_session_id 
      FROM survey_responses 
      WHERE invite_code = user_uuid::text 
      ORDER BY response_session_id
    ) as response_sessions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 