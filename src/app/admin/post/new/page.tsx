import { InputText } from '@/components/InputText'

export const dynamic = 'force-dynamic'

export default async function AdminPostNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <InputText labelText='nome' placeholder='Digite seu nome' />
      <InputText labelText='sobrenome' placeholder='Digite seu sobrenome' />
    </div>
  )
}
