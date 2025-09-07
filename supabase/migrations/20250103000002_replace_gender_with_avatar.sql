-- Replace gender field with avatar selection
-- Remove gender column and add avatar_id column

ALTER TABLE users DROP COLUMN IF EXISTS gender;
ALTER TABLE users ADD COLUMN avatar_id INTEGER DEFAULT 1 CHECK (avatar_id >= 1 AND avatar_id <= 25);

-- Add comment to explain the avatar system
COMMENT ON COLUMN users.avatar_id IS 'Avatar selection (1-25), corresponds to avatar images 1.jpg through 25.jpg'; 