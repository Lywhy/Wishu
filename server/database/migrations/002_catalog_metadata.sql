ALTER TABLE question_sections
  ADD COLUMN in_development boolean NOT NULL DEFAULT false;

ALTER TABLE questions
  ADD COLUMN popular boolean NOT NULL DEFAULT false;
