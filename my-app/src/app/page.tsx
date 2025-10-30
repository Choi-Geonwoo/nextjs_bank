//"use client";

import Link from "next/link";

export default  function Home(){
  const bandleClick = () => alert("버튼 클릭됨");
  return (
    <main style={{textAlign: 'center', marginTop: '3rem'}}>
      <h1>Home</h1>
      <nav style={{ marginTop: '1rem'}}>
        <Link href="/about">About</Link> | {" "}
        <Link href="/contact">Contact</Link> 
      </nav>
       
      {/* <Button onClick={bandleClick}>클릭</Button> */}
    </main>
  )
}