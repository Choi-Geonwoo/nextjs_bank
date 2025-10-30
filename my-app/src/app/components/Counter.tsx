"use client";

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <>
        <button onClick={() => setCount(count + 1)}>
            클릭 횟수 : {count}
        </button>
        &nbsp;&nbsp;
        <button onClick={() => setCount(0)}>
            초기화
        </button>
        </>
    )
}