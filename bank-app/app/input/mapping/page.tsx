'use client';
import { useState, useEffect } from 'react';

export default function MappingPage() {
  const [banks, setBanks] = useState<{bank_id:number,bank_name:string}[]>([]);
  const [types, setTypes] = useState<{account_type_id:number,type_name:string}[]>([]);
  const [selectedBank, setSelectedBank] = useState<number>();
  const [selectedType, setSelectedType] = useState<number>();
  const [mappings,setMappings]=useState<{id:string,bank_name:string,type_name:string}[]>([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    const [banksRes, typesRes, mappingsRes] = await Promise.all([
      fetch('/api/bank').then(r=>r.json()),
      fetch('/api/account_type').then(r=>r.json()),
      fetch('/api/bank_account_type').then(r=>r.json())
    ]);
    setBanks(banksRes);
    setTypes(typesRes);
    setMappings(mappingsRes);
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if(!selectedBank || !selectedType) return;

    const res = await fetch('/api/bank_account_type',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({bank_id:selectedBank, account_type_id:selectedType})
    });

    if(!res.ok){
      const data = await res.json();
      alert(data.message); // 이미 등록된 경우 메시지 표시
    } else {
      alert('매핑 등록 완료');
      fetchData(); // 테이블 갱신
    }
    // fetchData(); // 등록 후 테이블 갱신
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/bank_account_type?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold text-center">은행-계좌 유형 매핑</h1>

      {/* 매핑 등록 폼 */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          계좌 매핑 등록
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">은행</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(Number(e.target.value))}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full transition-all"
            required
          >
            <option value="">은행 선택</option>
            {banks.map((b) => (
              <option key={b.bank_id} value={b.bank_id}>{b.bank_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">계좌 유형</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(Number(e.target.value))}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full transition-all"
            required
          >
            <option value="">계좌 유형 선택</option>
            {types.map((t) => (
              <option key={t.account_type_id} value={t.account_type_id}>{t.type_name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
        >
          매핑 등록
        </button>
      </form>

      {/* 데이터 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-center">순번</th>
              <th className="py-2 px-4 text-center">은행명</th>
              <th className="py-2 px-4 text-center">계좌 유형</th>
              <th className="py-2 px-4 text-center">구분</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mappings.length === 0 ? (
              <tr>
                <td className="py-4 text-center" colSpan={4}>
                  조회된 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              mappings.map((b, i) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 text-center">{i + 1}</td>
                  <td className="py-2 px-4 text-center">{b.bank_name}</td>
                  <td className="py-2 px-4 text-center">{b.type_name}</td>
                  <td>
                     <button
                       onClick={() => handleDelete(b.id)}
                       className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                     >
                       삭제
                     </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
