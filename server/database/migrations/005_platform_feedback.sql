CREATE TABLE platform_feedback (
  id uuid PRIMARY KEY,
  profile_id uuid REFERENCES question_profiles(id) ON DELETE SET NULL,
  kind text NOT NULL CHECK (kind IN ('bug', 'suggestion')),
  page text NOT NULL CHECK (page IN ('learn', 'questions', 'tasks', 'interviews', 'other')),
  request_hash text NOT NULL,
  payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX platform_feedback_profile_idx ON platform_feedback(profile_id);
CREATE INDEX platform_feedback_created_idx ON platform_feedback(created_at DESC, id);
