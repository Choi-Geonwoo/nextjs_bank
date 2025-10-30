-- 1. 은행 계좌 유형 테이블
-- 은행 계좌의 종류를 관리 (예: 보통예금, 적금 등)
CREATE TABLE IF NOT EXISTS account_type (
  account_type_id INTEGER PRIMARY KEY AUTOINCREMENT, -- 계좌 유형 고유 ID
  type_name TEXT NOT NULL UNIQUE                     -- 계좌 유형 이름 (중복 불가)
);

-- 2. 은행 테이블
-- 은행 정보를 관리
CREATE TABLE IF NOT EXISTS bank (
  bank_id INTEGER PRIMARY KEY AUTOINCREMENT, -- 은행 고유 ID
  bank_name TEXT NOT NULL UNIQUE             -- 은행 이름 (중복 불가)
);

-- 3. 은행-계좌 유형 매핑 테이블
-- 각 은행별로 어떤 계좌 유형을 가지고 있는지 매핑
CREATE TABLE IF NOT EXISTS bank_account_type (
  id INTEGER PRIMARY KEY AUTOINCREMENT,        -- 매핑 고유 ID
  bank_id INTEGER NOT NULL,                    -- 은행 ID (FK)
  account_type_id INTEGER NOT NULL,            -- 계좌 유형 ID (FK)
  UNIQUE(bank_id, account_type_id),           -- 동일 은행-계좌 유형 중복 방지
  FOREIGN KEY(bank_id) REFERENCES bank(bank_id),
  FOREIGN KEY(account_type_id) REFERENCES account_type(account_type_id)
);

-- 4. 계좌 금액 테이블
-- 연도, 월, 일 단위로 금액 기록 (start/end 날짜 2행 삽입 가능)
CREATE TABLE IF NOT EXISTS bank_account_amount (
  id INTEGER PRIMARY KEY AUTOINCREMENT,             -- 고유 ID
  bank_account_type_id INTEGER NOT NULL,           -- 은행-계좌 유형 매핑 ID (FK)
  year INTEGER NOT NULL,                            -- 연도 (YYYY)
  month INTEGER NOT NULL,                           -- 월 (MM)
  day INTEGER NOT NULL,                             -- 일 (DD)
  amount REAL NOT NULL,                             -- 금액
  UNIQUE(bank_account_type_id, year, month, day),  -- day 포함, start/end 두 행 삽입 가능
  FOREIGN KEY(bank_account_type_id) REFERENCES bank_account_type(id)
);
