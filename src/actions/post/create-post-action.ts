'use server'

import { drizzeDb } from '@/db/drizzle'
import { postsTable } from '@/db/drizzle/schemas'
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto'
import { PostCreateSchema } from '@/lib/post/validation'
import { PostModel } from '@/models/post/post-model'
import { getZodErrorMessages } from '@/utils/get-zod-error-messages'
import { makeSlugFromText } from '@/utils/make-slug-from-text'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidV4 } from 'uuid'

type CreatePostActionState = {
  formState: PublicPost
  erros: string[]
}


export async function createPostAction(prevState: CreatePostActionState, formData: FormData): Promise<CreatePostActionState> {
  // TODO: verificar se o usuário tá logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      erros: ['Dados inválido.'],
    }
  }

  const formDataToObject = Object.fromEntries(formData.entries())
  const zodParsedObj =PostCreateSchema.safeParse(formDataToObject)

  if (!zodParsedObj.success) {
    const erros = getZodErrorMessages(zodParsedObj.error.format())

    return {
      erros,
      formState: makePartialPublicPost(formDataToObject),
    }
  }

  const validPostData = zodParsedObj.data
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  }
  // TODO: mover este método para repositório
  await drizzeDb.insert(postsTable).values(newPost)

  revalidateTag('posts')
  redirect(`/admin/posts/${newPost.id}`)
}
