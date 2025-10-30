import { getPost } from '@/app/actions'

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(Number(id))

  if (!post) {
    return <div className="text-center text-gray-500">게시글을 찾을 수 없습니다.</div>
  }

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">{new Date(post.createdAt).toLocaleString()}</p>
      <div className="whitespace-pre-line">{post.content}</div>
    </div>
  )
}
