import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

// 조회 (GET)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get('year'));
  const month = Number(searchParams.get('month'));

  const db = await openDB();
  const rows = await db.all(
    `
    SELECT b.bank_name, a.type_name, baa.amount
    FROM bank_account_amount baa
    JOIN bank b ON b.bank_id = baa.bank_id
    JOIN account_type a ON a.account_type_id = baa.account_type_id
    WHERE baa.year = ? AND baa.month = ?
    ORDER BY b.bank_name, a.type_name;
    `,
    [year, month]
  );
  await db.close();

  return NextResponse.json(rows);
}

// 입력 (POST)
export async function POST(req: Request) {
  const { bank_name, account_type, year, month, amount } = await req.json();
  const db = await openDB();

  // 은행 / 계좌유형 등록
  await db.run(`INSERT OR IGNORE INTO bank (bank_name) VALUES (?)`, [bank_name]);
  const bank = await db.get(`SELECT bank_id FROM bank WHERE bank_name = ?`, [bank_name]);

  await db.run(`INSERT OR IGNORE INTO account_type (type_name) VALUES (?)`, [account_type]);
  const account = await db.get(`SELECT account_type_id FROM account_type WHERE type_name = ?`, [account_type]);

  // 금액 데이터 삽입 또는 업데이트
  await db.run(
    `
    INSERT INTO bank_account_amount (bank_id, account_type_id, year, month, amount)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(bank_id, account_type_id, year, month)
    DO UPDATE SET amount = excluded.amount;
    `,
    [bank.bank_id, account.account_type_id, year, month, amount]
  );

  await db.close();
  return NextResponse.json({ message: '데이터가 저장되었습니다.' });
}
