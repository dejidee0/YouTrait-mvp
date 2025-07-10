/*
  # YOUTRAIT Database Schema

  1. New Tables
    - `profiles` - User profiles with traits and bio
    - `traits` - Available traits with metadata
    - `user_traits` - User-trait relationships with endorsements
    - `posts` - User posts with content and music
    - `comments` - Post comments
    - `friend_requests` - Friend request system
    - `friendships` - Active friendships
    - `besties` - Bestie relationships with streaks
    - `notifications` - User notifications
    - `support_messages` - Support system
    - `leaderboard` - Daily trait leaderboard

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Traits table
CREATE TABLE IF NOT EXISTS traits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  color text DEFAULT '#6B5CE7',
  category text DEFAULT 'general',
  description text,
  created_at timestamptz DEFAULT now()
);

-- User traits relationship
CREATE TABLE IF NOT EXISTS user_traits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  trait_id uuid REFERENCES traits(id) ON DELETE CASCADE,
  endorsements integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, trait_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  music_link text,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Friend requests table
CREATE TABLE IF NOT EXISTS friend_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(from_user_id, to_user_id)
);

-- Friendships table
CREATE TABLE IF NOT EXISTS friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_b_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_a_id, user_b_id)
);

-- Besties table
CREATE TABLE IF NOT EXISTS besties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_b_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_count integer DEFAULT 0,
  last_exchange timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_a_id, user_b_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Support messages table
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  message text NOT NULL,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trait_id uuid REFERENCES traits(id) ON DELETE CASCADE,
  date date DEFAULT CURRENT_DATE,
  endorsements integer DEFAULT 0,
  users_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(trait_id, date)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE traits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_traits ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE besties ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for traits
CREATE POLICY "Anyone can view traits"
  ON traits FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_traits
CREATE POLICY "Users can view all user traits"
  ON user_traits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own traits"
  ON user_traits FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for posts
CREATE POLICY "Users can view all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for comments
CREATE POLICY "Users can view all comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for friend_requests
CREATE POLICY "Users can view own friend requests"
  ON friend_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can create friend requests"
  ON friend_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update received friend requests"
  ON friend_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = to_user_id);

-- Policies for friendships
CREATE POLICY "Users can view own friendships"
  ON friendships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users can create friendships"
  ON friendships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Policies for besties
CREATE POLICY "Users can view own besties"
  ON besties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

CREATE POLICY "Users can manage own besties"
  ON besties FOR ALL
  TO authenticated
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for support_messages
CREATE POLICY "Users can view own support messages"
  ON support_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create support messages"
  ON support_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for leaderboard
CREATE POLICY "Users can view leaderboard"
  ON leaderboard FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample traits
INSERT INTO traits (name, color, category) VALUES
  ('creative', '#FF6B6B', 'mind'),
  ('empathetic', '#4ECDC4', 'heart'),
  ('adventurous', '#45B7D1', 'social'),
  ('loyal', '#96CEB4', 'heart'),
  ('witty', '#FFEAA7', 'mind'),
  ('bold', '#DDA0DD', 'social'),
  ('curious', '#F39C12', 'mind'),
  ('gentle', '#E17055', 'heart'),
  ('passionate', '#A29BFE', 'heart'),
  ('wise', '#FD79A8', 'mind'),
  ('authentic', '#00B894', 'social'),
  ('innovative', '#E84393', 'mind'),
  ('resilient', '#6C5CE7', 'heart'),
  ('charming', '#FDCB6E', 'social'),
  ('mystical', '#F8C471', 'mind')
ON CONFLICT (name) DO NOTHING;