import Link from 'next/link'
import { getPosts } from './actions'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="space-y-4">
      {posts.length === 0 && <p className="text-gray-500">등록된 게시글이 없습니다.</p>}

      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.id}`}
          className="block bg-white p-4 rounded shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  )
}
