CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'candidate_status'
    ) THEN
        CREATE TYPE candidate_status AS ENUM (
            'Contacted',
            'Interview Scheduled',
            'Offer Extended',
            'Hired',
            'Rejected'
        );
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS Candidate (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10),
  skills TEXT,
  status candidate_status,
  node_experience NUMERIC,
  react_experience NUMERIC
);

CREATE TABLE IF NOT EXISTS ExpectedSalary (
  candidate_id UUID PRIMARY KEY REFERENCES Candidate(id) ON DELETE CASCADE,
  expected_salary NUMERIC
);
