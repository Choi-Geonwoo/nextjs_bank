import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  const rows = await db.all(`SELECT * FROM account_type ORDER BY type_name`);
  await db.close();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { type_name } = await req.json();
  const db = await openDB();
  await db.run(`INSERT OR IGNORE INTO account_type (type_name) VALUES (?)`, [type_name]);
  await db.close();
  return NextResponse.json({ message: '계좌 유형 등록 완료' });
}
