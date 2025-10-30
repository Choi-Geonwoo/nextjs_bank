import Link from "next/link";
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header style={{ padding: "1rem", background: "#eee"}}>
          <Link href="/">홈</Link> | {" "}
          <Link href="/about">about</Link> | {" "}
          <Link href="/contact">Contact</Link>
        </header>

        <main>{children}</main>

        <footer style={{ padding:"1rem", background: "#eee", marginTop: "2rem"}}>
          2025
        </footer>
      </body>
    </html>
  )
}