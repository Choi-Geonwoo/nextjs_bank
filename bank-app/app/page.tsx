'use client';

// import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

// type Row = {
//   bank_name: string;
//   type_name: string;
//   amount: number;
// };

export default function HomePage() {
  
  redirect('/view');

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [data, setData] = useState<Row[]>([]);
//   const [form, setForm] = useState({
//     bank_name: '',
//     account_type: '',
//     year: 2025,
//     month: 1,
//     amount: ''
//   });
//   const year = 2025;


//   // 데이터 조회
//   useEffect(() => {
//     fetch(`/api/data?year=${year}&month=${selectedMonth}`)
//       .then((res) => res.json())
//       .then((rows) => setData(rows));
//   }, [selectedMonth]);

//   // 입력 처리
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     await fetch('/api/data', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form)
//     });
//     alert('저장되었습니다!');
//     setForm({ bank_name: '', account_type: '', year: 2025, month: 1, amount: '' });
//     setSelectedMonth(form.month); // 새로 등록한 달로 이동
//   }

//   return (
//     <div className="p-8 max-w-4xl mx-auto space-y-8">
//       <h1 className="text-2xl font-bold text-center">{year}년 금액 관리</h1>

//       {/* 탭 메뉴 */}
//       <div className="flex flex-wrap justify-center gap-2">
//         {[...Array(12)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setSelectedMonth(i + 1)}
//             className={`px-3 py-1 rounded-xl border ${
//               selectedMonth === i + 1
//                 ? 'bg-blue-600 text-white border-blue-600'
//                 : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//             }`}
//           >
//             {i + 1}월
//           </button>
//         ))}
//       </div>

//       {/* 데이터 테이블 */}
//       <div className="border rounded-xl shadow overflow-hidden">
//         <table className="w-full text-sm text-center">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2">은행</th>
//               <th>계좌유형</th>
//               <th>금액</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.map((row, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="py-2">{row.bank_name}</td>
//                   <td>{row.type_name}</td>
//                   <td>{row.amount.toLocaleString()} 원</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={3} className="py-6 text-gray-500">
//                   데이터가 없습니다.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 데이터 입력 폼 */}
//       <form
//         onSubmit={handleSubmit}
//         className="border rounded-xl p-4 shadow space-y-3 bg-gray-50"
//       >
//         <h2 className="font-semibold mb-2">데이터 입력</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="은행명"
//             value={form.bank_name}
//             onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="계좌유형"
//             value={form.account_type}
//             onChange={(e) => setForm({ ...form, account_type: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="년도"
//             value={form.year}
//             onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="월 (1~12)"
//             value={form.month}
//             onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="금액"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//             className="border p-2 rounded col-span-2"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
//         >
//           저장하기
//         </button>
//       </form>
//     </div>
//   );
 }
