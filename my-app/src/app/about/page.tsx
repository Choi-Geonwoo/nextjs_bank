"use client";

import { useState } from "react";

export default function AboutPage() {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json = await res.json();
      setData(json.slice(0, 5)); // 일부 데이터만 표시
    } catch (err) {
      console.error(err);
      alert("데이터 로드 실패");
    } finally {
      setLoading(false);
    }
  };

    return (
        <main style={{ padding:'2rem'}}>
            <h1>About 페이지</h1>
            <p>이 사이트는 Next.js 로 만듬</p>
            <button onClick={handleClick}>클릭</button>
            <br></br>
             {loading ? "로딩중..." : "데이터 가져오기"}
              <ul style={{ marginTop: "1rem" }}>
                {data.map((post) => (
                <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.body}</p>
                </li>
                ))}
            </ul>
        </main>
    )
}