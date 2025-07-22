'use client'

import { Button } from '@/components/Button'
import { InputCheckBox } from '@/components/InputCheckBox'
import { InputText } from '@/components/InputText'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { useActionState, useState } from 'react'
import { ImageUploader } from '../ImageUploader'
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto'
import { createPostAction } from '@/actions/post/create-post-action'

type ManagePostFormProps = {
  publicPost?: PublicPost
}

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formStste: makePartialPublicPost(publicPost),
    erros: [],
  }
  const [state, action, isPending] = useActionState(createPostAction, initialState)

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
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor do post'
          type='text'
          defaultValue={formState.author}
        />

        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={formState.title}
        />

        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a URL da imagem de capa'
          type='text'
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckBox labelText='Publicar?' name='published' type='checkbox' defaultChecked={formState.published} />

        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  )
}
