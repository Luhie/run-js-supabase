CREATE TABLE members (
    id SERIAL PRIMARY KEY,
	member_id VARCHAR(20) UNIQUE NOT NULL,
    member_pw TEXT NOT NULL,
	member_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 1. RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 2. 기본 차단 정책
CREATE POLICY "no_access" ON users
FOR ALL
USING (false);

-- 3. 자신의 데이터 읽기 허용
CREATE POLICY "read_own_data" ON users
FOR SELECT
USING (auth.uid() = id);

-- 4. 자신의 데이터 수정 허용
CREATE POLICY "update_own_data" ON users
FOR UPDATE
USING (auth.uid() = id);

-- 5. 회원가입 허용
CREATE POLICY "allow_signup" ON users
FOR INSERT
WITH CHECK (true);
