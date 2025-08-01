'use client'

import { Button } from '@/components/Button'
import { InputCheckBox } from '@/components/InputCheckBox'
import { InputText } from '@/components/InputText'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { useActionState, useEffect, useState } from 'react'
import { ImageUploader } from '../ImageUploader'
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto'
import { createPostAction } from '@/actions/post/create-post-action'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { updatePostAction } from '@/actions/post/update-post-action'

type ManagePostFormUpdateProps = {
  mode: 'update'
  publicPost?: PublicPost
}

type ManagePostFormCreateProps = {
  mode: 'create'
}

type ManagePostFormProps = ManagePostFormUpdateProps | ManagePostFormCreateProps

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props
  const searchParams = useSearchParams()
  const created = searchParams.get('created')
  const router = useRouter()
  let publicPost

  if (mode === 'update') {
    publicPost = props.publicPost
  }

  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  }

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    erros: [],
  }
  const [state, action, isPending] = useActionState(actionsMap[mode], initialState)

  useEffect(() => {
    if (state.erros.length > 0) {
      toast.dismiss()
      state.erros.forEach(error => toast.error(error))
    }
  }, [state.erros])

  useEffect(() => {
    if (state.success) {
      toast.dismiss()
      toast.success('Post atualizado com sucesso!')
    }
  }, [state.success])

  useEffect(() => {
    if (created === '1') {
      toast.dismiss()
      toast.success('Post criado com sucesso!')
      const url = new URL(window.location.href)
      url.searchParams.delete('created')
      router.replace(url.toString())
    }
  }, [created, router])

  const { formState } = state
  const [contentValue, setContentValue] = useState(publicPost?.content || '')

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='Id gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor do post'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a URL da imagem de capa'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckBox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className='mt-4'>
          <Button disabled={isPending} type='submit'>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  )
}
