'use client'

import { Button } from '@/components/Button'
import { InputCheckBox } from '@/components/InputCheckBox'
import { InputText } from '@/components/InputText'

export function ManagePostForm() {
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText labelText='nome' placeholder='Digite seu nome' />
        <InputText labelText='sobrenome' placeholder='Digite seu sobrenome' />
        <InputCheckBox labelText='publicado' />
        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  )
}
