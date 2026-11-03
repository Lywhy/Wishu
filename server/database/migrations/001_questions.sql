CREATE TABLE question_groups (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE question_sections (
  id text PRIMARY KEY,
  group_id text NOT NULL REFERENCES question_groups(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  module_id text NOT NULL,
  mark text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);
CREATE INDEX question_sections_group_order_idx ON question_sections(group_id, sort_order, id);

CREATE TABLE question_subsections (
  section_id text NOT NULL REFERENCES question_sections(id) ON DELETE CASCADE,
  id text NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (section_id, id)
);

CREATE TABLE questions (
  id text PRIMARY KEY,
  section_id text NOT NULL,
  subsection_id text NOT NULL,
  title text NOT NULL,
  topic text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Базовый', 'Средний', 'Продвинутый')),
  summary text NOT NULL,
  answer jsonb NOT NULL CHECK (jsonb_typeof(answer) = 'array'),
  code text,
  takeaway text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  FOREIGN KEY (section_id, subsection_id) REFERENCES question_subsections(section_id, id) ON DELETE CASCADE
);
CREATE INDEX questions_subsection_order_idx ON questions(section_id, subsection_id, sort_order, id);

CREATE TABLE question_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL UNIQUE,
  auto_reveal_answers boolean NOT NULL DEFAULT false,
  imported_at timestamptz,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX question_profiles_expires_idx ON question_profiles(expires_at);

CREATE TABLE question_progress (
  profile_id uuid NOT NULL REFERENCES question_profiles(id) ON DELETE CASCADE,
  question_id text NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  status text CHECK (status IN ('repeat', 'learned', 'skipped')),
  saved boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (profile_id, question_id)
);
