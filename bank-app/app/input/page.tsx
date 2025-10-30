'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InputPage() {
  const [form, setForm] = useState({
    bank_name: '',
    account_type: '',
    year: 2025,
    month: 1,
    amount: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('데이터가 저장되었습니다.');
      setForm({ bank_name: '', account_type: '', year: 2025, month: 1, amount: '' });
    } else {
      alert('저장 실패');
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">데이터 입력</h1>
        <Link
          href="/view"
          className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
        >
          조회로 이동
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border rounded-xl p-4 shadow space-y-3 bg-gray-50"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="은행명"
            value={form.bank_name}
            onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="계좌유형"
            value={form.account_type}
            onChange={(e) => setForm({ ...form, account_type: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="년도"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="월 (1~12)"
            value={form.month}
            onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="금액"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border p-2 rounded col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          저장하기
        </button>
      </form>
    </div>
  );
}
