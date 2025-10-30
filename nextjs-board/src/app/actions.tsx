'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) return

  await prisma.post.create({
    data: { title, content },
  })

  revalidatePath('/')
}

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getPost(id: number) {
  if (!id) return null
  return await prisma.post.findUnique({
    where: { id },
  })
}
