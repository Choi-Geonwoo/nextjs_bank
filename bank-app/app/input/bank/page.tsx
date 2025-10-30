'use client';
import { useState, useEffect } from 'react';

export default function BankPage() {
  const [bankName, setBankName] = useState('');
  const [banks, setBanks] = useState<{bank_id:number, bank_name:string, yn_:string, seq:string}[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // 은행 목록 가져오기
  const fetchBanks = async () => {
    const res = await fetch('/api/bank/detail');
    const data = await res.json();
    setBanks(data);
  };
    console.log(banks); // 실제 반환 데이터 확인

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 클라이언트 중복 체크
    const exists = banks.some(b => b.bank_name.toLowerCase() === bankName.trim().toLowerCase());
    if(exists){
      setErrorMsg('이미 등록된 은행입니다.');
      return;
    }

    const res = await fetch('/api/bank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bank_name: bankName.trim() }),
    });

    if(!res.ok){
      const data = await res.json();
      setErrorMsg(data.message || '등록 실패');
      return;
    }

    setBankName('');
    await fetchBanks(); // 목록 갱신
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">은행 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={bankName}
          onChange={e => setBankName(e.target.value)}
          placeholder="은행명"
          className="border p-2 rounded w-full focus:outline-blue-500"
          required
        />
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          등록
        </button>
      </form>

      <h2 className="text-xl font-bold">은행 목록</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-center">순번</th>
              <th className="py-2 px-4 text-center">은행명</th>
              <th className="py-2 px-4 text-center">매핑</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banks.length === 0 ? (
              <tr key="empty">
                <td colSpan={3} className="py-4 text-center">조회된 데이터가 없습니다.</td>
              </tr>
            ) : (
              banks.map((b, i) => (
                <tr key={b.bank_id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 text-center">{i + 1}</td>
                  <td className="py-2 px-4 text-center">{b.bank_name}</td>
                  <td className="py-2 px-4 text-center">{b.yn_}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
