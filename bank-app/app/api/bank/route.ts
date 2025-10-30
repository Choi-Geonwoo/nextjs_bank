import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';

export async function GET() {
  const db = await openDB();
  const rows = await db.all(`SELECT * FROM bank ORDER BY bank_name`);
  await db.close();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { bank_name } = await req.json();
  const db = await openDB();
  await db.run(`INSERT OR IGNORE INTO bank (bank_name) VALUES (?)`, [bank_name]);
  await db.close();
  return NextResponse.json({ message: '은행 등록 완료' });
}
