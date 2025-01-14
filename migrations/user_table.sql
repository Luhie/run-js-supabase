-- CREATE TABLE members (
--     id SERIAL PRIMARY KEY,
-- 	member_id VARCHAR(20) UNIQUE NOT NULL,
--     member_pw TEXT NOT NULL,
-- 	member_name VARCHAR(50) NOT NULL,
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- -- 1. RLS 활성화
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- -- 2. 기본 차단 정책
-- CREATE POLICY "no_access" ON users
-- FOR ALL
-- USING (false);

-- -- 3. 자신의 데이터 읽기 허용
-- CREATE POLICY "read_own_data" ON users
-- FOR SELECT
-- USING (auth.uid() = id);

-- -- 4. 자신의 데이터 수정 허용
-- CREATE POLICY "update_own_data" ON users
-- FOR UPDATE
-- USING (auth.uid() = id);

-- -- 5. 회원가입 허용
-- CREATE POLICY "allow_signup" ON users
-- FOR INSERT
-- WITH CHECK (true);

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    user_id TEXT UNIQUE NOT NULL,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

create policy "public profiles are viewed by everyone." on user_profiles
for select using(true);

create policy "Users can insert their own profile." on user_profiles
for insert with check(auth.uid()=id);

-- 회원가입 시 auth 테이블에 새로 생기는 row의 id, email, raw_user_meta_data 칼럼에서 값을 가져와서 자동으로 user_profiles 테이블에 업데이트 해줌
-- auth의 id == user_profiles의 id
create function public.handle_new_user()
returns trigger as $$
begin
insert into public.user_profiles(id, user_id, user_name)
values (new.id, new.email, new.raw_user_meta_data->>'user_id', new.raw_user_meta_data->>'user_name');
return new;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

// new
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, user_id, user_name, email)
    VALUES (
        NEW.id, -- auth.users의 UUID
        NEW.raw_user_meta_data->>'user_id', -- 사용자 정의 user_id
        NEW.raw_user_meta_data->>'user_name', -- 사용자 정의 user_name
        NEW.email -- 이메일
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

// trigger test 
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES (
    gen_random_uuid(), -- UUID 생성
    'test@example.com', -- 이메일
    '{"user_id": "test_user", "user_name": "Test User"}'::jsonb -- 사용자 정의 메타데이터
);
