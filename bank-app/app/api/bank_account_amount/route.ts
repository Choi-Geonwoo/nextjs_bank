// app/api/bank_account_amount/route.ts
import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year'); // string
  const month = searchParams.get('month'); // optional

  const db = await openDB();

  const queryParams: any[] = [];
  let sql = `
    SELECT
      ROW_NUMBER() OVER (ORDER BY baa.id) AS seq,
      baa.id,
      c.bank_name,
      a.type_name,
      baa.amount,
      baa.year,
      baa.month,
      baa.year || printf('%02d', baa.month) || printf('%02d', baa.day)  as date
    FROM bank_account_amount baa
    JOIN bank_account_type bat ON baa.bank_account_type_id = bat.id
    JOIN account_type a ON bat.account_type_id = a.account_type_id
    JOIN bank c ON bat.bank_id = c.bank_id
    WHERE 1=1
  `;

  if (year) {
    sql += ` AND baa.year = ?`;
    queryParams.push(year);
  }

  if (month) {
    sql += ` AND baa.month = ?`;
    queryParams.push(month);
  }

  sql += ` ORDER BY baa.year DESC, baa.month ASC`;

  const rows = await db.all(sql, queryParams);
  await db.close();
  return NextResponse.json(rows);
}

// 입력 (POST)
export async function POST(req: Request) {
  const { bank_account_type_id, year, month, amount } = await req.json();

  // 시작일
  const start_day = 1;

  // 종료일 계산
  const endDate = new Date(year, month, 0); // JS month: 1~12, 0이면 지난 달 마지막 날
  const end_day = endDate.getDate();

  const db = await openDB();

  // 시작일 삽입/업데이트
  await db.run(`
    INSERT INTO bank_account_amount (bank_account_type_id, year, month, day, amount)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(bank_account_type_id, year, month, day)
    DO UPDATE SET amount = excluded.amount
  `, [bank_account_type_id, year, month, start_day, amount]);

  // 종료일 삽입/업데이트
  await db.run(`
    INSERT INTO bank_account_amount (bank_account_type_id, year, month, day, amount)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(bank_account_type_id, year, month, day)
    DO UPDATE SET amount = excluded.amount
  `, [bank_account_type_id, year, month, end_day, amount]);

  await db.close();

  return NextResponse.json({ message: '금액 등록 완료' });
}

// 수정
export async function PUT(req: Request) {
  const { id, amount } = await req.json();
  const db = await openDB();
  await db.run('UPDATE bank_account_amount SET amount = ? WHERE id = ?', [amount, id]);
  return NextResponse.json({ message: '수정 완료' });
}

// 삭제
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const db = await openDB();
  const id = url.searchParams.get('id');
  await db.run('DELETE FROM bank_account_amount WHERE id = ?', [id]);
  return NextResponse.json({ message: '삭제 완료' });
}
