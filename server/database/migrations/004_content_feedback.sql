CREATE TABLE content_feedback (
  id uuid PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES question_profiles(id) ON DELETE CASCADE,
  content_key text NOT NULL CHECK (char_length(content_key) BETWEEN 1 AND 200),
  reason text NOT NULL CHECK (reason IN ('answer', 'condition', 'test', 'other')),
  details text NOT NULL CHECK (char_length(details) BETWEEN 5 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX content_feedback_profile_created_idx ON content_feedback(profile_id, created_at DESC);
