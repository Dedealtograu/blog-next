'use server'

import { PublicPost } from '@/dto/post/dto'

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
  console.log(formDataToObject)

  return {
    formState: prevState.formState,
    erros: []
  }
}
