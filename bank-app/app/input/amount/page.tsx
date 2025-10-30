'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AmountPage(){
  const [mappings,setMappings]=useState<{id:number,bank_name:string,type_name:string}[]>([]);
  const [selectedMapping,setSelectedMapping]=useState<number>();
  const [year,setYear]=useState(2025);
  const [month,setMonth]=useState(1);
  const [amount,setAmount]=useState('');

  useEffect(()=>{
    fetch('/api/bank_account_type').then(r=>r.json()).then(setMappings);
  },[]);

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    if(!selectedMapping) return;
    await fetch('/api/bank_account_amount',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({bank_account_type_id:selectedMapping,year,month,amount:Number(amount)})
    });
    alert('금액 등록 완료');
    setAmount('');
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      {/* <Link href="/view" className="text-blue-600 underline">조회 화면</Link> */}
      <h1 className="text-xl font-bold">금액 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select value={selectedMapping} onChange={e=>setSelectedMapping(Number(e.target.value))} className="border p-2 rounded w-full" required>
          <option value="">은행+유형 선택</option>
          {mappings.map(m=><option key={m.id} value={m.id}>{m.bank_name} - {m.type_name}</option>)}
        </select>
        <input type="number" value={year} onChange={e=>setYear(Number(e.target.value))} className="border p-2 rounded w-full" placeholder="년도" required/>
        <input type="number" value={month} onChange={e=>setMonth(Number(e.target.value))} className="border p-2 rounded w-full" placeholder="월" min={1} max={12} required/>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 rounded w-full" placeholder="금액" required/>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">등록</button>
      </form>
    </div>
  )
}
