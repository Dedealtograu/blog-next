'use server'

import { drizzeDb } from '@/db/drizzle'
import { postsTable } from '@/db/drizzle/schemas'
import { postRepository } from '@/repositories/post'
import { asyncDelay } from '@/utils/async-delay'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

export async function deletePostAction(id: string) {
  // TODO: checar login do usuário

  // TODO: remover linhas abaixo
  await asyncDelay(2000)
  console.log(id)

  if (!id || typeof id !== 'string') {
    return { error: 'Dados inválidos' }
  }

  const post = await postRepository.findById(id).catch(() => undefined)


  if (!post) {
    return { error: 'Post não encontrado' }
  }

  // TODO: mover este método para repositório
  await drizzeDb.delete(postsTable).where(eq(postsTable.id, id))

  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts')
  revalidateTag(`post-${post.slug}`)

  return { error: '' }
}
