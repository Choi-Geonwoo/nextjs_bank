import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  const rows = await db.all(`
        SELECT
          bat.id,
          b.bank_name,
          a.type_name
        FROM
          bank_account_type bat
        JOIN bank b ON
          bat.bank_id = b.bank_id
        JOIN account_type a ON
          bat.account_type_id = a.account_type_id
        ORDER BY
          b.bank_name,
          a.type_name
  `);
  await db.close();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { bank_id, account_type_id } = await req.json();
  const db = await openDB();

  // 1️⃣ 기존 매핑 건수 조회
  const row = await db.get(
    `SELECT COUNT(*) as count 
     FROM bank_account_type 
     WHERE bank_id = ? AND account_type_id = ?`,
    [bank_id, account_type_id]
  );

  if (row.count > 0) {
    await db.close();
    return NextResponse.json(
      { message: '이미 등록된 매핑입니다.' },
      { status: 400 }
    );
  }

  // 2️⃣ 신규 등록
  await db.run(
    `INSERT INTO bank_account_type (bank_id, account_type_id) VALUES (?, ?)`,
    [bank_id, account_type_id]
  );

  await db.close();
  return NextResponse.json({ message: '은행-계좌 유형 매핑 완료' });
}

export async function DELETE(req: Request) {
  // const { id } = await req.json();
  const url = new URL(req.url);
  const db = await openDB();
  const id = url.searchParams.get('id');

  // 1 삭제
  await db.run(
    `DELETE FROM bank_account_type WHERE id =  ( ?)`,
    [id]
  );
  return NextResponse.json({ message: '삭제 완료' });

}