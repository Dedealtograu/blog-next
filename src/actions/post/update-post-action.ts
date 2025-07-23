'use server'

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto'
import { PostUpdateSchema } from '@/lib/post/validation'
import { postRepository } from '@/repositories/post'
import { getZodErrorMessages } from '@/utils/get-zod-error-messages'
import { revalidateTag } from 'next/cache'

type UpdatePostActionState = {
  formState: PublicPost
  erros: string[]
  success?: true
}


export async function updatePostAction(prevState: UpdatePostActionState, formData: FormData): Promise<UpdatePostActionState> {
  // TODO: verificar se o usuário tá logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      erros: ['Dados inválido.'],
    }
  }

  const id = formData.get('id')?.toString() || ''

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      erros: ['Dados inválidos.'],
    }
  }

  const formDataToObject = Object.fromEntries(formData.entries())
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObject)

  if (!zodParsedObj.success) {
    const erros = getZodErrorMessages(zodParsedObj.error.format())

    return {
      erros,
      formState: makePartialPublicPost(formDataToObject),
    }
  }

  const validPostData = zodParsedObj.data
  const newPost = {
    ...validPostData,
  }

  let post

  try {
    post = await postRepository.update(id, newPost)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(newPost),
        erros: [e.message],
      }
    }

    return {
      formState: makePartialPublicPost(newPost),
      erros: ['Erro ao criar o post. Tente novamente mais tarde.'],
    }
  }

  revalidateTag('posts')
  revalidateTag(`post-${post.slug}`)

  return {
    formState: makePartialPublicPost(post),
    erros: [],
    success: true,
  }
}
