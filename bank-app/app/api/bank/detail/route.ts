import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  const rows = await db.all(`
      select 
          distinct
          a.bank_id,
          a.bank_name 
          ,case when b.account_type_id is not null then 'O'
          ELSE 'X' END AS yn_
      FROM  bank a
      left outer join bank_account_type b
      on a.bank_id = b.bank_id 
      left outer join account_type c
      on b.account_type_id  = c.account_type_id
  `);
  await db.close();
  return NextResponse.json(rows);
}
