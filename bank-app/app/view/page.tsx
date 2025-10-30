'use client';
import { useState, useEffect } from 'react';

type Row = {
  seq: number;
  id: string;
  bank_name: string;
  type_name: string;
  amount: number;
  year: number;
  month: number;
  date: string;
};

export default function ViewPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState<Row[]>([]);
  const [activeMonth, setActiveMonth] = useState<string>('');
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    fetchData();
  }, [year]);

  async function fetchData() {
    try {
      const res = await fetch(`/api/bank_account_amount?year=${year}`);
      if (!res.ok) throw new Error('데이터 조회 실패');
      const rows: Row[] = await res.json();
      setData(rows);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAmountChange(seq: number, newAmount: number) {
    setData((prev) =>
      prev.map((r) => (r.seq === seq ? { ...r, amount: newAmount } : r))
    );
  }

  async function handleUpdate(id: string) {
    const row = data.find((r) => r.id === id);
    if (!row) return;
    try {
      await fetch('/api/bank_account_amount', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/bank_account_amount?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredData =
    activeMonth === ''
      ? data
      : data.filter((r) => r.month.toString() === activeMonth);

  const groupedByDate = filteredData.reduce<Record<string, Row[]>>((acc, cur) => {
    if (!acc[cur.date]) acc[cur.date] = [];
    acc[cur.date].push(cur);
    return acc;
  }, {});

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">💰 날짜별 금액 현황</h1>

        <div className="flex items-center space-x-3">
          <label className="text-gray-600">연도</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1.5 bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const y = 2023 + i;
              return (
                <option key={y} value={y}>
                  {y}년
                </option>
              );
            })}
          </select>
        </div>
      </header>

      {/* 월별 탭 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveMonth('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
            activeMonth === ''
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        {months.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMonth(m.toString())}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              activeMonth === m.toString()
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {m}월
          </button>
        ))}
      </div>

      {/* 데이터 카드들 */}
      {Object.keys(groupedByDate).length === 0 ? (
        <p className="text-center py-10 text-gray-500">조회된 데이터가 없습니다.</p>
      ) : (
        Object.keys(groupedByDate)
          .sort()
          .map((date) => {
            const items = groupedByDate[date];
            const banks = Array.from(new Set(items.map((i) => i.bank_name)));
            const types = Array.from(new Set(items.map((i) => i.type_name)));

            return (
              <div
                key={date}
                className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 transition hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  📅 {date}
                </h2>

                <div className="overflow-x-auto">
                  <div className="min-w-max">
                    {/* 헤더 */}
                    <div className="flex bg-blue-50 font-medium text-gray-700 border-b border-gray-200">
                      {banks.map((bank) => (
                        <div
                          key={bank}
                          className="flex-1 min-w-[250px] p-3 text-center border-r last:border-none"
                        >
                          {bank}
                        </div>
                      ))}
                    </div>

                    {/* 본문 */}
                    {types.map((type, idx) => (
                      <div
                        key={type}
                        className={`flex border-b border-gray-100 ${
                          idx % 2 === 0 ? 'bg-gray-50/40' : 'bg-white'
                        }`}
                      >
                        {banks.map((bank) => {
                          const record = items.find(
                            (r) => r.bank_name === bank && r.type_name === type
                          );
                          return (
                            <div
                              key={bank + type}
                              className="flex-1 min-w-[250px] p-3 border-r last:border-none"
                            >
                              {record ? (
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-medium text-gray-700 truncate">
                                    {type}
                                  </span>
                                  <input
                                    type="number"
                                    value={record.amount}
                                    onChange={(e) =>
                                      handleAmountChange(
                                        record.seq,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-24 text-right border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                  />
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleUpdate(record.id)}
                                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs"
                                    >
                                      수정
                                    </button>
                                    <button
                                      onClick={() => handleDelete(record.id)}
                                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                                    >
                                      삭제
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}
