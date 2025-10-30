'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 데이터 타입 정의
type Row = {
  seq: number;
  account_type_id:string;
  type_name: string;
  mpngYn: string;
};


export default function AccountTypePage() {
  const [typeName, setTypeName] = useState('');
  const [list, setList] = useState<Row[]>([]);


  // 유형 목록 조회
  useEffect(() => {
    accountTypeList();
  }, []);

  async function accountTypeList() {
    try {
      const res = await fetch(`/api/account_type/list`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const rows: Row[] = await res.json();
      setList(rows);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/account_type', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type_name: typeName }),
    });
    alert('계좌 유형 등록 완료');
    setTypeName('');
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      {/* <Link href="/view" className="text-blue-600 underline">조회 화면</Link> */}
      <h1 className="text-xl font-bold">계좌 유형 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={typeName}
          onChange={e => setTypeName(e.target.value)}
          placeholder="계좌 유형"
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">등록</button>
      </form>


      {/* 데이터 테이블 */}
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-center">순번</th>
              <th className="py-2 px-4 text-center">유형명</th>
              <th className="py-2 px-4 text-center">매핑여부</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td className="py-4 text-center" colSpan={3}>
                  조회된 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              list.map((row, idx) => (
                <tr
                  key={row.seq}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="py-2 px-4 text-center">{row.seq}</td>
                  <td className="py-2 px-4 text-center">{row.type_name}</td>
                  <td className="py-2 px-4 text-center">{row.mpngYn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>


    </div>
  );
}
