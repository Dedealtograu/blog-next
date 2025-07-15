'use server'

import { IMAGE_UPLOAD_DIRECTORY, IMAGE_UPLOADER_MAX_SIZE } from '@/lib/constants'
import { mkdir, writeFile } from 'fs/promises'
import { extname, resolve } from 'path'

type uploadImageActionResylt = {
  url: string
  error: string
}


export async function uploadImageAction(formData: FormData): Promise<uploadImageActionResylt> {

  const makeResult = ({url = '', error = ''}) => ({url, error})

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' })
  }

  const file = formData.get('file')

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' })
  }

  if (file.size > IMAGE_UPLOADER_MAX_SIZE) {
    return makeResult({ error: 'Arquivo muito grande' })
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' })
  }

  const imageExtension = extname(file.name)
  const uniqueImageName = `${Date.now()}${imageExtension}`
  const uploadFullPath = resolve(process.cwd(), 'public', IMAGE_UPLOAD_DIRECTORY)

  await mkdir(uploadFullPath, { recursive: true })

  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)
  const fileFullPath = resolve(uploadFullPath, uniqueImageName)

  await writeFile(fileFullPath, buffer)

  const url = `http://localhost:3000/${IMAGE_UPLOAD_DIRECTORY}/${uniqueImageName}`

  return makeResult({ url })
}
