import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  const rows = await db.all(`
    select
        ROW_NUMBER() OVER(ORDER BY tb.account_type_id) AS seq
      ,TB.*
    from
      (
      SELECT
        ROW_NUMBER() OVER (PARTITION BY a.type_name ORDER BY
        a.account_type_id) AS seq_,
        a.type_name,
        CASE
          WHEN b.bank_id IS NULL THEN 'X'
          ELSE 'O'
        END AS mpngYn,
        a.account_type_id
      FROM
        account_type a
      LEFT OUTER JOIN 
            bank_account_type b ON
        a.account_type_id = b.account_type_id
        ) TB
    where
      seq_ = 1
    `);
  await db.close();
  return NextResponse.json(rows);
}

// export async function POST(req: Request) {
//   const { type_name } = await req.json();
//   const db = await openDB();
//   await db.run(`INSERT OR IGNORE INTO account_type (type_name) VALUES (?)`, [type_name]);
//   await db.close();
//   return NextResponse.json({ message: '계좌 유형 등록 완료' });
// }
