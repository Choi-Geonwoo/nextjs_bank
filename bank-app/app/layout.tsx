import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'NextJS 게시판',
  description: '간단한 Next.js + SQLite 게시판',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-800">
        <header className="bg-white shadow p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              게시판
            </Link>
            <nav>
              <Link
                href="/input/bank"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                은행등록
              </Link>
              &nbsp;
              <Link
                href="/input/account_type"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                유형등록
              </Link>
              &nbsp;
              <Link
                href="/input/mapping"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                매핑
              </Link>
              &nbsp;
              <Link
                href="/input/amount"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                금액등록
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>

        <footer className="text-center text-gray-500 py-4 mt-10 border-t">
          &copy; 2025 NextJS 게시판
        </footer>
      </body>
    </html>
  )
}
